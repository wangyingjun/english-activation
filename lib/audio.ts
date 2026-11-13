export const VOICE_FEMALE = "en-US-AvaMultilingualNeural";
export const VOICE_MALE = "en-US-AndrewMultilingualNeural";
export const VOICE_FEMALE_2 = "en-US-EmmaNeural";
export const VOICE_MALE_2 = "en-US-BrianNeural";
export const VOICE_DEFAULT = VOICE_FEMALE;

const FEMALE_PRIMARY = new Set(["Maya", "Jen", "Host", "Mom", "Staff"]);
const FEMALE_SECONDARY = new Set(["Nina", "Amy", "Emma", "Interviewer", "Agent", "Receptionist"]);
const MALE_PRIMARY = new Set(["Leo", "Barista", "Clerk", "Waiter", "Doctor", "Driver", "Dad"]);
const MALE_SECONDARY = new Set(["Sam", "Brian", "Mark", "Alex", "Dan", "Local", "Officer", "Manager"]);

export function voiceForSpeaker(name: string): string {
  if (FEMALE_PRIMARY.has(name)) return VOICE_FEMALE;
  if (FEMALE_SECONDARY.has(name)) return VOICE_FEMALE_2;
  if (MALE_PRIMARY.has(name)) return VOICE_MALE;
  if (MALE_SECONDARY.has(name)) return VOICE_MALE_2;
  let h = 0;
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i);
  return h % 2 === 0 ? VOICE_FEMALE : VOICE_MALE;
}

export function clipIdentity(text: string, voice: string = VOICE_DEFAULT): string {
  return `${voice}\n${text}`;
}

export function dialogueFullText(lines: { speaker: string; text: string }[]): string {
  return lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");
}
