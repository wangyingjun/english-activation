"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { useApp } from "@/components/AppProvider";

function format(seconds: number) {
  const s = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export function Timer({
  id,
  seconds,
  title,
}: {
  id: string;
  seconds: number;
  title?: string;
}) {
  const { state, setTimer } = useApp();
  const saved = state.timers[id];
  const remaining = saved?.remaining ?? seconds;
  const running = saved?.running ?? false;
  const remainingRef = useRef(remaining);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  useEffect(() => {
    if (!running) return;
    tickRef.current = window.setInterval(() => {
      const next = Math.max(0, remainingRef.current - 1);
      remainingRef.current = next;
      setTimer(id, { remaining: next, running: next > 0, updatedAt: Date.now() });
    }, 1000);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [running, id, setTimer]);

  useEffect(() => {
    return () => {
      setTimer(id, {
        remaining: Math.max(0, remainingRef.current),
        running: false,
        updatedAt: Date.now(),
      });
    };
  }, [id, setTimer]);

  const done = remaining <= 0;
  const progress = 1 - remaining / seconds;

  return (
    <div className={`timer-card ${done ? "done" : ""}`}>
      <div className="timer-top">
        <div>
          <p className="kicker">{title ?? "计时"}</p>
          <p className="timer-digits" aria-live="polite">
            {format(remaining)}
          </p>
        </div>
        <div className="timer-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() =>
              setTimer(id, {
                remaining: done ? seconds : remaining,
                running: !done && !running,
                updatedAt: Date.now(),
              })
            }
            aria-label={running ? "暂停" : "开始"}
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setTimer(id, { remaining: seconds, running: false, updatedAt: Date.now() })}
            aria-label="重置"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="timer-bar" aria-hidden>
        <span style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }} />
      </div>
      <p className="muted tiny">
        {done
          ? "时间到。可以勾选完成，或重置后再补一段。"
          : "可随时暂停，今天的剩余时间会记住，方便拆开练。"}
      </p>
    </div>
  );
}
