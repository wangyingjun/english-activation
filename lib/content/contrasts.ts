export type ContrastGuide = {
  groupId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  mouth: string;
  vsChinese: string;
  mistake: string;
};

/** Easier (more distinct) first, harder last. Only pair groups, not linking/weak forms. */
export const CONTRAST_ORDER: string[] = [
  "or-oh",
  "ai-ae",
  "ei-e",
  "u-uu",
  "y-vowel",
  "n-ng",
  "voice",
  "s-z",
  "ch-sh",
  "sh-s",
  "ah-uh",
  "ae-uh",
  "er-ah",
  "l-r",
  "v-w",
  "here-hair",
  "i-e",
  "ae-e",
  "i-i",
  "th-s",
  "f-th",
  "th-dh",
  "dh-d",
];

export const CONTRAST_GUIDES: Record<string, ContrastGuide> = {
  "or-oh": {
    groupId: "or-oh",
    difficulty: 1,
    mouth: "bought /ɔː/ 是一个稳住的圆唇音：嘴唇收圆，舌头后缩，声音拉住不要滑走。boat /oʊ/ 开头也圆唇，但马上要向前滑动，嘴从圆慢慢展一点，像轻轻说「欧→乌」。",
    vsChinese: "中文「哦」比较短、也不滑动。boat 必须听出后面那一下滑动，bought 则是停在原来的圆唇位置。",
    mistake: "两个都读成短短的「哦」，boat 和 bought 就糊成一个音了。先听 boat 尾音有没有往前滑。",
  },
  "ai-ae": {
    groupId: "ai-ae",
    difficulty: 1,
    mouth: "like /aɪ/ 是双元音：嘴先张大，再滑向「衣」的位置，舌头从低到高。lack /æ/ 没有滑动，嘴张大、下巴放下，舌头低而前，声音停在那里。",
    vsChinese: "中文「爱」接近 like 的滑动，但常常滑得不够清晰。lack 更接近把嘴张大后定住，中文里没有这个音。",
    mistake: "把 lack 也读成「赖」，两个词就都像 like。听的时候问自己：后面有没有滑向「衣」？",
  },
  "ei-e": {
    groupId: "ei-e",
    difficulty: 1,
    mouth: "wait /eɪ/ 从半闭的前元音滑向「衣」，嘴角逐渐拉开。wet /e/ 更短、更稳，舌头略低，不要滑动。",
    vsChinese: "中文「诶」有时带一点滑动，更像 wait。wet 要更干脆，像轻轻拍一下就停。",
    mistake: "把 wet 拉长并滑向「衣」，听起来就像 wait。先听长度，再听有没有尾巴。",
  },
  "u-uu": {
    groupId: "u-uu",
    difficulty: 2,
    mouth: "fool /uː/ 嘴唇收得很圆、很前，舌头高，声音拉长，肌肉稍紧。full /ʊ/ 嘴唇略圆但更松，舌头稍低稍后，又短又松。",
    vsChinese: "中文「乌」接近拉长的 fool，没有松短的 /ʊ/。",
    mistake: "把 full、look、pull 都读成「乌」，和 fool、Luke、pool 分不开。听松紧和长短，不要只听「圆唇」。",
  },
  "y-vowel": {
    groupId: "y-vowel",
    difficulty: 2,
    mouth: "year /jɪr/ 开头有一个很快的 /j/，舌头先抬向硬腭再落到元音。ear /ɪr/ 没有这个抬起，直接从元音开始。",
    vsChinese: "中文「衣」有时会带一点摩擦，容易让 ear 听起来像 year。真正的差别是开头有没有那一下「耶」。",
    mistake: "把 ear、east 也加上 /j/，就会说成 year、yeast。听最开头那 0.1 秒有没有摩擦。",
  },
  "n-ng": {
    groupId: "n-ng",
    difficulty: 2,
    mouth: "thin /n/ 舌尖抵住上牙龈，气流从鼻腔出，嘴可以稍开。thing /ŋ/ 舌尖放下，舌根抬起贴住软腭，和「唱」字的尾音相同。",
    vsChinese: "这组接近中文的前鼻音和后鼻音（「因」和「英」），大多数人本来就会。",
    mistake: "有的人词尾 /ŋ/ 发成 /n/，sing 就变成 sin。把手轻轻放在鼻前，两个都有鼻音，差在舌头前后。",
  },
  "voice": {
    groupId: "voice",
    difficulty: 2,
    mouth: "bark 这类浊辅音，声带要振动，气流较弱；park 这类清辅音，声带不振动，后面的元音前有一小股送气。把手指放在喉结上，bark 会抖，park 不太抖。",
    vsChinese: "中文的「波、泼」主要靠送气，不像英语这样用声带振动来区分。",
    mistake: "只关注送气、不听声带，词尾的清浊也容易被吞掉。可以夸张地先感觉喉咙有没有在「嗡」。",
  },
  "s-z": {
    groupId: "s-z",
    difficulty: 2,
    mouth: "sip /s/ 和 zip /z/ 舌头位置几乎一样，都是舌尖靠近上牙龈，气流从缝里出。差别只在声带：/z/ 要振动，/s/ 不振动。",
    vsChinese: "中文「丝」是清音，几乎没有词里的 /z/。price 和 prize 的差别常常就在最后这一点振动。",
    mistake: "把 zip、prize、his 都发成清音，听起来就像 sip、price、hiss。听尾音有没有「嗡」的感觉。",
  },
  "ch-sh": {
    groupId: "ch-sh",
    difficulty: 2,
    mouth: "cheap /tʃ/ 先用舌尖堵住气流，再突然放开，像轻轻「啾」一下，是塞擦音。ship /ʃ/ 没有堵住，气流一直从缝里出来，像「嘘」。",
    vsChinese: "中文「吃」更接近 /tʃ/，「诗」更接近 /ʃ/，但英语的 /ʃ/ 嘴唇更圆、稍微向前突。",
    mistake: "把 chop 和 shop 都读成「嘘」或都读成「啾」。听开头有没有一个很短的堵住再打开。",
  },
  "sh-s": {
    groupId: "sh-s",
    difficulty: 3,
    mouth: "she /ʃ/ 舌身抬高，嘴唇略圆、稍突，声音更「厚」。see /s/ 舌尖更前、靠近上牙，嘴唇更展，声音更「尖、细」。",
    vsChinese: "中文「西」介于两者之间，常被拿来同时代替 /s/ 和 /ʃ/。",
    mistake: "see 和 she、sip 和 ship 糊成一个音。可以对着镜子看：she 嘴唇更圆，see 嘴角拉开。",
  },
  "ah-uh": {
    groupId: "ah-uh",
    difficulty: 3,
    mouth: "calm /ɑː/ 嘴张大、舌头低而后，声音较长较开。come /ʌ/ 嘴不要张那么大，舌头中央略抬，又短又中。",
    vsChinese: "中文「啊」更接近张大的 /ɑː/。come、cut、hut 那个更关、更短的音，中文里对不上。",
    mistake: "把 come 也张得很大，听起来就像 calm、cot。先看嘴的大小，再听长短。",
  },
  "ae-uh": {
    groupId: "ae-uh",
    difficulty: 3,
    mouth: "bag /æ/ 嘴张大、下巴放下，舌头低而前，嘴角可以略展。bug /ʌ/ 嘴合一点，舌头在中央，更短更松。",
    vsChinese: "这两个中文都没有。/æ/ 比「啊」更靠前，/ʌ/ 比「啊」更关、更短。",
    mistake: "bag 和 bug、cat 和 cut 都读成一个「啊」。听 bag 时下巴要更下来。",
  },
  "er-ah": {
    groupId: "er-ah",
    difficulty: 3,
    mouth: "bird /ɝ/ 舌头中部抬起，舌尖不要卷到很后，嘴唇略圆，整段都是这个音色。hard /ɑːr/ 先把嘴张大发 /ɑ/，美音里后面才带一点 r。",
    vsChinese: "中文没有真正的 r 元音。很多人会用「儿」去套所有带 r 的音，bird 和 bard 就听不清了。",
    mistake: "把 hard、heart 也从一开始就发成「儿」，和 bird、hurt 混在一起。听前面那个元音是不是张得比较开。",
  },
  "l-r": {
    groupId: "l-r",
    difficulty: 3,
    mouth: "light /l/ 舌尖抵住上牙龈，气流从舌头两边出来。right /r/ 舌尖不要贴牙，向后略收、两侧向上，嘴唇略圆，气流从中间过。",
    vsChinese: "中文「乐」的 l 还比较接近。中文「日、若」和英语 /r/ 不是同一个音，英语 /r/ 更像舌头后缩、不碰牙。",
    mistake: "把 right、red、grass 的 /r/ 发成 /l/，或用中文「日」去代替。练习时确认舌尖有没有离开上牙龈。",
  },
  "v-w": {
    groupId: "v-w",
    difficulty: 4,
    mouth: "vest /v/ 上齿轻轻咬住下唇，声带振动。west /w/ 牙齿不要碰嘴唇，双唇收圆，很快滑向后面的元音。",
    vsChinese: "中文没有 /v/，很多人会用 /w/ 或 /f/ 代替。wine 和 vine、west 和 vest 就撞在一起。",
    mistake: "very 说成「weri」，vine 说成 wine。用手确认：发 /v/ 时上齿要碰到下唇。",
  },
  "here-hair": {
    groupId: "here-hair",
    difficulty: 4,
    mouth: "here /ɪr/ 舌头较高、较前，接近「衣」再带 r。hair /er/ 嘴更开一点，舌头较低，接近「诶」再带 r。",
    vsChinese: "中文「一儿」「诶儿」只能大致模仿。差在 r 前面那个元音的高低，不在 r 本身。",
    mistake: "here、hair、hare 都读成一个「一儿」。先慢一点只听元音高低，再把 r 接回去。",
  },
  "i-e": {
    groupId: "i-e",
    difficulty: 4,
    mouth: "pin /ɪ/ 舌头较高、较松，嘴不要张大，声音短。pen /e/ 嘴略开、舌头略低，也短，但更「开」。",
    vsChinese: "中文「因」偏紧偏高，更接近 pin；中文没有真正的 /e/（pen）。",
    mistake: "pin 和 pen、sit 和 set 对中国学习者是经典难点。不要只听长短，要听嘴有没有再打开一点。",
  },
  "ae-e": {
    groupId: "ae-e",
    difficulty: 4,
    mouth: "bad /æ/ 下巴放得更低，嘴张大，舌头低而前。bed /e/ 嘴合一点，舌头略高，更短更「关闭」。",
    vsChinese: "两个都不是中文「爱」或「诶」。/æ/ 要张得比你以为的更大。",
    mistake: "bad、bed、bet 挤在一个音里。可以对着镜子看：bad 的下巴明显更下来。",
  },
  "i-i": {
    groupId: "i-i",
    difficulty: 5,
    mouth: "sheep /iː/ 嘴角向两边拉，舌头高而前，肌肉较紧，声音拉长，像微笑着说「衣——」。ship /ɪ/ 嘴更放松，开口略大，舌头稍低，又短又松，不要用力拉长。",
    vsChinese: "中文「衣」更接近拉长、拉紧的 /iː/，普通话里没有短松的 /ɪ/。",
    mistake: "只把 ship 拉长就以为是 sheep。差的不只是长短，还有松紧。ship 要松、短；sheep 要紧、长、嘴角拉开。",
  },
  "th-s": {
    groupId: "th-s",
    difficulty: 5,
    mouth: "think /θ/ 舌尖轻轻伸到上下齿之间，气流从舌头和齿缝摩擦出来，声带不振动。sink /s/ 舌尖回到上牙龈后面，牙齿看不见舌头。",
    vsChinese: "中文没有 /θ/，最常见的替代就是 /s/，所以 think 会说成 sink。",
    mistake: "把 thank、path、three 都发成 s。练习时允许舌尖轻轻露出来，不要害羞。",
  },
  "f-th": {
    groupId: "f-th",
    difficulty: 5,
    mouth: "free /f/ 是上齿咬下唇。three /θ/ 是舌尖夹在上下齿之间，唇不要参与阻挡。",
    vsChinese: "中文有「夫」，所以 /f/ 不难。难的是不要用 /f/ 去代替 /θ/。",
    mistake: "three、thought 说成 free、fought。看镜子：three 应该看见舌尖，而不是下唇被咬住。",
  },
  "th-dh": {
    groupId: "th-dh",
    difficulty: 5,
    mouth: "thin /θ/ 和 this /ð/ 舌尖位置相同，都在齿间。差别只在声带：this、the、they 要振动，thin、think、three 不振动。",
    vsChinese: "中文两个都没有。很多人会把 this 说成「兹」或「斯」。",
    mistake: "this 和 thin、they 和 day 或 say 混在一起。先固定舌尖位置，再用喉咙区分清浊。",
  },
  "dh-d": {
    groupId: "dh-d",
    difficulty: 5,
    mouth: "they /ð/ 舌尖在齿间，气流持续摩擦，声带振动。day /d/ 舌尖抵住上牙龈，先完全堵住，再一下子放开，没有齿间摩擦。",
    vsChinese: "中文「的、得」更接近 /d/。they、then、those 常被说成 day、den、doze。",
    mistake: "把 they 的开头发成干脆的 /d/。听有没有「漏风」的摩擦，而不只是一下爆破。",
  },
};

export function contrastGuide(groupId: string): ContrastGuide | undefined {
  return CONTRAST_GUIDES[groupId];
}

export function isContrastWeak(stats?: { correct: number; total: number }): boolean {
  if (!stats || stats.total < 6) return stats ? stats.total > 0 && stats.correct / stats.total < 0.7 : false;
  return stats.correct / stats.total < 0.75;
}
