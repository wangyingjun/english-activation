"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/components/AppProvider";
import { MODULES, PHASES } from "@/lib/content/phases";

export default function PracticePage() {
  const { status } = useApp();
  return (
    <article>
      <PageHeader
        kicker="全部练习"
        title="按阶段进入当天的工具"
        desc="今日模块已放在最上面。其他阶段的工具随时可以打开复习，不必等到那一周。"
      />
      {PHASES.map((phase) => (
        <section key={phase.id} className="card">
          <p className="kicker">
            {phase.weeks} · {phase.short}
            {status.phase === phase.id ? <span className="badge">当前</span> : null}
          </p>
          <h2>{phase.name}</h2>
          <div className="stack" style={{ marginTop: 10 }}>
            {MODULES[phase.id].map((m) => (
              <Link key={m.id} href={m.href} className="btn" style={{ justifyContent: "space-between" }}>
                <span>{m.title}</span>
                <span className="muted tiny">{m.minutes} 分钟</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section className="card">
        <h2>每天都要做的</h2>
        <div className="stack" style={{ marginTop: 10 }}>
          <Link href="/micro" className="btn" style={{ justifyContent: "space-between" }}>
            <span>睡前 3 分钟微输出</span>
            <span className="muted tiny">3 分钟</span>
          </Link>
          <Link href="/compare" className="btn" style={{ justifyContent: "space-between" }}>
            <span>双周对照录音</span>
            <span className="muted tiny">第 1、14、28… 天</span>
          </Link>
          <Link href="/phrases" className="btn" style={{ justifyContent: "space-between" }}>
            <span>日常常用短语</span>
            <span className="muted tiny">每天 8 句</span>
          </Link>
          <Link href="/book" className="btn">
            高频口语错题本 / 卡壳词
          </Link>
        </div>
      </section>
    </article>
  );
}
