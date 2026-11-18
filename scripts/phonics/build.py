"""Build lib/content/phonics/data.json.

Needs: pip install cmudict.  Run: python scripts/phonics/build.py
Isolated IPA clips were checked with verify_vowels.py (formants vs Hillenbrand 1995)
and verify_consonants.py (wav2vec2 espeak phoneme recognizer); see isolated.json.
"""
import json, re, sys
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from words import WORDS
from lessons_a import PART_A
from lessons_b import PART_B
from ipa import convert
OVR={"of":"əv","usually":"ˈjuːʒuəli","enjoy":"ɪnˈdʒɔɪ","photo":"ˈfoʊtoʊ","bedroom":"ˈbedˌruːm","needed":"ˈniːdɪd","boxes":"ˈbɑːksɪz",
"watches":"ˈwɑːtʃɪz","pages":"ˈpeɪdʒɪz","wanted":"ˈwɑːntɪd","dogs":"dɔːɡz","hour":"aʊr","camera":"ˈkæmrə","family":"ˈfæməli","was":"wʌz",
"live":"lɪv","use":"juːs","honest":"ˈɑːnɪst","Chinese":"ˌtʃaɪˈniːz","busy":"ˈbɪzi","elephant":"ˈeləfənt","weekend":"ˈwiːkend"}
def ipa(w):
    if w in OVR: return OVR[w]
    s=convert(w)
    return s.replace("iː","i") if False else re.sub(r"iː(?=$|[^ˈˌ]*$)", lambda m:m.group(0), s)
scenes=json.load(open(ROOT/'lib/content/scenes/data.json'))
scene_tokens=set()
for sc in scenes:
    for l in sc["lines"]:
        scene_tokens.update(x.lower() for x in re.findall(r"[A-Za-z]+",l["text"]))
words={}
for w,v in WORDS.items():
    s=OVR.get(w) or convert(w)
    # unstressed final -y: /i/ (Cambridge style), keep stressed iː
    words[w]={"ipa":s,**v}
    if w.lower() in scene_tokens: words[w]["scene"]=True
iso=json.load(open(HERE/'isolated.json'))
lessons=[]
problems=[]
for L in PART_A:
    sounds=[]
    for i,s in enumerate(L["sounds"]):
        sid=f'{L["id"]}-{i+1}'
        extra="+" in s["dj"]
        us=s["us"]
        for w in s["words"]:
            plain=words[w]["ipa"].replace("ˈ","").replace("ˌ","")
            if us not in plain: problems.append((sid,us,w,words[w]["ipa"]))
        sounds.append({**s,"id":sid,"extra":extra,"isolated":iso.get(us) if not extra else None})
    lessons.append({"id":L["id"],"part":"A","title":L["title"],"titleZh":L["titleZh"],"introZh":L["introZh"],"sounds":sounds})
for L in PART_B:
    rules=[{**r,"id":f'{L["id"]}-{i+1}'} for i,r in enumerate(L["rules"])]
    lessons.append({"id":L["id"],"part":"B","title":L["title"],"titleZh":L["titleZh"],"introZh":L["introZh"],"rules":rules})
data={"lessons":lessons,"words":words}
json.dump(data,open(ROOT/'lib/content/phonics/data.json','w'),ensure_ascii=False,indent=1)
print("scene words",sum(1 for w in words.values() if w.get("scene")));print("lessons",len(lessons),"words",len(words),"symbols(48)",sum(1 for L in lessons if L['part']=='A' for s in L['sounds'] if not s['extra']),"isolated",sum(1 for L in lessons if L['part']=='A' for s in L['sounds'] if s['isolated']))
for p in problems: print("CHECK",p)
