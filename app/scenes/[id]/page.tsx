"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SceneUnit } from "@/components/scene/SceneUnit";
import { useApp } from "@/components/AppProvider";
import { sceneById, sceneForDay, daysForScene } from "@/lib/content/scenes";

export default function ScenePage() {
  const params = useParams<{ id: string }>();
  const { status } = useApp();
  const scene = sceneById(params.id);
  const day = status.started && !status.notYet ? Math.min(84, Math.max(1, status.day)) : 0;
  const todayId = day ? sceneForDay(day).scene.id : "";
  const review = day ? sceneForDay(day).review && todayId === params.id : false;

  if (!scene) {
    return (
      <article>
        <h1>没有找到这个场景</h1>
        <p className="lead">它可能还不在库里。可以回到场景库另选一个。</p>
        <Link href="/scenes" className="btn btn-accent">回场景库</Link>
      </article>
    );
  }

  const days = daysForScene(scene.id);
  return (
    <article>
      <p className="muted tiny" style={{ marginBottom: 8 }}>
        <Link href="/scenes">场景库</Link>
        {todayId === scene.id ? " · 今天的场景" : days.length ? ` · 计划第 ${days.join("、")} 天` : ""}
        {" · "}
        <Link href="/">回今日</Link>
      </p>
      <SceneUnit scene={scene} review={review || (todayId !== scene.id && days.some((d) => d < day))} />
    </article>
  );
}
