"use client";

import { Check } from "lucide-react";

export function CheckButton({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`check-btn ${checked ? "checked" : ""}`}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="check-box">{checked ? <Check size={14} strokeWidth={3} /> : null}</span>
      {children}
    </button>
  );
}
