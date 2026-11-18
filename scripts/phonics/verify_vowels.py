import parselmouth, numpy as np
H={ # Hillenbrand 1995 (men F1,F2 ; women F1,F2)
'iː':((342,2322),(437,2761)),'ɪ':((427,2034),(483,2365)),'eɪ':((476,2089),(536,2530)),'e':((580,1799),(731,2058)),
'æ':((588,1952),(669,2349)),'ɑː':((768,1333),(936,1551)),'ɔː':((652,997),(781,1136)),'oʊ':((497,910),(555,1035)),
'ʊ':((469,1122),(519,1225)),'uː':((378,997),(459,1105)),'ʌ':((623,1200),(753,1426)),'ɝ':((474,1379),(523,1588))}
files={'iː':'Close_front_unrounded_vowel','ɪ':'Near-close_near-front_unrounded_vowel','e':'Open-mid_front_unrounded_vowel',
'æ':'Near-open_front_unrounded_vowel','ɑː':'Open_back_unrounded_vowel','ɔː':'Open-mid_back_rounded_vowel','ʊ':'Near-close_near-back_rounded_vowel',
'uː':'Close_back_rounded_vowel','ʌ':'Open-mid_back_unrounded_vowel','ə':'Mid-central_vowel','ɜ(英)':'Open-mid_central_unrounded_vowel','ɒ(英)':'Open_back_rounded_vowel','oʊ?':'Close-mid_back_rounded_vowel','eɪ?':'Close-mid_front_unrounded_vowel'}
for tgt,f in files.items():
    s=parselmouth.Sound(f+'.wav')
    pitch=s.to_pitch(); f0=np.nanmedian([v for v in pitch.selected_array['frequency'] if v>0] or [np.nan])
    women = f0>165
    fm=s.to_formant_burg(maximum_formant=5500 if women else 5000)
    ts=np.linspace(s.xmin+0.3*(s.xmax-s.xmin), s.xmin+0.7*(s.xmax-s.xmin), 9)
    F1=np.nanmedian([fm.get_value_at_time(1,t) for t in ts]); F2=np.nanmedian([fm.get_value_at_time(2,t) for t in ts])
    idx=1 if women else 0
    # normalized distance (bark-ish via log)
    d=sorted(((np.hypot(np.log(F1/v[idx][0]),np.log(F2/v[idx][1])),k) for k,v in H.items()))
    print(f"{tgt:6} f0={f0:5.0f} F1={F1:5.0f} F2={F2:5.0f} nearest={[ (k,round(x,2)) for x,k in d[:3]]}")
