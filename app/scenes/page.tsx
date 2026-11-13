"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/components/AppProvider";
import {
  SCENE_CATEGORIES,
  SCENES,
  daysForScene,
  isSceneComplete,
  sceneForDay,
  sceneHref,
  sceneStepCount,
} from "@/lib/content/scenes";

export default function SceneLibraryPage() {
  const { status, state } = useApp();
  const day = status.started && !status.notYet ? Math.min(84, Math.max(1, status.day)) : 1;
  const today = sceneForDay(day);
  return (
    <article>
      <PageHeader
        kicker="按真实场景学"
        title="场景库"
        desc="每天一个真实场景：先听完整对话，再练里面的声音和短语，然后跟读、角色扮演、应变和一分钟复述。下面按生活分类浏览，也可从今天的场景直接开始。"
      />
      <section className="card">
        <p className="kicker">今天</p>
        <h2>{today.scene.emoji} {today.scene.titleZh}</h2>
        <p className="en muted tiny">{today.scene.title}{today.review ? " · 复习" : ""}</p>
        <p className="muted tiny">{today.scene.goalZh}</p>
        <Link href={sceneHref(today.scene.id)} className="btn btn-primary" style={{ marginTop: 8 }}>
          开始今天的场景
        </Link>
      </section>
      {SCENE_CATEGORIES.map((cat) => {
        const list = SCENES.filter((s) => s.category === cat);
        if (list.length === 0) return null;
        return (
          <section key={cat}>
            <h2>{cat}</h2>
            <ul className="scene-library">
              {list.map((s) => {
                const prog = state.sceneProgress[s.id];
                const done = isSceneComplete(prog, status.phase);
                const n = sceneStepCount(prog);
                const days = daysForScene(s.id);
                return (
                  <li key={s.id} className="card">
                    <p className="scene-emoji" aria-hidden="true">{s.emoji}</p>
                    <h3>{s.titleZh}</h3>
                    <p className="en muted tiny">{s.title}</p>
                    <p className="muted tiny">{s.goalZh}</p>
                    <p className="muted tiny">
                      {n}/8 步{done ? " · 本阶段要点已完成" : ""}
                      {days.length ? ` · 安排在第 ${days.join("、")} 天` : ""}
                    </p>
                    <Link href={sceneHref(s.id)} className="btn btn-accent" style={{ marginTop: 6 }}>
                      打开场景
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </article>
  );
}
