import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CHUNKS } from "../lib/content/chunks";
import { DIALOGUES } from "../lib/content/dialogues";
import { DRILL_QUESTIONS } from "../lib/content/questions";
import { SOUND_GROUPS } from "../lib/content/sounds";
import { VOICE_DEFAULT, voiceForSpeaker } from "../lib/audio";

export type Utterance = {
  text: string;
  voice: string;
  kind: string;
};

const items: Utterance[] = [];

function add(text: string, voice: string, kind: string) {
  const t = text.trim();
  if (!t) return;
  items.push({ text: t, voice, kind });
}

for (const group of Object.values(SOUND_GROUPS)) {
  for (const pair of group.pairs ?? []) {
    add(pair.left, VOICE_DEFAULT, "sound-word");
    add(pair.right, VOICE_DEFAULT, "sound-word");
  }
  for (const item of group.items ?? []) {
    add(item.example, VOICE_DEFAULT, "sound-example");
  }
  for (const sentence of group.sentences) {
    add(typeof sentence === "string" ? sentence : sentence.text, VOICE_DEFAULT, "sound-sentence");
  }
}

for (const chunk of CHUNKS) {
  add(chunk.text, VOICE_DEFAULT, "chunk");
  add(chunk.example, VOICE_DEFAULT, "chunk-example");
  add(`${chunk.text} ${chunk.example}`, VOICE_DEFAULT, "chunk-combined");
}

for (const q of DRILL_QUESTIONS) {
  add(typeof q === "string" ? q : q.text, VOICE_DEFAULT, "drill");
}

const dialogues: { id: string; lines: { speaker: string; text: string; voice: string }[] }[] = [];
for (const d of DIALOGUES) {
  const lines = d.lines.map((l) => ({
    speaker: l.speaker,
    text: l.text,
    voice: voiceForSpeaker(l.speaker),
  }));
  for (const line of lines) add(line.text, line.voice, "dialogue-line");
  dialogues.push({ id: d.id, lines });
}

const seen = new Set<string>();
const unique = items.filter((u) => {
  const k = `${u.voice}\n${u.text}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const out = {
  engine: "edge-tts",
  voices: {
    default: VOICE_DEFAULT,
  },
  utterances: unique,
  dialogues,
};

const here = dirname(fileURLToPath(import.meta.url));
const dest = resolve(here, "../scripts/.cache/utterances.json");
writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(`Wrote ${unique.length} unique utterances and ${dialogues.length} dialogues to ${dest}`);
