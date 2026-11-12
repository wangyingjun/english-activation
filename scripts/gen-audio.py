#!/usr/bin/env python3
"""Pre-generate neural MP3 clips with edge-tts (Microsoft neural voices).

Usage (from the repo root, after creating .venv-audio and installing edge-tts):

    npx --yes tsx scripts/dump-utterances.ts
    .venv-audio/bin/python scripts/gen-audio.py

Re-run is incremental: existing hashed files are skipped unless --force is set.
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UTTERANCES = ROOT / "scripts/.cache/utterances.json"
AUDIO_DIR = ROOT / "public/audio"
MANIFEST = ROOT / "lib/generated/audio-manifest.json"
SILENCE = AUDIO_DIR / "_silence.mp3"

CONCURRENCY = 6
RETRIES = 8


def clip_id(text: str, voice: str) -> str:
    return hashlib.sha1(f"{voice}\n{text}".encode("utf-8")).hexdigest()[:20]


def run_ffmpeg(args: list[str]) -> None:
    proc = subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", *args],
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "ffmpeg failed")


def ensure_silence() -> None:
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    if SILENCE.exists():
        return
    run_ffmpeg(
        [
            "-f",
            "lavfi",
            "-i",
            "anullsrc=r=24000:cl=mono",
            "-t",
            "0.35",
            "-c:a",
            "libmp3lame",
            "-b:a",
            "48k",
            "-ac",
            "1",
            "-ar",
            "24000",
            "-y",
            str(SILENCE),
        ]
    )


async def synth_one(text: str, voice: str, dest: Path, force: bool) -> None:
    if dest.exists() and dest.stat().st_size > 0 and not force:
        return
    import edge_tts

    tmp = dest.with_suffix(".tmp.mp3")
    last_err: Exception | None = None
    for attempt in range(1, RETRIES + 1):
        try:
            communicate = edge_tts.Communicate(text, voice, rate="+0%")
            await communicate.save(str(tmp))
            if not tmp.exists() or tmp.stat().st_size < 200:
                raise RuntimeError("empty audio")
            tmp.replace(dest)
            return
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            if tmp.exists():
                tmp.unlink()
            await asyncio.sleep(1.5 * attempt)
    raise RuntimeError(f"failed {voice!r} {text!r}: {last_err}")


async def synth_all(utterances: list[dict], force: bool) -> dict[str, dict]:
    sem = asyncio.Semaphore(CONCURRENCY)
    clips: dict[str, dict] = {}
    failed: list[dict] = []
    done = 0
    total = len(utterances)

    async def worker(item: dict) -> None:
        nonlocal done
        text = item["text"]
        voice = item["voice"]
        key = clip_id(text, voice)
        dest = AUDIO_DIR / f"{key}.mp3"
        try:
            async with sem:
                await synth_one(text, voice, dest, force)
        except Exception as exc:  # noqa: BLE001
            print(f"  retry-later: {text!r} ({exc})", flush=True)
            failed.append(item)
            return
        clips[key] = {
            "text": text,
            "voice": voice,
            "kind": item.get("kind", ""),
            "file": f"/audio/{key}.mp3",
        }
        done += 1
        if done % 25 == 0 or done == total:
            print(f"  clips {done}/{total}", flush=True)

    await asyncio.gather(*(worker(u) for u in utterances))
    if failed:
        print(f"Retrying {len(failed)} failed clips with lower concurrency…", flush=True)
        await asyncio.sleep(3)
        still: list[dict] = []
        sem_slow = asyncio.Semaphore(2)

        async def retry(item: dict) -> None:
            nonlocal done
            text = item["text"]
            voice = item["voice"]
            key = clip_id(text, voice)
            dest = AUDIO_DIR / f"{key}.mp3"
            try:
                async with sem_slow:
                    await synth_one(text, voice, dest, force=True)
            except Exception as exc:  # noqa: BLE001
                still.append(item)
                print(f"  still failed: {text!r} ({exc})", flush=True)
                return
            clips[key] = {
                "text": text,
                "voice": voice,
                "kind": item.get("kind", ""),
                "file": f"/audio/{key}.mp3",
            }
            done += 1
            print(f"  recovered {text!r}", flush=True)

        await asyncio.gather(*(retry(u) for u in failed))
        if still:
            raise RuntimeError(f"{len(still)} clips failed after retries: {[s['text'] for s in still]}")
    return clips


def concat_dialogue(dialogue: dict, force: bool) -> str:
    out = AUDIO_DIR / f"dlg-{dialogue['id']}.mp3"
    if out.exists() and out.stat().st_size > 0 and not force:
        return f"/audio/{out.name}"
    inputs: list[Path] = []
    for i, line in enumerate(dialogue["lines"]):
        key = clip_id(line["text"], line["voice"])
        src = AUDIO_DIR / f"{key}.mp3"
        if not src.exists():
            raise FileNotFoundError(f"missing line clip {src}")
        inputs.append(src)
        if i < len(dialogue["lines"]) - 1:
            inputs.append(SILENCE)
    cmd: list[str] = []
    for path in inputs:
        cmd.extend(["-i", str(path)])
    n = len(inputs)
    stream_refs = "".join(f"[{i}:a]" for i in range(n))
    cmd.extend(
        [
            "-filter_complex",
            f"{stream_refs}concat=n={n}:v=0:a=1[out]",
            "-map",
            "[out]",
            "-c:a",
            "libmp3lame",
            "-b:a",
            "48k",
            "-ac",
            "1",
            "-ar",
            "24000",
            "-y",
            str(out),
        ]
    )
    run_ffmpeg(cmd)
    return f"/audio/{out.name}"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--input", type=Path, default=UTTERANCES)
    args = parser.parse_args()
    if not args.input.exists():
        print(f"Missing {args.input}. Run: npx --yes tsx scripts/dump-utterances.ts", file=sys.stderr)
        return 1

    data = json.loads(args.input.read_text())
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    ensure_silence()

    print(f"Generating {len(data['utterances'])} unique clips with edge-tts…", flush=True)
    clips = asyncio.run(synth_all(data["utterances"], args.force))

    dialogues = {}
    print(f"Concatenating {len(data['dialogues'])} full dialogues…", flush=True)
    for d in data["dialogues"]:
        dialogues[d["id"]] = {"full": concat_dialogue(d, args.force)}

    manifest = {
        "engine": "edge-tts",
        "voices": data.get("voices", {}),
        "clips": clips,
        "dialogues": dialogues,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
    size = sum(p.stat().st_size for p in AUDIO_DIR.glob("*.mp3") if p.name != "_silence.mp3")
    count = len(list(AUDIO_DIR.glob("*.mp3")))
    print(f"Wrote {MANIFEST}")
    print(f"Audio files: {count}  total={size/1024/1024:.2f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
