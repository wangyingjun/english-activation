import raw from "./data.json";

export type IsolatedClip = {
  file: string;
  source: string;
  page: string;
  license: string;
  licenseUrl: string;
  author: string;
  method: "formant" | "recognizer";
  trimmed: boolean;
};

export type PhonicsSound = {
  id: string;
  dj: string;
  us: string;
  kk: string;
  nameZh: string;
  mouth: string;
  chinese: string;
  spell: string;
  words: string[];
  contrast: string | null;
  usNote: string | null;
  extra: boolean;
  isolated: IsolatedClip | null;
};

export type PhonicsRule = {
  id: string;
  pattern: string;
  sound: string;
  note: string;
  words: string[];
  exceptions: { word: string; note: string }[];
};

export type PhonicsLesson = {
  id: string;
  part: "A" | "B";
  title: string;
  titleZh: string;
  introZh: string;
  sounds?: PhonicsSound[];
  rules?: PhonicsRule[];
};

export type PhonicsWord = { ipa: string; zh: string; ex: string; exZh: string; scene?: boolean };

const data = raw as unknown as { lessons: PhonicsLesson[]; words: Record<string, PhonicsWord> };

export const PHONICS_LESSONS: PhonicsLesson[] = data.lessons;
export const PHONICS_WORDS: Record<string, PhonicsWord> = data.words;
export const PHONICS_WORD_LIST: string[] = Object.keys(data.words);

export function phonicsLesson(id: string): PhonicsLesson | undefined {
  return PHONICS_LESSONS.find((l) => l.id === id);
}

export function phonicsWord(word: string): PhonicsWord | undefined {
  return PHONICS_WORDS[word];
}

export function lessonWords(lesson: PhonicsLesson): string[] {
  const out = new Set<string>();
  for (const s of lesson.sounds ?? []) s.words.forEach((w) => out.add(w));
  for (const r of lesson.rules ?? []) {
    r.words.forEach((w) => out.add(w));
    r.exceptions.forEach((e) => out.add(e.word));
  }
  return [...out];
}

export function lessonNumber(lesson: PhonicsLesson): string {
  return `${lesson.part}${lesson.id.slice(1)}`;
}

export const PART_LABEL: Record<"A" | "B" | "C", string> = {
  A: "第一部分 · 48 个音标",
  B: "第二部分 · 字母与发音规则",
  C: "第三部分 · 练习",
};

/** Comparison rows: DJ (课本英式) → US IPA used on this site → KK. */
export const SYMBOL_TABLE = PHONICS_LESSONS.flatMap((l) =>
  (l.sounds ?? []).map((s) => ({ ...s, lessonId: l.id, example: s.words[0] })),
);

export const ALL_SOUNDS: PhonicsSound[] = SYMBOL_TABLE;

/** Phase 1 suggestion: spread the 22 lessons over days 1–28. */
export function suggestedPhonicsLesson(day: number): PhonicsLesson | null {
  if (day < 1 || day > 28) return null;
  const idx = Math.min(PHONICS_LESSONS.length - 1, Math.floor(((day - 1) * PHONICS_LESSONS.length) / 28));
  return PHONICS_LESSONS[idx];
}

export function checkSpelling(input: string, word: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ");
  return norm(input) === norm(word);
}
