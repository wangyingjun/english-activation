export type Chunk = {
  id: string;
  func: string;
  text: string;
  note: string;
  example: string;
};

export const FUNCS = [
  "观点",
  "犹豫",
  "转折",
  "确认",
  "请求",
  "同意 / 反对",
  "讲故事",
  "感受",
  "建议",
  "澄清",
  "计划",
  "社交开合",
  "补救 / 绕开",
  "总结",
] as const;

export const CHUNKS: Chunk[] = [
  { id: "c01", func: "观点", text: "What I'm trying to say is…", note: "想法还没说圆的时候，用它把核心再讲清楚一遍。", example: "What I'm trying to say is, we need more time, not more people." },
  { id: "c02", func: "观点", text: "The way I see it…", note: "温和地给出自己的看法，不显得强硬。", example: "The way I see it, we should start small." },
  { id: "c03", func: "观点", text: "I feel like…", note: "日常里最常用的「我觉得」，比 I think 更口语。", example: "I feel like this meeting could have been an email." },
  { id: "c04", func: "观点", text: "If you ask me…", note: "主动给出意见，但把选择权留给对方。", example: "If you ask me, the first option is good enough." },
  { id: "c05", func: "观点", text: "To be honest…", note: "要把真话轻轻放出来时用，注意语气不要太冲。", example: "To be honest, I didn't really like the plan." },

  { id: "c06", func: "犹豫", text: "I'm not quite sure about…", note: "还没想清楚、先占住话头，避免沉默。", example: "I'm not quite sure about the date, but Thursday might work." },
  { id: "c07", func: "犹豫", text: "Let me think about that for a second.", note: "争取 3 秒思考时间，比卡住说「那个那个」体面得多。", example: "Let me think about that for a second. Okay, I can do Friday morning." },
  { id: "c08", func: "犹豫", text: "That's a good question.", note: "被问住时先接一句，给自己组织语言的空间。", example: "That's a good question. I haven't looked at the numbers yet." },
  { id: "c09", func: "犹豫", text: "How should I put it…", note: "在找更合适的说法，不必立刻抛出完美句子。", example: "How should I put it… it's not bad, it's just not ready." },
  { id: "c10", func: "犹豫", text: "I might be wrong, but…", note: "降低自己观点的攻击性，适合还不太确定的时候。", example: "I might be wrong, but I think the shop is closed on Mondays." },

  { id: "c11", func: "转折", text: "It turns out that…", note: "结果和预想不一样，用来讲「后来发现」。", example: "It turns out that the restaurant doesn't take reservations." },
  { id: "c12", func: "转折", text: "That said…", note: "先承认前面的话，再补上另一面。", example: "I like the idea. That said, we don't have the budget this month." },
  { id: "c13", func: "转折", text: "On the other hand…", note: "摆出相反的考虑，适合讨论利弊。", example: "It's cheaper. On the other hand, it takes much longer." },
  { id: "c14", func: "转折", text: "Having said that…", note: "和 that said 相近，略正式一点，会议里很好用。", example: "The design looks clean. Having said that, it's hard to use on a phone." },
  { id: "c15", func: "转折", text: "It's not that… it's just that…", note: "先排除误解，再解释真正的原因。", example: "It's not that I don't want to go, it's just that I'm exhausted." },

  { id: "c16", func: "确认", text: "Just to make sure I'm following…", note: "怕听错的时候，用自己的话复述一遍。", example: "Just to make sure I'm following, you want us to send this today, right?" },
  { id: "c17", func: "确认", text: "Do you mean…?", note: "最直接的确认。短、清楚、不尴尬。", example: "Do you mean the meeting is moved to Friday?" },
  { id: "c18", func: "确认", text: "So, if I understand correctly…", note: "把对方的意思总结出来，让对方点头或纠正。", example: "So, if I understand correctly, we'll wait until we have the data." },
  { id: "c19", func: "确认", text: "Are you saying that…?", note: "用来核对关键结论，尤其是涉及决定的时候。", example: "Are you saying that we should cancel the trip?" },
  { id: "c20", func: "确认", text: "Did I get that right?", note: "复述之后补上这句，把球传回对方。", example: "You need it before noon. Did I get that right?" },

  { id: "c21", func: "请求", text: "Would you mind…?", note: "比 Can you 更软，适合请别人帮忙或让一步。", example: "Would you mind if we talked about this tomorrow?" },
  { id: "c22", func: "请求", text: "I was wondering if you could…", note: "比较客气的请求，邮件和口头都常用。", example: "I was wondering if you could take a look at this tonight." },
  { id: "c23", func: "请求", text: "Could you do me a favor?", note: "开口请人帮忙前的引子，后面再接具体事。", example: "Could you do me a favor and save me a seat?" },
  { id: "c24", func: "请求", text: "Is there any chance you could…?", note: "知道对方可能忙或不方便，先把退路留好。", example: "Is there any chance you could join the call at four?" },
  { id: "c25", func: "请求", text: "I'd appreciate it if…", note: "礼貌且清楚，适合对同事或不太熟的人。", example: "I'd appreciate it if you could send the file today." },

  { id: "c26", func: "同意 / 反对", text: "That's a fair point.", note: "即使不完全同意，也先承认对方说得有道理。", example: "That's a fair point. We should think about the cost." },
  { id: "c27", func: "同意 / 反对", text: "I see where you're coming from.", note: "表示理解对方立场，不等于立刻答应。", example: "I see where you're coming from, but I still prefer the first plan." },
  { id: "c28", func: "同意 / 反对", text: "I'm not sure I agree with that.", note: "温和但明确的反对，比 You're wrong 安全得多。", example: "I'm not sure I agree with that. The data shows something else." },
  { id: "c29", func: "同意 / 反对", text: "I couldn't agree more.", note: "强烈同意。用的时候要真心，否则会显得夸张。", example: "I couldn't agree more. We need to keep it simple." },
  { id: "c30", func: "同意 / 反对", text: "I get it, but I still think…", note: "先接住，再坚持自己的判断。", example: "I get it, but I still think we should wait one more day." },

  { id: "c31", func: "讲故事", text: "The other day…", note: "开始讲一件最近发生的小事，非常生活化。", example: "The other day I ran into my old teacher on the subway." },
  { id: "c32", func: "讲故事", text: "What happened was…", note: "对方在听原因或经过时，用它把故事拉出来。", example: "What happened was, I missed the first train and everything ran late." },
  { id: "c33", func: "讲故事", text: "Long story short…", note: "细节太多时，直接切到结论。", example: "Long story short, we got there just in time." },
  { id: "c34", func: "讲故事", text: "You'll never believe this, but…", note: "引起兴趣的开场，适合讲意外的小事。", example: "You'll never believe this, but the shop was already closed at five." },
  { id: "c35", func: "讲故事", text: "At first I thought… but then…", note: "把前后对比讲清楚，故事会立刻有结构。", example: "At first I thought it was a mistake, but then I saw the email." },

  { id: "c36", func: "感受", text: "I'm really tired.", note: "先用小学生词汇。不必一上来就 exhausted、drained。", example: "I'm really tired. I think I'll go home after this." },
  { id: "c37", func: "感受", text: "That made my day.", note: "表达一件小事带来的开心，比 I'm very happy 更自然。", example: "Your message made my day." },
  { id: "c38", func: "感受", text: "I'm a bit nervous about…", note: "承认紧张并不丢分，反而让对话更真。", example: "I'm a bit nervous about the call tomorrow." },
  { id: "c39", func: "感受", text: "It meant a lot to me.", note: "感谢或被帮助之后，把分量说出来。", example: "You stayed late to help. It meant a lot to me." },
  { id: "c40", func: "感受", text: "I wasn't expecting that.", note: "惊讶、意外，可好可坏，靠语气完成。", example: "I wasn't expecting that. That's really kind of you." },

  { id: "c41", func: "建议", text: "Have you thought about…?", note: "给建议时先问，而不是下命令。", example: "Have you thought about leaving a bit earlier?" },
  { id: "c42", func: "建议", text: "It might be worth…", note: "轻轻推一个选项，给对方保留否决权。", example: "It might be worth writing a short outline first." },
  { id: "c43", func: "建议", text: "Why don't we…?", note: "把「你该」变成「我们一起」，合作感更强。", example: "Why don't we take a ten-minute break?" },
  { id: "c44", func: "建议", text: "One thing you could do is…", note: "只抛一个可执行的下一步，避免建议清单太长。", example: "One thing you could do is send a quick update today." },
  { id: "c45", func: "建议", text: "If I were you, I'd…", note: "代入对方位置给建议，语气要松，不要变成说教。", example: "If I were you, I'd ask for one more day." },

  { id: "c46", func: "澄清", text: "Sorry, I missed that. Could you say it again?", note: "没听清就直接问，比装懂更有效。", example: "Sorry, I missed that. Could you say it again a little slower?" },
  { id: "c47", func: "澄清", text: "What do you mean by…?", note: "某个词或说法不清楚时，定点提问。", example: "What do you mean by 'soon'? Today, or this week?" },
  { id: "c48", func: "澄清", text: "Can I just jump in for a second?", note: "想插话但不想打断得很无礼。", example: "Can I just jump in for a second? I have a small update." },
  { id: "c49", func: "澄清", text: "Let me make sure I said that clearly.", note: "自己说乱了，主动重来一遍，比继续绕好。", example: "Let me make sure I said that clearly. I can join, but only after three." },
  { id: "c50", func: "澄清", text: "In other words…", note: "用更简单的话把刚才的意思再说一次。", example: "In other words, we can start, but we can't finish today." },

  { id: "c51", func: "计划", text: "I'm thinking of…", note: "还不是最终决定，只是在分享打算。", example: "I'm thinking of staying home this weekend." },
  { id: "c52", func: "计划", text: "Let's aim for…", note: "给出一个可调整的目标时间或结果。", example: "Let's aim for Thursday, and we can move it if we have to." },
  { id: "c53", func: "计划", text: "I'll take care of…", note: "主动认领一件事，会议里特别好用。", example: "I'll take care of the slides. You can handle the numbers." },
  { id: "c54", func: "计划", text: "We can figure it out as we go.", note: "不必现在把每一步订死，先开始。", example: "We don't have every detail. We can figure it out as we go." },
  { id: "c55", func: "计划", text: "Does that work for you?", note: "提出安排后，把决定权交回对方。", example: "I can do 7 p.m. Does that work for you?" },

  { id: "c56", func: "社交开合", text: "It's good to see you.", note: "比 Long time no see 更自然，熟或不太熟都能用。", example: "It's good to see you. How have you been?" },
  { id: "c57", func: "社交开合", text: "How have you been?", note: "比 How are you 更像真的在问近况。", example: "How have you been? It's been a while." },
  { id: "c58", func: "社交开合", text: "I should probably get going.", note: "想结束对话时的软着陆，不要突然消失。", example: "I should probably get going. I'll text you later." },
  { id: "c59", func: "社交开合", text: "Let's catch up soon.", note: "结束时保持联系的一句，后面最好再补一个大致时间。", example: "Let's catch up soon. Maybe next week?" },
  { id: "c60", func: "社交开合", text: "I'll let you get back to it.", note: "对方显然在忙时，主动结束，显得体贴。", example: "I can see you're busy. I'll let you get back to it." },

  { id: "c61", func: "补救 / 绕开", text: "The system is very complex.", note: "这就是铁律里的小学生词汇：不会说 intricate architecture，就这样说。", example: "I can't explain every part. The system is very complex." },
  { id: "c62", func: "补救 / 绕开", text: "I can't think of the word, but I mean…", note: "卡词时不要停住，用解释把意思送出去。", example: "I can't think of the word, but I mean the thing you use to open a bottle." },
  { id: "c63", func: "补救 / 绕开", text: "It's kind of like…", note: "用类比代替精确词汇，先把画面建立起来。", example: "It's kind of like a shared notebook, but for the whole team." },
  { id: "c64", func: "补救 / 绕开", text: "Let me say that in a simpler way.", note: "自己觉得说复杂了，立刻降级重说。", example: "Let me say that in a simpler way. We need to start over." },
  { id: "c65", func: "补救 / 绕开", text: "What I really need is…", note: "绕了半天时，直接说出核心需求。", example: "What I really need is one quiet hour to finish this." },

  { id: "c66", func: "总结", text: "So, to sum up…", note: "把刚才的讨论收成一句，方便对方记住。", example: "So, to sum up, I'll send the draft, and you'll review it tomorrow." },
  { id: "c67", func: "总结", text: "The main thing is…", note: "去掉枝节，只留最重要的一点。", example: "The main thing is that we don't miss the deadline." },
  { id: "c68", func: "总结", text: "At the end of the day…", note: "回到根本判断，适合讨论拉锯之后。", example: "At the end of the day, we have to choose the simpler option." },
  { id: "c69", func: "总结", text: "Here's what I'll do next.", note: "结束对话前给出自己的下一步，避免散会后没人行动。", example: "Here's what I'll do next: I'll email them and update the group." },
  { id: "c70", func: "总结", text: "Let's leave it there for now.", note: "这次先到这里，以后再续，干净利落地收束。", example: "Let's leave it there for now and pick this up on Monday." },
];

export function chunksForPhaseDay(day: number): { chunks: Chunk[]; review: boolean } {
  const d = ((Math.max(1, day) - 1) % 28) + 1;
  if (d <= 14) {
    const start = (d - 1) * 5;
    return { chunks: CHUNKS.slice(start, start + 5), review: false };
  }
  const start = (d - 15) * 5;
  return { chunks: CHUNKS.slice(start, start + 5), review: true };
}

export function chunkById(id: string): Chunk | undefined {
  return CHUNKS.find((c) => c.id === id);
}
