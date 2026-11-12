"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/components/AppProvider";
import { CORE_LOGIC, LEARNER, MODULES, PHASES } from "@/lib/content/phases";

export default function PlanPage() {
  const { status } = useApp();
  return (
    <article>
      <PageHeader
        kicker="12 周 · 每天 90 分钟"
        title="计划总览"
        desc={`这份计划专为「${LEARNER}」而设计。核心逻辑是${CORE_LOGIC}`}
      />
      {PHASES.map((phase) => (
        <section key={phase.id} className="card">
          <p className="kicker">
            阶段 {phase.id} · {phase.weeks} · {phase.short}
            {status.phase === phase.id && status.started ? <span className="badge">当前</span> : null}
          </p>
          <h2>{phase.name}</h2>
          <p className="lead">{phase.goal}</p>
          {MODULES[phase.id].map((m) => (
            <div key={m.id} className="card-soft">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <h3 style={{ margin: 0 }}>{m.title}</h3>
                <span className="mins">{m.minutes} 分钟</span>
              </div>
              <p className="muted tiny" style={{ margin: "6px 0 8px" }}>
                {m.hint}
              </p>
              <Link href={m.href} className="btn btn-ghost">
                打开工具
              </Link>
            </div>
          ))}
        </section>
      ))}
      <p className="muted tiny">
        每天另外还有 <Link href="/micro">睡前 3 分钟微输出</Link>，以及每隔两周的{" "}
        <Link href="/compare">1 分钟对照录音</Link>。执行时请守住 <Link href="/rules">四条铁律</Link>。
      </p>
    </article>
  );
}
