import type { PhaseId } from "@/lib/types";
import type { Scene, SceneCategory, SceneStepId } from "./types";
import raw from "./data.json";

export const SCENES: Scene[] = raw as Scene[];

export const SCENES_BY_ID: Record<string, Scene> = Object.fromEntries(
  SCENES.map((s) => [s.id, s]),
);

export function sceneById(id: string): Scene | undefined {
  return SCENES_BY_ID[id];
}

export function scenesInCategory(category: SceneCategory): Scene[] {
  return SCENES.filter((s) => s.category === category);
}

export function sceneLineCount(scene: Scene): number {
  return scene.lines.length;
}

/** Map a daily module to the scene steps it should open on. */
export function moduleToSceneSteps(phase: PhaseId, moduleId: string): { steps: SceneStepId[]; hash: string; label: string } {
  if (phase === 1) {
    if (moduleId === "sounds") return { steps: ["sounds"], hash: "sounds", label: "在今天的场景里练发音" };
    if (moduleId === "listening") return { steps: ["card", "listen"], hash: "listen", label: "先听今天的完整对话" };
    if (moduleId === "shadowing") return { steps: ["shadow"], hash: "shadow", label: "跟读今天的对话" };
  }
  if (phase === 2) {
    if (moduleId === "extensive") return { steps: ["listen"], hash: "listen", label: "再听一遍今天的场景对话" };
    if (moduleId === "chunks") return { steps: ["phrases"], hash: "phrases", label: "用场景里的短语和语块说" };
    if (moduleId === "scenario") return { steps: ["roleplay", "micro"], hash: "roleplay", label: "进入角色扮演和微输出" };
  }
  if (phase === 3) {
    if (moduleId === "video") return { steps: ["listen", "vary"], hash: "listen", label: "常速听对话，再做变一变" };
    if (moduleId === "conversation") return { steps: ["roleplay", "vary"], hash: "roleplay", label: "3 秒角色扮演和临场变化" };
    if (moduleId === "review") return { steps: ["micro"], hash: "micro", label: "用一分钟把今天的场景说出来" };
  }
  return { steps: ["card"], hash: "card", label: "打开今天的场景" };
}

export function sceneHref(sceneId: string, hash?: string): string {
  return hash ? `/scenes/${sceneId}#${hash}` : `/scenes/${sceneId}`;
}

export * from "./types";
export * from "./schedule";
