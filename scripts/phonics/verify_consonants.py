import json, numpy as np, soundfile as sf, torch
from transformers import AutoProcessor, AutoModelForCTC
name="facebook/wav2vec2-lv-60-espeak-cv-ft"
proc=AutoProcessor.from_pretrained(name); model=AutoModelForCTC.from_pretrained(name).eval()
def rec(a):
    x=proc(a,sampling_rate=16000,return_tensors="pt").input_values
    with torch.no_grad(): ids=model(x).logits.argmax(-1)
    return proc.batch_decode(ids)[0]
T={'b':'Voiced_bilabial_plosive','d':'Voiced_alveolar_plosive','ɡ':'Voiced_velar_plosive','p':'Voiceless_bilabial_plosive','t':'Voiceless_alveolar_plosive','k':'Voiceless_velar_plosive',
'f':'Voiceless_labiodental_fricative','v':'Voiced_labiodental_fricative','θ':'Voiceless_dental_fricative','ð':'Voiced_dental_fricative','s':'Voiceless_alveolar_sibilant','z':'Voiced_alveolar_sibilant',
'ʃ':'Voiceless_palato-alveolar_sibilant','ʒ':'Voiced_palato-alveolar_sibilant','h':'Voiceless_glottal_fricative','tʃ':'Voiceless_palato-alveolar_affricate','dʒ':'Voiced_palato-alveolar_affricate',
'ts':'Voiceless_alveolar_sibilant_affricate','dz':'Voiced_alveolar_sibilant_affricate','m':'Bilabial_nasal','n':'Alveolar_nasal','ŋ':'Velar_nasal','l':'Alveolar_lateral_approximant','r':'Alveolar_approximant','w':'Voiced_labio-velar_approximant','j':'Palatal_approximant'}
out={}
for tgt,f in T.items():
    a,sr=sf.read(f+'.wav')
    fr=int(0.02*sr); n=len(a)//fr
    e=np.array([np.sqrt(np.mean(a[i*fr:(i+1)*fr]**2)) for i in range(n)])
    thr=max(e)*0.04
    on=e>thr
    segs=[];i=0
    while i<n:
        if on[i]:
            j=i
            while j<n and (on[j] or (j+6<n and on[j:j+6].any() and False)): j+=1
            segs.append([i,j]); i=j
        else: i+=1
    # merge gaps < 120ms (stop closures)
    m=[]
    for s in segs:
        if m and s[0]-m[-1][1] < 7: m[-1][1]=s[1]
        else: m.append(s)
    m=[s for s in m if s[1]-s[0]>=5]
    toks=[]
    for s,e2 in m:
        seg=a[max(0,(s-3)*fr):min(len(a),(e2+3)*fr)]
        r=rec(seg)
        toks.append({'start':max(0,(s-3)*fr)/sr,'end':min(len(a),(e2+3)*fr)/sr,'rec':r,'ok': tgt in r.split()})
    out[tgt]={'file':f,'tokens':toks}
    print(tgt, f, [(round(t['start'],2),round(t['end'],2),t['rec'],t['ok']) for t in toks], flush=True)
json.dump(out,open('tokens.json','w'),ensure_ascii=False,indent=1)
