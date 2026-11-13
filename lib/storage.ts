"use client";

import {
  defaultState,
  STORAGE_KEY,
  type AppState,
  type ChunkWork,
  type DayLog,
  type ErrorEntry,
  type ListeningProgress,
  type StuckWord,
  type MeaningMode,
  type ThemeMode,
  type TimerState,
} from "@/lib/types";

function safeParse(raw: string | null): AppState {
  const base = defaultState();
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const meaningMode: MeaningMode =
      parsed.meaningMode === "always" || parsed.meaningMode === "off" || parsed.meaningMode === "tap"
        ? parsed.meaningMode
        : "tap";
    return {
      ...base,
      ...parsed,
      meaningMode,
      days: parsed.days ?? {},
      chunkWork: parsed.chunkWork ?? {},
      stuckWords: parsed.stuckWords ?? [],
      errorBook: parsed.errorBook ?? [],
      microTexts: parsed.microTexts ?? {},
      listening: parsed.listening ?? {},
      timers: parsed.timers ?? {},
      soundQuiz: parsed.soundQuiz ?? {},
      contrastStats: parsed.contrastStats ?? {},
      phraseMarks: parsed.phraseMarks ?? {},
    };
  } catch {
    return base;
  }
}

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState();
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function emptyChunkWork(): ChunkWork {
  return { sentences: ["", "", ""], said: [false, false, false] };
}

export function mergeDay(days: Record<string, DayLog>, date: string, patch: Partial<DayLog>): Record<string, DayLog> {
  const prev = days[date] ?? { modules: {} };
  return {
    ...days,
    [date]: {
      modules: { ...prev.modules, ...(patch.modules ?? {}) },
      micro: patch.micro ?? prev.micro,
      compare: patch.compare ?? prev.compare,
    },
  };
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const dark =
    theme === "dark" ||
    (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export type BackupPayload = {
  version: 1;
  exportedAt: string;
  state: AppState;
  audio?: { key: string; mimeType: string; dataUrl: string; createdAt: number; duration?: number }[];
};

export type { AppState, ChunkWork, DayLog, ErrorEntry, ListeningProgress, StuckWord, ThemeMode, TimerState };
