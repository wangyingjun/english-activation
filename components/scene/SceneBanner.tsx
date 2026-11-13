"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { sceneForDay, sceneHref, moduleToSceneSteps } from "@/lib/content/scenes";

export function SceneTodayBanner({ moduleId }: { moduleId?: string }) {
  const { status } = useApp();
  if (!status.started || status.notYet) return null;
  const day = status.day > 84 ? 84 : Math.max(1, status.day);
  const { scene, review, phase } = sceneForDay(day);
  const map = moduleId ? moduleToSceneSteps(phase, moduleId) : { hash: "card", label: "打开今天的场景" };
  return (
    <div className="notice" style={{ marginBottom: 12 }}>
      今天的真实场景是「{scene.emoji} {scene.titleZh}」{review ? "（复习）" : ""}。
      这一节对应：{map.label}。
      <div className="btn-row" style={{ marginTop: 8 }}>
        <Link href={sceneHref(scene.id, map.hash)} className="btn btn-accent">
          去做今天的场景
        </Link>
        <Link href="/scenes" className="btn">
          场景库
        </Link>
      </div>
    </div>
  );
}
