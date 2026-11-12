"use client";

import { useState } from "react";
import { PracticeFrame } from "@/components/PracticeFrame";
import { SpeakButton, SpeedToggle } from "@/components/SpeakButton";
import { YouGlishLink } from "@/components/YouGlishLink";
import { Meaning } from "@/components/Meaning";
import { useApp } from "@/components/AppProvider";
import { TTS_DISCLAIMER } from "@/lib/content/materials";
import { soundsForPhaseDay, type MinimalPair, type SoundGroup } from "@/lib/content/sounds";

function Quiz({ group, rate }: { group: SoundGroup; rate: number }) {
  const { recordQuiz, state } = useApp();
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [order, setOrder] = useState<{ play: string; left: string; right: string; answer: string; leftMeta?: { zh?: string; pos?: string; ipa?: string }; rightMeta?: { zh?: string; pos?: string; ipa?: string }; exampleZh?: string }[]>([]);
  const score = state.soundQuiz[group.id];
  const q = order[qi];

  function start() {
    const next =
      group.kind === "pairs" && group.pairs
        ? group.pairs.map((p) => {
            const target = Math.random() < 0.5 ? p.left : p.right;
            return {
              play: target,
              left: p.left,
              right: p.right,
              answer: target,
              leftMeta: { zh: p.leftZh, pos: p.leftPos, ipa: p.leftIpa },
              rightMeta: { zh: p.rightZh, pos: p.rightPos, ipa: p.rightIpa },
            };
          })
        : (group.items ?? []).map((it) => ({
            play: it.example,
            left: it.citation,
            right: it.reduced,
            answer: it.citation,
            leftMeta: { zh: it.citationZh },
            rightMeta: { zh: `${it.citationZh}（口语里常连成这样）` },
            exampleZh: it.exampleZh,
          }));
    setOrder(next);
    setQi(0);
    setPicked(null);
    setStarted(true);
  }

  function choose(choice: string) {
    if (picked || !q) return;
    setPicked(choice);
    recordQuiz(group.id, choice === q.answer);
  }

  function next() {
    if (qi + 1 >= order.length) {
      setStarted(false);
      setPicked(null);
      return;
    }
    setQi(qi + 1);
    setPicked(null);
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h3>听一听，选一选</h3>
      <p className="muted tiny">
        {group.kind === "pairs" ? "先听，再选出你听到的那一个词。" : "先听例句，再选出它对应的完整写法。"}
      </p>
      {!started || !q ? (
        <button type="button" className="btn btn-accent" onClick={start}>
          开始一组
        </button>
      ) : (
        <div>
          <p className="muted tiny">
            第 {qi + 1} / {order.length} 题
          </p>
          <SpeakButton text={q.play} rate={rate} label="播放" />
          {[q.left, q.right].map((choice) => {
            const cls =
              picked == null ? "" : choice === q.answer ? "correct" : choice === picked ? "wrong" : "";
            return (
              <div key={choice}>
                <button
                  type="button"
                  className={`quiz-choice ${cls}`}
                  disabled={!!picked}
                  onClick={() => choose(choice)}
                >
                  <span className="en">{choice}</span>
                </button>
                <Meaning
                  zh={(choice === q.left ? q.leftMeta?.zh : q.rightMeta?.zh) ?? q.exampleZh}
                  pos={choice === q.left ? q.leftMeta?.pos : q.rightMeta?.pos}
                  ipa={choice === q.left ? q.leftMeta?.ipa : q.rightMeta?.ipa}
                  compact
                />
              </div>
            );
          })}
          {picked && (
            <button type="button" className="btn btn-primary" onClick={next} style={{ marginTop: 8 }}>
              {qi + 1 >= order.length ? "完成本组" : "下一题"}
            </button>
          )}
        </div>
      )}
      {score && score.total > 0 && (
        <p className="muted tiny" style={{ marginTop: 8 }}>
          本组累计 {score.correct} / {score.total}
        </p>
      )}
    </div>
  );
}

function PairCell({ word, ipa, rate, pos, zh }: { word: string; ipa: string; rate: number; pos?: string; zh?: string }) {
  return (
    <div className="pair-cell">
      <span className="en">{word}</span>
      <span className="ipa">{ipa}</span>
      <SpeakButton text={word} rate={rate} label="听" />
      <YouGlishLink text={word} />
      <Meaning zh={zh} pos={pos} ipa={ipa} compact />
    </div>
  );
}

function SoundGroupCard({ group, rate }: { group: SoundGroup; rate: number }) {
  return (
    <section className="card">
      <p className="kicker">{group.ipa}</p>
      <h2>{group.title}</h2>
      <p className="lead">{group.tip}</p>
      {group.pairs && (
        <div className="pair-grid" style={{ marginBottom: 12 }}>
          {group.pairs.map((p: MinimalPair) => (
            <PairLine key={`${p.left}-${p.right}`} pair={p} rate={rate} />
          ))}
        </div>
      )}
      {group.items && (
        <ul className="list-plain">
          {group.items.map((it) => (
            <li key={it.citation}>
              <p className="en">
                <b>{it.citation}</b> → {it.reduced} <YouGlishLink text={it.citation} />
              </p>
              <Meaning zh={it.citationZh} compact />
              <p className="en" style={{ marginTop: 4 }}>
                {it.example}
              </p>
              <SpeakButton text={it.example} rate={rate} label="听例句" />
              <Meaning zh={it.exampleZh} compact />
            </li>
          ))}
        </ul>
      )}
      <h3 style={{ marginTop: 12 }}>放进句子里</h3>
      {group.sentences.map((s) => (
        <div key={s.text} className="line">
          <p className="en">{s.text}</p>
          <SpeakButton text={s.text} rate={rate} label="朗读" />
          <Meaning zh={s.zh} />
        </div>
      ))}
      <Quiz group={group} rate={rate} />
    </section>
  );
}

function PairLine({ pair, rate }: { pair: MinimalPair; rate: number }) {
  return (
    <div className="pair-row">
      <PairCell word={pair.left} ipa={pair.leftIpa} rate={rate} pos={pair.leftPos} zh={pair.leftZh} />
      <span className="muted tiny" style={{ textAlign: "center" }}>
        /
      </span>
      <PairCell word={pair.right} ipa={pair.rightIpa} rate={rate} pos={pair.rightPos} zh={pair.rightZh} />
    </div>
  );
}

export default function SoundsPage() {
  const { status } = useApp();
  const groups = soundsForPhaseDay(status.phaseDay || 1);
  const [rate, setRate] = useState(0.8);

  return (
    <PracticeFrame
      moduleId="sounds"
      phase={1}
      desc="每天梳理 1–2 组易混淆发音。先听预录的自然语音、再对照文本，最后做听辨。想听真人怎么说，点「听真人」。口型和气口也可以对照 Rachel's English 或《美语音标》。"
    >
      <div className="btn-row" style={{ marginBottom: 8 }}>
        <SpeedToggle rate={rate} onChange={setRate} />
      </div>
      {groups.map((g) => (
        <SoundGroupCard key={g.id} group={g} rate={rate} />
      ))}
      <p className="notice">{TTS_DISCLAIMER}</p>
    </PracticeFrame>
  );
}
