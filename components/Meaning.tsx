"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export function Meaning({
  zh,
  pos,
  ipa,
  locked = false,
  compact = false,
}: {
  zh?: string;
  pos?: string;
  ipa?: string;
  locked?: boolean;
  compact?: boolean;
}) {
  const { state } = useApp();
  const mode = state.meaningMode ?? "tap";
  const [open, setOpen] = useState(false);
  if (!zh || mode === "off" || locked) return null;
  const body = (
    <p className={`meaning-body ${compact ? "compact" : ""}`}>
      {pos ? <span className="pos">{pos}</span> : null}
      {ipa ? <span className="ipa">/{ipa}/</span> : null}
      <span>{zh}</span>
    </p>
  );
  if (mode === "always") return body;
  return (
    <div className="meaning">
      <button
        type="button"
        className={`meaning-btn ${open ? "on" : ""}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        意思
      </button>
      {open ? body : null}
    </div>
  );
}

const OPTIONS = [
  { id: "tap", label: "点击显示" },
  { id: "always", label: "始终显示" },
  { id: "off", label: "关闭" },
] as const;

export function MeaningModeToggle() {
  const { state, setMeaningMode } = useApp();
  const mode = state.meaningMode ?? "tap";
  return (
    <div>
      <p className="muted tiny" style={{ marginBottom: 6 }}>
        中文释义
      </p>
      <div className="seg" role="group" aria-label="中文释义">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={mode === o.id ? "on" : ""}
            onClick={() => setMeaningMode(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function MeaningHelp() {
  return (
    <div className="notice">
      <p>
        <strong>不懂意思时：</strong>先听 2 遍猜 → 看中文 → 再听一遍把声音和意思对上 → 跟读
      </p>
      <p className="tiny" style={{ marginTop: 6 }}>
        不要把中文当单词表来背。先把声音听进耳朵里，再对上意思，最后跟读。这和铁律第一条是一件事：词要在句子和音频里学。
      </p>
    </div>
  );
}
