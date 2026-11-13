"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useApp } from "@/components/AppProvider";
import { CheckButton } from "@/components/CheckButton";
import { Heatmap, streakCount } from "@/components/Heatmap";
import { Onboarding } from "@/components/Onboarding";
import { Meaning, MeaningHelp, MeaningModeToggle } from "@/components/Meaning";
import { COMPARE_DAYS, formatZhDate, weekdayZh } from "@/lib/calendar";
import { phrasesForDate } from "@/lib/content/phrases";
import { SpeakButton } from "@/components/SpeakButton";
import { SCENE_STEP_LABEL, emphasizedSteps, moduleToSceneSteps, sceneForDay, sceneHref, sceneStepCount } from "@/lib/content/scenes";

export default function HomePage() {
  const { ready, state, status, toggleModule, toggleMicro } = useApp();
  const streak = useMemo(
    () => streakCount(state.startDate, status.today, state.days),
    [state.startDate, status.today, state.days],
  );

  if (!ready) return <p className="muted">加载中…</p>;
  if (!state.startDate) return <Onboarding />;

  const log = state.days[status.today];
  const modulesDone = status.modules.filter((m) => log?.modules[m.id]).length;
  const totalMin = status.modules.reduce((n, m) => n + m.minutes, 0);
  const dayLabel = status.notYet
    ? `开始日是 ${formatZhDate(state.startDate)}，还没到`
    : status.ended
      ? "12 周已经走完，仍可继续复习"
      : `第 ${status.day} 天 · 周 ${status.week} · ${status.phaseMeta.short}`;
  const compareDue =
    status.compareDue && !log?.compare && COMPARE_DAYS.includes(status.day as (typeof COMPARE_DAYS)[number]);

  return (
    <article>
      <header className="page-header">
        <p className="kicker">
          {formatZhDate(status.today)} 星期{weekdayZh(status.today)}
        </p>
        <h1>{dayLabel}</h1>
        <p className="lead">
          {status.phaseMeta.weeks} · {status.phaseMeta.name}。今天三个模块共 {totalMin} 分钟，可拆开完成。
        </p>
      </header>

      {compareDue && (
        <div className="notice warn">
          今天是第 {status.day} 天，该做一次 1 分钟对照录音了。用同一个题目录下来，以后就能听见自己的变化。
          <div className="btn-row" style={{ marginTop: 8 }}>
            <Link href="/compare" className="btn btn-primary">
              去录音
            </Link>
          </div>
        </div>
      )}

      <MeaningHelp />
      <div className="card" style={{ marginBottom: 12 }}>
        <MeaningModeToggle />
      </div>

      <div className="stat-row">
        <div className="stat">
          <b>{status.ended ? "—" : status.week}</b>
          <span>当前周</span>
        </div>
        <div className="stat">
          <b>{streak}</b>
          <span>连续天数</span>
        </div>
        <div className="stat">
          <b>
            {modulesDone}/{status.modules.length}
          </b>
          <span>今日模块</span>
        </div>
      </div>

      {(() => {
        const todayScene = sceneForDay(status.ended || status.notYet ? Math.min(Math.max(status.day, 1), 84) : Math.min(84, Math.max(1, status.day)));
        const prog = state.sceneProgress[todayScene.scene.id];
        const n = sceneStepCount(prog);
        const focus = emphasizedSteps(status.phase);
        return (
          <section className="card">
            <p className="kicker">今天的场景{todayScene.review ? " · 复习" : ""}</p>
            <h2>{todayScene.scene.emoji} {todayScene.scene.titleZh}</h2>
            <p className="en muted tiny">{todayScene.scene.title}</p>
            <p className="muted tiny" style={{ marginTop: 6 }}>{todayScene.scene.goalZh}</p>
            <p className="muted tiny">已记下 {n}/8 步。本阶段重点：{focus.map((id) => SCENE_STEP_LABEL[id]).join("、")}。</p>
            <Link href={sceneHref(todayScene.scene.id)} className="btn btn-primary" style={{ marginTop: 8 }}>
              打开今天的场景
            </Link>
            <Link href="/scenes" className="btn" style={{ marginTop: 8, marginLeft: 8 }}>场景库</Link>
          </section>
        );
      })()}

      <section className="card">
        <h2>今日常用短语</h2>
        <p className="muted tiny">每天 8 句日常会说的话。先听，再看意思，最后试着说。</p>
        <ul className="list-plain">
          {phrasesForDate(status.today, 8).map((p) => (
            <li key={p.id}>
              <p className="en">{p.text}</p>
              <SpeakButton text={p.text} rate={0.8} label="听" />
              <Meaning zh={p.zh} compact />
            </li>
          ))}
        </ul>
        <Link href="/phrases" className="btn btn-accent" style={{ marginTop: 8 }}>
          打开常用短语
        </Link>
      </section>

      {status.modules.map((m) => {
        const done = !!log?.modules[m.id];
        return (
          <div key={m.id} className="module-card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
              <Link href={m.href} style={{ color: "inherit", textDecoration: "none", flex: 1, minWidth: 0 }}>
                <h2 style={{ margin: 0 }}>{m.title}</h2>
              </Link>
              <span className="mins">{m.minutes} 分钟</span>
            </div>
            <p className="muted tiny" style={{ marginBottom: 8 }}>
              {(() => {
                const map = moduleToSceneSteps(status.phase, m.id);
                return `${m.hint} 今天在场景里做：${map.label}。`;
              })()}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <CheckButton checked={done} onChange={(v) => toggleModule(status.today, m.id, v)}>
                {done ? "已完成" : "先记下，待会做"}
              </CheckButton>
              <div className="btn-row">
                <Link href={(() => {
                  const day = Math.min(84, Math.max(1, status.day || 1));
                  const { scene } = sceneForDay(day);
                  const map = moduleToSceneSteps(status.phase, m.id);
                  return sceneHref(scene.id, map.hash);
                })()} className="btn btn-accent">
                  开始
                </Link>
                <Link href={m.href} className="btn">资料库</Link>
              </div>
            </div>
          </div>
        );
      })}

      <div className="card">
        <CheckButton checked={!!log?.micro} onChange={(v) => toggleMicro(status.today, v)}>
          睡前 3 分钟微输出
        </CheckButton>
        <p className="muted tiny" style={{ marginTop: 6 }}>
          用英语花 3 分钟讲今天做了什么。没有输出倒逼，输入会停在被动层。
        </p>
        <Link href="/micro" className="btn btn-ghost" style={{ marginTop: 8 }}>
          去写 / 去录
        </Link>
      </div>

      <section>
        <h2>12 周日历</h2>
        <Heatmap />
      </section>
    </article>
  );
}
