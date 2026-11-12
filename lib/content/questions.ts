export type DrillQuestion = { text: string; zh: string };

export const DRILL_QUESTIONS: DrillQuestion[] = [
  { text: "How are you doing today?", zh: "你今天过得怎么样？" },
  { text: "What did you do this morning?", zh: "你今天早上做了什么？" },
  { text: "Have you eaten yet?", zh: "你吃饭了吗？" },
  { text: "What are you working on right now?", zh: "你现在在忙什么？" },
  { text: "How was your weekend?", zh: "你周末过得怎么样？" },
  { text: "Can you tell me a little about yourself?", zh: "能跟我简单说说你自己吗？" },
  { text: "What do you do for work?", zh: "你是做什么工作的？" },
  { text: "Where are you from?", zh: "你是哪里人？" },
  { text: "Do you live nearby?", zh: "你住在附近吗？" },
  { text: "How long have you lived there?", zh: "你在那儿住多久了？" },
  { text: "What do you like to do after work?", zh: "下班以后你喜欢做什么？" },
  { text: "Are you free this weekend?", zh: "这个周末你有空吗？" },
  { text: "What did you have for lunch?", zh: "你午饭吃了什么？" },
  { text: "How do you usually get to work?", zh: "你平时怎么去上班？" },
  { text: "Is this a busy week for you?", zh: "你这周忙吗？" },
  { text: "What's the weather like today?", zh: "今天天气怎么样？" },
  { text: "Have you been here before?", zh: "你以前来过这儿吗？" },
  { text: "What time do you usually wake up?", zh: "你平时几点起床？" },
  { text: "Can I get you anything to drink?", zh: "给你拿点喝的吗？" },
  { text: "Do you want to sit inside or outside?", zh: "你想坐里面还是外面？" },
  { text: "Sorry, could you say that again?", zh: "抱歉，你能再说一遍吗？" },
  { text: "What do you mean by that?", zh: "你这话是什么意思？" },
  { text: "Do you have a minute?", zh: "你有空聊一会儿吗？" },
  { text: "When can you send that over?", zh: "你什么时候能发过来？" },
  { text: "Is everything okay?", zh: "一切都还好吗？" },
  { text: "What would you like to do first?", zh: "你想先做什么？" },
  { text: "How do you feel about this plan?", zh: "你觉得这个计划怎么样？" },
  { text: "Can we move the meeting to tomorrow?", zh: "我们能把会议改到明天吗？" },
  { text: "Do you need any help?", zh: "需要帮忙吗？" },
  { text: "What's the main problem right now?", zh: "眼下最主要的问题是什么？" },
  { text: "Are you ready to get started?", zh: "可以开始了吗？" },
  { text: "What time works for you?", zh: "你什么时间方便？" },
  { text: "Should we wait for the others?", zh: "我们要不要等其他人？" },
  { text: "Did you get my message?", zh: "你收到我的消息了吗？" },
  { text: "How did the meeting go?", zh: "会开得怎么样？" },
  { text: "What's next on your list?", zh: "你接下来要做哪一件？" },
  { text: "Do you prefer tea or coffee?", zh: "你更喜欢茶还是咖啡？" },
  { text: "Have you tried this place before?", zh: "你以前来过这家店吗？" },
  { text: "What brought you here today?", zh: "你今天是怎么过来的／因为什么来的？" },
  { text: "Can you walk me through that quickly?", zh: "你能很快带我过一遍吗？" },
  { text: "Is there anything else I should know?", zh: "还有什么是我应该知道的吗？" },
  { text: "How long will that take?", zh: "那要花多久？" },
  { text: "Do you want to talk about it?", zh: "你想聊聊这件事吗？" },
  { text: "What are you looking forward to?", zh: "你在期待什么？" },
  { text: "Did anything interesting happen today?", zh: "今天有什么有意思的事吗？" },
  { text: "Would you like to join us?", zh: "要不要跟我们一起？" },
  { text: "Can you give me an example?", zh: "你能举个例子吗？" },
  { text: "What's your plan for tonight?", zh: "你今晚有什么打算？" },
  { text: "How's your family doing?", zh: "你家人都好吗？" },
  { text: "If you had a free afternoon, what would you do?", zh: "如果有一个空闲的下午，你会做什么？" }
];

export function pickQuestions(n = 8): DrillQuestion[] {
  const copy = [...DRILL_QUESTIONS];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}
