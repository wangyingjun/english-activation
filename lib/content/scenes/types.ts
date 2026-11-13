export type SceneCategory =
  | "餐饮购物"
  | "出行住宿"
  | "健康事务"
  | "社交寒暄"
  | "工作沟通"
  | "面试协作";

export const SCENE_CATEGORIES: SceneCategory[] = [
  "餐饮购物",
  "出行住宿",
  "健康事务",
  "社交寒暄",
  "工作沟通",
  "面试协作",
];

export const SCENE_STEPS = [
  "card",
  "listen",
  "sounds",
  "phrases",
  "shadow",
  "roleplay",
  "vary",
  "micro",
] as const;

export type SceneStepId = (typeof SCENE_STEPS)[number];

export const SCENE_STEP_LABEL: Record<SceneStepId, string> = {
  card: "场景卡",
  listen: "先听完整对话",
  sounds: "场景里的声音",
  phrases: "场景短语 / 语块",
  shadow: "跟读",
  roleplay: "角色扮演",
  vary: "变一变",
  micro: "微输出",
};

export type SceneLine = {
  speaker: string;
  role: "a" | "b";
  text: string;
  zh: string;
};

export type SceneSoundPoint = {
  contrastId?: string;
  title: string;
  titleZh: string;
  note: string;
  words: string[];
  example: string;
};

export type ScenePhrase = {
  id: string;
  text: string;
  zh: string;
  note: string;
  phraseId?: string;
  chunkId?: string;
};

export type SceneVariation = {
  id: string;
  titleZh: string;
  setupZh: string;
  cueSpeaker: string;
  cue: string;
  cueZh: string;
  hints: string[];
  faster?: boolean;
};

export type SceneRole = {
  id: "a" | "b";
  name: string;
  nameZh: string;
  goalZh: string;
};

export type Scene = {
  id: string;
  title: string;
  titleZh: string;
  category: SceneCategory;
  emoji: string;
  whereZh: string;
  whoZh: string;
  goalZh: string;
  difficulty: 1 | 2 | 3;
  roles: [SceneRole, SceneRole];
  gistZh: string;
  lines: SceneLine[];
  sounds: SceneSoundPoint[];
  phrases: ScenePhrase[];
  variations: SceneVariation[];
  microPromptZh: string;
  microPromptEn: string;
};

export type SceneProgress = {
  steps: Partial<Record<SceneStepId, boolean>>;
  role?: "a" | "b";
};

export function emptySceneProgress(): SceneProgress {
  return { steps: {} };
}

export function emphasizedSteps(phase: 1 | 2 | 3): SceneStepId[] {
  if (phase === 1) return ["listen", "sounds", "shadow"];
  if (phase === 2) return ["phrases", "roleplay"];
  return ["roleplay", "vary", "micro"];
}

export function sceneFocusHint(phase: 1 | 2 | 3): string {
  if (phase === 1) return "这个阶段先把对话听清、把场景里的声音听出来，再一句一句跟读。后面的角色扮演可以先试试，不必求快。";
  if (phase === 2) return "这个阶段多花时间在短语和角色扮演上。用场景里的现成说法接话，卡壳就换简单的词。";
  return "这个阶段按正常语速练。角色扮演只用 3 秒准备，变一变时先不要看字幕。把整件事用一分钟说出来。";
}

export function defaultListenRate(phase: 1 | 2 | 3): number {
  return phase === 1 ? 0.8 : 1;
}

export function roleplayCountdownSec(phase: 1 | 2 | 3): number {
  return phase === 3 ? 3 : 5;
}

export function isSceneComplete(progress: SceneProgress | undefined, phase: 1 | 2 | 3): boolean {
  const need = emphasizedSteps(phase);
  const steps = progress?.steps ?? {};
  return need.every((id) => !!steps[id]);
}

export function sceneStepCount(progress: SceneProgress | undefined): number {
  const steps = progress?.steps ?? {};
  return SCENE_STEPS.filter((id) => steps[id]).length;
}
