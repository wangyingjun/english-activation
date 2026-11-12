export type Chunk = {
  id: string;
  func: string;
  text: string;
  meaning: string;
  note: string;
  example: string;
  exampleZh: string;
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
  { id: "c01", func: "观点", text: "What I'm trying to say is…", meaning: "我想说的其实是……", note: "想法还没说圆的时候，用它把核心再讲清楚一遍。", example: "What I'm trying to say is, we need more time, not more people.", exampleZh: "我想说的其实是：我们需要的是更多时间，不是更多人。" },
  { id: "c02", func: "观点", text: "The way I see it…", meaning: "在我看来……", note: "温和地给出自己的看法，不显得强硬。", example: "The way I see it, we should start small.", exampleZh: "在我看来，我们应该从小处做起。" },
  { id: "c03", func: "观点", text: "I feel like…", meaning: "我觉得……／感觉好像……", note: "日常里最常用的「我觉得」，比 I think 更口语。", example: "I feel like this meeting could have been an email.", exampleZh: "我觉得这次开会发一封邮件就够了。" },
  { id: "c04", func: "观点", text: "If you ask me…", meaning: "要我说的话……", note: "主动给出意见，但把选择权留给对方。", example: "If you ask me, the first option is good enough.", exampleZh: "要我说的话，第一个方案已经够好了。" },
  { id: "c05", func: "观点", text: "To be honest…", meaning: "说实话……", note: "要把真话轻轻放出来时用，注意语气不要太冲。", example: "To be honest, I didn't really like the plan.", exampleZh: "说实话，我其实不太喜欢这个计划。" },

  { id: "c06", func: "犹豫", text: "I'm not quite sure about…", meaning: "我对……还不太有把握。", note: "还没想清楚、先占住话头，避免沉默。", example: "I'm not quite sure about the date, but Thursday might work.", exampleZh: "日期我还不太有把握，不过周四也许可以。" },
  { id: "c07", func: "犹豫", text: "Let me think about that for a second.", meaning: "让我想一下。", note: "争取 3 秒思考时间，比卡住说「那个那个」体面得多。", example: "Let me think about that for a second. Okay, I can do Friday morning.", exampleZh: "让我想一下。好，周五上午我可以。" },
  { id: "c08", func: "犹豫", text: "That's a good question.", meaning: "这问题问得好。", note: "被问住时先接一句，给自己组织语言的空间。", example: "That's a good question. I haven't looked at the numbers yet.", exampleZh: "这问题问得好。数字我还没看。" },
  { id: "c09", func: "犹豫", text: "How should I put it…", meaning: "我该怎么说呢……", note: "在找更合适的说法，不必立刻抛出完美句子。", example: "How should I put it… it's not bad, it's just not ready.", exampleZh: "我该怎么说呢……不是不好，只是还没准备好。" },
  { id: "c10", func: "犹豫", text: "I might be wrong, but…", meaning: "也许我错了，不过……", note: "降低自己观点的攻击性，适合还不太确定的时候。", example: "I might be wrong, but I think the shop is closed on Mondays.", exampleZh: "也许我错了，不过这家店周一好像不开门。" },

  { id: "c11", func: "转折", text: "It turns out that…", meaning: "结果发现……", note: "结果和预想不一样，用来讲「后来发现」。", example: "It turns out that the restaurant doesn't take reservations.", exampleZh: "结果发现那家餐厅不接受预订。" },
  { id: "c12", func: "转折", text: "That said…", meaning: "话虽如此……", note: "先承认前面的话，再补上另一面。", example: "I like the idea. That said, we don't have the budget this month.", exampleZh: "我喜欢这个想法。话虽如此，这个月我们没有这笔预算。" },
  { id: "c13", func: "转折", text: "On the other hand…", meaning: "另一方面……", note: "摆出相反的考虑，适合讨论利弊。", example: "It's cheaper. On the other hand, it takes much longer.", exampleZh: "这个更便宜。另一方面，花的时间也长得多。" },
  { id: "c14", func: "转折", text: "Having said that…", meaning: "不过话说回来……", note: "和 that said 相近，略正式一点，会议里很好用。", example: "The design looks clean. Having said that, it's hard to use on a phone.", exampleZh: "设计看起来很干净。不过话说回来，在手机上不太好用。" },
  { id: "c15", func: "转折", text: "It's not that… it's just that…", meaning: "不是……，只是……", note: "先排除误解，再解释真正的原因。", example: "It's not that I don't want to go, it's just that I'm exhausted.", exampleZh: "不是我不想去，只是我实在太累了。" },

  { id: "c16", func: "确认", text: "Just to make sure I'm following…", meaning: "我确认一下，我理解的是……", note: "怕听错的时候，用自己的话复述一遍。", example: "Just to make sure I'm following, you want us to send this today, right?", exampleZh: "我确认一下：你是希望我们今天就发出去，对吗？" },
  { id: "c17", func: "确认", text: "Do you mean…?", meaning: "你是说……？", note: "最直接的确认。短、清楚、不尴尬。", example: "Do you mean the meeting is moved to Friday?", exampleZh: "你是说会议改到周五了？" },
  { id: "c18", func: "确认", text: "So, if I understand correctly…", meaning: "所以，如果我理解得没错……", note: "把对方的意思总结出来，让对方点头或纠正。", example: "So, if I understand correctly, we'll wait until we have the data.", exampleZh: "所以，如果我理解得没错，我们要等有了数据再继续。" },
  { id: "c19", func: "确认", text: "Are you saying that…?", meaning: "你的意思是……？", note: "用来核对关键结论，尤其是涉及决定的时候。", example: "Are you saying that we should cancel the trip?", exampleZh: "你的意思是我们应该取消这次旅行？" },
  { id: "c20", func: "确认", text: "Did I get that right?", meaning: "我理解得对吗？", note: "复述之后补上这句，把球传回对方。", example: "You need it before noon. Did I get that right?", exampleZh: "你需要中午前拿到。我理解得对吗？" },

  { id: "c21", func: "请求", text: "Would you mind…?", meaning: "你介不介意……？", note: "比 Can you 更软，适合请别人帮忙或让一步。", example: "Would you mind if we talked about this tomorrow?", exampleZh: "你介不介意我们明天再谈这件事？" },
  { id: "c22", func: "请求", text: "I was wondering if you could…", meaning: "不知道你能不能……", note: "比较客气的请求，邮件和口头都常用。", example: "I was wondering if you could take a look at this tonight.", exampleZh: "不知道你今晚能不能看一眼这个。" },
  { id: "c23", func: "请求", text: "Could you do me a favor?", meaning: "能帮我个忙吗？", note: "开口请人帮忙前的引子，后面再接具体事。", example: "Could you do me a favor and save me a seat?", exampleZh: "能帮我个忙、给我占个座吗？" },
  { id: "c24", func: "请求", text: "Is there any chance you could…?", meaning: "有没有可能请你……？", note: "知道对方可能忙或不方便，先把退路留好。", example: "Is there any chance you could join the call at four?", exampleZh: "有没有可能请你四点来参加这个通话？" },
  { id: "c25", func: "请求", text: "I'd appreciate it if…", meaning: "如果你能……，我会很感激。", note: "礼貌且清楚，适合对同事或不太熟的人。", example: "I'd appreciate it if you could send the file today.", exampleZh: "如果你今天能把文件发过来，我会很感激。" },

  { id: "c26", func: "同意 / 反对", text: "That's a fair point.", meaning: "这点说得有道理。", note: "即使不完全同意，也先承认对方说得有道理。", example: "That's a fair point. We should think about the cost.", exampleZh: "这点说得有道理。我们该考虑一下成本。" },
  { id: "c27", func: "同意 / 反对", text: "I see where you're coming from.", meaning: "我明白你的出发点。", note: "表示理解对方立场，不等于立刻答应。", example: "I see where you're coming from, but I still prefer the first plan.", exampleZh: "我明白你的出发点，但我还是更倾向第一个方案。" },
  { id: "c28", func: "同意 / 反对", text: "I'm not sure I agree with that.", meaning: "这一点我不太同意。", note: "温和但明确的反对，比 You're wrong 安全得多。", example: "I'm not sure I agree with that. The data shows something else.", exampleZh: "这一点我不太同意。数据说明的是另一回事。" },
  { id: "c29", func: "同意 / 反对", text: "I couldn't agree more.", meaning: "我再同意不过了。", note: "强烈同意。用的时候要真心，否则会显得夸张。", example: "I couldn't agree more. We need to keep it simple.", exampleZh: "我再同意不过了。我们就该保持简单。" },
  { id: "c30", func: "同意 / 反对", text: "I get it, but I still think…", meaning: "我理解，但我还是觉得……", note: "先接住，再坚持自己的判断。", example: "I get it, but I still think we should wait one more day.", exampleZh: "我理解，但我还是觉得我们应该再等一天。" },

  { id: "c31", func: "讲故事", text: "The other day…", meaning: "那天／前几天……", note: "开始讲一件最近发生的小事，非常生活化。", example: "The other day I ran into my old teacher on the subway.", exampleZh: "前几天我在地铁上碰到了以前的老师。" },
  { id: "c32", func: "讲故事", text: "What happened was…", meaning: "事情是这样的……", note: "对方在听原因或经过时，用它把故事拉出来。", example: "What happened was, I missed the first train and everything ran late.", exampleZh: "事情是这样的：我没赶上第一班车，后面就全晚了。" },
  { id: "c33", func: "讲故事", text: "Long story short…", meaning: "长话短说……", note: "细节太多时，直接切到结论。", example: "Long story short, we got there just in time.", exampleZh: "长话短说，我们刚好赶到。" },
  { id: "c34", func: "讲故事", text: "You'll never believe this, but…", meaning: "你绝对想不到，可是……", note: "引起兴趣的开场，适合讲意外的小事。", example: "You'll never believe this, but the shop was already closed at five.", exampleZh: "你绝对想不到，那家店五点就已经关门了。" },
  { id: "c35", func: "讲故事", text: "At first I thought… but then…", meaning: "一开始我以为……，后来却……", note: "把前后对比讲清楚，故事会立刻有结构。", example: "At first I thought it was a mistake, but then I saw the email.", exampleZh: "一开始我以为是搞错了，后来才看到那封邮件。" },

  { id: "c36", func: "感受", text: "I'm really tired.", meaning: "我真的好累。", note: "先用小学生词汇。不必一上来就 exhausted、drained。", example: "I'm really tired. I think I'll go home after this.", exampleZh: "我真的好累。这事完了我就想回家。" },
  { id: "c37", func: "感受", text: "That made my day.", meaning: "这让我高兴了一整天。", note: "表达一件小事带来的开心，比 I'm very happy 更自然。", example: "Your message made my day.", exampleZh: "你的消息让我高兴了一整天。" },
  { id: "c38", func: "感受", text: "I'm a bit nervous about…", meaning: "我对……有点紧张。", note: "承认紧张并不丢分，反而让对话更真。", example: "I'm a bit nervous about the call tomorrow.", exampleZh: "我对明天那个通话有点紧张。" },
  { id: "c39", func: "感受", text: "It meant a lot to me.", meaning: "这对我意义很大。", note: "感谢或被帮助之后，把分量说出来。", example: "You stayed late to help. It meant a lot to me.", exampleZh: "你留下来帮我。这对我意义很大。" },
  { id: "c40", func: "感受", text: "I wasn't expecting that.", meaning: "我没想到会这样。", note: "惊讶、意外，可好可坏，靠语气完成。", example: "I wasn't expecting that. That's really kind of you.", exampleZh: "我没想到会这样。你真的太好心了。" },

  { id: "c41", func: "建议", text: "Have you thought about…?", meaning: "你有没有想过……？", note: "给建议时先问，而不是下命令。", example: "Have you thought about leaving a bit earlier?", exampleZh: "你有没有想过稍微早一点出发？" },
  { id: "c42", func: "建议", text: "It might be worth…", meaning: "也许值得……", note: "轻轻推一个选项，给对方保留否决权。", example: "It might be worth writing a short outline first.", exampleZh: "也许值得先写一个简短的提纲。" },
  { id: "c43", func: "建议", text: "Why don't we…?", meaning: "我们何不……？", note: "把「你该」变成「我们一起」，合作感更强。", example: "Why don't we take a ten-minute break?", exampleZh: "我们何不休息十分钟？" },
  { id: "c44", func: "建议", text: "One thing you could do is…", meaning: "有一件你可以做的事是……", note: "只抛一个可执行的下一步，避免建议清单太长。", example: "One thing you could do is send a quick update today.", exampleZh: "有一件你可以做的事是：今天发一条简短的进度。" },
  { id: "c45", func: "建议", text: "If I were you, I'd…", meaning: "如果我是你，我会……", note: "代入对方位置给建议，语气要松，不要变成说教。", example: "If I were you, I'd ask for one more day.", exampleZh: "如果我是你，我会再多要一天时间。" },

  { id: "c46", func: "澄清", text: "Sorry, I missed that. Could you say it again?", meaning: "抱歉，我没听清。你能再说一遍吗？", note: "没听清就直接问，比装懂更有效。", example: "Sorry, I missed that. Could you say it again a little slower?", exampleZh: "抱歉，我没听清。你能再慢一点说一遍吗？" },
  { id: "c47", func: "澄清", text: "What do you mean by…?", meaning: "你说的……是什么意思？", note: "某个词或说法不清楚时，定点提问。", example: "What do you mean by 'soon'? Today, or this week?", exampleZh: "你说的「尽快」是什么意思？是今天，还是这周？" },
  { id: "c48", func: "澄清", text: "Can I just jump in for a second?", meaning: "我插一句可以吗？", note: "想插话但不想打断得很无礼。", example: "Can I just jump in for a second? I have a small update.", exampleZh: "我插一句可以吗？我有一个小更新。" },
  { id: "c49", func: "澄清", text: "Let me make sure I said that clearly.", meaning: "我确认一下，我刚说清楚了没。", note: "自己说乱了，主动重来一遍，比继续绕好。", example: "Let me make sure I said that clearly. I can join, but only after three.", exampleZh: "我确认一下，我刚说清楚了没：我可以参加，但要三点以后。" },
  { id: "c50", func: "澄清", text: "In other words…", meaning: "换句话说……", note: "用更简单的话把刚才的意思再说一次。", example: "In other words, we can start, but we can't finish today.", exampleZh: "换句话说，我们可以开始，但今天做不完。" },

  { id: "c51", func: "计划", text: "I'm thinking of…", meaning: "我在考虑……", note: "还不是最终决定，只是在分享打算。", example: "I'm thinking of staying home this weekend.", exampleZh: "我在考虑这个周末待在家里。" },
  { id: "c52", func: "计划", text: "Let's aim for…", meaning: "我们争取……", note: "给出一个可调整的目标时间或结果。", example: "Let's aim for Thursday, and we can move it if we have to.", exampleZh: "我们争取周四，不行再改。" },
  { id: "c53", func: "计划", text: "I'll take care of…", meaning: "……我来负责。", note: "主动认领一件事，会议里特别好用。", example: "I'll take care of the slides. You can handle the numbers.", exampleZh: "幻灯片我来负责。数字你来搞定。" },
  { id: "c54", func: "计划", text: "We can figure it out as we go.", meaning: "我们可以边走边看。", note: "不必现在把每一步订死，先开始。", example: "We don't have every detail. We can figure it out as we go.", exampleZh: "细节还不全。我们可以边走边看。" },
  { id: "c55", func: "计划", text: "Does that work for you?", meaning: "这样对你方便吗？", note: "提出安排后，把决定权交回对方。", example: "I can do 7 p.m. Does that work for you?", exampleZh: "我晚上七点可以。这样对你方便吗？" },

  { id: "c56", func: "社交开合", text: "It's good to see you.", meaning: "见到你真好。", note: "比 Long time no see 更自然，熟或不太熟都能用。", example: "It's good to see you. How have you been?", exampleZh: "见到你真好。最近怎么样？" },
  { id: "c57", func: "社交开合", text: "How have you been?", meaning: "你最近怎么样？", note: "比 How are you 更像真的在问近况。", example: "How have you been? It's been a while.", exampleZh: "你最近怎么样？好久没见了。" },
  { id: "c58", func: "社交开合", text: "I should probably get going.", meaning: "我大概该走了。", note: "想结束对话时的软着陆，不要突然消失。", example: "I should probably get going. I'll text you later.", exampleZh: "我大概该走了。回头给你发消息。" },
  { id: "c59", func: "社交开合", text: "Let's catch up soon.", meaning: "我们找时间再聚一聚。", note: "结束时保持联系的一句，后面最好再补一个大致时间。", example: "Let's catch up soon. Maybe next week?", exampleZh: "我们找时间再聚一聚。也许下周？" },
  { id: "c60", func: "社交开合", text: "I'll let you get back to it.", meaning: "那我先不打扰你了。", note: "对方显然在忙时，主动结束，显得体贴。", example: "I can see you're busy. I'll let you get back to it.", exampleZh: "看你正忙。那我先不打扰你了。" },

  { id: "c61", func: "补救 / 绕开", text: "The system is very complex.", meaning: "这套系统非常复杂。", note: "这就是铁律里的小学生词汇：不会说 intricate architecture，就这样说。", example: "I can't explain every part. The system is very complex.", exampleZh: "我没法把每一部分都讲清楚。这套系统非常复杂。" },
  { id: "c62", func: "补救 / 绕开", text: "I can't think of the word, but I mean…", meaning: "那个词我想不起来了，我是说……", note: "卡词时不要停住，用解释把意思送出去。", example: "I can't think of the word, but I mean the thing you use to open a bottle.", exampleZh: "那个词我想不起来了，我是说那种用来开瓶子的东西。" },
  { id: "c63", func: "补救 / 绕开", text: "It's kind of like…", meaning: "有点像……", note: "用类比代替精确词汇，先把画面建立起来。", example: "It's kind of like a shared notebook, but for the whole team.", exampleZh: "有点像一本共享的笔记本，但是给整个团队用的。" },
  { id: "c64", func: "补救 / 绕开", text: "Let me say that in a simpler way.", meaning: "我换个简单的说法。", note: "自己觉得说复杂了，立刻降级重说。", example: "Let me say that in a simpler way. We need to start over.", exampleZh: "我换个简单的说法：我们得重新开始。" },
  { id: "c65", func: "补救 / 绕开", text: "What I really need is…", meaning: "我真正需要的是……", note: "绕了半天时，直接说出核心需求。", example: "What I really need is one quiet hour to finish this.", exampleZh: "我真正需要的是安静的一小时，把这个做完。" },

  { id: "c66", func: "总结", text: "So, to sum up…", meaning: "所以，总结一下……", note: "把刚才的讨论收成一句，方便对方记住。", example: "So, to sum up, I'll send the draft, and you'll review it tomorrow.", exampleZh: "所以，总结一下：我来发草稿，你明天审。" },
  { id: "c67", func: "总结", text: "The main thing is…", meaning: "最关键的是……", note: "去掉枝节，只留最重要的一点。", example: "The main thing is that we don't miss the deadline.", exampleZh: "最关键的是我们别错过截止日期。" },
  { id: "c68", func: "总结", text: "At the end of the day…", meaning: "说到底……", note: "回到根本判断，适合讨论拉锯之后。", example: "At the end of the day, we have to choose the simpler option.", exampleZh: "说到底，我们还是得选那个更简单的方案。" },
  { id: "c69", func: "总结", text: "Here's what I'll do next.", meaning: "接下来我打算这样做。", note: "结束对话前给出自己的下一步，避免散会后没人行动。", example: "Here's what I'll do next: I'll email them and update the group.", exampleZh: "接下来我打算这样做：先给他们发邮件，再同步给大家。" },
  { id: "c70", func: "总结", text: "Let's leave it there for now.", meaning: "这件事咱们先放到这儿。", note: "这次先到这里，以后再续，干净利落地收束。", example: "Let's leave it there for now and pick this up on Monday.", exampleZh: "这件事咱们先放到这儿，周一再接着谈。" },
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

export const EXTRA_PHRASE_ZH: Record<string, string> = {
  "I'm here. We can just sit here for a bit.": "我就在这儿。我们可以先坐一会儿。",
  "Thanks — that's perfect.": "谢谢，这样正好。",
  "What do you think?": "你觉得呢？"
};


export function phraseMeaning(text: string): string | undefined {
  const chunk = CHUNKS.find((c) => c.text === text);
  if (chunk) return chunk.meaning;
  return EXTRA_PHRASE_ZH[text];
}
