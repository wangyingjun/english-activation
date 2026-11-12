export const VOICE_FEMALE = "en-US-AvaMultilingualNeural";
export const VOICE_MALE = "en-US-AndrewMultilingualNeural";
export const VOICE_DEFAULT = VOICE_FEMALE;

const FEMALE_SPEAKERS = new Set([
  "Maya",
  "Nina",
  "Mom",
  "Staff",
  "Agent",
  "Interviewer",
]);

const MALE_SPEAKERS = new Set([
  "Leo",
  "Sam",
  "Dad",
  "Barista",
  "Local",
  "Clerk",
  "Waiter",
  "Stranger",
]);

export function voiceForSpeaker(name: string): string {
  if (FEMALE_SPEAKERS.has(name)) return VOICE_FEMALE;
  if (MALE_SPEAKERS.has(name)) return VOICE_MALE;
  let h = 0;
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i);
  return h % 2 === 0 ? VOICE_FEMALE : VOICE_MALE;
}

export function clipIdentity(text: string, voice: string = VOICE_DEFAULT): string {
  return `${voice}\n${text}`;
}

export function youGlishUrl(text: string): string {
  const q = text.replace(/[…]/g, " ").replace(/\.\.\./g, " ").replace(/\s+/g, " ").trim();
  return `https://youglish.com/pronounce/${encodeURIComponent(q)}/english/us`;
}

export function dialogueFullText(lines: { speaker: string; text: string }[]): string {
  return lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");
}
