"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Repeat1, RotateCcw, RotateCw } from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { Recorder } from "@/components/Recorder";
import { stopAllAudio } from "@/lib/player";
import { formatTime, type LibraryItem } from "@/lib/content/library";

type Mode = "blind" | "en" | "both" | "zh";
const MODES: { id: Mode; label: string }[] = [
  { id: "blind", label: "盲听" },
  { id: "en", label: "英文" },
  { id: "both", label: "英+中" },
  { id: "zh", label: "仅中文" },
];
const RATES = [0.8, 1, 1.2];

function applyRate(el: HTMLAudioElement, rate: number) {
  el.defaultPlaybackRate = rate;
  el.playbackRate = rate;
  const anyEl = el as HTMLAudioElement & {
    preservesPitch?: boolean;
    mozPreservesPitch?: boolean;
    webkitPreservesPitch?: boolean;
  };
  if ("preservesPitch" in anyEl) anyEl.preservesPitch = true;
  if ("mozPreservesPitch" in anyEl) anyEl.mozPreservesPitch = true;
  if ("webkitPreservesPitch" in anyEl) anyEl.webkitPreservesPitch = true;
}

function indexAt(sents: LibraryItem["sents"], t: number): number {
  let lo = 0;
  let hi = sents.length - 1;
  let ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sents[mid].s <= t + 0.02) {
      ans = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return ans;
}

export function LibraryPlayer({ item }: { item: LibraryItem }) {
  const { state, setLibrary } = useApp();
  const progress = state.library?.[item.id];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(item.duration);
  const [rate, setRate] = useState(1);
  const [mode, setMode] = useState<Mode>("en");
  const [follow, setFollow] = useState(true);
  const [cur, setCur] = useState(-1);
  const [loopIdx, setLoopIdx] = useState<number | null>(null);
  const [ab, setAb] = useState<{ a?: number; b?: number }>({});
  const [shadow, setShadow] = useState(false);
  const [shadowWait, setShadowWait] = useState<number | null>(null);
  const [reveal, setReveal] = useState<Set<number>>(() => new Set());
  const [error, setError] = useState<string | null>(null);
  const counted = useRef(false);

  // live refs for the rAF loop
  const live = useRef({ loopIdx, ab, shadow, cur });
  useEffect(() => {
    live.current = { loopIdx, ab, shadow, cur };
  }, [loopIdx, ab, shadow, cur]);
  const sents = item.sents;

  const savePos = useCallback(() => {
    const el = audioRef.current;
    if (el && el.currentTime > 1)
      setLibrary(item.id, { pos: Math.round(el.currentTime) });
  }, [item.id, setLibrary]);

  const tick = useCallback(() => {
    const step = () => {
      const el = audioRef.current;
      if (!el) return;
      const t = el.currentTime;
      const { loopIdx: li, ab: range, shadow: sh, cur: c } = live.current;
      if (range.a !== undefined && range.b !== undefined && t >= range.b) {
        el.currentTime = range.a;
      } else if (li !== null && sents[li] && t >= sents[li].e) {
        el.currentTime = sents[li].s;
      } else if (sh && c >= 0 && sents[c] && t >= sents[c].e - 0.02) {
        el.pause();
        el.currentTime = Math.max(sents[c].s, sents[c].e - 0.05);
        setShadowWait(c);
      }
      const now = el.currentTime;
      setTime(now);
      const idx = indexAt(sents, now);
      if (idx !== live.current.cur) setCur(idx);
      if (idx !== live.current.cur) live.current.cur = idx;
      if (!el.paused) rafRef.current = window.requestAnimationFrame(step);
    };
    step();
  }, [sents]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => {
      setPlaying(true);
      setError(null);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(tick);
      if (!counted.current) {
        counted.current = true;
        setLibrary(item.id, {
          plays: (state.library?.[item.id]?.plays ?? 0) + 1,
        });
      }
    };
    const onPause = () => {
      setPlaying(false);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      setTime(el.currentTime);
      savePos();
    };
    const onMeta = () => {
      if (Number.isFinite(el.duration)) setDuration(el.duration);
      applyRate(el, rate);
    };
    const onSeeked = () => {
      setTime(el.currentTime);
      setCur(indexAt(sents, el.currentTime));
    };
    const onErr = () => setError("音频加载失败，请检查网络后重试");
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onPause);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("seeked", onSeeked);
    el.addEventListener("error", onErr);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onPause);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("seeked", onSeeked);
      el.removeEventListener("error", onErr);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, savePos, item.id]);

  useEffect(() => {
    const el = audioRef.current;
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (el && el.currentTime > 1)
        setLibrary(item.id, { pos: Math.round(el.currentTime) });
      el?.pause();
    };
  }, [item.id, setLibrary]);

  useEffect(() => {
    if (audioRef.current) applyRate(audioRef.current, rate);
  }, [rate]);

  // auto-scroll the current sentence into view
  useEffect(() => {
    if (!follow || cur < 0 || !listRef.current) return;
    const row = listRef.current.querySelector<HTMLElement>(
      `[data-idx="${cur}"]`,
    );
    if (!row) return;
    const r = row.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.top < 90 || r.bottom > vh - 200)
      row.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [cur, follow]);

  async function play() {
    const el = audioRef.current;
    if (!el) return;
    stopAllAudio();
    applyRate(el, rate);
    setShadowWait(null);
    try {
      await el.play();
    } catch {
      setError("浏览器没有允许播放，请再点一次播放");
    }
  }

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) void play();
    else el.pause();
  }

  function seek(t: number, autoplay = false) {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(
        t,
        (Number.isFinite(el.duration) ? el.duration : duration) - 0.05,
      ),
    );
    setTime(el.currentTime);
    setCur(indexAt(sents, el.currentTime));
    if (autoplay) void play();
  }

  function jumpTo(idx: number) {
    if (!sents[idx]) return;
    if (loopIdx !== null) setLoopIdx(idx);
    live.current.cur = idx;
    setCur(idx);
    seek(sents[idx].s + 0.001, true);
  }

  function toggleLoop() {
    if (loopIdx !== null) {
      setLoopIdx(null);
      return;
    }
    const idx = cur >= 0 ? cur : 0;
    setAb({});
    setLoopIdx(idx);
    if (audioRef.current && (time < sents[idx].s || time > sents[idx].e))
      seek(sents[idx].s);
  }

  function abClick() {
    const t = audioRef.current?.currentTime ?? time;
    if (ab.a === undefined) {
      setLoopIdx(null);
      setAb({ a: t });
    } else if (ab.b === undefined) {
      if (t <= ab.a + 0.5) {
        setAb({ a: t });
        return;
      }
      setAb({ a: ab.a, b: t });
      seek(ab.a, true);
    } else setAb({});
  }

  function toggleReveal(idx: number) {
    setReveal((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function startShadow(v: boolean) {
    setShadow(v);
    setShadowWait(null);
    if (v) {
      setLoopIdx(null);
      setAb({});
    }
  }

  const abLabel =
    ab.a === undefined ? "A-B" : ab.b === undefined ? "设 B" : "清除 A-B";
  const resumeAt =
    progress?.pos && progress.pos > 5 && time < 1 ? progress.pos : null;
  const pct = duration > 0 ? (time / duration) * 100 : 0;

  const rows = useMemo(() => sents.map((s, i) => ({ ...s, i })), [sents]);

  return (
    <div className="lib-player">
      <audio
        ref={audioRef}
        src={item.audio}
        preload="metadata"
        playsInline
        data-lib-audio="true"
      />

      <section className="card lib-settings">
        <div className="lib-modes" role="radiogroup" aria-label="显示模式">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              className={`chip ${mode === m.id ? "on" : ""}`}
              onClick={() => {
                setMode(m.id);
                setReveal(new Set());
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="lib-toggles">
          <label className="lib-switch">
            <input
              type="checkbox"
              checked={follow}
              onChange={(e) => setFollow(e.target.checked)}
            />{" "}
            自动跟随
          </label>
          <label className="lib-switch">
            <input
              type="checkbox"
              checked={shadow}
              onChange={(e) => startShadow(e.target.checked)}
            />{" "}
            逐句跟读（每句停下来录音）
          </label>
        </div>
        {resumeAt && (
          <button
            type="button"
            className="btn btn-ghost tiny"
            onClick={() => seek(resumeAt, true)}
          >
            从上次的 {formatTime(resumeAt)} 继续
          </button>
        )}
      </section>

      <ol className={`lib-sents mode-${mode}`} ref={listRef}>
        {rows.map((s) => {
          const on = s.i === cur;
          const shown = reveal.has(s.i);
          const showEn =
            mode === "en" ||
            mode === "both" ||
            (mode === "blind" && shown) ||
            (mode === "zh" && shown);
          const showZh =
            mode === "both" ||
            mode === "zh" ||
            (mode === "en" && shown) ||
            (mode === "blind" && shown);
          const toggleLabel =
            mode === "en"
              ? shown
                ? "收起译文"
                : "译"
              : mode === "zh"
                ? shown
                  ? "收起原文"
                  : "原文"
                : mode === "blind"
                  ? shown
                    ? "隐藏"
                    : "看文本"
                  : null;
          return (
            <li
              key={s.i}
              data-idx={s.i}
              className={`lib-sent ${on ? "on" : ""} ${loopIdx === s.i ? "looping" : ""}`}
            >
              <button
                type="button"
                className="lib-sent-main"
                onClick={() => jumpTo(s.i)}
                aria-label={`跳到第 ${s.i + 1} 句 ${formatTime(s.s)}`}
              >
                <span className="lib-time">{formatTime(s.s)}</span>
                <span className="lib-text">
                  {s.spk && showEn && <span className="lib-spk">{s.spk}</span>}
                  {showEn && <span className="en lib-en">{s.en}</span>}
                  {showZh && <span className="lib-zh">{s.zh}</span>}
                  {!showEn && !showZh && (
                    <span className="lib-hidden">
                      第 {s.i + 1} 句 · 先听，听不懂再看
                    </span>
                  )}
                </span>
              </button>
              {toggleLabel && (
                <button
                  type="button"
                  className="lib-reveal"
                  onClick={() => toggleReveal(s.i)}
                  aria-pressed={shown}
                >
                  {toggleLabel}
                </button>
              )}
              {shadow && shadowWait === s.i && (
                <div className="lib-shadow">
                  <p className="muted tiny">
                    跟着这句说一遍，录下来和原声比一比。
                  </p>
                  <Recorder
                    storageKey={`library:${item.id}:${s.i}`}
                    maxSeconds={30}
                    label="录我的跟读"
                  />
                  <div className="btn-row">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => jumpTo(s.i)}
                    >
                      重听本句
                    </button>
                    {s.i + 1 < sents.length ? (
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={() => jumpTo(s.i + 1)}
                      >
                        下一句
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-accent"
                        onClick={() => setLibrary(item.id, { shadowed: true })}
                      >
                        全部跟读完，标记会跟读
                      </button>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="lib-bar" role="region" aria-label="播放控制">
        {error && <p className="lib-error tiny">{error}</p>}
        <div className="lib-progress">
          <span className="tiny lib-clock">{formatTime(time)}</span>
          <input
            type="range"
            min={0}
            max={Math.max(1, duration)}
            step={0.1}
            value={Math.min(time, duration)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="播放进度"
            style={{ ["--pct" as string]: `${pct}%` }}
          />
          <span className="tiny lib-clock">{formatTime(duration)}</span>
        </div>
        <div className="lib-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={() => seek(time - 5)}
            aria-label="后退 5 秒"
          >
            <RotateCcw size={18} />
            <small>5</small>
          </button>
          <button
            type="button"
            className="icon-btn lib-play"
            onClick={toggle}
            aria-label={playing ? "暂停" : "播放"}
          >
            {playing ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => seek(time + 5)}
            aria-label="前进 5 秒"
          >
            <RotateCw size={18} />
            <small>5</small>
          </button>
          <div className="lib-rates" role="radiogroup" aria-label="播放速度">
            {RATES.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={rate === r}
                className={rate === r ? "on" : ""}
                onClick={() => setRate(r)}
              >
                {r === 1 ? "1.0" : r}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`icon-btn ${loopIdx !== null ? "on" : ""}`}
            onClick={toggleLoop}
            aria-pressed={loopIdx !== null}
            aria-label="单句循环"
          >
            <Repeat1 size={18} />
          </button>
          <button
            type="button"
            className={`ab-btn ${ab.a !== undefined ? "on" : ""}`}
            onClick={abClick}
            aria-label="A-B 循环"
          >
            {abLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
