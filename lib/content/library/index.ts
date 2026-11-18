import data from "./data.json";

export type LibraryLevel = "入门" | "初级" | "中级";

export type LibrarySentence = {
  s: number;
  e: number;
  en: string;
  zh: string;
  spk?: string;
};

export type LibraryKeyword = { w: string; zh: string };

export type LibraryItem = {
  id: string;
  title: string;
  titleZh: string;
  level: LibraryLevel;
  topic: string;
  series: string;
  summaryZh: string;
  source: string;
  license: string;
  url: string;
  date: string;
  credit: string;
  duration: number;
  audio: string;
  bytes: number;
  keywords: LibraryKeyword[];
  sents: LibrarySentence[];
};

export const LIBRARY_ITEMS: LibraryItem[] = (data as { items: LibraryItem[] }).items;
export const LIBRARY_LEVELS: LibraryLevel[] = ["入门", "初级", "中级"];
export const LIBRARY_TOPICS: string[] = Array.from(new Set(LIBRARY_ITEMS.map((i) => i.topic)));

export const LEVEL_HINT: Record<LibraryLevel, string> = {
  入门: "短对话，1–4 分钟，慢速清晰。适合精听：一句一句听懂、跟读。",
  初级: "4–5 分钟的情景剧和老师答疑，语速仍偏慢。可以精听，也可以泛听。",
  中级: "4–6 分钟的语法、学习方法、习语和科普短文。适合泛听和挑段精听。",
};

export function libraryItem(id: string): LibraryItem | undefined {
  return LIBRARY_ITEMS.find((i) => i.id === id);
}

export function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Phase 1 → 入门 items for 精听; Phase 2+ → 初级/中级 items for 泛听. Rotates by day, skipping finished ones. */
export function suggestedLibraryItems(
  phase: number,
  day: number,
  progress: Record<string, { heard?: boolean; shadowed?: boolean }>,
  count = 2,
): { mode: "精听" | "泛听"; items: LibraryItem[] } {
  const mode = phase <= 1 ? "精听" : "泛听";
  const pool = LIBRARY_ITEMS.filter((i) => (phase <= 1 ? i.level === "入门" : i.level !== "入门"));
  const fresh = pool.filter((i) => !(phase <= 1 ? progress[i.id]?.shadowed : progress[i.id]?.heard));
  const list = fresh.length ? fresh : pool;
  const start = Math.max(0, day - 1) % list.length;
  const items: LibraryItem[] = [];
  for (let k = 0; k < Math.min(count, list.length); k++) items.push(list[(start + k) % list.length]);
  return { mode, items };
}
