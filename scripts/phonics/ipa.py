"""CMUdict (US) -> Cambridge-US-style IPA with stress marks."""
import cmudict, re
D = cmudict.dict()
V = {"IY":"iː","IH":"ɪ","EH":"e","AE":"æ","AA":"ɑː","AO":"ɔː","UH":"ʊ","UW":"uː","EY":"eɪ","AY":"aɪ","OY":"ɔɪ","AW":"aʊ","OW":"oʊ"}
C = {"P":"p","B":"b","T":"t","D":"d","K":"k","G":"ɡ","F":"f","V":"v","TH":"θ","DH":"ð","S":"s","Z":"z","SH":"ʃ","ZH":"ʒ","HH":"h",
     "CH":"tʃ","JH":"dʒ","M":"m","N":"n","NG":"ŋ","L":"l","R":"r","W":"w","Y":"j"}
ONSETS = {""} | set(C.values()) | {x for x in """pl bl kl ɡl fl sl pr br tr dr kr ɡr fr θr ʃr tw dw kw sw θw ɡw sp st sk sm sn sl sw spl spr str skr skw pj bj kj ɡj fj vj mj hj nj lj sf""".split()}
ONSETS -= {"ŋ"}
def toks(arp):
    out=[]
    for p in arp:
        m=re.match(r"([A-Z]+)(\d)?",p); base,st=m.group(1),m.group(2)
        out.append((base, None if st is None else int(st)))
    return out
def convert(word, pron=None):
    w=word.lower()
    if pron is None:
        if w not in D: return None
        pron=D[w][0]
    t=toks(pron)
    # build segments: list of (ipa, isVowel, stress)
    segs=[]
    i=0
    while i<len(t):
        b,s=t[i]
        nxt=t[i+1][0] if i+1<len(t) else None
        if s is not None:
            if b=="ER": segs.append(["ɝː" if s in (1,2) else "ɚ",True,s])
            elif b=="AH": segs.append(["ʌ" if s in (1,2) else "ə",True,s])
            elif nxt=="R" and b in ("AA","AO","IH","IY","EH","UH","UW","EY"):
                v={"AA":"ɑːr","AO":"ɔːr","IH":"ɪr","IY":"ɪr","EH":"er","EY":"er","UH":"ʊr","UW":"ʊr"}[b]
                # keep r as coda only if next after R is not a vowel
                after=t[i+2] if i+2<len(t) else None
                if after and after[1] is not None:
                    segs.append([v[:-1],True,s]); i+=1; continue
                segs.append([v,True,s]); i+=2; continue
            elif b=="IY" and s==0: segs.append(["i",True,s])
            else: segs.append([V[b],True,s])
        else:
            segs.append([C[b],False,None])
        i+=1
    # syllabify: find vowel indices
    vi=[k for k,sg in enumerate(segs) if sg[1]]
    starts=[0]
    for a,b in zip(vi,vi[1:]):
        cons=[segs[k][0] for k in range(a+1,b)]
        # maximal onset
        split=len(cons)
        for j in range(len(cons)+1):
            if "".join(cons[j:]) in ONSETS: split=j; break
        starts.append(a+1+split)
    out=""
    for n,(st,v) in enumerate(zip(starts,vi)):
        end=starts[n+1] if n+1<len(starts) else len(segs)
        syl="".join(segs[k][0] for k in range(st,end))
        stress=segs[v][2]
        if len(vi)>1 and stress==1: syl="ˈ"+syl
        elif len(vi)>1 and stress==2: syl="ˌ"+syl
        out+=syl
    return out
if __name__=="__main__":
    for w in "cat hot father car door here hair sure bird teacher water about banana information television usually orange English question walked table beds started city morning computer every chocolate".split():
        print(w, convert(w), D[w][0] if w in D else None)
