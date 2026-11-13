import { VOICE_DEFAULT } from "@/lib/audio";
import { clipFile } from "@/lib/audio-lookup";
import manifest from "@/lib/generated/human-audio.json";

export type HumanClip = {
  word: string;
  file: string;
  sourceFile: string;
  page: string;
  author: string;
  authorUrl: string;
  license: string;
  licenseUrl: string;
  credit?: string;
};

type Manifest = {
  generated?: string;
  count?: number;
  missing?: string[];
  words?: Record<string, HumanClip>;
};

const data = manifest as Manifest;
export const HUMAN_CLIPS: Record<string, HumanClip> = data.words ?? {};

export function wordSlug(word: string): string {
  return word
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function humanEntry(word: string): HumanClip | undefined {
  return HUMAN_CLIPS[wordSlug(word)];
}

export function humanSrc(word: string): string | undefined {
  const rec = humanEntry(word);
  return rec ? `/audio/human/${rec.file}` : undefined;
}

export function wordSrc(word: string): string | undefined {
  return humanSrc(word) ?? clipFile(word, VOICE_DEFAULT);
}

export function pairSources(left: string, right: string): { left?: string; right?: string; human: boolean } {
  const hl = humanSrc(left);
  const hr = humanSrc(right);
  if (hl && hr) return { left: hl, right: hr, human: true };
  return { left: clipFile(left, VOICE_DEFAULT), right: clipFile(right, VOICE_DEFAULT), human: false };
}

export function carrierText(word: string): string {
  return `Say ${word} again.`;
}

export function cambridgeSlug(word: string): string {
  return word.trim().toLowerCase().replace(/['’]/g, "").replace(/\s+/g, "-");
}

/**
 * Verified live (HTTP 200, heading is this exact word, page has audio).
 * Do not add a URL unless it was opened and checked.
 */
export const DICTIONARY_LINKS: Record<string, string> = {
  ban: "https://dictionary.cambridge.org/dictionary/english/ban",
  barn: "https://dictionary.cambridge.org/dictionary/english/barn",
  bun: "https://dictionary.cambridge.org/dictionary/english/bun",
  cheap: "https://dictionary.cambridge.org/dictionary/english/cheap",
  dunno: "https://dictionary.cambridge.org/dictionary/english/dunno",
  frill: "https://dictionary.cambridge.org/dictionary/english/frill",
  kook: "https://dictionary.cambridge.org/dictionary/english/kook",
  laze: "https://dictionary.cambridge.org/dictionary/english/laze",
  pack: "https://dictionary.cambridge.org/dictionary/english/pack",
  sip: "https://dictionary.cambridge.org/dictionary/english/sip",
  sooth: "https://dictionary.cambridge.org/dictionary/english/sooth",
  sorta: "https://dictionary.cambridge.org/dictionary/english/sorta",
  tam: "https://dictionary.cambridge.org/dictionary/english/tam",
  to: "https://dictionary.cambridge.org/dictionary/english/to",
  vet: "https://dictionary.cambridge.org/dictionary/english/vet",
  wary: "https://dictionary.cambridge.org/dictionary/english/wary",
  wood: "https://dictionary.cambridge.org/dictionary/english/wood",
  yeast: "https://dictionary.cambridge.org/dictionary/english/yeast",
  luke: "https://www.oxfordlearnersdictionaries.com/definition/english/luke",
  pairs: "https://www.dictionary.com/browse/pairs",
  "this'll": "https://www.dictionary.com/browse/thisll",
  thisll: "https://www.dictionary.com/browse/thisll",
};

export function dictionaryUrl(word: string): string | undefined {
  const keys = [word, word.toLowerCase(), wordSlug(word), cambridgeSlug(word)];
  for (const k of keys) {
    if (DICTIONARY_LINKS[k]) return DICTIONARY_LINKS[k];
  }
  return undefined;
}

export function uniqueCredits(): HumanClip[] {
  const seen = new Map<string, HumanClip>();
  for (const clip of Object.values(HUMAN_CLIPS)) {
    const key = `${clip.page}::${clip.word}`;
    if (!seen.has(key)) seen.set(key, clip);
  }
  return [...seen.values()].sort((a, b) => a.word.localeCompare(b.word));
}
