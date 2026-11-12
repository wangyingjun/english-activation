import type { ModuleDef, PhaseId } from "@/lib/types";

export type PhaseMeta = {
  id: PhaseId;
  weeks: string;
  weekRange: [number, number];
  name: string;
  short: string;
  goal: string;
  colorVar: string;
};

export const PHASES: PhaseMeta[] = [
  {
    id: 1,
    weeks: "第 1–4 周",
    weekRange: [1, 4],
    name: "语音重塑与耳朵唤醒",
    short: "破冰期",
    goal: "消除「看字能懂、听音懵圈」的割裂感，激活脑海中沉睡的约 2,000 个高频核心词，适应英语连读节奏。",
    colorVar: "var(--phase-1)",
  },
  {
    id: 2,
    weeks: "第 5–8 周",
    weekRange: [5, 8],
    name: "语块积累与思维直连",
    short: "爬坡期",
    goal: "戒掉「先想中文再逐词翻译」的习惯，用现成的高频句型块（Chunks）替代语法组装，实现基础日常话题的流畅表达。",
    colorVar: "var(--phase-2)",
  },
  {
    id: 3,
    weeks: "第 9–12 周",
    weekRange: [9, 12],
    name: "实战脱敏与即时反应",
    short: "突破期",
    goal: "在真实交互压力下锻炼「听懂核心意图 + 3 秒内给出合理回应」的能力，达到旅游、日常社交及基础工作沟通无障碍的水平。",
    colorVar: "var(--phase-3)",
  },
];

export const MODULES: Record<PhaseId, ModuleDef[]> = {
  1: [
    {
      id: "sounds",
      title: "声音与拼写对齐",
      minutes: 20,
      href: "/sounds",
      hint: "每天 1–2 组易混淆发音。听音频、看文本，标出「认识但没听出来」的词。",
    },
    {
      id: "listening",
      title: "窄听与精听训练",
      minutes: 40,
      href: "/listening",
      hint: "1–2 分钟慢速对话：盲听 2 遍抓大意 → 对照文本逐句听清连读/弱读 → 再盲听 2 遍。",
    },
    {
      id: "shadowing",
      title: "开口机械模仿",
      minutes: 30,
      href: "/shadowing",
      hint: "针对精听材料跟读。像学唱歌一样模仿语调、重音和停顿，录音对比。",
    },
  ],
  2: [
    {
      id: "extensive",
      title: "泛听磨耳朵",
      minutes: 30,
      href: "/extensive",
      hint: "通勤或做家务时听熟悉主题，不求 100% 听懂，捕捉关键词，习惯正常语速。",
    },
    {
      id: "chunks",
      title: "高频语块替换练习",
      minutes: 30,
      href: "/chunks",
      hint: "每天 5 个万能功能句型，每个结合自己的真实生活造 3 个句子并大声念出。",
    },
    {
      id: "scenario",
      title: "单人场景复述",
      minutes: 30,
      href: "/scenario",
      hint: "选一个生活场景，用刚学的句型自言自语 5 分钟。卡壳时用最简单的词绕过去。",
    },
  ],
  3: [
    {
      id: "video",
      title: "常速视频盲看",
      minutes: 30,
      href: "/video",
      hint: "看带英文字幕（逐步过渡到无字幕）的访谈或情景剧，抓取关键信息。",
    },
    {
      id: "conversation",
      title: "高频实战对话",
      minutes: 40,
      href: "/conversation",
      hint: "1 对 1 实时语音：前 20 分钟固定主题，后 20 分钟随机闲聊，自然语速。",
    },
    {
      id: "review",
      title: "复盘与表达升级",
      minutes: 20,
      href: "/review",
      hint: "找出当天「想说却没说出来」的 3 个表达，查出地道说法，大声朗读 10 遍。",
    },
  ],
};

export const CORE_LOGIC =
  "绕过应试语法，直接打通声音与意义的神经连接。每天固定投入 1.5 小时，可拆成上下午或晚间。";

export const LEARNER =
  "有大学教育背景、阅读词汇有底子，但长期荒废、听说严重脱节。";
