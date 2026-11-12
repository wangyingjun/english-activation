"use client";

import { useEffect, useRef, useState } from "react";
import { Circle, Square, Trash2 } from "lucide-react";
import { audioSupported, deleteAudio, getAudio, pickMimeType, saveAudio } from "@/lib/audio-db";

type Status = "idle" | "recording" | "denied" | "unsupported";

export function Recorder({
  storageKey,
  maxSeconds = 180,
  label = "录音",
}: {
  storageKey: string;
  maxSeconds?: number;
  label?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [url, setUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAudio(storageKey)
      .then((rec) => {
        if (cancelled || !rec) return;
        const next = URL.createObjectURL(rec.blob);
        urlRef.current = next;
        setUrl(next);
        if (rec.duration) setSeconds(Math.round(rec.duration));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      stopStream();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [storageKey]);

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  async function start() {
    setMessage(null);
    if (!audioSupported()) {
      setStatus("unsupported");
      setMessage("这台设备或这个浏览器不支持录音。你可以用手机自带录音机，再把要点记在本子里。");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = pickMimeType();
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      mediaRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };
      recorder.onerror = () => {
        setMessage("录音时出了点问题，请再试一次。");
        setStatus("idle");
        stopStream();
      };
      recorder.onstop = async () => {
        stopStream();
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (blob.size === 0) {
          setStatus("idle");
          return;
        }
        const duration = secondsRef.current;
        try {
          await saveAudio(storageKey, blob, duration);
        } catch {
          setMessage("录音没有保存成功，但你仍可以先试听这一条。");
        }
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        const next = URL.createObjectURL(blob);
        urlRef.current = next;
        setUrl(next);
        setStatus("idle");
      };
      recorder.start();
      setSeconds(0);
      secondsRef.current = 0;
      setStatus("recording");
      timerRef.current = window.setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
        if (secondsRef.current >= maxSeconds) stop();
      }, 1000);
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setStatus("denied");
        setMessage("还没有麦克风权限。可在浏览器设置里打开，或先用手机自带录音机。");
      } else {
        setStatus("idle");
        setMessage("无法开始录音。请确认这个页面是通过 https 打开的，并且允许使用麦克风。");
      }
      stopStream();
    }
  }

  const secondsRef = useRef(0);

  function stop() {
    const rec = mediaRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
    else stopStream();
  }

  async function remove() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setUrl(null);
    setSeconds(0);
    await deleteAudio(storageKey).catch(() => undefined);
  }

  return (
    <div className="recorder">
      <div className="recorder-row">
        <p className="recorder-label">{label}</p>
        {status === "recording" ? (
          <button type="button" className="btn btn-danger" onClick={stop}>
            <Square size={14} /> 停止 {seconds}s
          </button>
        ) : (
          <button type="button" className="btn btn-accent" onClick={start}>
            <Circle size={14} fill="currentColor" /> {url ? "重录" : "开始录音"}
          </button>
        )}
      </div>
      {url && status !== "recording" && (
        <div className="recorder-play">
          <audio controls src={url} preload="metadata" />
          <button type="button" className="icon-btn" onClick={remove} aria-label="删除录音">
            <Trash2 size={16} />
          </button>
        </div>
      )}
      {message && <p className="notice">{message}</p>}
    </div>
  );
}
