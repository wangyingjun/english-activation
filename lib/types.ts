import type { SceneProgress } from "@/lib/content/scenes/types";

export type ThemeMode = "system" | "light" | "dark";
export type MeaningMode = "tap" | "always" | "off";
export type PhaseId = 1 | 2 | 3;

export type ModuleDef = {
  id: string;
  title: string;
  minutes: number;
  href: string;
  hint: string;
};

export type DayLog = {
  modules: Record<string, boolean>;
  micro?: boolean;
  compare?: boolean;
};

export type ChunkWork = {
  sentences: [string, string, string];
  said: [boolean, boolean, boolean];
};

export type StuckWord = {
  id: string;
  word: string;
  note: string;
  date: string;
};

export type ErrorEntry = {
  id: string;
  wantedZh: string;
  idiomaticEn: string;
  readCount: number;
  date: string;
};

export type ListeningProgress = {
  missed: string[];
  steps: {
    blind1?: boolean;
    blind2?: boolean;
    withText?: boolean;
    blind3?: boolean;
    blind4?: boolean;
  };
  gist?: string;
};

export type TimerState = {
  remaining: number;
  running: boolean;
  updatedAt: number;
};

export type AppState = {
  startDate: string | null;
  theme: ThemeMode;
  meaningMode: MeaningMode;
  comparePrompt: string;
  days: Record<string, DayLog>;
  chunkWork: Record<string, ChunkWork>;
  stuckWords: StuckWord[];
  errorBook: ErrorEntry[];
  microTexts: Record<string, string>;
  listening: Record<string, ListeningProgress>;
  timers: Record<string, TimerState>;
  soundQuiz: Record<string, { correct: number; total: number }>;
  contrastStats: Record<string, { correct: number; total: number }>;
  phraseMarks: Record<string, { heard?: boolean; spoken?: boolean }>;
  sceneProgress: Record<string, SceneProgress>;
};

export const STORAGE_KEY = "ea.v1";

export const DEFAULT_COMPARE_PROMPT =
  "Introduce yourself, then talk about a typical weekday: what you usually do, what you like about it, and what you wish were different.";

export const defaultState = (): AppState => ({
  startDate: null,
  theme: "system",
  meaningMode: "tap",
  comparePrompt: DEFAULT_COMPARE_PROMPT,
  days: {},
  chunkWork: {},
  stuckWords: [],
  errorBook: [],
  microTexts: {},
  listening: {},
  timers: {},
  soundQuiz: {},
  contrastStats: {},
  phraseMarks: {},
  sceneProgress: {},
});
