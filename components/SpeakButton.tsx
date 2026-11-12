"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speak, stopSpeaking, ttsSupported } from "@/lib/tts";

export function SpeakButton({
  text,
  rate = 1,
  label = "朗读",
  className = "",
}: {
  text: string;
  rate?: number;
  label?: string;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const supported = typeof window !== "undefined" ? ttsSupported() : true;

  async function onPlay() {
    if (!text.trim()) return;
    if (busy) {
      stopSpeaking();
      setBusy(false);
      return;
    }
    setBusy(true);
    try {
      await speak(text, { rate });
    } catch {
      // keep calm; some browsers reject speak without a gesture or mid-cancel
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={!supported || !text.trim()}
      className={`btn btn-ghost ${className}`}
      aria-pressed={busy}
    >
      <Volume2 size={16} />
      {busy ? "停止" : label}
    </button>
  );
}

export function SpeedToggle({
  rate,
  onChange,
}: {
  rate: number;
  onChange: (rate: number) => void;
}) {
  return (
    <div className="seg" role="group" aria-label="朗读速度">
      <button type="button" className={rate === 0.8 ? "on" : ""} onClick={() => onChange(0.8)}>
        0.8×
      </button>
      <button type="button" className={rate === 1 ? "on" : ""} onClick={() => onChange(1)}>
        1.0×
      </button>
    </div>
  );
}
