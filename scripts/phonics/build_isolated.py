# One-off: downloads chosen Wikimedia Commons IPA clips into public/audio/ipa and writes isolated.json.
# Input /tmp/commons_ipa.json = Commons API listing of the IPA audio category (scratch). Verify with verify_*.py.
import json, subprocess, urllib.parse, urllib.request, re, html
UA="EnglishActivationTrainer/1.0 (https://github.com/wangyingjun/english-activation; educational)"
OUT="/workspace/english-activation/public/audio/ipa"
db=json.load(open('/tmp/commons_ipa.json'))
# symbol -> (commons title, [(start,end)] or None for whole, method)
SEL={
 'iː':('File:Close front unrounded vowel.ogg',None,'formant'),
 'ɪ':('File:Near-close near-front unrounded vowel.ogg',None,'formant'),
 'ʌ':('File:Open-mid back unrounded vowel.ogg',None,'formant'),
 'uː':('File:Close back rounded vowel.ogg',None,'formant'),
 'p':('File:Aspirated voiceless bilabial stop.ogg',None,'recognizer'),
 't':('File:Aspirated voiceless alveolar stop.ogg',None,'recognizer'),
 'b':('File:Voiced bilabial plosive.ogg',None,'recognizer'),
 'd':('File:Voiced alveolar plosive.ogg',[(0.82,1.86)],'recognizer'),
 'ɡ':('File:Voiced velar plosive.ogg',None,'recognizer'),
 'f':('File:Voiceless labiodental fricative.ogg',None,'recognizer'),
 'v':('File:Voiced labiodental fricative.ogg',None,'recognizer'),
 'ð':('File:Voiced dental fricative.ogg',[(1.3,2.38)],'recognizer'),
 's':('File:Voiceless alveolar sibilant.ogg',[(1.52,2.4)],'recognizer'),
 'z':('File:Voiced alveolar sibilant.ogg',None,'recognizer'),
 'ʒ':('File:Voiced palato-alveolar sibilant.ogg',[(0.24,1.06)],'recognizer'),
 'tʃ':('File:Voiceless palato-alveolar affricate.ogg',[(0.98,1.84)],'recognizer'),
 'dʒ':('File:Voiced palato-alveolar affricate.ogg',None,'recognizer'),
 'm':('File:Bilabial nasal.ogg',None,'recognizer'),
 'n':('File:Alveolar nasal.ogg',None,'recognizer'),
 'ŋ':('File:Velar nasal.ogg',[(0.98,1.93)],'recognizer'),
 'l':('File:Alveolar lateral approximant.ogg',None,'recognizer'),
 'w':('File:Voiced labio-velar approximant.ogg',None,'recognizer'),
 'j':('File:Palatal approximant.ogg',None,'recognizer'),
}
SLUG={'iː':'i-long','ɪ':'i-short','ʌ':'uh','uː':'u-long','ð':'dh','ɡ':'g','ʒ':'zh','tʃ':'ch','dʒ':'j','ŋ':'ng','j':'y'}
titles=list({v[0] for v in SEL.values()})
info={}
for i in range(0,len(titles),40):
    q=urllib.parse.urlencode({"action":"query","titles":"|".join(titles[i:i+40]),"prop":"imageinfo","iiprop":"url|extmetadata|user","format":"json"})
    d=json.load(urllib.request.urlopen(urllib.request.Request("https://commons.wikimedia.org/w/api.php?"+q,headers={"User-Agent":UA})))
    for p in d["query"]["pages"].values():
        ii=p["imageinfo"][0]; m=ii.get("extmetadata",{})
        artist=html.unescape(re.sub(r"<[^>]+>","",m.get("Artist",{}).get("value",""))).strip()
        if not artist or "No machine-readable" in artist:
            artist=ii.get("user") or "Unknown"
        info[p["title"]]=dict(page=ii["descriptionurl"],license=m.get("LicenseShortName",{}).get("value","") ,licenseUrl=m.get("LicenseUrl",{}).get("value",""),author=artist[:80],user=ii.get("user",""))
out={}
for sym,(title,cuts,method) in SEL.items():
    src=title[5:].rsplit(".",1)[0].replace(" ","_")+".wav"
    slug=SLUG.get(sym,sym)
    dest=f"{OUT}/{slug}.mp3"
    if cuts is None:
        a=[src]
        if method=='formant':
            # vowel: play twice with a short gap
            filt="[0:a]apad=pad_dur=0.45[a0];[a0][1:a]concat=n=2:v=0:a=1[out]"
            subprocess.run(["ffmpeg","-v","error","-y","-i",src,"-i",src,"-filter_complex",filt,"-map","[out]","-ac","1","-ar","24000","-c:a","libmp3lame","-b:a","48k",dest],check=True)
        else:
            subprocess.run(["ffmpeg","-v","error","-y","-i",src,"-ac","1","-ar","24000","-c:a","libmp3lame","-b:a","48k",dest],check=True)
    else:
        s,e=cuts[0]
        subprocess.run(["ffmpeg","-v","error","-y","-i",src,"-af",f"atrim={s}:{e},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,areverse,afade=t=in:d=0.03,areverse","-ac","1","-ar","24000","-c:a","libmp3lame","-b:a","48k",dest],check=True)
    subprocess.run(["ffmpeg","-v","error","-y","-i",dest,"-ac","1","-ar","16000",f"/tmp/ipa/check_{slug}.wav"],check=True)
    i=info[title]
    out[sym]=dict(file=f"/audio/ipa/{slug}.mp3",source=title[5:],page=i["page"],license=i["license"],licenseUrl=i["licenseUrl"],author=i["author"],method=method,trimmed=cuts is not None)
json.dump(out,open(__import__('os').path.join(__import__('os').path.dirname(__file__),'isolated.json'),'w'),ensure_ascii=False,indent=1)
for k,v in out.items(): print(k,v["file"],v["license"],v["author"])
