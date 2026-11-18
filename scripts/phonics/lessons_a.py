# Part A: 48 symbols (DJ), US pronunciation.
# fields: dj, us, kk, nameZh, mouth, chinese, spell, words, contrast
def S(dj, us, kk, nameZh, mouth, chinese, spell, words, contrast=None, usNote=None):
    return dict(dj=dj, us=us, kk=kk, nameZh=nameZh, mouth=mouth, chinese=chinese, spell=spell,
                words=words.split(), contrast=contrast, usNote=usNote)

PART_A = [
 dict(id="a1", title="Short vowels", titleZh="短元音", introZh="先学 7 个短元音。它们都短、松、不滑动。中国学生最常见的问题是把短音拉长，或者把几个相近的音念成一个。每个音先慢听，再听例词，最后做小测。",
  sounds=[
   S("ɪ","ɪ","ɪ","短 i","舌头比 /iː/ 稍低稍后，嘴唇放松、微微张开，声音短促，不用力。","接近汉语「一」但更松更短，介于「一」和「诶」之间。常见错误：把 sit 念成 seat，长短不分。","i（sit）、y（gym）","sit big fish milk","i-i"),
   S("e","e","ɛ","短 e","嘴比 /ɪ/ 张得大一点，嘴角略向两边拉，舌头在中间偏前，短。","像「诶」去掉尾巴，不要滑成 /eɪ/。常见错误：bed 念成 bad，或者拖成 bay-d。","e（bed）、ea（head）","bed pen red egg","i-e","美式词典和 KK 常写 /ɛ/，和英式 /e/ 是同一个音。"),
   S("æ","æ","æ","蝴蝶音","下巴明显放下，嘴张大，嘴角往两边拉，舌尖抵下齿，舌头低而前。","汉语里没有这个音，在「啊」和「诶」之间。常见错误：cat 念成 ket（太窄）或念成「卡」（太后）。","a（cat）","cat bag apple hat","ae-e"),
   S("ʌ","ʌ","ʌ","短 a（杯子音）","嘴自然半张，舌头放平在中间，不圆唇，声音短而有力。","接近轻声的「阿」，比「啊」短、嘴不要张太大。常见错误：cup 和 cap 不分，或念成 /ɑː/。","u（cup）、o（love）、ou（touch）","cup bus sun love","ah-uh"),
   S("ɒ","ɑː","ɑ","短 o（美音变 /ɑː/）","英式是圆唇短 o；美式在 hot、box 里不圆唇，嘴张大，舌头低后，像张大嘴的「啊」。","美音接近「啊」，嘴张更大，舌头更靠后。常见错误：按课本英式念成圆唇的「哦」，美国人听起来不自然。","o（hot、box）","hot box stop job",None,"英式 /ɒ/ 在美音里一般变成 /ɑː/：hot /hɑːt/、job /dʒɑːb/。"),
   S("ʊ","ʊ","ʊ","短 u","嘴唇微圆但放松，舌头后部抬起但不如 /uː/ 高，声音短。","接近「乌」但更松、更短，嘴不要撅。常见错误：book 念成 boo-k，拉长成 /uː/。","oo（book）、u（put）、ou（could）","book good put foot","u-uu"),
   S("ə","ə","ə","弱读音（schwa）","嘴、舌头、嘴唇全部放松，在中间位置轻轻发一个很短的「呃」。只出现在不重读的音节里。","像轻声的「呃」。常见错误：把每个字母都读清楚，about 念成「阿保特」，节奏会很生硬。","a（about）、o（today）、e（problem）等","about banana sofa today"),
  ]),
 dict(id="a2", title="Long vowels", titleZh="长元音", introZh="5 个长元音要稳、要够长，口型从头到尾基本不变。美音里 /ɜː/ 带卷舌，写作 /ɝː/。长和短的区别，不只是长度，口型也不同。",
  sounds=[
   S("iː","iː","i","长 i","嘴角向两边拉，像微笑，舌头高而前，紧，拉长。","接近汉语「衣」，但要更长、嘴角更开。常见错误：和 /ɪ/ 不分，seat 和 sit 一样。","ee（see）、ea（tea）、e（she）","see tea eat green","i-i"),
   S("ɑː","ɑː","ɑ","长 a","嘴张大，舌头放低、靠后，不圆唇，声音拉长。美音在 r 前写作 /ɑːr/，要卷舌。","接近「啊」，嘴张得更大、更靠后。常见错误：car 只念「卡」，漏掉美音的卷舌。","a（father）、ar（car）","father car park star","er-ah","英式 car /kɑː/ 不卷舌；美式 car /kɑːr/ 要卷舌。"),
   S("ɔː","ɔː","ɔ","长 o","嘴唇收圆、向前，下巴放低，舌头靠后，声音稳住不滑。","接近「哦」拉长，但嘴更圆、更开。常见错误：念成 /oʊ/（滑向「欧」）。很多美国人会把这个音念得接近 /ɑː/。","al（ball、walk）、aw（saw）、au","ball walk talk saw","or-oh","很多美国人把 /ɔː/ 和 /ɑː/ 合并：walk 也可听到 /wɑːk/。两种都对。"),
   S("uː","uː","u","长 u","嘴唇撅圆、向前，舌头后部抬高，紧，拉长。","接近汉语「乌」，但更长、嘴更圆。常见错误：和 /ʊ/ 不分，food 和 foot 一样。","oo（food）、ue（blue）、o（two）","food blue school two","u-uu"),
   S("ɜː","ɝː","ɝ","卷舌长元音","美音：舌尖向上卷或舌身向后缩，嘴唇微圆，声音拉长并带 r 色。英式不卷舌。","汉语「儿」的感觉，但要从头到尾都卷着。常见错误：念成「额」不卷舌，或念成「我」。","er（her）、ir（bird）、ur（turn）、or（work）","bird girl work first","er-ah","英式 /ɜː/ 在美音里写作 /ɝː/，一定要卷舌：bird /bɝːd/。"),
  ]),
 dict(id="a3", title="Diphthongs", titleZh="双元音（滑动音）", introZh="双元音是从一个音滑到另一个音，前半部分重、长，后半部分轻、短。中国学生常常滑得不够，或者只念前半。",
  sounds=[
   S("eɪ","eɪ","e","ei 滑音","从 /e/ 开始，嘴角向两边拉，滑向 /ɪ/。前重后轻。","接近汉语「诶」，结尾要往「一」滑。常见错误：和短 /e/ 不分，late 念成 let。","a_e（cake）、ai（rain）、ay（day）","day name rain cake","ei-e"),
   S("aɪ","aɪ","aɪ","ai 滑音","嘴先张大发 /a/，再滑向 /ɪ/，舌头从低到高。","接近汉语「爱」，但开头嘴张得更大。常见错误：滑得太短，像只说了「啊」。","i_e（five）、y（my）、igh（night）","five time my night","ai-ae"),
   S("ɔɪ","ɔɪ","ɔɪ","oi 滑音","从圆唇的 /ɔ/ 开始，再滑向 /ɪ/。","接近「哦一」连读。常见错误：前半部分嘴不够圆。","oi（coin）、oy（boy）","boy toy coin enjoy"),
   S("aʊ","aʊ","aʊ","au 滑音","嘴先张大发 /a/，再收圆滑向 /ʊ/。","接近汉语「奥」，但开头嘴张得更大。常见错误：念成「熬」不够开，或者滑不到 /ʊ/。","ou（house）、ow（now）","now house down out"),
   S("əʊ","oʊ","o","ou 滑音（美音 /oʊ/）","美音从圆唇的 /o/ 开始，嘴唇再收得更圆，滑向 /ʊ/。","接近汉语「欧」。常见错误：念成单个「哦」，没有滑动。","o_e（home）、oa（boat）、ow（show）、o（go）","go home phone boat","or-oh","英式 /əʊ/ 开头偏中；美式写作 /oʊ/，开头嘴就圆：go /ɡoʊ/。"),
  ]),
 dict(id="a4", title="R-colored vowels (US)", titleZh="卷舌元音与美音差异", introZh="课本里的 /ɪə/、/eə/、/ʊə/ 在美音里都带 r，变成 /ɪr/、/er/、/ʊr/。再加上 car、door 里的 /ɑːr/、/ɔːr/ 和不重读的 /ɚ/，这一课把美音里所有卷舌的元音放在一起。",
  sounds=[
   S("ɪə","ɪr","ɪr","ear 音（美音 /ɪr/）","先发 /ɪ/，然后舌头卷起来，带 r 结束。不要加一个 /ə/。","英式像「衣呃」，美式更像「衣儿」。常见错误：here 念成「希尔」两个字。","ear（near）、eer（beer）、ere（here）","here near ear beer","here-hair","英式 /ɪə/ → 美式 /ɪr/。"),
   S("eə","er","ɛr","air 音（美音 /er/）","先发 /e/，嘴略开，然后卷舌带 r。","像「诶儿」。常见错误：和 /ɪr/ 不分，hair 听成 here。","air（hair）、are（care）、ere（where）","hair chair where care","here-hair","英式 /eə/ → 美式 /er/。"),
   S("ʊə","ʊr","ʊr","ure 音（美音 /ʊr/）","嘴唇微圆发 /ʊ/，再卷舌带 r。很多词在美音里也会念成 /ɔːr/ 或 /ɝː/。","像「乌儿」。常见错误：念成「舒啊」，没有 r。","ure（sure、cure）、our（tour）","sure tour cure",None,"英式 /ʊə/ → 美式 /ʊr/。这个音的词不多，口语里变化也多。"),
   S("ɑː+r","ɑːr","ɑr","ar 音（美音）","先发张大嘴的 /ɑː/，再卷舌。","像「啊儿」。英式 car 不卷舌；美式一定卷。","ar（car、park）","car park star art","er-ah","英式 /ɑː/（car）→ 美式 /ɑːr/。这一项不在 48 个音标里，是美音的组合。"),
   S("ɔː+r","ɔːr","ɔr","or 音（美音）","嘴唇圆，发 /ɔː/，再卷舌。","像「哦儿」。常见错误：door 念成「多」。","or（for）、oor（door）、ore（more）、our（four）","door more four short",None,"英式 /ɔː/（door）→ 美式 /ɔːr/。这一项也是美音的组合。"),
   S("ə+r","ɚ","ɚ","弱卷舌音 /ɚ/","在不重读的 -er、-or、-ar 结尾里，放松地带一点卷舌，很短。","像轻声的「儿」。常见错误：teacher 念成「踢车」，结尾不卷；或者重读成 /ɝː/。","er（teacher）、or（doctor）、ar（dollar）","teacher water doctor color",None,"英式不重读的 -er 是 /ə/；美式是 /ɚ/（卷舌）。"),
  ]),
 dict(id="a5", title="Plosives", titleZh="爆破音（清浊三对）", introZh="爆破音是先堵住气流，再突然放开。三对：/p b/、/t d/、/k ɡ/。清音（p t k）在重读音节开头要送气，用手掌放在嘴前能感到一股气；浊音（b d ɡ）声带振动，摸喉咙会抖。",
  sounds=[
   S("p","p","p","p","双唇闭紧，再突然张开，送出一股气。声带不振动。","接近拼音 p（送气）。常见错误：在 s 后面也送气，speak 里的 p 其实不送气，像 b。","p（pen）、pp（apple）","pen cup apple park","voice"),
   S("b","b","b","b","双唇闭紧，再张开，声带振动，不送气。","接近拼音 b，但英语 /b/ 声带要更早振动。常见错误：词尾 job 的 b 吞掉，或后面加「呃」念成 jobu。","b（bag）","bag bus job baby","voice"),
   S("t","t","t","t","舌尖抵住上齿龈（上牙后面的小鼓包），突然放开，送气。","接近拼音 t。美音里两个元音之间的 t 常变成很快的弹舌，像轻轻的 d：water、better。","t（ten）","ten hot tea cat","voice","美音：元音之间的 t 常变成闪音 [ɾ]，water 听起来像 wa-der。"),
   S("d","d","d","d","舌尖位置同 /t/，声带振动，不送气。","接近拼音 d。常见错误：词尾 red 的 d 不念，或加「呃」念成 reddo。","d（dog）","dog red day bed","dh-d"),
   S("k","k","k","k","舌头后部抬起抵住软腭，突然放开，送气。","接近拼音 k。常见错误：词尾 book 的 k 吞掉，或念成 bookie。","c（cat）、k（key）、ck（back）","cake cup book key","voice"),
   S("ɡ","ɡ","ɡ","g","舌位同 /k/，声带振动，不送气。","接近拼音 g。常见错误：egg 结尾加「呃」，念成 eggu。","g（go）","go bag egg green","voice"),
  ]),
 dict(id="a6", title="Fricatives 1: f v θ ð", titleZh="摩擦音（一）：唇齿音和咬舌音", introZh="摩擦音是让气流从窄缝里摩擦出来。这一课是 /f v/（上齿碰下唇）和 /θ ð/（舌尖在上下齿之间）。/θ ð/ 是汉语里没有的音，最需要练。",
  sounds=[
   S("f","f","f","f","上齿轻碰下唇，气流从缝里吹出，声带不振动。","接近拼音 f。常见错误：把 /θ/ 也念成 f，three 念成 free。","f（fish）、ph（phone）、ff（coffee）","fish five coffee phone","f-th"),
   S("v","v","v","v","口型同 /f/，但声带振动，下唇会有点麻。","汉语没有这个音。常见错误：念成 w（very 念成 wery），或念成 f。","v（van）","van very seven five","v-w"),
   S("θ","θ","θ","咬舌清音","舌尖轻轻放在上下齿之间（或抵住上齿背），吹气，声带不振动。","汉语没有这个音。常见错误：念成 s（think → sink）或 f（three → free）。","th（think）","think three bath mouth","th-s"),
   S("ð","ð","ð","咬舌浊音","口型同 /θ/，但声带振动，舌尖有点麻。","汉语没有。常见错误：念成 z 或 d（this → zis、dis）。","th（this、mother）","this mother they with","th-dh"),
  ]),
 dict(id="a7", title="Fricatives 2: s z ʃ ʒ h", titleZh="摩擦音（二）：咝音和 h", introZh="/s z/ 舌尖靠近上齿龈；/ʃ ʒ/ 舌头往后一点、嘴唇向前撅；/h/ 只是轻轻呼气。注意 /ʃ/ 不等于拼音 sh，也不等于 x。",
  sounds=[
   S("s","s","s","s","舌尖靠近上齿龈，留一条窄缝，吹出「嘶」声，声带不振动。","接近拼音 s。常见错误：在词尾加元音，bus 念成 busi。","s（sun）、c（city）、ss","sun bus six city","s-z"),
   S("z","z","z","z","口型同 /s/，声带振动，像蜜蜂的「嗡」。","汉语没有这个音（拼音 z 是另一个音）。常见错误：念成 s，或者念成拼音 z「资」。","z（zoo）、s（nose、busy）","zoo zero nose busy","s-z"),
   S("ʃ","ʃ","ʃ","sh 音","舌身抬起靠近硬腭前部，嘴唇向前撅圆，吹气，声带不振动。","比拼音 sh 更靠前、嘴唇更圆，也不要念成 x。常见错误：she 念成 xi，或与 s 不分。","sh（shop）、ti（station）","shop fish she wash","sh-s"),
   S("ʒ","ʒ","ʒ","sh 的浊音","口型同 /ʃ/，声带振动。多出现在词中间。","接近拼音 r「日」的前半，但嘴唇要撅圆、舌头不卷。常见错误：念成「日」或 /dʒ/。","s（usually）、si（television）","usually measure television pleasure"),
   S("h","h","h","h","嘴摆好后面元音的形状，轻轻呼一口气，喉咙不摩擦。","比拼音 h 轻很多，拼音 h 喉咙有摩擦。常见错误：念得太重像「喝」。","h（help）、wh（who）","help who hot home"),
  ]),
 dict(id="a8", title="Affricates & clusters", titleZh="破擦音：tʃ dʒ tr dr ts dz", introZh="破擦音是先堵住、再摩擦出来。/tʃ dʒ/ 是独立的音；/tr dr ts dz/ 是课本 48 音标里的组合，在美式词典里一般写成两个音。",
  sounds=[
   S("tʃ","tʃ","tʃ","ch 音","舌尖抵上齿龈，嘴唇向前撅，先堵住再摩擦放开，送气，声带不振动。","接近拼音 ch 和 q 之间，嘴唇要撅。常见错误：念成 q（cheap → 「气普」）。","ch（chair）、tch（watch）","chair check lunch teacher","ch-sh"),
   S("dʒ","dʒ","dʒ","j 音","口型同 /tʃ/，声带振动，不送气。","接近拼音 zh 和 j 之间，嘴唇撅。常见错误：念成拼音 j「鸡」。","j（job）、g（large）、dge（bridge）","job juice large bridge"),
   S("tr","tr","tr","tr 组合","/t/ 和 /r/ 连得很紧：舌尖先抵住上齿龈，放开时直接卷舌。听起来接近「戳」。","不要在 t 和 r 中间加元音（tree 不是 te-ree）。","tr（tree）","tree train try true",None,"美式词典写作 /tr/ 两个音。"),
   S("dr","dr","dr","dr 组合","/d/ 和 /r/ 连读，声带振动，听起来接近「捉」。","不要加元音（drink 不是 de-rink）。","dr（drink）","drink dress dry drive",None,"美式词典写作 /dr/ 两个音。"),
   S("ts","ts","ts","ts 组合","舌尖抵住上齿龈，放开时直接发 /s/。多出现在词尾：cats、gets。","接近拼音 c「次」，但不要带元音。","ts（cats）","cats hats gets lets",None,"美式词典写作 /ts/ 两个音，常见于复数和第三人称。"),
   S("dz","dz","dz","dz 组合","口型同 /ts/，声带振动。多在词尾：beds、kids。","接近拼音 z「资」的开头，不要带元音。常见错误：念成 ds 或吞掉。","ds（beds）","beds kids needs friends",None,"美式词典写作 /dz/ 两个音。"),
  ]),
 dict(id="a9", title="Nasals", titleZh="鼻音：m n ŋ", introZh="三个鼻音气流都从鼻子出来。注意 /n/ 和 /ŋ/ 的区别：/n/ 舌尖顶上齿龈，/ŋ/ 舌根抬起，嘴不闭。",
  sounds=[
   S("m","m","m","m","双唇闭上，声音从鼻子出来。词尾也要闭嘴。","接近拼音 m。常见错误：词尾 home 的 m 没闭嘴，变成 /n/ 或拖成 homu。","m（man）、mm（summer）","man home summer milk"),
   S("n","n","n","n","舌尖抵住上齿龈，声音从鼻子出来，结束时舌尖不要松开。","接近拼音 n（前鼻音）。常见错误：南方口音 n/l 不分；词尾 n 和 ng 不分。","n（no）","no nine sun ten","n-ng"),
   S("ŋ","ŋ","ŋ","ng 音","舌根抬起抵住软腭，嘴微张，声音从鼻子出来。词尾一般不要加 /ɡ/。","接近拼音 ang 结尾的 ng（后鼻音）。常见错误：sing 念成 sin，或念成 sing-g。","ng（sing）、n（think、bank）","sing long thing English","n-ng"),
  ]),
 dict(id="a10", title="Liquids & glides", titleZh="舌边音、卷舌音与半元音：l r w j", introZh="/l/ 和 /r/ 是中国学生最常混的一对；/w/ 和 /v/ 也容易混。/j/ 和 /w/ 叫半元音，很短，马上滑进后面的元音。",
  sounds=[
   S("l","l","l","l","舌尖抵住上齿龈，气流从舌头两边出来。在词尾（ball、milk）舌头后部抬起，声音更暗，像「欧」。","开头接近拼音 l。常见错误：词尾的暗 l 念成「欧」不碰上齿龈，或者干脆漏掉。","l（look）、ll（ball）","look leg ball milk","l-r"),
   S("r","r","r","r","舌尖向上卷，不碰任何地方，嘴唇微圆向前。整个过程舌头不碰上齿龈。","比拼音 r 少摩擦，更像「若」开头的滑音。常见错误：和 /l/ 不分，或者在词首念成「日」。","r（red）、wr（write）、rr（sorry）","red run rain sorry","l-r"),
   S("w","w","w","w","嘴唇撅圆、很紧，马上放开滑向后面的元音。牙齿不碰嘴唇。","接近「乌」很快地滑过去。常见错误：和 /v/ 不分，wine 念成 vine。","w（we）、wh（what）","we water window week","v-w"),
   S("j","j","j","y 音","舌头抬向硬腭，像「衣」，马上滑向后面的元音。","接近「衣」很快地滑过去。常见错误：year 和 ear 不分，漏掉开头的 /j/。","y（yes）、u（use）","yes you yellow year","y-vowel"),
  ]),
]
