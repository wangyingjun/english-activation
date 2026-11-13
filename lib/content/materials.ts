export type Material = {
  name: string;
  href?: string;
  kind: string;
  phase: string;
  note: string;
};

export const MATERIALS: Material[] = [
  {
    name: "Rachel's English",
    href: "https://rachelsenglish.com/",
    kind: "网站",
    phase: "阶段一 · 语音",
    note: "美式发音口型、连读和弱读讲解非常清楚，适合对着镜子练。",
  },
  {
    name: "Rachel's English（YouTube）",
    href: "https://www.youtube.com/@RachelsEnglish",
    kind: "YouTube",
    phase: "阶段一 · 语音",
    note: "同一频道的视频课，按音素或连读主题找即可。",
  },
  {
    name: "赖世雄《美语音标》",
    kind: "书籍",
    phase: "阶段一 · 语音",
    note: "纸书或有声版都可以。用来梳理音标，不要停在「背音标表」上，每学一组就回到句子里听、跟读。",
  },
  {
    name: "ESL Pod",
    href: "https://www.eslpod.com/",
    kind: "播客 / 课程",
    phase: "阶段一 · 精听",
    note: "慢速日常对话，带文本。挑 1–2 分钟片段做四步精听即可，不必整课硬啃。",
  },
  {
    name: "BBC 6 Minute English",
    href: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
    kind: "BBC",
    phase: "阶段一 · 精听",
    note: "每周更新，语速偏稳，有文本和关键词汇。前期建议从 0.8 倍速听起。",
  },
  {
    name: "《老友记》《摩登家庭》片段",
    kind: "剧集",
    phase: "阶段一 / 三",
    note: "请使用你已有的正版播放源。先截 1–2 分钟日常对话，不要一集从头看到尾。阶段三再用来做常速盲看。",
  },
  {
    name: "All Ears English",
    href: "https://www.allearsenglish.com/",
    kind: "播客",
    phase: "阶段二 · 泛听",
    note: "语速自然、主题生活化，适合通勤磨耳朵。不求听懂每一句，抓住关键词就好。",
  },
  {
    name: "YouTube 日常生活 Vlog",
    href: "https://www.youtube.com/",
    kind: "YouTube",
    phase: "阶段二 · 泛听",
    note: "搜 daily vlog、morning routine、a day in my life。选你本来就感兴趣的主题，听到「熟悉的声音」比追求难度更重要。",
  },
  {
    name: "YouTube 街头采访 / 脱口秀片段",
    href: "https://www.youtube.com/results?search_query=street+interview+english",
    kind: "YouTube",
    phase: "阶段三 · 常速",
    note: "先开英文字幕，逐渐关掉。适应杂音、快语速和不同口音。",
  },
  {
    name: "Netflix 轻喜剧",
    kind: "流媒体",
    phase: "阶段三 · 常速",
    note: "用你已有的账号。英文字幕开着看 30 分钟，阶段后期试着关掉字幕只抓大意。",
  },
  {
    name: "Cambly",
    href: "https://www.cambly.com/",
    kind: "外教对话",
    phase: "阶段三 · 实战",
    note: "按需 1 对 1 口语。前 20 分钟用当日主题卡，后 20 分钟闲聊。",
  },
  {
    name: "Preply",
    href: "https://preply.com/",
    kind: "外教对话",
    phase: "阶段三 · 实战",
    note: "可约固定老师，方便连续四周追踪同一批话题的进步。",
  },
];

export const TTS_DISCLAIMER =
  "内置单词、例句和对话已用神经网络语音预先录好，听起来更接近自然口语。0.8× 是同一条录音变速，音调保持不变。单词旁的「真人发音」是维基共享里的真人录音；没有录音的词会打开剑桥词典对应词条。你自己写的句子没有预录音，会用机器朗读并标明。更自然的连读、气口和情绪，也欢迎回到 Rachel's English、ESL Pod、6 Minute English 等原声材料。";
