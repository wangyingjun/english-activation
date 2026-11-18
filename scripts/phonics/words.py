# word | 中文 | example sentence | 例句中文
RAW = """
sit|坐|Please sit here.|请坐这儿。
big|大的|This box is too big.|这个盒子太大了。
fish|鱼|We had fish for dinner.|我们晚饭吃了鱼。
milk|牛奶|Can I get some milk?|能给我一点牛奶吗？
bed|床|I went to bed early.|我早早睡了。
pen|笔|Can I use your pen?|能用一下你的笔吗？
red|红色的|I like the red one.|我喜欢红色那个。
egg|鸡蛋|I had an egg for breakfast.|我早饭吃了一个鸡蛋。
cat|猫|My cat likes the sun.|我的猫喜欢晒太阳。
bag|包|My bag is on the chair.|我的包在椅子上。
apple|苹果|I eat an apple every day.|我每天吃一个苹果。
hat|帽子|Take your hat. It's cold.|戴上帽子，外面冷。
cup|杯子|Can I have a cup of tea?|能给我一杯茶吗？
bus|公交车|The bus is late again.|公交车又晚了。
sun|太阳|The sun is out today.|今天出太阳了。
love|爱；很喜欢|I love this song.|我很喜欢这首歌。
hot|热的|The coffee is very hot.|咖啡很烫。
box|盒子|Put it in the box.|把它放进盒子里。
stop|停下；车站|Let's stop here for lunch.|我们在这儿停下吃午饭吧。
job|工作|She has a new job.|她换了新工作。
book|书；预订|I want to book a table.|我想订一张桌子。
good|好的|That's a good idea.|这是个好主意。
put|放|Put your bag here.|把包放这儿。
foot|脚|My foot hurts.|我的脚疼。
about|关于；大约|It takes about ten minutes.|大约要十分钟。
banana|香蕉|Can I have a banana?|我能吃根香蕉吗？
sofa|沙发|The cat is on the sofa.|猫在沙发上。
today|今天|I'm busy today.|我今天很忙。
see|看见|See you tomorrow.|明天见。
tea|茶|I'd like a cup of tea.|我想要一杯茶。
eat|吃|Let's eat out tonight.|今晚出去吃吧。
green|绿色的|The light is green. Go.|绿灯了，走吧。
father|父亲|My father lives in Beijing.|我父亲住在北京。
car|汽车|My car is in the shop.|我的车在修。
park|公园；停车|Where can I park?|我在哪儿停车？
star|星星|I can see a star.|我看见一颗星星。
ball|球|The kids are playing ball.|孩子们在玩球。
walk|走路|Let's walk to the station.|我们走去车站吧。
talk|说话；聊|Can we talk later?|我们晚点聊好吗？
saw|看见了（see 的过去式）|I saw him at work.|我在公司看见他了。
food|食物|The food here is great.|这里的东西很好吃。
blue|蓝色的|I like the blue cup.|我喜欢蓝色的杯子。
school|学校|My son walks to school.|我儿子走路上学。
two|二|Two coffees, please.|两杯咖啡，谢谢。
bird|鸟|A bird is on the roof.|屋顶上有一只鸟。
girl|女孩|The girl is my sister.|那个女孩是我妹妹。
work|工作|I work from home on Friday.|我周五在家办公。
first|第一|Is this your first time here?|你是第一次来这儿吗？
day|天|Have a nice day.|祝你过得愉快。
name|名字|Can I get a name for the cup?|杯子上写什么名字？
rain|雨；下雨|It's going to rain.|要下雨了。
cake|蛋糕|This cake is too sweet.|这个蛋糕太甜了。
five|五|It's five dollars.|五美元。
time|时间|What time is it?|现在几点？
my|我的|This is my desk.|这是我的桌子。
night|夜晚|Good night. See you tomorrow.|晚安，明天见。
boy|男孩|The boy is six.|那个男孩六岁。
toy|玩具|He loves this toy.|他很喜欢这个玩具。
coin|硬币|I don't have a coin.|我没有硬币。
enjoy|享受；喜欢|Enjoy your meal.|请慢用。
now|现在|I'm leaving now.|我现在就走。
house|房子|Their house is near the park.|他们家在公园附近。
down|向下|Please sit down.|请坐。
out|出去|I'm going out for lunch.|我出去吃午饭。
go|去|Let's go home.|我们回家吧。
home|家|I'm home.|我到家了。
phone|电话；手机|My phone is dead.|我手机没电了。
boat|船|We took a boat to the island.|我们坐船去了岛上。
here|这里|Come here, please.|请过来。
near|近的|Is it near here?|离这儿近吗？
ear|耳朵|My ear hurts.|我耳朵疼。
beer|啤酒|Do you want a beer?|你想喝杯啤酒吗？
hair|头发|Her hair is very long.|她的头发很长。
chair|椅子|Take a chair.|拿把椅子坐吧。
where|哪里|Where is the station?|车站在哪儿？
care|在乎；照顾|Take care.|保重。
sure|当然；确定|Sure, no problem.|当然，没问题。
tour|游览|We took a tour of the city.|我们在城里参观了一圈。
cure|治愈；疗法|There's no quick cure for a cold.|感冒没有很快就好的办法。
door|门|Please close the door.|请关上门。
more|更多|Can I have more water?|能再给我点水吗？
four|四|We need a table for four.|我们要一张四人桌。
teacher|老师|My teacher was very kind.|我的老师很和善。
water|水|Can I get some water?|能给我一点水吗？
doctor|医生|I need to see a doctor.|我得去看医生。
color|颜色|What color do you like?|你喜欢什么颜色？
ten|十|It takes ten minutes.|要十分钟。
dog|狗|Their dog is very friendly.|他们家的狗很友好。
key|钥匙；关键|I lost my key.|我把钥匙弄丢了。
baby|婴儿|The baby is sleeping.|宝宝在睡觉。
coffee|咖啡|I need a coffee.|我需要一杯咖啡。
van|面包车；厢式货车|The van is outside.|货车在外面。
very|非常|Thank you very much.|非常感谢。
seven|七|The meeting is at seven.|会议在七点。
think|想；认为|I think it's a good plan.|我觉得这个计划不错。
three|三|I have three kids.|我有三个孩子。
bath|洗澡；浴缸|The baby needs a bath.|宝宝该洗澡了。
mouth|嘴|Open your mouth, please.|请张开嘴。
this|这个|This is my friend Leo.|这是我朋友 Leo。
mother|母亲|My mother calls me every week.|我妈妈每周给我打电话。
they|他们|They are on the way.|他们在路上了。
with|和……一起|Can I come with you?|我能跟你一起去吗？
six|六|I get up at six.|我六点起床。
city|城市|I love this city.|我很喜欢这座城市。
zoo|动物园|We took the kids to the zoo.|我们带孩子去了动物园。
zero|零|It's zero degrees outside.|外面零度。
nose|鼻子|My nose is red from the cold.|冻得我鼻子都红了。
busy|忙的|I'm a bit busy right now.|我现在有点忙。
shop|商店|The shop opens at nine.|这家店九点开门。
she|她|She is my boss.|她是我的老板。
wash|洗|Wash your hands first.|先洗手。
usually|通常|I usually walk to work.|我通常走路上班。
measure|测量|Let me measure the room.|我来量一下房间。
television|电视|We don't watch much television.|我们不怎么看电视。
pleasure|乐意；荣幸|It's a pleasure to meet you.|很高兴认识你。
help|帮助|Can you help me?|你能帮我一下吗？
who|谁|Who is that?|那是谁？
run|跑|I run in the park.|我在公园跑步。
sorry|对不起|Sorry, I'm late.|对不起，我迟到了。
check|检查；账单|Can I get the check?|能给我账单吗？
lunch|午饭|Let's have lunch.|我们吃午饭吧。
juice|果汁|Orange juice, please.|请给我橙汁。
large|大的|A large coffee, please.|一杯大杯咖啡。
bridge|桥|Walk over the bridge.|走过那座桥。
orange|橙子；橙色|I'd like an orange.|我想要一个橙子。
tree|树|There's a big tree in front.|前面有棵大树。
train|火车|The train is on time.|火车准点。
try|尝试|Let me try again.|让我再试一次。
true|真的|Is that true?|那是真的吗？
drink|喝；饮料|Do you want a drink?|你想喝点什么吗？
dress|裙子|I like your dress.|我喜欢你的裙子。
dry|干的|My shirt is dry now.|我的衬衫干了。
drive|开车|I drive to work.|我开车上班。
cats|猫（复数）|We have two cats.|我们养了两只猫。
hats|帽子（复数）|The hats are on sale.|帽子在打折。
gets|得到；变得|It gets cold at night.|晚上会变冷。
lets|让（第三人称）|She lets me use her desk.|她让我用她的桌子。
beds|床（复数）|The room has two beds.|这个房间有两张床。
kids|孩子们|The kids are at school.|孩子们在学校。
needs|需要（第三人称）|He needs a new phone.|他需要一部新手机。
friends|朋友们|I'm meeting friends tonight.|我今晚见朋友。
man|男人|The man at the desk can help.|前台那位先生可以帮你。
summer|夏天|We go to the beach every summer.|我们每年夏天去海边。
no|不|No, thank you.|不用了，谢谢。
nine|九|The shop opens at nine.|这家店九点开门。
sing|唱歌|She likes to sing.|她喜欢唱歌。
long|长的|It was a long day.|今天真漫长。
thing|东西；事情|One more thing.|还有一件事。
English|英语|I'm learning English.|我在学英语。
look|看|Can you look at this?|你能看一下这个吗？
leg|腿|My leg hurts.|我的腿疼。
we|我们|We can start now.|我们可以开始了。
window|窗户|Can I open the window?|我可以开窗吗？
week|周|See you next week.|下周见。
yes|是的|Yes, that's right.|是的，没错。
you|你|Thank you.|谢谢你。
yellow|黄色的|The yellow bag is mine.|黄色的包是我的。
year|年|I moved here last year.|我去年搬到这儿。
dad|爸爸|My dad likes to cook.|我爸爸喜欢做饭。
fun|有趣的|That sounds fun.|听起来很有意思。
gift|礼物|This is a small gift for you.|这是给你的小礼物。
kid|孩子|The kid is very smart.|这孩子很聪明。
net|网|The ball hit the net.|球打到了网上。
wet|湿的|My shoes are wet.|我的鞋湿了。
zip|拉链；拉上|Zip your bag.|把包拉好。
ink|墨水|The pen is out of ink.|笔没墨水了。
got|得到了|I got a new job.|我找到了新工作。
is|是|This is my seat.|这是我的座位。
his|他的|That is his car.|那是他的车。
fox|狐狸|We saw a fox in the park.|我们在公园看到一只狐狸。
fix|修理|Can you fix my phone?|你能修我的手机吗？
quick|快的|Can I ask a quick question?|我能快速问个问题吗？
queen|女王；大号床|We have a queen bed.|我们有一张大床。
quiet|安静的|This room is very quiet.|这个房间很安静。
question|问题|I have a question.|我有个问题。
of|……的|Can I have a cup of coffee?|能给我一杯咖啡吗？
map|地图|Can you show me on the map?|你能在地图上指给我看吗？
pet|宠物|Do you have a pet?|你养宠物吗？
win|赢|We want to win.|我们想赢。
pig|猪|The kids love the pig.|孩子们很喜欢那头猪。
not|不|I'm not sure.|我不确定。
top|顶部|It's on the top shelf.|在最上面那层。
pot|锅；壶|Is there coffee in the pot?|壶里还有咖啡吗？
pull|拉|Pull the door, don't push.|拉门，别推。
was|是（过去式）|It was a long day.|今天真漫长。
make|做|I'll make some tea.|我去泡点茶。
late|晚的|Sorry I'm late.|抱歉我迟到了。
bike|自行车|I ride my bike to work.|我骑车上班。
like|喜欢|I like your idea.|我喜欢你的想法。
note|便条；笔记|I'll send you a note.|我给你发个便条。
hope|希望|I hope you feel better.|希望你好点了。
cute|可爱的|Your dog is so cute.|你的狗好可爱。
use|用处；使用|This app is for home use.|这个应用是给家里用的。
rule|规则|That's the rule here.|这里的规定就是这样。
June|六月|My birthday is in June.|我的生日在六月。
these|这些|Are these yours?|这些是你的吗？
theme|主题|What's the theme of the party?|聚会的主题是什么？
complete|完成；完整的|The work is complete.|工作完成了。
have|有|I have a question.|我有个问题。
give|给|Can you give me a hand?|你能帮我个忙吗？
live|住；生活|I live near the office.|我住在公司附近。
come|来|Come in, please.|请进。
some|一些|Do you want some cake?|你要来点蛋糕吗？
done|做完的|Are you done?|你做完了吗？
gone|离开了的；没了|The milk is all gone.|牛奶全没了。
black|黑色的|A black coffee, please.|请给我一杯黑咖啡。
clean|干净的；打扫|The room is very clean.|房间很干净。
fly|飞|We fly to Tokyo tomorrow.|我们明天飞东京。
glass|玻璃杯|Can I have a glass of water?|能给我一杯水吗？
play|玩；播放|The kids play outside.|孩子们在外面玩。
sleep|睡觉|I need more sleep.|我需要多睡会儿。
bread|面包|We need some bread.|我们得买点面包。
cry|哭|The baby started to cry.|宝宝开始哭了。
free|免费的；有空的|Are you free tonight?|你今晚有空吗？
price|价格|What's the price?|多少钱？
small|小的|A small coffee, please.|请给我一杯小杯咖啡。
snow|雪|It might snow tonight.|今晚可能下雪。
speak|说|Can you speak a bit slower?|你能说慢一点吗？
swim|游泳|I swim twice a week.|我每周游两次泳。
hand|手|Can you give me a hand?|你能帮我个忙吗？
went|去了（go 的过去式）|We went to the beach.|我们去了海边。
best|最好的|This is the best pizza in town.|这是城里最好吃的披萨。
jump|跳|The kids jump on the bed.|孩子们在床上跳。
desk|书桌|My desk is by the window.|我的桌子在窗边。
ship|船；发货|We ship it today.|我们今天发货。
much|很多|How much is it?|这个多少钱？
chef|厨师|The chef made this for us.|厨师为我们做了这个。
that|那个|I like that one.|我喜欢那个。
what|什么|What do you mean?|你是什么意思？
when|什么时候|When can you start?|你什么时候能开始？
white|白色的|I want the white one.|我要白色那个。
why|为什么|Why are you late?|你为什么迟到？
photo|照片|Can you take a photo of us?|能帮我们拍张照吗？
back|后面；回来|I'll be right back.|我马上回来。
duck|鸭子|The kids fed the duck.|孩子们喂了鸭子。
clock|钟|The clock is slow.|这个钟慢了。
sick|生病的|I feel sick today.|我今天不舒服。
ring|戒指；打电话|Give me a ring tomorrow.|明天给我打个电话。
bank|银行|The bank is closed today.|银行今天关门。
pink|粉色的|She has a pink bag.|她有一个粉色的包。
wait|等|Please wait a minute.|请稍等一下。
said|说了（say 的过去式）|She said yes.|她答应了。
says|说（第三人称）|He says it's fine.|他说没问题。
meat|肉|I don't eat much meat.|我不怎么吃肉。
sea|大海|The hotel is by the sea.|酒店在海边。
team|团队|Our team is small.|我们团队人不多。
head|头|My head hurts.|我头疼。
breakfast|早饭|What's for breakfast?|早饭吃什么？
great|很棒的|That's great news.|真是好消息。
road|路|The road is very busy.|这条路车很多。
show|展示；演出|Can you show me?|你能给我看看吗？
pie|派；馅饼|This apple pie is great.|这个苹果派真好吃。
tie|领带；系|I don't wear a tie to work.|我上班不打领带。
light|灯；轻的|Turn off the light, please.|请关灯。
high|高的|The price is too high.|价格太高了。
new|新的|I need a new phone.|我需要一部新手机。
few|很少；几个|I have a few questions.|我有几个问题。
friend|朋友|This is my friend Amy.|这是我朋友 Amy。
moon|月亮|The moon is so bright tonight.|今晚月亮好亮。
soon|很快|See you soon.|回头见。
blood|血|They need to check my blood.|他们要给我验血。
touch|触摸；联系|Let's keep in touch.|保持联系。
oil|油|Don't use too much oil.|别放太多油。
law|法律|That's against the law.|那是违法的。
draw|画|My son likes to draw.|我儿子喜欢画画。
August|八月|We go on vacation in August.|我们八月去度假。
sauce|酱汁|Can I get the sauce on the side?|酱汁能单独放吗？
art|艺术|She studies art.|她学艺术。
her|她；她的|I gave her my number.|我把我的号码给了她。
turn|转弯|Turn left at the light.|在红绿灯左转。
nurse|护士|The nurse will see you now.|护士现在给你看。
for|为了；给|This is for you.|这是给你的。
short|短的|Keep it short.|简短一点。
horse|马|She can ride a horse.|她会骑马。
morning|早上|Good morning, everyone.|大家早上好。
share|分享|Can we share a table?|我们能拼桌吗？
hear|听见|Can you hear me?|你能听到我说话吗？
word|单词|What does this word mean?|这个词是什么意思？
heart|心|She has a good heart.|她心地很好。
bear|熊；承受|We saw a bear in the woods.|我们在树林里看见一只熊。
wear|穿；戴|What should I wear?|我该穿什么？
face|脸|Wash your face.|洗洗脸。
nice|好的；友好的|Nice to meet you.|很高兴认识你。
ice|冰|No ice, please.|请不要加冰。
rice|米饭|Can I get more rice?|能再给我点米饭吗？
page|页|Turn to page ten.|翻到第十页。
giant|巨大的；巨人|It's a giant city.|这是座超大的城市。
get|得到；拿|Can I get a coffee?|能给我一杯咖啡吗？
edge|边缘|Don't stand too close to the edge.|别站得离边太近。
know|知道|I don't know.|我不知道。
knee|膝盖|My knee hurts.|我膝盖疼。
knife|刀|Can I have a knife?|能给我一把刀吗？
write|写|Can you write it down?|你能写下来吗？
wrong|错的|Sorry, wrong number.|抱歉，打错了。
climb|爬|Let's climb the hill.|我们爬上那座小山吧。
thumb|拇指|I cut my thumb.|我把拇指割破了。
lamb|羊肉；小羊|I'd like the lamb, please.|我要羊肉。
eight|八|We start at eight.|我们八点开始。
hour|小时|It takes an hour.|要一个小时。
honest|诚实的|To be honest, I'm tired.|说实话，我累了。
half|一半|Half of it is for you.|一半给你。
could|能够（委婉）|Could you help me?|你能帮我一下吗？
listen|听|Listen to this.|听听这个。
station|车站|Where is the train station?|火车站在哪儿？
nation|国家|The whole nation watched the game.|全国都在看那场比赛。
vacation|假期|I'm on vacation next week.|我下周休假。
information|信息|I need more information.|我需要更多信息。
decision|决定|It's a hard decision.|这是个艰难的决定。
walked|走了（过去式）|I walked to work today.|我今天走路上班。
helped|帮助了|She helped me a lot.|她帮了我很多。
washed|洗了|I washed the cups.|我把杯子洗了。
liked|喜欢了|I liked the movie.|我喜欢那部电影。
played|玩了|We played games all night.|我们玩了一晚上游戏。
called|打电话了|I called you this morning.|我今天早上给你打过电话。
opened|打开了|She opened the window.|她打开了窗户。
cleaned|打扫了|I cleaned the kitchen.|我打扫了厨房。
wanted|想要了|I wanted to ask you something.|我本来想问你点事。
needed|需要了|I needed a break.|我需要休息一下。
started|开始了|The meeting started late.|会议开始晚了。
waited|等了|We waited for an hour.|我们等了一个小时。
books|书（复数）|I bought two books.|我买了两本书。
maps|地图（复数）|The maps are on my phone.|地图在我手机上。
dogs|狗（复数）|They have two dogs.|他们养了两只狗。
bags|包（复数）|Our bags are in the car.|我们的包在车里。
days|天（复数）|I'm off for three days.|我休三天假。
boxes|盒子（复数）|Put the boxes here.|把盒子放这儿。
buses|公交车（复数）|The buses are slow today.|今天公交车很慢。
watches|看（第三人称）；手表|He watches TV every night.|他每晚都看电视。
pages|页（复数）|Read these two pages.|读这两页。
table|桌子|A table for two, please.|两人桌，谢谢。
little|小的；一点|I'm a little tired.|我有点累。
people|人们|There are a lot of people here.|这里人很多。
simple|简单的|Keep it simple.|简单点就好。
happy|开心的|I'm happy for you.|我替你高兴。
family|家庭；家人|My family is in China.|我的家人在中国。
basket|篮子|Put the eggs in the basket.|把鸡蛋放进篮子里。
winter|冬天|Winter here is very cold.|这里冬天很冷。
open|打开；开着的|Is the shop open?|商店开门了吗？
music|音乐|I like quiet music.|我喜欢安静的音乐。
birthday|生日|Happy birthday!|生日快乐！
bedroom|卧室|The bedroom is upstairs.|卧室在楼上。
paper|纸|Do you have some paper?|你有纸吗？
begin|开始|Let's begin.|我们开始吧。
return|归还；退货|I want to return this.|我想退这个。
forget|忘记|Don't forget your key.|别忘了带钥匙。
hotel|酒店|The hotel is near the airport.|酒店在机场附近。
lemon|柠檬|Tea with lemon, please.|请给我柠檬茶。
problem|问题|No problem.|没问题。
second|第二；秒|Give me a second.|稍等我一下。
camera|相机；摄像头|My camera is off.|我的摄像头关了。
better|更好的|I feel better today.|我今天好多了。
letter|信；字母|I got a letter from the bank.|我收到了银行的一封信。
computer|电脑|My computer is very slow.|我的电脑很慢。
party|聚会|Are you coming to the party?|你来参加聚会吗？
alphabet|字母表|My son knows the alphabet.|我儿子会字母表了。
elephant|大象|The kids want to see the elephant.|孩子们想去看大象。
wrap|包；包装|Can you wrap it as a gift?|能帮我包成礼物吗？
wrist|手腕|My wrist hurts from typing.|打字打得我手腕疼。
knock|敲门|Please knock before you come in.|进来前请先敲门。
comb|梳子|I forgot my comb.|我忘带梳子了。
Chinese|中文；中国的|I speak Chinese at home.|我在家说中文。
cups|杯子（复数）|We need two more cups.|我们还要两个杯子。
weekend|周末|What did you do this weekend?|你这个周末干什么了？
homework|作业|My son is doing his homework.|我儿子在写作业。
""".strip().splitlines()
WORDS = {}
for line in RAW:
    w, zh, ex, exzh = line.split("|")
    assert w not in WORDS, w
    WORDS[w] = {"zh": zh, "ex": ex, "exZh": exzh}
