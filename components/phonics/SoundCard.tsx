"use client";

import Link from "next/link";
import { SpeakButton } from "@/components/SpeakButton";
import { wordSrc } from "@/lib/human-audio";
import type { PhonicsSound } from "@/lib/content/phonics";
import { WordCard } from "./WordCard";

export function SoundCard({ sound }: { sound: PhonicsSound }) {
  const first = sound.words[0];
  return (
    <section className="card ph-sound" id={sound.id}>
      <div className="ph-sound-head">
        <span className="ph-symbol">/{sound.us}/</span>
        <div>
          <h3 style={{ margin: 0 }}>{sound.nameZh}</h3>
          <p className="muted tiny">
            {sound.extra ? "美音组合（不在 48 个里）" : `课本音标 /${sound.dj}/`} · KK [{sound.kk}]
          </p>
        </div>
      </div>
      <div className="btn-row" style={{ marginTop: 8 }}>
        {sound.isolated ? (
          <>
            <SpeakButton text={sound.us} src={sound.isolated.file} rate={0.85} label="单独听这个音" />
            <span className="muted tiny ph-src">
              国际音标示范录音（Commons，已核对）
              {sound.isolated.method === "recognizer" ? "，辅音会带一个元音 a" : ""}
            </span>
          </>
        ) : (
          <>
            <SpeakButton text={first} src={wordSrc(first)} rate={0.6} label={`慢听 ${first}`} />
            <span className="muted tiny ph-src">这个音没有能核对的单独录音，先听它在词里的样子。</span>
          </>
        )}
      </div>
      <dl className="ph-facts">
        <dt>怎么发</dt>
        <dd>{sound.mouth}</dd>
        <dt>和中文比</dt>
        <dd>{sound.chinese}</dd>
        <dt>常见拼法</dt>
        <dd>{sound.spell}</dd>
        {sound.usNote ? (
          <>
            <dt>美音提示</dt>
            <dd>{sound.usNote}</dd>
          </>
        ) : null}
      </dl>
      <ul className="ph-words">
        {sound.words.map((w) => (
          <WordCard key={w} word={w} />
        ))}
      </ul>
      {sound.contrast ? (
        <p className="tiny" style={{ marginTop: 8 }}>
          容易混？去 <Link href={`/sounds#contrast-${sound.contrast}`}>对比听辨训练</Link> 多练几轮。
        </p>
      ) : null}
    </section>
  );
}
