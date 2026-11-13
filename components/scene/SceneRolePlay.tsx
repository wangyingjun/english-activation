"use client";

import { useEffect, useRef, useState } from "react";
import { voiceForSpeaker } from "@/lib/audio";
import { audioSupported, getAudio, pickMimeType, saveAudio } from "@/lib/audio-db";
import { clipFile } from "@/lib/audio-lookup";
import { playClip, playSequence, stopAllAudio } from "@/lib/player";
import type { Scene } from "@/lib/content/scenes";

type Status = "idle" | "playing" | "countdown" | "recording" | "done";

export function SceneRolePlay({
  scene,
  role,
  onRoleChange,
  countdownSec,
  rate,
  onComplete,
}: {
  scene: Scene;
  role: "a" | "b";
  onRoleChange: (role: "a" | "b") => void;
  countdownSec: number;
  rate: number;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [count, setCount] = useState(countdownSec);
  const [message, setMessage] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [urls, setUrls] = useState<Record<number, string>>({});
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const startedAt = useRef(0);
  const urlsRef = useRef(urls);
  urlsRef.current = urls;

  const line = scene.lines[index];
  const isUser = line ? line.role === role : false;
  const recKey = (i: number) => `scene:${scene.id}:rp:${role}:turn:${i}`;

  useEffect(() => {
    let cancelled = false;
    const next: Record<number, string> = {};
    Promise.all(
      scene.lines.map(async (l, i) => {
        if (l.role !== role) return;
        const rec = await getAudio(recKey(i)).catch(() => undefined);
        if (rec && !cancelled) next[i] = URL.createObjectURL(rec.blob);
      }),
    ).then(() => {
      if (!cancelled) setUrls(next);
    });
    return () => {
      cancelled = true;
      stopStream();
      stopAllAudio();
      Object.values(urlsRef.current).forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id, role]);

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRef.current && mediaRef.current.state !== "inactive") {
      try { mediaRef.current.stop(); } catch { /* ignore */ }
    }
    mediaRef.current = null;
  }

  function recKeySafe(i: number) {
    return `scene:${scene.id}:rp:${role}:turn:${i}`;
  }

  async function playPartner(i: number) {
    const l = scene.lines[i];
    const src = clipFile(l.text, voiceForSpeaker(l.speaker));
    if (!src) return;
    try { await playClip(src, rate); } catch { /* keep going */ }
  }

  async function startRecording() {
    setMessage(null);
    if (!audioSupported()) {
      setMessage("这台设备不支持录音。你可以先把这句说出来，再点「下一句」。");
      setStatus("idle");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = pickMimeType();
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      recorder.onerror = () => {
        setMessage("录音时出了点问题，请再试一次。");
        setStatus("idle");
        stopStream();
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        if (blob.size > 0) {
          const duration = (Date.now() - startedAt.current) / 1000;
          try { await saveAudio(recKeySafe(index), blob, duration); } catch { /* still playable */ }
          setUrls((prev) => {
            if (prev[index]) URL.revokeObjectURL(prev[index]);
            return { ...prev, [index]: URL.createObjectURL(blob) };
          });
        }
        setStatus("idle");
      };
      recorder.start();
      startedAt.current = Date.now();
      setStatus("recording");
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setMessage("还没有麦克风权限。可在浏览器设置里打开，或先跳过录音继续往下说。");
      } else {
        setMessage("无法开始录音。你可以先把这句说出来，再点「下一句」。");
      }
      stopStream();
      setStatus("idle");
    }
  }

  function stopRecording() {
    const rec = mediaRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
    else {
      stopStream();
      setStatus("idle");
    }
  }

  async function beginTurn() {
    stopAllAudio();
    setHint(false);
    if (!line) return;
    if (!isUser) {
      setStatus("playing");
      await playPartner(index);
      setStatus("idle");
      return;
    }
    setCount(countdownSec);
    setStatus("countdown");
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    let left = countdownSec;
    const tick = () => {
      left -= 1;
      if (left <= 0) {
        timerRef.current = null;
        void startRecording();
        return;
      }
      setCount(left);
      timerRef.current = window.setTimeout(tick, 1000);
    };
    timerRef.current = window.setTimeout(tick, 1000);
  }

  function nextLine() {
    if (status === "recording") stopRecording();
    stopAllAudio();
    setHint(false);
    if (index + 1 >= scene.lines.length) {
      setStatus("done");
      onComplete?.();
      return;
    }
    setIndex((i) => i + 1);
    setStatus("idle");
  }

  async function playbackAll() {
    stopAllAudio();
    const steps: { src: string; rate?: number; gapMs?: number }[] = [];
    for (let i = 0; i < scene.lines.length; i++) {
      const l = scene.lines[i];
      if (l.role === role) {
        if (urls[i]) steps.push({ src: urls[i], rate: 1, gapMs: 250 });
      } else {
        const src = clipFile(l.text, voiceForSpeaker(l.speaker));
        if (src) steps.push({ src, rate, gapMs: 250 });
      }
    }
    if (steps.length === 0) {
      setMessage("还没有可以回放的句子。先走完一轮角色扮演。");
      return;
    }
    try { await playSequence(steps); } catch { /* ignore */ }
  }

  function swap() {
    stopRecording();
    stopAllAudio();
    setIndex(0);
    setStatus("idle");
    setHint(false);
    setMessage(null);
    onRoleChange(role === "a" ? "b" : "a");
  }

  if (status === "done") {
    return (
      <div>
        <p className="lead">这一轮演完了。可以回放整段，也可以换角色再来一次。</p>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <button type="button" className="btn btn-primary" onClick={() => void playbackAll()}>整段回放</button>
          <button type="button" className="btn btn-accent" onClick={() => { setIndex(0); setStatus("idle"); }}>再演一轮</button>
          <button type="button" className="btn" onClick={swap}>换角色</button>
        </div>
        {message && <p className="notice" style={{ marginTop: 8 }}>{message}</p>}
      </div>
    );
  }

  if (!line) return null;
  const you = scene.roles.find((r) => r.id === role);
  const other = scene.roles.find((r) => r.id !== role);

  return (
    <div>
      <p className="muted tiny">你现在演的是 {you?.nameZh}。对方是 {other?.nameZh}。轮到对方时听原声，轮到你时先倒计时，再开口。</p>
      <div className="btn-row" style={{ marginTop: 8 }}>
        <button type="button" className="btn" onClick={swap}>换成演 {other?.nameZh}</button>
      </div>
      <div className="scene-turn" style={{ marginTop: 12 }}>
        <p className="kicker">第 {index + 1} / {scene.lines.length} 句 · {isUser ? "轮到你说" : `${line.speaker} 在说`}</p>
        {isUser ? (
          <>
            <p className="en">{line.text}</p>
            {hint ? <MeaningInline zh={line.zh} /> : (
              <button type="button" className="btn" style={{ marginTop: 6 }} onClick={() => setHint(true)}>需要提示</button>
            )}
          </>
        ) : (
          <p className="muted">先听对方这一句。听完后再进到你的回合。</p>
        )}
      </div>
      {status === "countdown" && (
        <p className="scene-count" aria-live="polite">{count}</p>
      )}
      {status === "recording" && <p className="notice">正在录音…说完后点「说完了」。</p>}
      <div className="btn-row" style={{ marginTop: 10 }}>
        {status === "idle" && (
          <button type="button" className="btn btn-primary" onClick={() => void beginTurn()}>
            {isUser ? "开始我的回合" : "听对方这一句"}
          </button>
        )}
        {status === "recording" && (
          <button type="button" className="btn btn-danger" onClick={stopRecording}>说完了</button>
        )}
        {status !== "countdown" && status !== "playing" && (
          <button type="button" className="btn" onClick={nextLine}>
            {index + 1 >= scene.lines.length ? "结束这一轮" : "下一句"}
          </button>
        )}
        {urls[index] && status !== "recording" && (
          <audio controls src={urls[index]} preload="metadata" style={{ maxWidth: "100%" }} />
        )}
      </div>
      {message && <p className="notice" style={{ marginTop: 8 }}>{message}</p>}
    </div>
  );
}

function MeaningInline({ zh }: { zh: string }) {
  return <p className="muted tiny" style={{ marginTop: 6 }}>提示：{zh}</p>;
}
