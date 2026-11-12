import { VOICE_DEFAULT, clipIdentity } from "@/lib/audio";
import manifest from "@/lib/generated/audio-manifest.json";

export type AudioManifest = {
  engine: string;
  voices: Record<string, string>;
  clips: Record<string, { text: string; voice: string; kind?: string; file: string }>;
  dialogues: Record<string, { full: string }>;
};

const data = manifest as AudioManifest;

const byIdentity = new Map<string, string>();
for (const clip of Object.values(data.clips)) {
  byIdentity.set(clipIdentity(clip.text, clip.voice), clip.file);
}

export function clipFile(text: string, voice: string = VOICE_DEFAULT): string | undefined {
  return byIdentity.get(clipIdentity(text.trim(), voice));
}

export function dialogueFile(id: string): string | undefined {
  return data.dialogues[id]?.full;
}

