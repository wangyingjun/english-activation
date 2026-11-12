"use client";

import { useApp } from "@/components/AppProvider";
import type { ThemeMode } from "@/lib/types";

const OPTIONS: { id: ThemeMode; label: string }[] = [
  { id: "system", label: "跟随系统" },
  { id: "light", label: "浅色" },
  { id: "dark", label: "深色" },
];

export function ThemeToggle() {
  const { state, setTheme } = useApp();
  return (
    <div className="seg" role="group" aria-label="外观">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          className={state.theme === o.id ? "on" : ""}
          onClick={() => setTheme(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
