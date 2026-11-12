import { MODULES, PHASES } from "@/lib/content/phases";
import type { PhaseId } from "@/lib/types";

export const TZ = "Asia/Shanghai";
export const TOTAL_DAYS = 84;
export const TOTAL_WEEKS = 12;
export const COMPARE_DAYS = [1, 14, 28, 42, 56, 70, 84] as const;

export function dateISO(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function addDays(iso: string, n: number): string {
  const dt = new Date(`${iso}T12:00:00+08:00`);
  dt.setTime(dt.getTime() + n * 86_400_000);
  return dateISO(dt);
}

export function formatZhDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

export function weekdayZh(iso: string): string {
  const dt = new Date(`${iso}T12:00:00+08:00`);
  return ["日", "一", "二", "三", "四", "五", "六"][dt.getDay()];
}

export function dayNumber(startDate: string, today = dateISO()): number {
  const a = new Date(`${startDate}T12:00:00+08:00`).getTime();
  const b = new Date(`${today}T12:00:00+08:00`).getTime();
  return Math.floor((b - a) / 86_400_000) + 1;
}

export function weekNumber(day: number): number {
  if (day < 1) return 1;
  return Math.min(TOTAL_WEEKS, Math.ceil(day / 7));
}

export function phaseOf(day: number): PhaseId {
  if (day <= 28) return 1;
  if (day <= 56) return 2;
  return 3;
}

export function phaseDay(day: number): number {
  if (day <= 28) return Math.max(1, day);
  if (day <= 56) return day - 28;
  return Math.min(28, day - 56);
}

export function isoForDay(startDate: string, day: number): string {
  return addDays(startDate, day - 1);
}

export function isCompareDay(day: number): boolean {
  return (COMPARE_DAYS as readonly number[]).includes(day);
}

export function nextCompareDay(day: number): number | null {
  const next = COMPARE_DAYS.find((d) => d >= day);
  return next ?? null;
}

export function programStatus(startDate: string | null, today = dateISO()) {
  if (!startDate) {
    return {
      today,
      day: 0,
      week: 0,
      phase: 1 as PhaseId,
      phaseMeta: PHASES[0],
      phaseDay: 1,
      modules: MODULES[1],
      started: false,
      ended: false,
      notYet: false,
      compareDue: false,
    };
  }
  const day = dayNumber(startDate, today);
  const notYet = day < 1;
  const ended = day > TOTAL_DAYS;
  const clamped = notYet ? 1 : ended ? TOTAL_DAYS : day;
  const phase = phaseOf(clamped);
  return {
    today,
    day,
    week: weekNumber(clamped),
    phase,
    phaseMeta: PHASES[phase - 1],
    phaseDay: phaseDay(clamped),
    modules: MODULES[phase],
    started: true,
    ended,
    notYet,
    compareDue: !notYet && !ended && isCompareDay(day),
  };
}
