export type Scenario = {
  id: string;
  day: number;
  title: string;
  titleZh: string;
  setup: string;
  prompts: string[];
  chunks: string[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "s01", day: 1, title: "Ordering food", titleZh: "点餐",
    setup: "你走进一家不太熟的小馆子。服务员走过来，你要点一份简单的晚饭，并处理一两句追加问题（辣不辣、喝什么、要不要甜点）。",
    prompts: ["跟服务员打招呼并要一份推荐。", "清楚说出你想吃什么、不想要什么。", "结账前再确认一下有没有遗漏。"],
    chunks: ["I feel like…", "I'm not quite sure about…", "I'd appreciate it if…"],
  },
  {
    id: "s02", day: 2, title: "A work update", titleZh: "工作汇报",
    setup: "站会上轮到你了。你要用简单的话说明：昨天做了什么、今天做什么、有没有卡住的地方。不要追求完整从句，先把三件事说清楚。",
    prompts: ["用一两句概括进度。", "如果有障碍，清楚说你需要什么。", "确认下一步谁来做。"],
    chunks: ["What I'm trying to say is…", "I'll take care of…", "Does that work for you?"],
  },
  {
    id: "s03", day: 3, title: "Weekend plans", titleZh: "周末计划",
    setup: "一个朋友问你周末想干什么。你还没有完全定下来，但有两个模糊想法。试着商量出一个双方都方便的安排。",
    prompts: ["先承认自己还没想好。", "抛出一个具体但可改的建议。", "把时间确认下来。"],
    chunks: ["I'm thinking of…", "Why don't we…?", "Does that work for you?"],
  },
  {
    id: "s04", day: 4, title: "Complaining about overtime", titleZh: "吐槽加班",
    setup: "你加班到很晚，跟一个信任的同事或朋友吐槽。重点不是发泄攻击，而是把感受、原因、你下一步想怎么做说出来。",
    prompts: ["用简单的话说出你现在的状态。", "解释为什么会变成这样。", "说你打算怎么保护今晚剩下的时间。"],
    chunks: ["I'm really tired.", "What happened was…", "What I really need is…"],
  },
  {
    id: "s05", day: 5, title: "Coffee with a friend", titleZh: "约朋友喝咖啡",
    setup: "你想约一个最近没见的朋友。电话或当面都可以。你要提出时间、地点，并准备对方说「那天不行」。",
    prompts: ["开场问候，不要立刻进入事务。", "提出一个具体邀请。", "如果对方冲突，给出备选。"],
    chunks: ["It's good to see you.", "How have you been?", "Let's catch up soon."],
  },
  {
    id: "s06", day: 6, title: "Asking the way", titleZh: "问路",
    setup: "你在一个陌生街区，要去一家书店或车站。拦住一个路人，把目的地说清楚，听完后再确认一次。",
    prompts: ["礼貌地开口。", "用最简单的话说目的地。", "用自己的话重复对方的指引。"],
    chunks: ["Sorry, I missed that. Could you say it again?", "Just to make sure I'm following…", "Did I get that right?"],
  },
  {
    id: "s07", day: 7, title: "At the supermarket", titleZh: "超市购物",
    setup: "你在超市里找不到一样东西，向店员求助；结账时发现少拿了一样，再补一句。全程用短句即可。",
    prompts: ["说明你在找什么。", "感谢并确认位置。", "结账时再补一句小请求。"],
    chunks: ["I was wondering if you could…", "Could you do me a favor?", "Thanks — that's perfect."],
  },
  {
    id: "s08", day: 8, title: "At the doctor's", titleZh: "看医生",
    setup: "你因为睡眠不好或肩膀酸痛来看医生。用小学生词汇描述症状、开始时间和你已经试过的办法。",
    prompts: ["说出哪里不舒服。", "说明持续了多久。", "问下一步该怎么做。"],
    chunks: ["What I'm trying to say is…", "I'm a bit nervous about…", "So, if I understand correctly…"],
  },
  {
    id: "s09", day: 9, title: "Introducing yourself", titleZh: "自我介绍",
    setup: "在一个新的小组里，轮到你做一分钟自我介绍：你是谁、做什么、最近在忙什么、一个轻松的兴趣。不要背稿腔。",
    prompts: ["用三句介绍自己。", "提一件正在做的事。", "用一个问题把话传给别人。"],
    chunks: ["To be honest…", "I'm thinking of…", "It's good to see you."],
  },
  {
    id: "s10", day: 10, title: "Talking about the weather", titleZh: "谈论天气",
    setup: "电梯或等车时的寒暄。从天气开始，再自然转到一句真实的生活内容（通勤、周末、穿衣），然后结束对话。",
    prompts: ["先评论天气。", "接上自己的一个小计划或抱怨。", "找一个温和的收束句。"],
    chunks: ["I feel like…", "I should probably get going.", "I'll let you get back to it."],
  },
  {
    id: "s11", day: 11, title: "Viewing a rental", titleZh: "租房看房",
    setup: "你在看一套公寓，要向中介确认租金含什么、能不能养宠物或远程办公、什么时候能入住。把关心的三点问完。",
    prompts: ["先说你喜欢或不喜欢的一点。", "问两个实际问题。", "说你需要一点时间考虑。"],
    chunks: ["Just to make sure I'm following…", "I'm not quite sure about…", "I'd appreciate it if…"],
  },
  {
    id: "s12", day: 12, title: "Calling customer service", titleZh: "打电话给客服",
    setup: "一个订单晚了，或者账号登不上。你要说明问题、提供必要信息，并问清楚下一步和时限。",
    prompts: ["一句话说明来电原因。", "给出订单号或关键信息。", "确认对方接下来会做什么。"],
    chunks: ["What happened was…", "The main thing is…", "Did I get that right?"],
  },
  {
    id: "s13", day: 13, title: "Talking about a movie", titleZh: "讨论一部电影或剧",
    setup: "刚和朋友看完一部作品。你不必使用影评词汇，说你喜欢什么、哪里慢、会不会推荐即可。",
    prompts: ["给出整体感受。", "举一个具体的点。", "问对方同不同意。"],
    chunks: ["The way I see it…", "That said…", "I couldn't agree more."],
  },
  {
    id: "s14", day: 14, title: "At the gym", titleZh: "健身",
    setup: "在健身房遇到熟人，或者向教练说明今天只想做轻松的训练。把状态和界限说清楚。",
    prompts: ["说明今天的身体状态。", "说出你打算做的训练。", "礼貌地结束聊天去训练。"],
    chunks: ["I'm really tired.", "I'm thinking of…", "I'll let you get back to it."],
  },
  {
    id: "s15", day: 15, title: "Sharing a recipe", titleZh: "分享一道菜",
    setup: "有人问你昨天做的菜怎么做。用最简单的步骤讲：材料、顺序、火候或时间。卡住就说 it's kind of like…",
    prompts: ["先说这道菜是什么。", "按顺序讲三到四个步骤。", "补一个你自己的小窍门。"],
    chunks: ["It's kind of like…", "One thing you could do is…", "Let me say that in a simpler way."],
  },
  {
    id: "s16", day: 16, title: "Asking for time off", titleZh: "请假",
    setup: "你需要向经理请一个下午或一天假。说明时间、原因（不必过度坦白）、工作如何交接。",
    prompts: ["清楚提出请假时间。", "说明工作不会掉在地上。", "感谢并确认是否批准。"],
    chunks: ["I was wondering if you could…", "I'll take care of…", "Does that work for you?"],
  },
  {
    id: "s17", day: 17, title: "A delayed project", titleZh: "项目延期",
    setup: "你要向同事或客户说明项目会晚两天。先讲事实和原因，再给新的日期和你正在做的补救。",
    prompts: ["尽早、直接说出延期。", "用简单的话解释原因。", "给出新的时间和下一步。"],
    chunks: ["To be honest…", "Here's what I'll do next.", "The main thing is…"],
  },
  {
    id: "s18", day: 18, title: "Getting ready to travel", titleZh: "旅行准备",
    setup: "和同伴确认出发时间、交通、行李和一件还没订的事。把「谁负责什么」说清楚。",
    prompts: ["确认出发安排。", "提出一个还没解决的问题。", "分配各自要做的事。"],
    chunks: ["Let's aim for…", "Have you thought about…?", "I'll take care of…"],
  },
  {
    id: "s19", day: 19, title: "A rough commute", titleZh: "通勤吐槽",
    setup: "火车晚点或堵车后，你向同事或家人讲述这段经历。练习把经过讲完整，但 long story short。",
    prompts: ["用一句话先说结果。", "补上关键经过。", "说说这对你今天的影响。"],
    chunks: ["Long story short…", "What happened was…", "I'm really tired."],
  },
  {
    id: "s20", day: 20, title: "A family meal", titleZh: "家庭聚餐",
    setup: "饭桌上有人问你最近过得怎么样、工作忙不忙、什么时候再回家。用真实、简短的答案，不必汇报一切。",
    prompts: ["先回应关心。", "分享一件具体的近况。", "也问对方一个问题。"],
    chunks: ["How have you been?", "To be honest…", "It meant a lot to me."],
  },
  {
    id: "s21", day: 21, title: "Buying electronics", titleZh: "买电子产品",
    setup: "你在店里看电脑或耳机，要向店员说明需求（电池、重量、预算），并比较两个选项。",
    prompts: ["说出你最在意的一点。", "问一个对比问题。", "说你还要再想一想，或决定买哪个。"],
    chunks: ["The main thing is…", "On the other hand…", "Let me think about that for a second."],
  },
  {
    id: "s22", day: 22, title: "Talking about a hobby", titleZh: "谈论爱好",
    setup: "有人问起你最近的爱好。不要给定义，讲你什么时候做、为什么喜欢、最近的一次体验。",
    prompts: ["介绍这个爱好。", "讲最近一次具体经历。", "邀请或回答要不要一起。"],
    chunks: ["The other day…", "I feel like…", "That made my day."],
  },
  {
    id: "s23", day: 23, title: "Interview introduction", titleZh: "面试自我介绍",
    setup: "面试官说：Tell me a little about yourself. 用 60–90 秒：背景、现在做什么、为什么在这里。用简单句，不要堆形容词。",
    prompts: ["用三句说背景。", "用一句说你能为对方做什么。", "停在一个可继续的点上。"],
    chunks: ["What I'm trying to say is…", "The main thing is…", "Here's what I'll do next."],
  },
  {
    id: "s24", day: 24, title: "Disagreeing in a meeting", titleZh: "会议中提出异议",
    setup: "有人建议立刻上线，你觉得还早。先承认对方的出发点，再说你的担心和一个更小的替代方案。",
    prompts: ["先接住对方的观点。", "清楚说出你的担心。", "提出一个可执行的折中。"],
    chunks: ["I see where you're coming from.", "I'm not sure I agree with that.", "Why don't we…?"],
  },
  {
    id: "s25", day: 25, title: "Comforting a friend", titleZh: "安慰朋友",
    setup: "朋友状态不好。你的任务不是给完美建议，而是倾听、承认感受，并在对方需要时陪伴。",
    prompts: ["先让对方不用着急说。", "承认这件事很难。", "提出一个很小的具体陪伴。"],
    chunks: ["I get it, but I still think…", "It meant a lot to me.", "I'm here. We can just sit here for a bit."],
  },
  {
    id: "s26", day: 26, title: "Sharing a piece of news", titleZh: "分享一条新闻或变化",
    setup: "你刚看到一条和工作或城市有关的消息，想讲给同事听。先说事实，再说你的看法，并问对方怎么看。",
    prompts: ["用一两句讲清事实。", "给出你的看法。", "请对方评论。"],
    chunks: ["It turns out that…", "The way I see it…", "What do you think?"],
  },
  {
    id: "s27", day: 27, title: "Making a study plan", titleZh: "制定学习计划",
    setup: "你和自己（或一个同伴）约定接下来四周如何继续练英语。把时间窗口、长度、检查方式说清楚，并故意把它定小一点。",
    prompts: ["提出一个很小的日常习惯。", "说明忙的时候如何降级。", "约定如何检查。"],
    chunks: ["Let's aim for…", "We can figure it out as we go.", "If I were you, I'd…"],
  },
  {
    id: "s28", day: 28, title: "Looking back on four weeks", titleZh: "回顾这四周",
    setup: "对一个朋友（或对着录音）回顾这 28 天：哪里有进步、还卡在哪儿、下一阶段你想保留什么习惯。",
    prompts: ["说出一个具体的进步。", "承认一个仍然困难的点。", "说出下一步你要继续做的一件事。"],
    chunks: ["To be honest…", "At first I thought… but then…", "Here's what I'll do next."],
  },
];

export function scenarioForPhaseDay(day: number): Scenario {
  const d = ((Math.max(1, day) - 1) % 28) + 1;
  return SCENARIOS.find((s) => s.day === d)!;
}
