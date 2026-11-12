"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { programStatus } from "@/lib/calendar";
import {
  applyTheme,
  emptyChunkWork,
  loadState,
  mergeDay,
  newId,
  saveState,
  type BackupPayload,
} from "@/lib/storage";
import { clearAudio, exportAudio, importAudio } from "@/lib/audio-db";
import {
  defaultState,
  STORAGE_KEY,
  type AppState,
  type ChunkWork,
  type ErrorEntry,
  type ListeningProgress,
  type ThemeMode,
  type TimerState,
} from "@/lib/types";

type AppContextValue = {
  ready: boolean;
  state: AppState;
  status: ReturnType<typeof programStatus>;
  setStartDate: (iso: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setComparePrompt: (text: string) => void;
  toggleModule: (date: string, moduleId: string, value?: boolean) => void;
  toggleMicro: (date: string, value?: boolean) => void;
  toggleCompare: (date: string, value?: boolean) => void;
  setChunkWork: (id: string, work: ChunkWork) => void;
  addStuckWord: (word: string, note: string, date: string) => void;
  removeStuckWord: (id: string) => void;
  addError: (wantedZh: string, idiomaticEn: string, date: string) => ErrorEntry;
  updateError: (id: string, patch: Partial<ErrorEntry>) => void;
  removeError: (id: string) => void;
  bumpReadCount: (id: string) => void;
  setMicroText: (date: string, text: string) => void;
  setListening: (dialogueId: string, progress: ListeningProgress) => void;
  setTimer: (key: string, timer: TimerState | null) => void;
  recordQuiz: (groupId: string, correct: boolean) => void;
  exportBackup: () => Promise<BackupPayload>;
  importBackup: (payload: BackupPayload) => Promise<void>;
  resetAll: () => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => defaultState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount.
    const loaded = loadState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration
    setState(loaded);
    applyTheme(loaded.theme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveState(state);
    applyTheme(state.theme);
  }, [ready, state]);

  useEffect(() => {
    if (state.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [state.theme]);

  const update = useCallback((fn: (prev: AppState) => AppState) => {
    setState((prev) => fn(prev));
  }, []);

  const status = useMemo(() => programStatus(state.startDate), [state.startDate]);

  const setStartDate = useCallback((iso: string) => update((s) => ({ ...s, startDate: iso })), [update]);
  const setTheme = useCallback((theme: ThemeMode) => update((s) => ({ ...s, theme })), [update]);
  const setComparePrompt = useCallback((text: string) => update((s) => ({ ...s, comparePrompt: text })), [update]);
  const toggleModule = useCallback((date: string, moduleId: string, value?: boolean) =>
    update((s) => {
      const current = s.days[date]?.modules[moduleId] ?? false;
      return { ...s, days: mergeDay(s.days, date, { modules: { [moduleId]: value ?? !current } }) };
    }), [update]);
  const toggleMicro = useCallback((date: string, value?: boolean) =>
    update((s) => {
      const current = s.days[date]?.micro ?? false;
      return { ...s, days: mergeDay(s.days, date, { micro: value ?? !current }) };
    }), [update]);
  const toggleCompare = useCallback((date: string, value?: boolean) =>
    update((s) => {
      const current = s.days[date]?.compare ?? false;
      return { ...s, days: mergeDay(s.days, date, { compare: value ?? !current }) };
    }), [update]);
  const setChunkWork = useCallback((id: string, work: ChunkWork) =>
    update((s) => ({ ...s, chunkWork: { ...s.chunkWork, [id]: work } })), [update]);
  const addStuckWord = useCallback((word: string, note: string, date: string) =>
    update((s) => ({ ...s, stuckWords: [{ id: newId(), word, note, date }, ...s.stuckWords] })), [update]);
  const removeStuckWord = useCallback((id: string) =>
    update((s) => ({ ...s, stuckWords: s.stuckWords.filter((w) => w.id !== id) })), [update]);
  const addError = useCallback((wantedZh: string, idiomaticEn: string, date: string) => {
    const entry: ErrorEntry = { id: newId(), wantedZh, idiomaticEn, readCount: 0, date };
    update((s) => ({ ...s, errorBook: [entry, ...s.errorBook] }));
    return entry;
  }, [update]);
  const updateError = useCallback((id: string, patch: Partial<ErrorEntry>) =>
    update((s) => ({ ...s, errorBook: s.errorBook.map((e) => (e.id === id ? { ...e, ...patch } : e)) })), [update]);
  const removeError = useCallback((id: string) =>
    update((s) => ({ ...s, errorBook: s.errorBook.filter((e) => e.id !== id) })), [update]);
  const bumpReadCount = useCallback((id: string) =>
    update((s) => ({
      ...s,
      errorBook: s.errorBook.map((e) => (e.id === id ? { ...e, readCount: Math.min(10, e.readCount + 1) } : e)),
    })), [update]);
  const setMicroText = useCallback((date: string, text: string) =>
    update((s) => ({ ...s, microTexts: { ...s.microTexts, [date]: text } })), [update]);
  const setListening = useCallback((dialogueId: string, progress: ListeningProgress) =>
    update((s) => ({ ...s, listening: { ...s.listening, [dialogueId]: progress } })), [update]);
  const setTimer = useCallback((key: string, timer: TimerState | null) =>
    update((s) => {
      const next = { ...s.timers };
      if (!timer) delete next[key];
      else next[key] = timer;
      return { ...s, timers: next };
    }), [update]);
  const recordQuiz = useCallback((groupId: string, correct: boolean) =>
    update((s) => {
      const prev = s.soundQuiz[groupId] ?? { correct: 0, total: 0 };
      return {
        ...s,
        soundQuiz: { ...s.soundQuiz, [groupId]: { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 } },
      };
    }), [update]);
  const exportBackup = useCallback(async () => {
    const audio = await exportAudio().catch(() => []);
    return { version: 1 as const, exportedAt: new Date().toISOString(), state: loadState(), audio };
  }, []);
  const importBackup = useCallback(async (payload: BackupPayload) => {
    if (!payload?.state) throw new Error("备份文件格式不对");
    const next = { ...defaultState(), ...payload.state };
    setState(next);
    saveState(next);
    applyTheme(next.theme);
    if (payload.audio?.length) await importAudio(payload.audio);
  }, []);
  const resetAll = useCallback(async () => {
    const next = defaultState();
    setState(next);
    saveState(next);
    applyTheme(next.theme);
    window.localStorage.removeItem(STORAGE_KEY);
    await clearAudio().catch(() => undefined);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ready, state, status, setStartDate, setTheme, setComparePrompt,
      toggleModule, toggleMicro, toggleCompare, setChunkWork,
      addStuckWord, removeStuckWord, addError, updateError, removeError,
      bumpReadCount, setMicroText, setListening, setTimer, recordQuiz,
      exportBackup, importBackup, resetAll,
    }),
    [ready, state, status, setStartDate, setTheme, setComparePrompt, toggleModule,
     toggleMicro, toggleCompare, setChunkWork, addStuckWord, removeStuckWord, addError,
     updateError, removeError, bumpReadCount, setMicroText, setListening, setTimer,
     recordQuiz, exportBackup, importBackup, resetAll],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export { emptyChunkWork };
