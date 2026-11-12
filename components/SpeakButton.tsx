"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { VOICE_DEFAULT } from "@/lib/audio";
import { clipFile } from "@/lib/audio-lookup";
import { playClip, speakMachine, stopAllAudio, ttsSupported } from "@/lib/player";

export function SpeakButton({
  text,
  rate = 1,
  voice = VOICE_DEFAULT,
  src,
  label = "朗读",
  allowMachine = false,
  className = "",
}: {
  text: string;
  rate?: number;
  voice?: string;
  src?: string;
  label?: string;
  allowMachine?: boolean;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const file = src ?? (text.trim() ? clipFile(text, voice) : undefined);
  const useMachine = !file && allowMachine;
  const canPlay = Boolean(text.trim() && (file || (useMachine && (typeof window === "undefined" || ttsSupported()))));

  async function onPlay() {
    if (!text.trim()) return;
    if (busy) {
      stopAllAudio();
      setBusy(false);
      return;
    }
    setBusy(true);
    try {
      if (file) await playClip(file, rate);
      else if (useMachine) await speakMachine(text, rate);
    } catch {
      // keep calm; autoplay or mid-stop can reject
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="speak-wrap">
      <button
        type="button"
        onClick={onPlay}
        disabled={!canPlay}
        className={`btn btn-ghost ${className}`}
        aria-pressed={busy}
      >
        <Volume2 size={16} />
        {busy ? "停止" : label}
      </button>
      {useMachine && <span className="machine-tag">机器朗读</span>}
    </span>
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
