"use client";

import { SpeakButton } from "@/components/SpeakButton";
import { Meaning } from "@/components/Meaning";
import { VOICE_DEFAULT } from "@/lib/audio";
import { clipFile } from "@/lib/audio-lookup";
import { humanSrc, wordSrc } from "@/lib/human-audio";
import { phonicsWord } from "@/lib/content/phonics";

export function WordCard({ word, note, highlight }: { word: string; note?: string; highlight?: string }) {
  const info = phonicsWord(word);
  const src = wordSrc(word);
  const human = Boolean(humanSrc(word));
  if (!info) return null;
  return (
    <li className="ph-word">
      <div className="ph-word-head">
        <span className="en ph-word-text">{highlight ? <Highlight word={word} part={highlight} /> : word}</span>
        <span className="ph-ipa">/{info.ipa}/</span>
        {info.scene ? <span className="badge">场景词</span> : null}
      </div>
      {note ? <p className="muted tiny">{note}</p> : null}
      <div className="btn-row" style={{ marginTop: 4 }}>
        <SpeakButton text={word} src={src} label={human ? "真人" : "听"} />
        <SpeakButton text={word} src={src} rate={0.6} label="慢速" />
      </div>
      <Meaning zh={info.zh} compact />
      <p className="en ph-ex">{info.ex}</p>
      <div className="btn-row">
        <SpeakButton text={info.ex} src={clipFile(info.ex, VOICE_DEFAULT)} label="听例句" />
      </div>
      <Meaning zh={info.exZh} compact />
    </li>
  );
}

function Highlight({ word, part }: { word: string; part: string }) {
  const i = word.toLowerCase().indexOf(part.toLowerCase());
  if (i < 0 || !part) return <>{word}</>;
  return (
    <>
      {word.slice(0, i)}
      <mark>{word.slice(i, i + part.length)}</mark>
      {word.slice(i + part.length)}
    </>
  );
}
