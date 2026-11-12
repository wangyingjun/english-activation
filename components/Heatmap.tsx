"use client";

import { addDays, isoForDay, TOTAL_DAYS, weekNumber } from "@/lib/calendar";
import { MODULES } from "@/lib/content/phases";
import { phaseOf } from "@/lib/calendar";
import { useApp } from "@/components/AppProvider";

function level(startDate: string, day: number, days: ReturnType<typeof useApp>["state"]["days"]) {
  const iso = isoForDay(startDate, day);
  const log = days[iso];
  if (!log) return 0;
  const mods = MODULES[phaseOf(day)];
  const done = mods.filter((m) => log.modules[m.id]).length;
  const full = done >= mods.length;
  if (full && log.micro) return 4;
  if (full) return 3;
  if (done > 0) return 2;
  if (log.micro) return 1;
  return 0;
}

export function Heatmap() {
  const { state, status } = useApp();
  if (!state.startDate) return null;
  const cells = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

  return (
    <div className="heatmap">
      <div className="heatmap-grid" role="img" aria-label="12 周完成热力图">
        {Array.from({ length: 12 }, (_, w) => (
          <div key={w} className="heatmap-week">
            {cells
              .filter((d) => weekNumber(d) === w + 1)
              .map((d) => {
                const lv = level(state.startDate!, d, state.days);
                const iso = isoForDay(state.startDate!, d);
                const today = iso === status.today;
                return (
                  <span
                    key={d}
                    className={`heat ${today ? "today" : ""}`}
                    data-lv={lv}
                    title={`第 ${d} 天 · ${iso}`}
                  />
                );
              })}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>未开始</span>
        <span className="heat" data-lv={0} />
        <span className="heat" data-lv={1} />
        <span className="heat" data-lv={2} />
        <span className="heat" data-lv={3} />
        <span className="heat" data-lv={4} />
        <span>全满</span>
      </div>
      <p className="muted tiny">颜色越深，完成得越完整。最深一格表示当天三个模块和睡前微输出都勾上了。</p>
    </div>
  );
}

export function streakCount(startDate: string | null, today: string, days: ReturnType<typeof useApp>["state"]["days"]) {
  if (!startDate) return 0;
  const isFull = (iso: string) => {
    if (iso < startDate) return false;
    const day = Math.floor((new Date(`${iso}T12:00:00+08:00`).getTime() - new Date(`${startDate}T12:00:00+08:00`).getTime()) / 86_400_000) + 1;
    if (day < 1 || day > TOTAL_DAYS) return false;
    const mods = MODULES[phaseOf(day)];
    const log = days[iso];
    return !!log && mods.every((m) => log.modules[m.id]);
  };
  let startFrom = today;
  if (!isFull(today)) {
    startFrom = addDays(today, -1);
  }
  let n = 0;
  let iso = startFrom;
  while (iso >= startDate && isFull(iso)) {
    n += 1;
    iso = addDays(iso, -1);
  }
  return n;
}
