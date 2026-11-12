export type MinimalPair = {
  left: string;
  right: string;
  leftIpa: string;
  rightIpa: string;
  leftPos: string;
  leftZh: string;
  rightPos: string;
  rightZh: string;
};

export type LinkItem = {
  citation: string;
  reduced: string;
  example: string;
  citationZh: string;
  exampleZh: string;
};

export type SoundGroup = {
  id: string;
  kind: "pairs" | "linking" | "weak";
  ipa: string;
  title: string;
  tip: string;
  pairs?: MinimalPair[];
  items?: LinkItem[];
  sentences: { text: string; zh: string }[];
};

export const SOUND_GROUPS: Record<string, SoundGroup> = {
  "i-i": {
    id: "i-i",
    kind: "pairs",
    ipa: "iː / ɪ",
    title: "长短元音：sheep / ship",
    tip: "iː 是拉长的「衣」音，嘴角向两侧拉，像 smile；ɪ 又短又松，嘴型更自然，不要用力。差在长短和肌肉紧张度，不只是「拉长一点」。",
    pairs: [
      { left: "sheep", right: "ship", leftIpa: "ʃiːp", rightIpa: "ʃɪp", leftPos: "名", leftZh: "羊", rightPos: "名", rightZh: "船" },
      { left: "beat", right: "bit", leftIpa: "biːt", rightIpa: "bɪt", leftPos: "动", leftZh: "打；击败", rightPos: "名", rightZh: "一点儿" },
      { left: "leave", right: "live", leftIpa: "liːv", rightIpa: "lɪv", leftPos: "动", leftZh: "离开", rightPos: "动", rightZh: "居住；生活" },
      { left: "seat", right: "sit", leftIpa: "siːt", rightIpa: "sɪt", leftPos: "名", leftZh: "座位", rightPos: "动", rightZh: "坐" },
      { left: "heat", right: "hit", leftIpa: "hiːt", rightIpa: "hɪt", leftPos: "名", leftZh: "热；热量", rightPos: "动", rightZh: "打中；击打" },
      { left: "reach", right: "rich", leftIpa: "riːtʃ", rightIpa: "rɪtʃ", leftPos: "动", leftZh: "够到；到达", rightPos: "形", rightZh: "富有的" },
    ],
    sentences: [
      { text: "Please sit in this seat.", zh: "请坐这个座位。" },
      { text: "I live near the leaves.", zh: "我住在那些树叶附近。" },
      { text: "This ship is full of sheep.", zh: "这艘船上全是羊。" },
    ],
  },
  "ae-e": {
    id: "ae-e",
    kind: "pairs",
    ipa: "æ / e",
    title: "前元音：bad / bed",
    tip: "æ 嘴巴张得更大、更靠前，像被轻轻压一下舌头；e 嘴型稍收，接近「诶」。说 bad 时下巴多放一点。",
    pairs: [
      { left: "bad", right: "bed", leftIpa: "bæd", rightIpa: "bed", leftPos: "形", leftZh: "坏的；糟糕的", rightPos: "名", rightZh: "床" },
      { left: "man", right: "men", leftIpa: "mæn", rightIpa: "men", leftPos: "名", leftZh: "男人", rightPos: "名", rightZh: "男人们" },
      { left: "sat", right: "set", leftIpa: "sæt", rightIpa: "set", leftPos: "动", leftZh: "坐（过去式）", rightPos: "动", rightZh: "放置；设定" },
      { left: "pan", right: "pen", leftIpa: "pæn", rightIpa: "pen", leftPos: "名", leftZh: "平底锅", rightPos: "名", rightZh: "钢笔" },
      { left: "sad", right: "said", leftIpa: "sæd", rightIpa: "sed", leftPos: "形", leftZh: "难过的", rightPos: "动", rightZh: "说（过去式）" },
      { left: "bag", right: "beg", leftIpa: "bæg", rightIpa: "beg", leftPos: "名", leftZh: "包", rightPos: "动", rightZh: "恳求" },
    ],
    sentences: [
      { text: "The men sat on the bed.", zh: "那些男人坐在床上。" },
      { text: "I said the bag was bad.", zh: "我说这个包已经坏了。" },
      { text: "This pan is next to the pen.", zh: "这口锅就在那支笔旁边。" },
    ],
  },
  "th-s": {
    id: "th-s",
    kind: "pairs",
    ipa: "θ / s",
    title: "咬舌音：think / sink",
    tip: "θ 一定要把舌尖轻轻放在上下齿之间，让气从舌头两边漏出；s 舌头留在齿后，不要伸出来。很多「听得懂、说不像」就卡在这里。",
    pairs: [
      { left: "think", right: "sink", leftIpa: "θɪŋk", rightIpa: "sɪŋk", leftPos: "动", leftZh: "想；认为", rightPos: "名", rightZh: "水槽" },
      { left: "thick", right: "sick", leftIpa: "θɪk", rightIpa: "sɪk", leftPos: "形", leftZh: "厚的；浓的", rightPos: "形", rightZh: "生病的" },
      { left: "path", right: "pass", leftIpa: "pæθ", rightIpa: "pæs", leftPos: "名", leftZh: "小路", rightPos: "动", rightZh: "经过；通过" },
      { left: "thumb", right: "some", leftIpa: "θʌm", rightIpa: "sʌm", leftPos: "名", leftZh: "拇指", rightPos: "代", rightZh: "一些" },
      { left: "thank", right: "sank", leftIpa: "θæŋk", rightIpa: "sæŋk", leftPos: "动", leftZh: "感谢", rightPos: "动", rightZh: "下沉（过去式）" },
      { left: "faith", right: "face", leftIpa: "feɪθ", rightIpa: "feɪs", leftPos: "名", leftZh: "信念", rightPos: "名", rightZh: "脸" },
    ],
    sentences: [
      { text: "I think the path is thick with snow.", zh: "我觉得这条路上积了厚厚的雪。" },
      { text: "Thank you for some of your time.", zh: "谢谢你抽出一点时间。" },
      { text: "He put his thumb on the sink.", zh: "他把拇指按在水槽上。" },
    ],
  },
  "dh-d": {
    id: "dh-d",
    kind: "pairs",
    ipa: "ð / d",
    title: "浊咬舌音：they / day",
    tip: "ð 和 θ 口型一样（舌尖抵齿），但要振动声带。they、this、that、the 都是这个音。不要说成 d：day 和 they 不是同一个词。",
    pairs: [
      { left: "they", right: "day", leftIpa: "ðeɪ", rightIpa: "deɪ", leftPos: "代", leftZh: "他们", rightPos: "名", rightZh: "白天；一天" },
      { left: "then", right: "den", leftIpa: "ðen", rightIpa: "den", leftPos: "副", leftZh: "然后；那时", rightPos: "名", rightZh: "兽穴；小房间" },
      { left: "there", right: "dare", leftIpa: "ðer", rightIpa: "der", leftPos: "副", leftZh: "那里", rightPos: "动", rightZh: "敢于" },
      { left: "breathe", right: "breed", leftIpa: "briːð", rightIpa: "briːd", leftPos: "动", leftZh: "呼吸", rightPos: "动", rightZh: "繁殖；养育" },
      { left: "those", right: "doze", leftIpa: "ðoʊz", rightIpa: "doʊz", leftPos: "代", leftZh: "那些", rightPos: "动", rightZh: "打盹" },
      { left: "though", right: "dough", leftIpa: "ðoʊ", rightIpa: "doʊ", leftPos: "连", leftZh: "虽然；不过", rightPos: "名", rightZh: "面团" },
    ],
    sentences: [
      { text: "They went there the next day.", zh: "他们第二天去了那里。" },
      { text: "Breathe in, then try again.", zh: "吸一口气，然后再试一次。" },
      { text: "Those people dare to go, though.", zh: "不过，那些人还是敢去。" },
    ],
  },
  "v-w": {
    id: "v-w",
    kind: "pairs",
    ipa: "v / w",
    title: "唇齿与圆唇：vest / west",
    tip: "v 是上齿轻咬下唇，并振动声带；w 双唇收圆，像准备吹蜡烛，牙齿不要碰嘴唇。very 不要说成 wery。",
    pairs: [
      { left: "vest", right: "west", leftIpa: "vest", rightIpa: "west", leftPos: "名", leftZh: "背心", rightPos: "名", rightZh: "西边" },
      { left: "vine", right: "wine", leftIpa: "vaɪn", rightIpa: "waɪn", leftPos: "名", leftZh: "藤；葡萄藤", rightPos: "名", rightZh: "葡萄酒" },
      { left: "vet", right: "wet", leftIpa: "vet", rightIpa: "wet", leftPos: "名", leftZh: "兽医", rightPos: "形", rightZh: "湿的" },
      { left: "very", right: "wary", leftIpa: "ˈveri", rightIpa: "ˈweri", leftPos: "副", leftZh: "非常", rightPos: "形", rightZh: "谨慎的；警惕的" },
      { left: "veil", right: "whale", leftIpa: "veɪl", rightIpa: "weɪl", leftPos: "名", leftZh: "面纱", rightPos: "名", rightZh: "鲸" },
      { left: "vent", right: "went", leftIpa: "vent", rightIpa: "went", leftPos: "名", leftZh: "通风口", rightPos: "动", rightZh: "去（过去式）" },
    ],
    sentences: [
      { text: "The vest in the west is very wet.", zh: "西边的那件背心湿透了。" },
      { text: "I went to the vet in a van.", zh: "我坐面包车去了兽医那里。" },
      { text: "This wine comes from a vine.", zh: "这酒来自一棵葡萄藤。" },
    ],
  },
  "l-r": {
    id: "l-r",
    kind: "pairs",
    ipa: "l / r",
    title: "舌侧与卷舌：light / right",
    tip: "l 舌尖抵上齿龈，气从舌头两边出来；美式 r 舌尖不要贴住，舌后部稍抬、唇微圆。light 和 right、long 和 wrong，差在这一下。",
    pairs: [
      { left: "light", right: "right", leftIpa: "laɪt", rightIpa: "raɪt", leftPos: "名", leftZh: "光；灯", rightPos: "形", rightZh: "右边的；对的" },
      { left: "long", right: "wrong", leftIpa: "lɔːŋ", rightIpa: "rɔːŋ", leftPos: "形", leftZh: "长的", rightPos: "形", rightZh: "错误的" },
      { left: "play", right: "pray", leftIpa: "pleɪ", rightIpa: "preɪ", leftPos: "动", leftZh: "玩；播放", rightPos: "动", rightZh: "祈祷" },
      { left: "glass", right: "grass", leftIpa: "glæs", rightIpa: "græs", leftPos: "名", leftZh: "玻璃杯；玻璃", rightPos: "名", rightZh: "草" },
      { left: "late", right: "rate", leftIpa: "leɪt", rightIpa: "reɪt", leftPos: "形", leftZh: "迟到的；晚的", rightPos: "名", rightZh: "速率；价格" },
      { left: "lead", right: "read", leftIpa: "liːd", rightIpa: "riːd", leftPos: "动", leftZh: "带领；领先", rightPos: "动", rightZh: "读（现在时）" },
    ],
    sentences: [
      { text: "Turn right at the red light.", zh: "到红灯处向右转。" },
      { text: "Don't play on the grass.", zh: "不要在草地上玩。" },
      { text: "I read a long letter last night.", zh: "我昨晚读了一封很长的信。" },
    ],
  },
  "ah-uh": {
    id: "ah-uh",
    kind: "pairs",
    ipa: "ɑː / ʌ",
    title: "后与中：heart / hut",
    tip: "ɑː 嘴巴放松张大，像看医生说「啊」，音可以拉长；ʌ 更短、更居中，像 hut、come、love。不要把 love 念成「拉夫」的长音。",
    pairs: [
      { left: "heart", right: "hut", leftIpa: "hɑːrt", rightIpa: "hʌt", leftPos: "名", leftZh: "心脏；内心", rightPos: "名", rightZh: "小屋" },
      { left: "calm", right: "come", leftIpa: "kɑːm", rightIpa: "kʌm", leftPos: "形", leftZh: "平静的", rightPos: "动", rightZh: "来" },
      { left: "dark", right: "duck", leftIpa: "dɑːrk", rightIpa: "dʌk", leftPos: "形", leftZh: "黑暗的", rightPos: "名", rightZh: "鸭子" },
      { left: "barn", right: "bun", leftIpa: "bɑːrn", rightIpa: "bʌn", leftPos: "名", leftZh: "谷仓", rightPos: "名", rightZh: "小圆面包" },
      { left: "cart", right: "cut", leftIpa: "kɑːrt", rightIpa: "kʌt", leftPos: "名", leftZh: "手推车", rightPos: "动", rightZh: "切；割" },
      { left: "lark", right: "luck", leftIpa: "lɑːrk", rightIpa: "lʌk", leftPos: "名", leftZh: "云雀", rightPos: "名", rightZh: "运气" },
    ],
    sentences: [
      { text: "Come here and stay calm.", zh: "过来，保持冷静。" },
      { text: "A duck swam in the dark pond.", zh: "一只鸭子在黑漆漆的池塘里游。" },
      { text: "I cut the cart in half. Wait, that can't be right — I left the cart outside the hut.", zh: "我把推车切成了两半。等等，这不对——我把推车留在小屋外面了。" },
    ],
  },
  "u-uu": {
    id: "u-uu",
    kind: "pairs",
    ipa: "ʊ / uː",
    title: "长短圆唇：full / fool",
    tip: "uː 双唇收得很圆，音拉长，像 food、school；ʊ 也圆唇，但更短更松，像 book、look、full。full 和 fool 搞混时，先夸张圆唇再缩短。",
    pairs: [
      { left: "full", right: "fool", leftIpa: "fʊl", rightIpa: "fuːl", leftPos: "形", leftZh: "满的", rightPos: "名", rightZh: "傻瓜" },
      { left: "pull", right: "pool", leftIpa: "pʊl", rightIpa: "puːl", leftPos: "动", leftZh: "拉", rightPos: "名", rightZh: "水池；泳池" },
      { left: "look", right: "Luke", leftIpa: "lʊk", rightIpa: "luːk", leftPos: "动", leftZh: "看", rightPos: "专", rightZh: "卢克（人名）" },
      { left: "should", right: "shoed", leftIpa: "ʃʊd", rightIpa: "ʃuːd", leftPos: "动", leftZh: "应该", rightPos: "动", rightZh: "给……穿上鞋（过去式）" },
      { left: "wood", right: "wooed", leftIpa: "wʊd", rightIpa: "wuːd", leftPos: "名", leftZh: "木头", rightPos: "动", rightZh: "追求、求爱（过去式）" },
      { left: "cook", right: "kook", leftIpa: "kʊk", rightIpa: "kuːk", leftPos: "动", leftZh: "做饭", rightPos: "名", rightZh: "怪人（口语）" },
    ],
    sentences: [
      { text: "Look at Luke by the pool.", zh: "看看站在泳池边的卢克。" },
      { text: "The bag is full, you fool.", zh: "袋子已经满了，你这个傻瓜。" },
      { text: "You should pull the wood closer.", zh: "你该把那堆木头拉近一点。" },
    ],
  },
  "or-oh": {
    id: "or-oh",
    kind: "pairs",
    ipa: "ɔː / oʊ",
    title: "开口与双元音：caught / coat",
    tip: "ɔː（美式常接近 ɑː）是一个位置稳住的音；oʊ 是滑动音：先 o 再滑向 ʊ，像 coat、go、boat。抓住「有没有滑动」。",
    pairs: [
      { left: "caught", right: "coat", leftIpa: "kɔːt", rightIpa: "koʊt", leftPos: "动", leftZh: "抓住（过去式）", rightPos: "名", rightZh: "外套" },
      { left: "bought", right: "boat", leftIpa: "bɔːt", rightIpa: "boʊt", leftPos: "动", leftZh: "买（过去式）", rightPos: "名", rightZh: "小船" },
      { left: "law", right: "low", leftIpa: "lɔː", rightIpa: "loʊ", leftPos: "名", leftZh: "法律", rightPos: "形", rightZh: "低的" },
      { left: "saw", right: "so", leftIpa: "sɔː", rightIpa: "soʊ", leftPos: "动", leftZh: "看见（过去式）", rightPos: "副", rightZh: "如此；这么" },
      { left: "walk", right: "woke", leftIpa: "wɔːk", rightIpa: "woʊk", leftPos: "名", leftZh: "散步", rightPos: "动", rightZh: "醒来（过去式）" },
      { left: "called", right: "cold", leftIpa: "kɔːld", rightIpa: "koʊld", leftPos: "动", leftZh: "叫作；呼唤（过去式）", rightPos: "形", rightZh: "冷的" },
    ],
    sentences: [
      { text: "I bought a coat for the boat.", zh: "我买了件上船穿的外套。" },
      { text: "The law is so old.", zh: "这条法律太老了。" },
      { text: "I woke up and went for a walk.", zh: "我醒来后出去散了个步。" },
    ],
  },
  "here-hair": {
    id: "here-hair",
    kind: "pairs",
    ipa: "ɪr / er",
    title: "近音：here / hair",
    tip: "here、fear、beer 的元音更靠近 ɪ；hair、fair、bear 更靠近 e。慢说时先把两个元音唱清楚，再连上后面的 r。",
    pairs: [
      { left: "here", right: "hair", leftIpa: "hɪr", rightIpa: "her", leftPos: "副", leftZh: "这里", rightPos: "名", rightZh: "头发" },
      { left: "fear", right: "fair", leftIpa: "fɪr", rightIpa: "fer", leftPos: "动", leftZh: "害怕", rightPos: "形", rightZh: "公平的；还过得去的" },
      { left: "beer", right: "bear", leftIpa: "bɪr", rightIpa: "ber", leftPos: "名", leftZh: "啤酒", rightPos: "名", rightZh: "熊" },
      { left: "cheer", right: "chair", leftIpa: "tʃɪr", rightIpa: "tʃer", leftPos: "动", leftZh: "欢呼", rightPos: "名", rightZh: "椅子" },
      { left: "ear", right: "air", leftIpa: "ɪr", rightIpa: "er", leftPos: "名", leftZh: "耳朵", rightPos: "名", rightZh: "空气" },
      { left: "pierce", right: "pairs", leftIpa: "pɪrs", rightIpa: "perz", leftPos: "动", leftZh: "刺穿", rightPos: "名", rightZh: "几对；几双" },
    ],
    sentences: [
      { text: "Come here and sit in this chair.", zh: "过来，坐这把椅子。" },
      { text: "I fear the fare is not fair.", zh: "恐怕这个票价不公道。" },
      { text: "There's a bear near the beer.", zh: "啤酒旁边有一头熊。" },
    ],
  },
  "sh-s": {
    id: "sh-s",
    kind: "pairs",
    ipa: "ʃ / s",
    title: "擦音：she / see",
    tip: "ʃ 双唇略突出，舌后抬起，气流更散，像 she、ship；s 嘴唇更平，气流更细。she 不要说成 see。",
    pairs: [
      { left: "she", right: "see", leftIpa: "ʃiː", rightIpa: "siː", leftPos: "代", leftZh: "她", rightPos: "动", rightZh: "看见" },
      { left: "ship", right: "sip", leftIpa: "ʃɪp", rightIpa: "sɪp", leftPos: "名", leftZh: "船", rightPos: "动", rightZh: "小口喝" },
      { left: "shy", right: "sigh", leftIpa: "ʃaɪ", rightIpa: "saɪ", leftPos: "形", leftZh: "害羞的", rightPos: "名", rightZh: "叹息" },
      { left: "shell", right: "sell", leftIpa: "ʃel", rightIpa: "sel", leftPos: "名", leftZh: "贝壳", rightPos: "动", rightZh: "卖" },
      { left: "mesh", right: "mess", leftIpa: "meʃ", rightIpa: "mes", leftPos: "名", leftZh: "网眼；网状物", rightPos: "名", rightZh: "混乱；脏乱" },
      { left: "shock", right: "sock", leftIpa: "ʃɑːk", rightIpa: "sɑːk", leftPos: "名", leftZh: "震惊", rightPos: "名", rightZh: "袜子" },
    ],
    sentences: [
      { text: "She can see the ship.", zh: "她看得见那艘船。" },
      { text: "Don't sell the shell.", zh: "别把这个贝壳卖掉。" },
      { text: "I let out a sigh when I felt shy.", zh: "我一觉得害羞就叹了口气。" },
    ],
  },
  "ch-sh": {
    id: "ch-sh",
    kind: "pairs",
    ipa: "tʃ / ʃ",
    title: "塞擦与擦音：cheap / sheep",
    tip: "tʃ 先用舌尖堵住再突然放开（有一个「破」的动作），ʃ 从一开始就是摩擦。cheap 有这个爆破，sheep 没有。",
    pairs: [
      { left: "cheap", right: "sheep", leftIpa: "tʃiːp", rightIpa: "ʃiːp", leftPos: "形", leftZh: "便宜的", rightPos: "名", rightZh: "羊" },
      { left: "chip", right: "ship", leftIpa: "tʃɪp", rightIpa: "ʃɪp", leftPos: "名", leftZh: "薯条；碎片", rightPos: "名", rightZh: "船" },
      { left: "catch", right: "cash", leftIpa: "kætʃ", rightIpa: "kæʃ", leftPos: "动", leftZh: "抓住；赶上", rightPos: "名", rightZh: "现金" },
      { left: "watch", right: "wash", leftIpa: "wɑːtʃ", rightIpa: "wɑːʃ", leftPos: "名", leftZh: "手表", rightPos: "动", rightZh: "洗" },
      { left: "chop", right: "shop", leftIpa: "tʃɑːp", rightIpa: "ʃɑːp", leftPos: "动", leftZh: "砍；切", rightPos: "名", rightZh: "商店" },
      { left: "chew", right: "shoe", leftIpa: "tʃuː", rightIpa: "ʃuː", leftPos: "动", leftZh: "咀嚼", rightPos: "名", rightZh: "鞋" },
    ],
    sentences: [
      { text: "I paid cash to catch the cheap bus.", zh: "我付了现金，赶上了那班便宜的公交车。" },
      { text: "Wash the watch in the shop.", zh: "在店里把这块表洗一下。" },
      { text: "Don't chop the chips on the ship.", zh: "别在船上切薯条。" },
    ],
  },
  "n-ng": {
    id: "n-ng",
    kind: "pairs",
    ipa: "n / ŋ",
    title: "鼻音：thin / thing",
    tip: "n 舌尖抵上齿龈；ŋ 舌后部抵住软腭，舌尖放下，像 sing、thing、going。词尾的 -ing 不要偷懒念成 -in，练的时候先发完整。",
    pairs: [
      { left: "thin", right: "thing", leftIpa: "θɪn", rightIpa: "θɪŋ", leftPos: "形", leftZh: "薄的；瘦的", rightPos: "名", rightZh: "东西；事情" },
      { left: "win", right: "wing", leftIpa: "wɪn", rightIpa: "wɪŋ", leftPos: "动", leftZh: "赢", rightPos: "名", rightZh: "翅膀" },
      { left: "ran", right: "rang", leftIpa: "ræn", rightIpa: "ræŋ", leftPos: "动", leftZh: "跑（过去式）", rightPos: "动", rightZh: "响起；打电话（过去式）" },
      { left: "kin", right: "king", leftIpa: "kɪn", rightIpa: "kɪŋ", leftPos: "名", leftZh: "亲戚", rightPos: "名", rightZh: "国王" },
      { left: "sun", right: "sung", leftIpa: "sʌn", rightIpa: "sʌŋ", leftPos: "名", leftZh: "太阳", rightPos: "动", rightZh: "唱（过去分词）" },
      { left: "ban", right: "bang", leftIpa: "bæn", rightIpa: "bæŋ", leftPos: "动", leftZh: "禁止", rightPos: "名", rightZh: "巨响" },
    ],
    sentences: [
      { text: "This thin thing can fly with one wing.", zh: "这个薄薄的东西靠一只翅膀也能飞。" },
      { text: "The king rang me in the morning.", zh: "国王早上给我打了电话。" },
      { text: "She sang when the sun came out.", zh: "太阳出来的时候，她唱起了歌。" },
    ],
  },
  "s-z": {
    id: "s-z",
    kind: "pairs",
    ipa: "s / z",
    title: "清浊：sip / zip",
    tip: "口型几乎一样，差别只在声带：s 不振动，z 振动。把手指放在喉结上，zip、eyes、prize 应该能感觉到颤动。",
    pairs: [
      { left: "sip", right: "zip", leftIpa: "sɪp", rightIpa: "zɪp", leftPos: "动", leftZh: "小口喝", rightPos: "动", rightZh: "拉上拉链" },
      { left: "price", right: "prize", leftIpa: "praɪs", rightIpa: "praɪz", leftPos: "名", leftZh: "价格", rightPos: "名", rightZh: "奖品；奖金" },
      { left: "ice", right: "eyes", leftIpa: "aɪs", rightIpa: "aɪz", leftPos: "名", leftZh: "冰", rightPos: "名", rightZh: "眼睛" },
      { left: "bus", right: "buzz", leftIpa: "bʌs", rightIpa: "bʌz", leftPos: "名", leftZh: "公交车", rightPos: "名", rightZh: "嗡嗡声" },
      { left: "lace", right: "laze", leftIpa: "leɪs", rightIpa: "leɪz", leftPos: "名", leftZh: "花边；鞋带", rightPos: "动", rightZh: "懒散地待着" },
      { left: "hiss", right: "his", leftIpa: "hɪs", rightIpa: "hɪz", leftPos: "动", leftZh: "发出嘶嘶声", rightPos: "代", rightZh: "他的" },
    ],
    sentences: [
      { text: "The price of the prize surprised his eyes.", zh: "那个奖的价钱让他很吃惊。" },
      { text: "I took a sip and heard a buzz.", zh: "我喝了一小口，听见一阵嗡嗡声。" },
      { text: "Zip up before you get on the bus.", zh: "上车前先把拉链拉好。" },
    ],
  },
  "f-th": {
    id: "f-th",
    kind: "pairs",
    ipa: "f / θ",
    title: "唇齿与咬舌：free / three",
    tip: "f 是上齿咬下唇；θ 是舌尖抵齿，嘴唇不要参与。three 说成 free，是把舌头忘了。对着镜子看：three 应该能看见舌尖。",
    pairs: [
      { left: "free", right: "three", leftIpa: "friː", rightIpa: "θriː", leftPos: "形", leftZh: "空闲的；自由的", rightPos: "数", rightZh: "三" },
      { left: "fin", right: "thin", leftIpa: "fɪn", rightIpa: "θɪn", leftPos: "名", leftZh: "鳍", rightPos: "形", rightZh: "薄的；瘦的" },
      { left: "first", right: "thirst", leftIpa: "fɜːrst", rightIpa: "θɜːrst", leftPos: "形", leftZh: "第一的", rightPos: "名", rightZh: "口渴" },
      { left: "fought", right: "thought", leftIpa: "fɔːt", rightIpa: "θɔːt", leftPos: "动", leftZh: "打架（过去式）", rightPos: "动", rightZh: "想（过去式）" },
      { left: "deaf", right: "death", leftIpa: "def", rightIpa: "deθ", leftPos: "形", leftZh: "耳聋的", rightPos: "名", rightZh: "死亡" },
      { left: "frill", right: "thrill", leftIpa: "frɪl", rightIpa: "θrɪl", leftPos: "名", leftZh: "褶边；多余的装饰", rightPos: "名", rightZh: "兴奋；刺激感" },
    ],
    sentences: [
      { text: "I thought I was free for three hours.", zh: "我以为自己有三个小时的空闲。" },
      { text: "She felt a thirst at first.", zh: "一开始她觉得口渴。" },
      { text: "The thin fin cut through the water.", zh: "那片薄薄的鳍划开了水面。" },
    ],
  },
  "th-dh": {
    id: "th-dh",
    kind: "pairs",
    ipa: "θ / ð",
    title: "清浊咬舌：thin / this",
    tip: "两个都要伸舌尖，差别只在声带。θ 出现在 think、three、both；ð 出现在 this、that、the、mother。先用手感受喉结，再放到词里。",
    pairs: [
      { left: "thin", right: "this", leftIpa: "θɪn", rightIpa: "ðɪs", leftPos: "形", leftZh: "薄的；瘦的", rightPos: "代", rightZh: "这个" },
      { left: "thigh", right: "thy", leftIpa: "θaɪ", rightIpa: "ðaɪ", leftPos: "名", leftZh: "大腿", rightPos: "代", rightZh: "你的（古英语）" },
      { left: "ether", right: "either", leftIpa: "ˈiːθər", rightIpa: "ˈiːðər", leftPos: "名", leftZh: "乙醚；也指苍穹", rightPos: "代", rightZh: "两者中的一个；要么" },
      { left: "teeth", right: "teethe", leftIpa: "tiːθ", rightIpa: "tiːð", leftPos: "名", leftZh: "牙齿", rightPos: "动", rightZh: "长牙" },
      { left: "sooth", right: "soothe", leftIpa: "suːθ", rightIpa: "suːð", leftPos: "名", leftZh: "实情、真话（古语）", rightPos: "动", rightZh: "抚慰；使平静" },
      { left: "thistle", right: "this'll", leftIpa: "ˈθɪsəl", rightIpa: "ˈðɪsəl", leftPos: "名", leftZh: "蓟（一种带刺的草）", rightPos: "短语", rightZh: "this will 的口语缩约，表示「这会……」" },
    ],
    sentences: [
      { text: "This thin cloth can soothe the skin.", zh: "这块薄布能让皮肤舒服一些。" },
      { text: "I think this is the right thing.", zh: "我觉得这是对的事情。" },
      { text: "Both of them thanked their mother.", zh: "他们俩都向妈妈道了谢。" },
    ],
  },
  "er-ah": {
    id: "er-ah",
    kind: "pairs",
    ipa: "ɜː / ɑː",
    title: "中后元音：bird / bard",
    tip: "ɜː（bird、fur、heard）舌头居中，美式要带 r 色彩；ɑː（bard、far、hard）嘴巴更开、舌头更低。heard 和 hard 是经典混点。",
    pairs: [
      { left: "bird", right: "bard", leftIpa: "bɜːrd", rightIpa: "bɑːrd", leftPos: "名", leftZh: "鸟", rightPos: "名", rightZh: "吟游诗人" },
      { left: "fur", right: "far", leftIpa: "fɜːr", rightIpa: "fɑːr", leftPos: "名", leftZh: "毛皮", rightPos: "形", rightZh: "远的" },
      { left: "heard", right: "hard", leftIpa: "hɜːrd", rightIpa: "hɑːrd", leftPos: "动", leftZh: "听见（过去式）", rightPos: "形", rightZh: "困难的；硬的" },
      { left: "burn", right: "barn", leftIpa: "bɜːrn", rightIpa: "bɑːrn", leftPos: "动", leftZh: "燃烧", rightPos: "名", rightZh: "谷仓" },
      { left: "stir", right: "star", leftIpa: "stɜːr", rightIpa: "stɑːr", leftPos: "动", leftZh: "搅拌", rightPos: "名", rightZh: "星星" },
      { left: "hurt", right: "heart", leftIpa: "hɜːrt", rightIpa: "hɑːrt", leftPos: "动", leftZh: "受伤；疼痛", rightPos: "名", rightZh: "心脏；内心" },
    ],
    sentences: [
      { text: "I heard it was hard to find the bird.", zh: "我听说那只鸟很难找到。" },
      { text: "Her heart hurt after the run.", zh: "跑完之后，她的心口隐隐作痛。" },
      { text: "The star is far from the fur shop.", zh: "那颗星星离皮草店很远。" },
    ],
  },
  "ei-e": {
    id: "ei-e",
    kind: "pairs",
    ipa: "eɪ / e",
    title: "双元音与短元音：late / let",
    tip: "eɪ 是滑动音：从 e 滑向 ɪ，像 late、wait、pain；e 停在原地，像 let、wet、pen。没有滑动，late 就会变成 let。",
    pairs: [
      { left: "late", right: "let", leftIpa: "leɪt", rightIpa: "let", leftPos: "形", leftZh: "迟到的；晚的", rightPos: "动", rightZh: "让；允许" },
      { left: "wait", right: "wet", leftIpa: "weɪt", rightIpa: "wet", leftPos: "动", leftZh: "等待", rightPos: "形", rightZh: "湿的" },
      { left: "pain", right: "pen", leftIpa: "peɪn", rightIpa: "pen", leftPos: "名", leftZh: "疼痛", rightPos: "名", rightZh: "钢笔" },
      { left: "gate", right: "get", leftIpa: "geɪt", rightIpa: "get", leftPos: "名", leftZh: "大门", rightPos: "动", rightZh: "得到；去拿" },
      { left: "age", right: "edge", leftIpa: "eɪdʒ", rightIpa: "edʒ", leftPos: "名", leftZh: "年龄", rightPos: "名", rightZh: "边缘" },
      { left: "taste", right: "test", leftIpa: "teɪst", rightIpa: "test", leftPos: "名", leftZh: "味道", rightPos: "名", rightZh: "测验；测试" },
    ],
    sentences: [
      { text: "Don't wait in the wet rain.", zh: "别在雨里干等。" },
      { text: "Let me late? No — don't be late, let me in the gate.", zh: "「让我迟到？」不对——别迟到，让我进门。" },
      { text: "This test tastes strange. I mean, this taste test is strange.", zh: "这次测验味道很怪。我是说，这次口味测试很奇怪。" },
    ],
  },
  "ai-ae": {
    id: "ai-ae",
    kind: "pairs",
    ipa: "aɪ / æ",
    title: "双元音与扁唇：like / lack",
    tip: "aɪ 从 a 滑向 ɪ，嘴型明显变化，像 like、time、bite；æ 停在张开的位置，像 lack、bat。like 说成 lack，是把滑动丢掉了。",
    pairs: [
      { left: "like", right: "lack", leftIpa: "laɪk", rightIpa: "læk", leftPos: "动", leftZh: "喜欢", rightPos: "动", rightZh: "缺乏" },
      { left: "bite", right: "bat", leftIpa: "baɪt", rightIpa: "bæt", leftPos: "动", leftZh: "咬", rightPos: "名", rightZh: "球棒；蝙蝠" },
      { left: "time", right: "tam", leftIpa: "taɪm", rightIpa: "tæm", leftPos: "名", leftZh: "时间", rightPos: "名", rightZh: "无边软帽" },
      { left: "mine", right: "man", leftIpa: "maɪn", rightIpa: "mæn", leftPos: "代", leftZh: "我的", rightPos: "名", rightZh: "男人" },
      { left: "pike", right: "pack", leftIpa: "paɪk", rightIpa: "pæk", leftPos: "名", leftZh: "长矛；也指狗鱼", rightPos: "动", rightZh: "打包" },
      { left: "side", right: "sad", leftIpa: "saɪd", rightIpa: "sæd", leftPos: "名", leftZh: "旁边；一侧", rightPos: "形", rightZh: "难过的" },
    ],
    sentences: [
      { text: "I like this, but I lack time.", zh: "我喜欢这个，可是我没时间。" },
      { text: "The man on my side looked sad.", zh: "我旁边的那个男人看起来很难过。" },
      { text: "Don't bite into that bat. Wait, don't pack a pike either.", zh: "别去咬那根球棒。等等，也别把长矛打包带走。" },
    ],
  },
  "ae-uh": {
    id: "ae-uh",
    kind: "pairs",
    ipa: "æ / ʌ",
    title: "前与中：cat / cut",
    tip: "æ 嘴更开、更靠前；ʌ 居中而短。cat / cut、bag / bug、ran / run 是一组常见混点，先对着镜子看嘴张得够不够。",
    pairs: [
      { left: "cat", right: "cut", leftIpa: "kæt", rightIpa: "kʌt", leftPos: "名", leftZh: "猫", rightPos: "动", rightZh: "切；割" },
      { left: "bag", right: "bug", leftIpa: "bæg", rightIpa: "bʌg", leftPos: "名", leftZh: "包", rightPos: "名", rightZh: "虫子" },
      { left: "ran", right: "run", leftIpa: "ræn", rightIpa: "rʌn", leftPos: "动", leftZh: "跑（过去式）", rightPos: "动", rightZh: "跑" },
      { left: "ankle", right: "uncle", leftIpa: "ˈæŋkəl", rightIpa: "ˈʌŋkəl", leftPos: "名", leftZh: "脚踝", rightPos: "名", rightZh: "叔叔；舅舅" },
      { left: "match", right: "much", leftIpa: "mætʃ", rightIpa: "mʌtʃ", leftPos: "名", leftZh: "比赛；火柴", rightPos: "副", rightZh: "很多" },
      { left: "drank", right: "drunk", leftIpa: "dræŋk", rightIpa: "drʌŋk", leftPos: "动", leftZh: "喝（过去式）", rightPos: "形", rightZh: "喝醉的" },
    ],
    sentences: [
      { text: "The cat cut across the path.", zh: "那只猫抄近路穿过了小径。" },
      { text: "I ran, then I had to run again.", zh: "我跑了一段，接着又不得不再跑。" },
      { text: "There's a bug in my bag.", zh: "我包里有只虫子。" },
    ],
  },
  "i-e": {
    id: "i-e",
    kind: "pairs",
    ipa: "ɪ / e",
    title: "短元音：lid / led",
    tip: "ɪ 更靠近「衣」但短而松；e 更靠近「诶」。pin / pen、lid / led 在一些口音里会接近，练的时候把 e 的嘴再打开一点。",
    pairs: [
      { left: "lid", right: "led", leftIpa: "lɪd", rightIpa: "led", leftPos: "名", leftZh: "盖子", rightPos: "动", rightZh: "带领（过去式）" },
      { left: "pin", right: "pen", leftIpa: "pɪn", rightIpa: "pen", leftPos: "名", leftZh: "别针", rightPos: "名", rightZh: "钢笔" },
      { left: "bit", right: "bet", leftIpa: "bɪt", rightIpa: "bet", leftPos: "名", leftZh: "一点儿", rightPos: "动", rightZh: "打赌" },
      { left: "will", right: "well", leftIpa: "wɪl", rightIpa: "wel", leftPos: "动", leftZh: "将要", rightPos: "副", rightZh: "好地" },
      { left: "tin", right: "ten", leftIpa: "tɪn", rightIpa: "ten", leftPos: "名", leftZh: "锡；铁皮", rightPos: "数", rightZh: "十" },
      { left: "fill", right: "fell", leftIpa: "fɪl", rightIpa: "fel", leftPos: "动", leftZh: "装满", rightPos: "动", rightZh: "倒下（过去式）" },
    ],
    sentences: [
      { text: "This pin fell into the pen.", zh: "这根别针掉进了那支钢笔里。" },
      { text: "I will do it well.", zh: "我会把它做好。" },
      { text: "Ten tin lids led me here.", zh: "十个铁皮盖把我引到了这里。" },
    ],
  },
  "voice": {
    id: "voice",
    kind: "pairs",
    ipa: "p b / t d / k g",
    title: "清浊对立：park / bark",
    tip: "清音 p/t/k 在词首有一股送气；浊音 b/d/g 要振动声带、送气更弱。把一张纸巾放在嘴前，park 会吹动纸巾，bark 几乎不会。",
    pairs: [
      { left: "park", right: "bark", leftIpa: "pɑːrk", rightIpa: "bɑːrk", leftPos: "动", leftZh: "停车", rightPos: "动", rightZh: "（狗）叫" },
      { left: "tie", right: "die", leftIpa: "taɪ", rightIpa: "daɪ", leftPos: "名", leftZh: "领带", rightPos: "动", rightZh: "死去" },
      { left: "coat", right: "goat", leftIpa: "koʊt", rightIpa: "goʊt", leftPos: "名", leftZh: "外套", rightPos: "名", rightZh: "山羊" },
      { left: "pear", right: "bear", leftIpa: "per", rightIpa: "ber", leftPos: "名", leftZh: "梨", rightPos: "名", rightZh: "熊" },
      { left: "come", right: "gum", leftIpa: "kʌm", rightIpa: "gʌm", leftPos: "动", leftZh: "来", rightPos: "名", rightZh: "口香糖；牙龈" },
      { left: "toe", right: "dough", leftIpa: "toʊ", rightIpa: "doʊ", leftPos: "名", leftZh: "脚趾", rightPos: "名", rightZh: "面团" },
    ],
    sentences: [
      { text: "Don't park where the dogs bark.", zh: "别把车停在狗叫的地方。" },
      { text: "I need a coat and I saw a goat.", zh: "我需要一件外套，结果看见了一只山羊。" },
      { text: "Come get some gum.", zh: "过来拿点口香糖。" },
    ],
  },
  "y-vowel": {
    id: "y-vowel",
    kind: "pairs",
    ipa: "j / —",
    title: "介音：year / ear",
    tip: "year、yes、yesterday 开头有一个很短的 j（像「衣」迅速滑走）；ear、east 没有。year 说成 ear，是把这个滑音吞掉了。",
    pairs: [
      { left: "year", right: "ear", leftIpa: "jɪr", rightIpa: "ɪr", leftPos: "名", leftZh: "年", rightPos: "名", rightZh: "耳朵" },
      { left: "yeast", right: "east", leftIpa: "jiːst", rightIpa: "iːst", leftPos: "名", leftZh: "酵母", rightPos: "名", rightZh: "东边" },
      { left: "yell", right: "L", leftIpa: "jel", rightIpa: "el", leftPos: "动", leftZh: "喊叫", rightPos: "字母", rightZh: "字母 L" },
      { left: "yacht", right: "ought", leftIpa: "jɑːt", rightIpa: "ɔːt", leftPos: "名", leftZh: "游艇", rightPos: "动", rightZh: "应该" },
      { left: "yes", right: "S", leftIpa: "jes", rightIpa: "es", leftPos: "叹", leftZh: "是的", rightPos: "字母", rightZh: "字母 S" },
      { left: "yet", right: "et", leftIpa: "jet", rightIpa: "et", leftPos: "副", leftZh: "还；尚且", rightPos: "音节", rightZh: "对比用的短音（本身几乎不作单词用）" },
    ],
    sentences: [
      { text: "This year I will rest my ear.", zh: "今年我要让耳朵歇一歇。" },
      { text: "Yes, the yeast is in the east kitchen.", zh: "对，酵母在东边的厨房里。" },
      { text: "Not yet — wait a year.", zh: "还不行——再等一年。" },
    ],
  },
  "link-gonna": {
    id: "link-gonna",
    kind: "linking",
    ipa: "want to / going to / got to",
    title: "弱化连读：wanna / gonna / gotta",
    tip: "口语里 want to 常变成 wanna，going to 变成 gonna，got to 变成 gotta。不是「不规范到不能学」，而是耳朵必须先认识这个声音，否则听日常对话会一直觉得对方在说没学过的词。",
    items: [
      { citation: "want to", reduced: "wanna", example: "I wanna get some air.", citationZh: "想要", exampleZh: "我想出去透透气。" },
      { citation: "going to", reduced: "gonna", example: "I'm gonna be late.", citationZh: "打算、将要", exampleZh: "我要迟到了。" },
      { citation: "got to", reduced: "gotta", example: "I gotta go now.", citationZh: "必须、得", exampleZh: "我现在得走了。" },
      { citation: "have to", reduced: "hafta", example: "You hafta see this.", citationZh: "不得不、必须", exampleZh: "你一定得看看这个。" },
      { citation: "has to", reduced: "hasta", example: "She hasta leave at five.", citationZh: "不得不（第三人称）", exampleZh: "她五点必须走。" },
      { citation: "ought to", reduced: "oughta", example: "We oughta start soon.", citationZh: "应该", exampleZh: "我们该马上开始了。" },
    ],
    sentences: [
      { text: "I'm gonna call you later because I gotta finish this.", zh: "我过会儿再给你打电话，因为我得先把这个做完。" },
      { text: "Do you wanna grab lunch, or do you hafta work?", zh: "你想一起吃午饭吗，还是你必须干活？" },
      { text: "We oughta leave if we wanna catch the train.", zh: "要想赶上火车，我们得走了。" },
    ],
  },
  "link-cv": {
    id: "link-cv",
    kind: "linking",
    ipa: "辅音 + 元音",
    title: "连读：把词界「粘」起来",
    tip: "前一个词以辅音收尾、后一个以元音开头时，辅音会贴到后面：pick it up 听起来像 pi-ki-tup。这不是在吞词，是在重新分音节。听到「一个新词」时，先想想是不是连读。",
    items: [
      { citation: "pick it up", reduced: "pi-ki-tup", example: "Can you pick it up for me?", citationZh: "把它捡起来", exampleZh: "你能帮我捡起来吗？" },
      { citation: "turn it off", reduced: "tur-ni-toff", example: "Please turn it off.", citationZh: "把它关掉", exampleZh: "请把它关掉。" },
      { citation: "an apple", reduced: "a-napple", example: "I ate an apple.", citationZh: "一个苹果（连读时像 a-napple）", exampleZh: "我吃了一个苹果。" },
      { citation: "take it easy", reduced: "tay-ki-teezy", example: "Hey, take it easy.", citationZh: "放轻松", exampleZh: "嘿，放轻松。" },
      { citation: "check it out", reduced: "che-ki-dout", example: "You should check it out.", citationZh: "看看这个；了解一下", exampleZh: "你该去看看。" },
      { citation: "come on in", reduced: "c'mo-nin", example: "Come on in, it's warm.", citationZh: "进来吧", exampleZh: "进来吧，里面挺暖和。" },
    ],
    sentences: [
      { text: "Pick it up and turn it off.", zh: "把它捡起来，然后关掉。" },
      { text: "Come on in and have an apple.", zh: "进来吧，吃个苹果。" },
      { text: "Check it out, then take it easy.", zh: "先看看，然后放轻松。" },
    ],
  },
  "weak-small": {
    id: "weak-small",
    kind: "weak",
    ipa: "to / for / of / and / the / a",
    title: "虚词弱读：语法词会变轻",
    tip: "to、for、of、and、the、a 在句子里常常又短又含糊，元音会变成 ə（所谓 schwa，就是那个含糊的「呃」）。你认识这些词，却听不出来，往往是因为它们被弱读了。先听重的实词，再回头抓这些轻声。",
    items: [
      { citation: "to", reduced: "tə", example: "I want to go to the store.", citationZh: "（弱读的）到、去", exampleZh: "我想去那家店。" },
      { citation: "for", reduced: "fər", example: "This is for you.", citationZh: "（弱读的）给、为了", exampleZh: "这是给你的。" },
      { citation: "of", reduced: "əv / ə", example: "a cup of tea", citationZh: "（弱读的）的", exampleZh: "一杯茶" },
      { citation: "and", reduced: "ən / n", example: "rock and roll", citationZh: "（弱读的）和", exampleZh: "摇滚乐" },
      { citation: "the", reduced: "ðə", example: "the book on the table", citationZh: "（弱读的）这、那", exampleZh: "桌上的那本书" },
      { citation: "a", reduced: "ə", example: "I need a minute.", citationZh: "（弱读的）一个", exampleZh: "我需要一分钟。" },
    ],
    sentences: [
      { text: "I want to go to the store for a cup of tea.", zh: "我想去店里买杯茶。" },
      { text: "The book and the pen are on the table.", zh: "书和笔都在桌上。" },
      { text: "This is a gift for a friend of mine.", zh: "这是送给我一个朋友的礼物。" },
    ],
  },
  "weak-verbs": {
    id: "weak-verbs",
    kind: "weak",
    ipa: "can / have / was / were",
    title: "助动词弱读：can 不像 can",
    tip: "肯定句里 can 常变成 kn（很短）；have 变成 /əv/ 或 /v/（could've、should've）；was / were 也会缩成很轻的一声。要听「能不能」，看重音在哪儿：I CAN go（强调）和 I can GO（普通）不是同一个声音。",
    items: [
      { citation: "can", reduced: "kn", example: "I can do it.", citationZh: "（弱读的）能", exampleZh: "我能做到。" },
      { citation: "have", reduced: "əv / v", example: "I have been there. / I could have called.", citationZh: "（弱读的）已经；完成时里的 have", exampleZh: "我去过那里。／我本来可以打电话的。" },
      { citation: "was", reduced: "wəz", example: "She was tired.", citationZh: "（弱读的）是（过去式）", exampleZh: "她累了。" },
      { citation: "were", reduced: "wər", example: "We were late.", citationZh: "（弱读的）是（过去式复数）", exampleZh: "我们迟到了。" },
      { citation: "are", reduced: "ər", example: "What are you doing?", citationZh: "（弱读的）是", exampleZh: "你在干什么？" },
      { citation: "do you", reduced: "d'you / dyə", example: "Do you know him?", citationZh: "（弱读的）你……吗", exampleZh: "你认识他吗？" },
    ],
    sentences: [
      { text: "I can do it if you can wait.", zh: "你要是能等，我就做得了。" },
      { text: "She was tired, and we were late.", zh: "她累了，我们也迟到了。" },
      { text: "What are you doing? Do you need a hand?", zh: "你在干什么？要帮忙吗？" },
    ],
  },
  "link-kinda": {
    id: "link-kinda",
    kind: "linking",
    ipa: "kind of / a lot of / don't know",
    title: "日常缩合：kinda / lotta / dunno",
    tip: "kind of → kinda，a lot of → a lotta，don't know → dunno，out of → outta。这些是口语里的真实声音。先能听出来，自己说的时候不必故意「街头化」，自然略缩即可。",
    items: [
      { citation: "kind of", reduced: "kinda", example: "It's kinda cold in here.", citationZh: "有点儿", exampleZh: "这里有点冷。" },
      { citation: "a lot of", reduced: "a lotta", example: "I have a lotta work today.", citationZh: "很多", exampleZh: "我今天有好多工作。" },
      { citation: "don't know", reduced: "dunno", example: "I dunno if I can come.", citationZh: "不知道", exampleZh: "我不知道能不能来。" },
      { citation: "out of", reduced: "outta", example: "We're outta milk.", citationZh: "没有了、用完了", exampleZh: "我们牛奶没了。" },
      { citation: "sort of", reduced: "sorta", example: "I sorta like this idea.", citationZh: "有点儿、差不多", exampleZh: "我还挺喜欢这个想法的。" },
      { citation: "give me", reduced: "gimme", example: "Gimme a second.", citationZh: "给我", exampleZh: "给我一点时间。" },
    ],
    sentences: [
      { text: "I dunno, it's kinda late and I have a lotta work.", zh: "我不知道，有点晚了，而且我还有好多工作。" },
      { text: "We're outta time, so gimme a second.", zh: "我们没时间了，先给我一秒。" },
      { text: "I sorta want to go, but I'm kinda tired.", zh: "我有点想去，但又有点累。" },
    ],
  },
  "link-flap": {
    id: "link-flap",
    kind: "linking",
    ipa: "美式 t：water / better",
    title: "美式轻拍音：t 不像 t",
    tip: "在美式英语里，water、better、city、get it 中间的 t 常变成很像短 d 的轻拍（flap）。所以 water 听着像「wadder」。不是听错了，是口音规则。今天把这些词多听几遍，对上即可。",
    items: [
      { citation: "water", reduced: "wa-der", example: "Can I get some water?", citationZh: "水（中间的 t 常发成轻弹音）", exampleZh: "能给我来点水吗？" },
      { citation: "better", reduced: "be-der", example: "That's much better.", citationZh: "更好（t 常发成轻弹音）", exampleZh: "这样好多了。" },
      { citation: "city", reduced: "ci-dy", example: "I love this city.", citationZh: "城市（t 常发成轻弹音）", exampleZh: "我喜欢这座城市。" },
      { citation: "get it", reduced: "ge-dit", example: "Did you get it?", citationZh: "明白了；拿到了（t 连读、轻弹）", exampleZh: "你听明白了吗？" },
      { citation: "little", reduced: "li-dle", example: "Wait a little bit.", citationZh: "一点、小的（t 常发成轻弹音）", exampleZh: "稍等一下。" },
      { citation: "twenty", reduced: "twenny", example: "I'll be there at twenty past.", citationZh: "二十（常读成 twenny）", exampleZh: "我二十分到。" },
    ],
    sentences: [
      { text: "The water in this city tastes better.", zh: "这座城市的水喝起来更好。" },
      { text: "Wait a little bit — did you get it?", zh: "稍等一下——你听明白了吗？" },
      { text: "I need twenty minutes and a little water.", zh: "我需要二十分钟，再来一点水。" },
    ],
  },
};

export const SOUND_SCHEDULE: { day: number; groupIds: string[] }[] = [
  { day: 1, groupIds: ["i-i"] },
  { day: 2, groupIds: ["ae-e"] },
  { day: 3, groupIds: ["th-s"] },
  { day: 4, groupIds: ["dh-d"] },
  { day: 5, groupIds: ["v-w"] },
  { day: 6, groupIds: ["l-r"] },
  { day: 7, groupIds: ["ah-uh"] },
  { day: 8, groupIds: ["u-uu"] },
  { day: 9, groupIds: ["or-oh"] },
  { day: 10, groupIds: ["here-hair"] },
  { day: 11, groupIds: ["sh-s", "ch-sh"] },
  { day: 12, groupIds: ["n-ng"] },
  { day: 13, groupIds: ["s-z"] },
  { day: 14, groupIds: ["f-th", "th-dh"] },
  { day: 15, groupIds: ["link-gonna"] },
  { day: 16, groupIds: ["link-cv"] },
  { day: 17, groupIds: ["weak-small"] },
  { day: 18, groupIds: ["weak-verbs"] },
  { day: 19, groupIds: ["er-ah"] },
  { day: 20, groupIds: ["ei-e"] },
  { day: 21, groupIds: ["ai-ae", "ae-uh"] },
  { day: 22, groupIds: ["or-oh"] },
  { day: 23, groupIds: ["voice"] },
  { day: 24, groupIds: ["y-vowel", "i-e"] },
  { day: 25, groupIds: ["link-kinda"] },
  { day: 26, groupIds: ["link-flap"] },
  { day: 27, groupIds: ["i-i", "ae-e", "ah-uh"] },
  { day: 28, groupIds: ["th-s", "l-r", "link-cv"] },
];

export function soundsForPhaseDay(day: number): SoundGroup[] {
  const d = ((Math.max(1, day) - 1) % 28) + 1;
  const entry = SOUND_SCHEDULE.find((x) => x.day === d)!;
  return entry.groupIds.map((id) => SOUND_GROUPS[id]);
}

export function allGroupList(): SoundGroup[] {
  return Object.values(SOUND_GROUPS);
}
