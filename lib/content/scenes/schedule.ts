import { phaseOf } from "@/lib/calendar";
import type { PhaseId } from "@/lib/types";
import type { Scene } from "./types";
import raw from "./data.json";

const SCENES = raw as Scene[];

/** One main scene per program day (1–84), with later-phase review. */
const PHASE1: string[] = [
  "sc-coffee", "sc-restaurant", "sc-supermarket", "sc-directions", "sc-taxi",
  "sc-intro", "sc-weekend", "sc-phone-apt", "sc-doctor", "sc-pharmacy",
  "sc-hotel", "sc-hotel-fix", "sc-airport", "sc-return", "sc-invite",
  "sc-gift", "sc-after-work", "sc-travel-chat", "sc-standup", "sc-help",
  "sc-late", "sc-video-lag", "sc-disagree", "sc-explain", "sc-priorities",
  "sc-followup", "sc-review", "sc-demo",
];

const PHASE2: string[] = [
  "sc-user", "sc-feature", "sc-timezone", "sc-interview",
  "sc-split", "sc-apartment", "sc-bank", "sc-say-no",
  "sc-coffee", "sc-restaurant", "sc-intro", "sc-weekend",
  "sc-standup", "sc-help", "sc-disagree", "sc-explain",
  "sc-video-lag", "sc-demo", "sc-doctor", "sc-airport",
  "sc-invite", "sc-late", "sc-followup", "sc-priorities",
  "sc-review", "sc-user", "sc-interview", "sc-say-no",
];

const PHASE3: string[] = [
  "sc-interview", "sc-say-no", "sc-feature", "sc-user",
  "sc-explain", "sc-disagree", "sc-demo", "sc-timezone",
  "sc-priorities", "sc-standup", "sc-video-lag", "sc-help",
  "sc-followup", "sc-late", "sc-review", "sc-intro",
  "sc-invite", "sc-airport", "sc-hotel", "sc-return",
  "sc-doctor", "sc-restaurant", "sc-coffee", "sc-taxi",
  "sc-split", "sc-apartment", "sc-bank", "sc-after-work",
];

const BY_DAY: string[] = [...PHASE1, ...PHASE2, ...PHASE3];

if (BY_DAY.length !== 84) {
  throw new Error(`Scene schedule must have 84 days, got ${BY_DAY.length}`);
}

export type DayScene = {
  day: number;
  scene: Scene;
  review: boolean;
  phase: PhaseId;
};

const firstSeen = new Map<string, number>();
BY_DAY.forEach((id, i) => {
  if (!firstSeen.has(id)) firstSeen.set(id, i + 1);
});

export function sceneIdForDay(day: number): string {
  const clamped = Math.min(84, Math.max(1, day));
  return BY_DAY[clamped - 1];
}

export function sceneForDay(day: number): DayScene {
  const clamped = Math.min(84, Math.max(1, day));
  const id = BY_DAY[clamped - 1];
  const scene = SCENES.find((s) => s.id === id);
  if (!scene) throw new Error(`Missing scene ${id} for day ${clamped}`);
  return {
    day: clamped,
    scene,
    review: firstSeen.get(id) !== clamped,
    phase: phaseOf(clamped),
  };
}

export function daysForScene(sceneId: string): number[] {
  return BY_DAY.map((id, i) => (id === sceneId ? i + 1 : 0)).filter(Boolean);
}
