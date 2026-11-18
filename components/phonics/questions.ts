import {
  PHONICS_LESSONS,
  PHONICS_WORDS,
  phonicsLesson,
  type PhonicsLesson,
  type PhonicsSound,
} from "@/lib/content/phonics";

export type Question =
  | { kind: "sound"; key: string; word: string; answer: string; options: string[]; soundId: string }
  | { kind: "ipa"; key: string; word: string; answer: string; options: string[] }
  | { kind: "spell"; key: string; word: string }
  | { kind: "read"; key: string; word: string };

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function soundQuestion(lesson: PhonicsLesson, sound?: PhonicsSound): Question {
  const sounds = lesson.sounds ?? [];
  const target = sound ?? pick(sounds);
  const others = shuffle(sounds.filter((s) => s.us !== target.us).map((s) => s.us)).slice(0, 3);
  return {
    kind: "sound",
    key: `sound:${target.id}`,
    soundId: target.id,
    word: pick(target.words),
    answer: target.us,
    options: shuffle([target.us, ...others]),
  };
}

export function ipaQuestion(word: string, pool: string[]): Question {
  const answer = PHONICS_WORDS[word].ipa;
  const others = shuffle(pool.filter((w) => w !== word && PHONICS_WORDS[w]?.ipa !== answer))
    .map((w) => PHONICS_WORDS[w].ipa)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 3);
  return { kind: "ipa", key: `ipa:${word}`, word, answer, options: shuffle([answer, ...others]) };
}

export function lessonQuiz(lesson: PhonicsLesson, n = 8): Question[] {
  if (lesson.part === "A") {
    const sounds = lesson.sounds ?? [];
    const order = shuffle([...sounds, ...shuffle(sounds)]).slice(0, Math.max(n, sounds.length));
    return order.slice(0, n).map((s) => soundQuestion(lesson, s));
  }
  const pool = (lesson.rules ?? []).flatMap((r) => r.words);
  return shuffle(pool).slice(0, n).map((w) => ipaQuestion(w, pool));
}

export function questionForKey(key: string, mode?: "spell" | "ipa" | "read"): Question | null {
  const [kind, rest] = [key.slice(0, key.indexOf(":")), key.slice(key.indexOf(":") + 1)];
  if (kind === "sound") {
    const lessonId = rest.split("-")[0];
    const lesson = phonicsLesson(lessonId);
    const sound = lesson?.sounds?.find((s) => s.id === rest);
    return lesson && sound ? soundQuestion(lesson, sound) : null;
  }
  if (!PHONICS_WORDS[rest]) return null;
  const k = mode ?? kind;
  if (k === "spell") return { kind: "spell", key: `spell:${rest}`, word: rest };
  if (k === "read") return { kind: "read", key: `read:${rest}`, word: rest };
  return ipaQuestion(rest, Object.keys(PHONICS_WORDS));
}

export function wordsInScope(scope: string): string[] {
  if (scope === "all") return Object.keys(PHONICS_WORDS);
  if (scope === "scene") return Object.keys(PHONICS_WORDS).filter((w) => PHONICS_WORDS[w].scene);
  const lesson = PHONICS_LESSONS.find((l) => l.id === scope);
  if (!lesson) return Object.keys(PHONICS_WORDS);
  const set = new Set<string>();
  for (const s of lesson.sounds ?? []) s.words.forEach((w) => set.add(w));
  for (const r of lesson.rules ?? []) {
    r.words.forEach((w) => set.add(w));
    r.exceptions.forEach((e) => set.add(e.word));
  }
  return [...set];
}
