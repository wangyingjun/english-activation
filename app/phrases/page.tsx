"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Meaning } from "@/components/Meaning";
import { SpeakButton, SpeedToggle } from "@/components/SpeakButton";
import { useApp } from "@/components/AppProvider";
import { PHRASE_GROUPS, PHRASES, phrasesForDate, phrasesInGroup, type Phrase } from "@/lib/content/phrases";

function PhraseCard({
  phrase,
  rate,
  drillHidden,
  onReveal,
}: {
  phrase: Phrase;
  rate: number;
  drillHidden?: boolean;
  onReveal?: () => void;
}) {
  const { state, setPhraseMark } = useApp();
  const mark = state.phraseMarks[phrase.id] ?? {};
  return (
    <li className="card phrase-card">
      <p className="kicker">{phrase.group}</p>
      <p className="en" style={{ fontSize: "1.1rem", margin: "0.2rem 0 0.4rem" }}>
        {phrase.text}
      </p>
      <div className="btn-row">
        <SpeakButton text={phrase.text} rate={rate} label="听" />
      </div>
      {drillHidden ? (
        <button type="button" className="btn btn-accent" style={{ marginTop: 8 }} onClick={onReveal}>
          显示意思
        </button>
      ) : (
        <>
          <Meaning zh={phrase.zh} />
          <p className="muted tiny" style={{ marginTop: 6 }}>
            什么时候用：{phrase.note}
          </p>
        </>
      )}
      <div className="btn-row" style={{ marginTop: 8 }}>
        <button
          type="button"
          className={`btn ${mark.heard ? "btn-primary" : ""}`}
          onClick={() => setPhraseMark(phrase.id, { heard: !mark.heard })}
        >
          {mark.heard ? "已听懂" : "听懂了"}
        </button>
        <button
          type="button"
          className={`btn ${mark.spoken ? "btn-primary" : ""}`}
          onClick={() => setPhraseMark(phrase.id, { spoken: !mark.spoken })}
        >
          {mark.spoken ? "已会说" : "会说了"}
        </button>
      </div>
    </li>
  );
}

export default function PhrasesPage() {
  const { status, state } = useApp();
  const today = phrasesForDate(status.today, 8);
  const [rate, setRate] = useState(0.8);
  const [group, setGroup] = useState<string>(PHRASE_GROUPS[0]);
  const [drill, setDrill] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const list = phrasesInGroup(group);
  const heard = Object.values(state.phraseMarks).filter((m) => m?.heard).length;
  const spoken = Object.values(state.phraseMarks).filter((m) => m?.spoken).length;

  const groupedCount = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of PHRASES) map[p.group] = (map[p.group] ?? 0) + 1;
    return map;
  }, []);

  return (
    <article>
      <PageHeader
        kicker="日常口语"
        title="常用短语"
        desc="这些都是日常会说出口的短句，用的是小学就会的词。先听声音，再看意思，最后试着说出来。不要拿中文逐词去对。"
      />
      <p className="muted tiny">
        一共 {PHRASES.length} 句。已听懂 {heard} 句，已会说 {spoken} 句。
      </p>
      <div className="btn-row" style={{ margin: "8px 0" }}>
        <SpeedToggle rate={rate} onChange={setRate} />
      </div>

      <section className="card">
        <h2>今日 8 句</h2>
        <p className="muted tiny">每天换一组。可以先做「听完再看意思」的小练习。</p>
        <div className="btn-row" style={{ margin: "8px 0" }}>
          <button type="button" className={`btn ${drill ? "btn-primary" : "btn-accent"}`} onClick={() => { setDrill((v) => !v); setOpenId(null); }}>
            {drill ? "退出听辨练习" : "听完再看意思"}
          </button>
        </div>
        <ul className="list-plain">
          {today.map((p) => (
            <PhraseCard
              key={p.id}
              phrase={p}
              rate={rate}
              drillHidden={drill && openId !== p.id}
              onReveal={() => setOpenId(p.id)}
            />
          ))}
        </ul>
      </section>

      <section>
        <h2>按场景看全部</h2>
        <div className="btn-row" style={{ margin: "8px 0" }}>
          {PHRASE_GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              className={`btn ${g === group ? "btn-primary" : ""}`}
              onClick={() => setGroup(g)}
            >
              {g} · {groupedCount[g] ?? 0}
            </button>
          ))}
        </div>
        <ul className="list-plain">
          {list.map((p) => (
            <PhraseCard key={p.id} phrase={p} rate={rate} />
          ))}
        </ul>
      </section>
    </article>
  );
}
