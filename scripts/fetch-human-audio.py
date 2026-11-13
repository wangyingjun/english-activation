#!/usr/bin/env python3
"""Download US-English word pronunciations from Wikimedia Commons / Wiktionary.

Usage (from repo root):

    .venv-audio/bin/python scripts/fetch-human-audio.py
"""

from __future__ import annotations

import json
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOUNDS = ROOT / "lib/content/sounds.ts"
OUT_DIR = ROOT / "public/audio/human"
MANIFEST = ROOT / "lib/generated/human-audio.json"
UA = "EnglishActivationTrainer/1.0 (https://github.com/wangyingjun/english-activation; educational pronunciation clips)"
COMMONS = "https://commons.wikimedia.org/w/api.php"
WIKT = "https://en.wiktionary.org/w/api.php"



# Sense-sensitive filename hints for homographs in our minimal pairs.
PREFERRED_FRAGMENTS = {
    "lead": ("lead-guide", "lead-verb", "lead_verb"),
    "live": ("live-verb", "live_verb"),
    "read": ("en-us-read.ogg", "en-us-read.oga"),
    "should": ("(stressed)",),
}
REJECT_FRAGMENTS = {
    "lead": ("lead-metal", "lead-element", "lead-pb"),
    "live": ("live-adj", "live-adjective", "live_adj"),
    "read": ("en-us-red.ogg", "en-us-red.oga", "read-past", "read.past"),
}


def slug(word: str) -> str:
    s = word.strip().lower()
    s = s.replace("'", "").replace("’", "").replace(".", "")
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9-]", "", s)
    return s or "word"


def api(base: str, params: dict) -> dict:
    q = urllib.parse.urlencode({**params, "format": "json"})
    req = urllib.request.Request(f"{base}?{q}", headers={"User-Agent": UA})
    last = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=30) as res:
                return json.loads(res.read().decode("utf-8"))
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(0.6 * attempt + 0.4)
    raise RuntimeError(f"API failed {base} {params}: {last}")


def strip_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text or "")
    return re.sub(r"\s+", " ", text).strip()


def load_words() -> list[str]:
    text = SOUNDS.read_text(encoding="utf-8")
    pairs = re.findall(r'left: "([^"]+)", right: "([^"]+)"', text)
    words = {w for l, r in pairs for w in (l, r)}
    # single-word linking citations / reduced everyday forms
    items = re.findall(r'citation: "([^"]+)", reduced: "([^"]+)"', text)
    extra_ok = {
        "a", "and", "are", "better", "can", "city", "for", "have", "little",
        "of", "the", "to", "twenty", "was", "water", "were", "wanna", "gonna",
        "gotta", "kinda", "dunno", "gimme", "sorta", "outta", "oughta", "hafta",
        "hasta",
    }
    for citation, reduced in items:
        if citation.lower() in extra_ok:
            words.add(citation)
        if reduced.lower() in extra_ok:
            words.add(reduced)
    return sorted(words, key=lambda w: w.lower())


def english_section(wikitext: str) -> str:
    m = re.search(r"^==English==\s*$", wikitext, re.M)
    if not m:
        return wikitext
    start = m.end()
    n = re.search(r"^==[^=].*==\s*$", wikitext[start:], re.M)
    return wikitext[start : start + n.start()] if n else wikitext[start:]


AUDIO_RE = re.compile(r"\{\{\s*audio\s*\|\s*en\s*\|\s*([^|{}]+?)\s*(?:\|([^}]*))?}}", re.I)



def file_matches_word(filename: str, word: str) -> bool:
    """Accept En-us-{word}, En-us-{word}-{sense}, En-us-{word} (2), or En-US {word} (stressed)."""
    stem = Path(filename).stem.lower()
    w = word.lower().strip()
    w_plain = re.sub(r"[^a-z0-9]+", "", w)
    # Optional sense: -verb, (2), (stressed) — but not extra words like "look daggers".
    suffix = r"(?:[-_][a-z0-9]+| \(\d+\)| \([a-z0-9 ]+\))?"
    patterns = [
        rf"en[-_]?us[-_ ]{re.escape(w)}{suffix}",
        rf"en[-_]?us[-_ ]{re.escape(w_plain)}{suffix}",
    ]
    if any(re.fullmatch(pat, stem) for pat in patterns):
        return True
    if stem.startswith("ll-") and (
        re.search(rf"[-_]{re.escape(w)}$", stem) or re.search(rf"[-_]{re.escape(w_plain)}$", stem)
    ):
        return True
    return False


def score_audio(filename: str, rest: str, word: str = "") -> int | None:
    fn = filename.strip()
    meta = (rest or "") + " " + fn
    low = meta.lower()
    key = word.lower()
    if key and not file_matches_word(fn, word):
        return None
    if any(frag in low for frag in REJECT_FRAGMENTS.get(key, ())):
        return None
    if re.search(r"\b(uk|rp|au|aus|nz|ire|ireland|england|received pronunciation|en-uk|en-gb|en-au)\b", low):
        # allow if also clearly US in filename
        if not re.search(r"en-us|genam|\ba=ga\b|\ba=us\b", low):
            return None
    score = 10
    if re.search(r"^en-us[-_]", fn, re.I) or "en-us-" in fn.lower():
        score += 50
    if re.search(r"\ba=ga\b|\ba=us\b|audio \(us\)|audio \(ga\)|general american", low):
        score += 40
    if fn.lower().startswith("ll-") or "lingua libre" in low:
        score += 5
    if fn.lower().endswith(".ogg") or fn.lower().endswith(".wav") or fn.lower().endswith(".oga"):
        score += 2
    if any(frag in low for frag in PREFERRED_FRAGMENTS.get(key, ())):
        score += 80
    return score


def wiktionary_files(word: str) -> list[str]:
    titles = [word]
    if word.lower() != word:
        titles.append(word.lower())
    if word.upper() == word and len(word) == 1:
        titles.append(word.upper())
    # this'll etc already exact
    seen: list[str] = []
    best: list[tuple[int, str]] = []
    for title in titles:
        data = api(WIKT, {"action": "parse", "page": title, "prop": "wikitext", "redirects": "1"})
        if "error" in data:
            continue
        section = english_section(data["parse"]["wikitext"]["*"])
        for m in re.finditer(r"\{\{\s*audio\s*\|\s*en\s*\|\s*([^|{}]+?)\s*(?:\|([^}]*))?}}", section, re.I):
            fn = m.group(1).strip()
            sc = score_audio(fn, m.group(2) or "", word)
            if sc is None:
                continue
            best.append((sc, fn))
        if best:
            break
    best.sort(key=lambda x: -x[0])
    out = []
    for _, fn in best:
        if fn not in out:
            out.append(fn)
    return out


def commons_guesses(word: str) -> list[str]:
    variants = [word, word.lower(), word.capitalize(), word.upper()]
    files = []
    for w in variants:
        files.append(f"En-us-{w}.ogg")
        files.append(f"En-us-{w}.wav")
        files.append(f"en-us-{w}.ogg")
        files.append(f"En-US-{w}.ogg")
        files.append(f"En-us-{w} (2).ogg")
        files.append(f"En-us-{w} (3).ogg")
        files.append(f"En-US {w} (stressed).ogg")
        files.append(f"En-US {w} (unstressed).ogg")
        files.append(f"en-US {w} (stressed).ogg")
        files.append(f"en-US {w} (unstressed).ogg")
    # unique preserve order
    seen = set()
    out = []
    for f in files:
        if f not in seen:
            seen.add(f)
            out.append(f)
    return out


def file_info(filename: str) -> dict | None:
    title = filename if filename.startswith("File:") else f"File:{filename}"
    data = api(
        COMMONS,
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|extmetadata|size|mime|user",
            "redirects": "1",
        },
    )
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        if page.get("missing") or not page.get("imageinfo"):
            return None
        info = page["imageinfo"][0]
        meta = info.get("extmetadata") or {}
        def val(key: str) -> str:
            return strip_html((meta.get(key) or {}).get("value") or "")
        url = info.get("url") or ""
        url = url.split("?")[0]
        return {
            "title": page.get("title") or title,
            "page": info.get("descriptionurl") or f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title)}",
            "url": url,
            "mime": info.get("mime") or "",
            "size": info.get("size") or 0,
            "author": val("Artist") or info.get("user") or "Unknown",
            "authorUser": info.get("user") or "",
            "license": val("LicenseShortName") or val("UsageTerms") or "Unknown license",
            "licenseUrl": (meta.get("LicenseUrl") or {}).get("value") or "",
            "credit": val("Credit"),
        }
    return None


def download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".tmp")
    with urllib.request.urlopen(req, timeout=60) as res, tmp.open("wb") as f:
        while True:
            chunk = res.read(64 * 1024)
            if not chunk:
                break
            f.write(chunk)
    tmp.replace(dest)


def to_mp3(src: Path, dest: Path) -> None:
    tmp = dest.with_suffix(".tmp.mp3")
    proc = subprocess.run(
        [
            "ffmpeg", "-hide_banner", "-loglevel", "error",
            "-i", str(src),
            "-ac", "1", "-ar", "24000",
            "-c:a", "libmp3lame", "-b:a", "64k",
            "-y", str(tmp),
        ],
        capture_output=True, text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "ffmpeg failed")
    tmp.replace(dest)


def commons_search(word: str) -> list[str]:
    files: list[str] = []
    queries = [
        f'intitle:"En-us-{word}.ogg"',
        f'intitle:"En-us-{word.lower()}.ogg"',
        f'intitle:"En-us-{word}.oga"',
        f'intitle:"En-us-{word.lower()}-"',
    ]
    for q in queries:
        try:
            data = api(COMMONS, {"action": "query", "list": "search", "srsearch": q, "srnamespace": "6", "srlimit": "8"})
        except Exception:
            continue
        for hit in data.get("query", {}).get("search", []):
            title = hit.get("title") or ""
            if title.lower().startswith("file:"):
                fn = title[5:]
                if fn not in files and score_audio(fn, title, word) is not None:
                    files.append(fn)
    return files


def main() -> None:
    words = load_words()
    print(f"words: {len(words)}", flush=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    raw_dir = ROOT / "scripts/.cache/human-raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    manifest: dict[str, dict] = {}
    missing: list[str] = []
    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text(encoding="utf-8")).get("words") or {}
        except json.JSONDecodeError:
            manifest = {}

    for i, word in enumerate(words, 1):
        key = slug(word)
        mp3 = OUT_DIR / f"{key}.mp3"
        if mp3.exists() and mp3.stat().st_size > 0 and key in manifest:
            print(f"[{i}/{len(words)}] skip {word}", flush=True)
            continue
        print(f"[{i}/{len(words)}] {word} ...", flush=True, end=" ")
        candidates = []
        try:
            candidates.extend(wiktionary_files(word))
        except Exception as exc:  # noqa: BLE001
            print(f"wikt err {exc};", flush=True, end=" ")
        for guess in commons_guesses(word):
            if guess not in candidates:
                candidates.append(guess)
        def cand_key(fn: str) -> tuple[int, int]:
            sc = score_audio(fn, "", word)
            return (0 if sc is None else -sc, 0)
        candidates = [fn for fn in dict.fromkeys(candidates) if score_audio(fn, "", word) is not None]
        candidates.sort(key=cand_key)
        chosen = None
        info = None
        for fn in candidates:
            try:
                info = file_info(fn)
            except Exception:
                info = None
            if info and info.get("url"):
                chosen = fn
                break
            time.sleep(0.04)
        if not info:
            try:
                for fn in commons_search(word):
                    if score_audio(fn, "", word) is None:
                        continue
                    try:
                        info = file_info(fn)
                    except Exception:
                        info = None
                    if info and info.get("url"):
                        chosen = fn
                        break
            except Exception as exc:  # noqa: BLE001
                print(f"search err {exc};", flush=True, end=" ")
        if not info or not chosen:
            print("NO FILE", flush=True)
            missing.append(word)
            continue
        ext = Path(urllib.parse.urlparse(info["url"]).path).suffix or ".ogg"
        raw = raw_dir / f"{key}{ext}"
        try:
            if not raw.exists() or raw.stat().st_size == 0:
                download(info["url"], raw)
            to_mp3(raw, mp3)
        except Exception as exc:  # noqa: BLE001
            print(f"DOWNLOAD FAIL {exc}", flush=True)
            missing.append(word)
            continue
        author = info["author"] or info["authorUser"]
        author_url = ""
        if info["authorUser"]:
            author_url = "https://commons.wikimedia.org/wiki/User:" + urllib.parse.quote(info["authorUser"])
        elif author:
            author_url = info["page"]
        manifest[key] = {
            "word": word,
            "file": f"{key}.mp3",
            "sourceFile": chosen,
            "page": info["page"],
            "author": author,
            "authorUrl": author_url,
            "license": info["license"],
            "licenseUrl": info["licenseUrl"],
            "credit": info["credit"],
        }
        MANIFEST.parent.mkdir(parents=True, exist_ok=True)
        MANIFEST.write_text(json.dumps({
            "generated": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "count": len(manifest),
            "missing": missing,
            "words": manifest,
        }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"OK {chosen} ({info['license']})", flush=True)
        time.sleep(0.06)

    payload = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "count": len(manifest),
        "missing": missing,
        "words": manifest,
    }
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\nDone. have={len(manifest)} missing={len(missing)}")
    if missing:
        print("Missing:", ", ".join(missing))


if __name__ == "__main__":
    main()
