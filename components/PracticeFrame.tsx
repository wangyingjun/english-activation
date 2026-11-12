"use client";

import Link from "next/link";
import { CheckButton } from "@/components/CheckButton";
import { PageHeader } from "@/components/PageHeader";
import { Timer } from "@/components/Timer";
import { useApp } from "@/components/AppProvider";
import { MODULES } from "@/lib/content/phases";
import type { PhaseId } from "@/lib/types";

export function PracticeFrame({
  moduleId,
  phase,
  title,
  desc,
  children,
}: {
  moduleId: string;
  phase?: PhaseId;
  title?: string;
  desc?: string;
  children: React.ReactNode;
}) {
  const { status, state, toggleModule } = useApp();
  const usePhase = phase ?? status.phase;
  const mod = MODULES[usePhase].find((m) => m.id === moduleId);
  const minutes = mod?.minutes ?? 20;
  const heading = title ?? mod?.title ?? "";
  const checked = !!state.days[status.today]?.modules[moduleId];
  const timerId = `${status.today}:${moduleId}`;

  return (
    <article>
      <PageHeader
        kicker={
          status.started && !status.notYet
            ? `第 ${Math.min(Math.max(status.day, 1), 84)} 天 · 阶段 ${usePhase} · ${minutes} 分钟`
            : `阶段 ${usePhase} · ${minutes} 分钟`
        }
        title={heading}
        desc={desc ?? mod?.hint}
      />
      <Timer id={timerId} seconds={minutes * 60} title="本节计时" />
      {children}
      <div className="card">
        <CheckButton checked={checked} onChange={(v) => toggleModule(status.today, moduleId, v)}>
          {checked ? "今天这一节已完成" : "勾选完成本节"}
        </CheckButton>
      </div>
      <p className="muted tiny">
        <Link href="/">回今日</Link>
        {" · "}
        <Link href="/practice">全部练习</Link>
      </p>
    </article>
  );
}
