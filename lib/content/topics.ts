export type Topic = {
  id: string;
  title: string;
  titleZh: string;
  minutesHint: string;
  prompts: { text: string; zh: string }[];
};

export const FIXED_TOPICS: Topic[] = [
  {
    id: "tech",
    title: "Technology and tools",
    titleZh: "技术与工具",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "What tool do you use every day, and why?", zh: "你每天都在用的工具是什么，为什么？" },
      { text: "Is there a piece of technology you could live without?", zh: "有没有一样科技产品，没有它你也能过？" },
      { text: "How do you feel about AI in your work?", zh: "你怎么看人工智能用在你的工作里？" },
      { text: "Describe a time a tool made your work easier — or harder.", zh: "讲一次某个工具让你的工作变轻松——或变更难——的经历。" },
    ],
  },
  {
    id: "hobby",
    title: "Hobbies and free time",
    titleZh: "兴趣爱好",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "What do you like to do when you have a free evening?", zh: "有一个空闲的晚上，你喜欢做什么？" },
      { text: "Is there a hobby you stopped and want to pick up again?", zh: "有没有一个停掉了、但又想重新捡起来的爱好？" },
      { text: "How do you usually rest after a long week?", zh: "忙碌一周之后，你通常怎么休息？" },
      { text: "Teach me the basics of something you enjoy.", zh: "教我一点你喜欢做的事的入门方法。" },
    ],
  },
  {
    id: "travel",
    title: "Travel and places",
    titleZh: "旅行与地方",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "Tell me about a place you liked, even a short trip.", zh: "讲一个你喜欢的地方，哪怕只是一次短途。" },
      { text: "Do you prefer planning a trip or just going?", zh: "你更喜欢把旅行计划好，还是说走就走？" },
      { text: "What's something you always pack?", zh: "有什么东西是你出行总会带上的？" },
      { text: "If you had three days off, where would you go?", zh: "如果有三天假，你会去哪里？" },
    ],
  },
  {
    id: "work",
    title: "Work and study",
    titleZh: "工作与学习",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "What does a normal workday look like for you?", zh: "你平常的工作日是怎么过的？" },
      { text: "What part of your work feels meaningful?", zh: "你工作里哪一部分让你觉得有意义？" },
      { text: "How do you handle a busy week?", zh: "遇到忙碌的一周，你是怎么应对的？" },
      { text: "What's something you're trying to get better at?", zh: "有什么事是你正在努力做得更好的？" },
    ],
  },
  {
    id: "food",
    title: "Food and cooking",
    titleZh: "饮食与做饭",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "What did you eat today?", zh: "你今天吃了什么？" },
      { text: "Is there a simple dish you can cook well?", zh: "有没有一道你做得还不错的简单菜？" },
      { text: "Do you prefer eating out or cooking at home?", zh: "你更喜欢外出吃饭，还是在家做？" },
      { text: "Tell me about a meal you remember.", zh: "讲一顿你还记得的饭。" },
    ],
  },
  {
    id: "city",
    title: "City life",
    titleZh: "城市生活",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "How do you usually get around?", zh: "你平时怎么出行？" },
      { text: "What's something you like about where you live?", zh: "你住的地方，有什么是你喜欢的？" },
      { text: "What's something you'd change in your city?", zh: "你的城市里，有什么是你想改的？" },
      { text: "Describe your neighborhood in simple words.", zh: "用简单的话形容一下你住的街区。" },
    ],
  },
  {
    id: "health",
    title: "Health and habits",
    titleZh: "健康与习惯",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "What helps you sleep better?", zh: "什么能让你睡得更好？" },
      { text: "Do you have a morning routine, even a small one?", zh: "你早上有固定的小习惯吗？哪怕很简单。" },
      { text: "How do you reset when you feel worn out?", zh: "觉得精疲力尽的时候，你怎么让自己缓过来？" },
      { text: "Is there a habit you're trying to build this month?", zh: "这个月有没有一个你想养成的习惯？" },
    ],
  },
  {
    id: "learning",
    title: "Learning English",
    titleZh: "学英语这件事",
    minutesHint: "前 20 分钟",
    prompts: [
      { text: "When did you last feel proud of your English?", zh: "你上一次为自己的英语感到骄傲是什么时候？" },
      { text: "What still feels hard: listening, speaking, or starting?", zh: "现在还觉得难的是什么：听、说，还是迈出第一步？" },
      { text: "How do you practice on a busy day?", zh: "忙碌的一天里，你怎么练习？" },
      { text: "What do you want to be able to do in three months?", zh: "三个月后，你希望自己能做到什么？" },
    ],
  },
];

export type Prompt = { text: string; zh: string };

export const SMALL_TALK: Prompt[] = [
  { text: "How has your week been so far?", zh: "你这周过得怎么样？" },
  { text: "Did you do anything nice yesterday?", zh: "昨天有没有做什么开心的事？" },
  { text: "Have you been watching anything lately?", zh: "你最近在看什么吗？" },
  { text: "What's the weather like where you are?", zh: "你那边天气怎么样？" },
  { text: "Have you had your coffee yet today?", zh: "你今天喝咖啡了吗？" },
  { text: "What's one small thing that made you smile this week?", zh: "这周有哪件小事让你笑了？" },
  { text: "Are you a morning person or a night person?", zh: "你是早起的人，还是夜猫子？" },
  { text: "What's on your plate for the rest of the day?", zh: "今天剩下的时间，你还要忙些什么？" },
  { text: "Do you have any plans for the weekend?", zh: "这个周末你有什么安排吗？" },
  { text: "What's something you've been meaning to do but keep putting off?", zh: "有什么事是你一直想做、却总在往后推的？" },
  { text: "If you could eat one meal right now, what would it be?", zh: "如果现在只能吃一顿，你会选什么？" },
  { text: "What's a song or podcast you've had on repeat?", zh: "有哪首歌或播客是你最近反复在听的？" },
  { text: "Have you been outside much today?", zh: "你今天出门多吗？" },
  { text: "What's the last photo you took on your phone?", zh: "你手机里最近一张照片是什么？" },
  { text: "Do you prefer texting or a quick call?", zh: "你更喜欢发消息，还是直接打个短电话？" },
  { text: "What's something you're looking forward to?", zh: "你在期待着什么？" },
  { text: "Is there a shop or café near you that you like?", zh: "你附近有没有一家你喜欢的店或咖啡馆？" },
  { text: "What's the most useful app on your phone?", zh: "你手机里最有用的应用是哪个？" },
  { text: "Have you cooked anything recently?", zh: "你最近做过饭吗？" },
  { text: "What's a book, video, or article you remember from this month?", zh: "这个月有没有哪本书、视频或文章让你记得住？" },
  { text: "How do you usually spend Sunday evenings?", zh: "你周日晚上通常怎么过？" },
  { text: "What's one thing you want to keep simple this week?", zh: "这周有哪件事你想尽量保持简单？" },
  { text: "Did anything unexpected happen today?", zh: "今天有没有出乎意料的事？" },
  { text: "What's a small comfort you like after work?", zh: "下班后，你有什么小小的慰藉是自己喜欢的？" },
  { text: "If you had an extra hour today, how would you use it?", zh: "如果今天多出一小时，你会用来做什么？" },
  { text: "Are you more of a walker or a stay-at-home person on weekends?", zh: "周末你更喜欢出去走走，还是待在家里？" },
  { text: "What's something you recently learned how to do?", zh: "你最近学会了做什么？" },
  { text: "Do you like working in silence or with some background sound?", zh: "你工作时喜欢安静，还是喜欢有一点背景声？" },
  { text: "What's a place in your city you'd take a visitor?", zh: "如果有人来你的城市，你会带他去哪儿？" },
  { text: "What's one thing you're glad you said no to lately?", zh: "最近有哪件事是你庆幸自己拒绝了的？" },
  { text: "Have you talked to a friend or family member this week?", zh: "这周你跟朋友或家人聊过吗？" },
  { text: "What's your go-to breakfast when you're in a hurry?", zh: "赶时间的时候，你通常吃什么早餐？" },
  { text: "Is there a chore you actually don't mind doing?", zh: "有没有一件家务是你其实并不讨厌做的？" },
  { text: "What's something you used to dislike but now don't mind?", zh: "有什么事是你以前不喜欢、现在却不那么反感了的？" },
  { text: "If this conversation had to end in two minutes, what would you still want to ask?", zh: "如果这场谈话两分钟后必须结束，你还想问什么？" },
  { text: "What's a recent decision you felt okay about?", zh: "最近有哪个决定是你觉得还做得不错的？" },
  { text: "Do you collect anything, even unofficially?", zh: "你有没有在收集什么，哪怕只是随手攒着？" },
  { text: "What's the view from your window like?", zh: "你窗外的景色是什么样的？" },
  { text: "Have you changed a habit this year, even a little?", zh: "今年你有没有改掉或养成一个习惯，哪怕只是一点点？" },
  { text: "What's something ordinary you noticed today?", zh: "你今天注意到了哪件平常的小事？" }
];

export function randomSmallTalk(n = 6, except: Prompt[] = []): Prompt[] {
  const skip = new Set(except.map((s) => s.text));
  const pool = SMALL_TALK.filter((s) => !skip.has(s.text));
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}
