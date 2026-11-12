export type Topic = {
  id: string;
  title: string;
  titleZh: string;
  minutesHint: string;
  prompts: string[];
};

export const FIXED_TOPICS: Topic[] = [
  {
    id: "tech",
    title: "Technology and tools",
    titleZh: "技术与工具",
    minutesHint: "前 20 分钟",
    prompts: [
      "What tool do you use every day, and why?",
      "Is there a piece of technology you could live without?",
      "How do you feel about AI in your work?",
      "Describe a time a tool made your work easier — or harder.",
    ],
  },
  {
    id: "hobby",
    title: "Hobbies and free time",
    titleZh: "兴趣爱好",
    minutesHint: "前 20 分钟",
    prompts: [
      "What do you like to do when you have a free evening?",
      "Is there a hobby you stopped and want to pick up again?",
      "How do you usually rest after a long week?",
      "Teach me the basics of something you enjoy.",
    ],
  },
  {
    id: "travel",
    title: "Travel and places",
    titleZh: "旅行与地方",
    minutesHint: "前 20 分钟",
    prompts: [
      "Tell me about a place you liked, even a short trip.",
      "Do you prefer planning a trip or just going?",
      "What's something you always pack?",
      "If you had three days off, where would you go?",
    ],
  },
  {
    id: "work",
    title: "Work and study",
    titleZh: "工作与学习",
    minutesHint: "前 20 分钟",
    prompts: [
      "What does a normal workday look like for you?",
      "What part of your work feels meaningful?",
      "How do you handle a busy week?",
      "What's something you're trying to get better at?",
    ],
  },
  {
    id: "food",
    title: "Food and cooking",
    titleZh: "饮食与做饭",
    minutesHint: "前 20 分钟",
    prompts: [
      "What did you eat today?",
      "Is there a simple dish you can cook well?",
      "Do you prefer eating out or cooking at home?",
      "Tell me about a meal you remember.",
    ],
  },
  {
    id: "city",
    title: "City life",
    titleZh: "城市生活",
    minutesHint: "前 20 分钟",
    prompts: [
      "How do you usually get around?",
      "What's something you like about where you live?",
      "What's something you'd change in your city?",
      "Describe your neighborhood in simple words.",
    ],
  },
  {
    id: "health",
    title: "Health and habits",
    titleZh: "健康与习惯",
    minutesHint: "前 20 分钟",
    prompts: [
      "What helps you sleep better?",
      "Do you have a morning routine, even a small one?",
      "How do you reset when you feel worn out?",
      "Is there a habit you're trying to build this month?",
    ],
  },
  {
    id: "learning",
    title: "Learning English",
    titleZh: "学英语这件事",
    minutesHint: "前 20 分钟",
    prompts: [
      "When did you last feel proud of your English?",
      "What still feels hard: listening, speaking, or starting?",
      "How do you practice on a busy day?",
      "What do you want to be able to do in three months?",
    ],
  },
];

export const SMALL_TALK: string[] = [
  "How has your week been so far?",
  "Did you do anything nice yesterday?",
  "Have you been watching anything lately?",
  "What's the weather like where you are?",
  "Have you had your coffee yet today?",
  "What's one small thing that made you smile this week?",
  "Are you a morning person or a night person?",
  "What's on your plate for the rest of the day?",
  "Do you have any plans for the weekend?",
  "What's something you've been meaning to do but keep putting off?",
  "If you could eat one meal right now, what would it be?",
  "What's a song or podcast you've had on repeat?",
  "Have you been outside much today?",
  "What's the last photo you took on your phone?",
  "Do you prefer texting or a quick call?",
  "What's something you're looking forward to?",
  "Is there a shop or café near you that you like?",
  "What's the most useful app on your phone?",
  "Have you cooked anything recently?",
  "What's a book, video, or article you remember from this month?",
  "How do you usually spend Sunday evenings?",
  "What's one thing you want to keep simple this week?",
  "Did anything unexpected happen today?",
  "What's a small comfort you like after work?",
  "If you had an extra hour today, how would you use it?",
  "Are you more of a walker or a stay-at-home person on weekends?",
  "What's something you recently learned how to do?",
  "Do you like working in silence or with some background sound?",
  "What's a place in your city you'd take a visitor?",
  "What's one thing you're glad you said no to lately?",
  "Have you talked to a friend or family member this week?",
  "What's your go-to breakfast when you're in a hurry?",
  "Is there a chore you actually don't mind doing?",
  "What's something you used to dislike but now don't mind?",
  "If this conversation had to end in two minutes, what would you still want to ask?",
  "What's a recent decision you felt okay about?",
  "Do you collect anything, even unofficially?",
  "What's the view from your window like?",
  "Have you changed a habit this year, even a little?",
  "What's something ordinary you noticed today?",
];

export function randomSmallTalk(n = 6, except: string[] = []): string[] {
  const pool = SMALL_TALK.filter((s) => !except.includes(s));
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}
