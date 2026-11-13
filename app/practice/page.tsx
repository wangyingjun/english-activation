"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/components/AppProvider";
import { MODULES, PHASES } from "@/lib/content/phases";
import { sceneForDay, sceneHref } from "@/lib/content/scenes";

export default function PracticePage() {
  const { status } = useApp();
  return (
    <article>
      <PageHeader
        kicker="全部练习"
        title="按阶段进入当天的工具"
        desc="今日模块已放在最上面。其他阶段的工具随时可以打开复习，不必等到那一周。"
      />
      {status.started && !status.notYet && (() => {
        const today = sceneForDay(Math.min(84, Math.max(1, status.day)));
        return (
          <section className="card">
            <p className="kicker">今天的场景{today.review ? " · 复习" : ""}</p>
            <h2>{today.scene.emoji} {today.scene.titleZh}</h2>
            <p className="muted tiny">{today.scene.goalZh}</p>
            <Link href={sceneHref(today.scene.id)} className="btn btn-primary" style={{ marginTop: 8 }}>打开今天的场景</Link>
          </section>
        );
      })()}
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
          <Link href="/scenes" className="btn" style={{ justifyContent: "space-between" }}>
            <span>场景库</span>
            <span className="muted tiny">按真实场景练</span>
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
