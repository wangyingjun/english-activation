"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { sceneForDay, sceneHref } from "@/lib/content/scenes";

export default function TodaySceneRedirect() {
  const { ready, status } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (!ready) return;
    const day = status.started && !status.notYet ? Math.min(84, Math.max(1, status.day)) : 1;
    router.replace(sceneHref(sceneForDay(day).scene.id));
  }, [ready, status, router]);
  return <p className="muted">正在打开今天的场景…</p>;
}
