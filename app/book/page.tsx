"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SpeakButton } from "@/components/SpeakButton";
import { useApp } from "@/components/AppProvider";

export default function BookPage() {
  const { state, bumpReadCount, removeError, removeStuckWord, addError, status } = useApp();
  const [zh, setZh] = useState("");
  const [en, setEn] = useState("");

  return (
    <article>
      <PageHeader
        kicker="个人语料库"
        title="高频口语错题本"
        desc="把「想说却没说出来」的表达集中在这里。每条都是完整说法，不是单词表。朗读满 10 遍就真正留下了。"
      />

      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          if (!zh.trim() || !en.trim()) return;
          addError(zh.trim(), en.trim(), status.today);
          setZh("");
          setEn("");
        }}
      >
        <h2>补一条</h2>
        <label className="field">
          <span>想说的中文</span>
          <input value={zh} onChange={(e) => setZh(e.target.value)} />
        </label>
        <label className="field">
          <span>地道英文</span>
          <input value={en} onChange={(e) => setEn(e.target.value)} />
        </label>
        <button type="submit" className="btn btn-primary">
          加入
        </button>
      </form>

      {state.errorBook.length === 0 && <p className="muted">还没有条目。阶段三的复盘，或平时卡壳之后，都可以写进来。</p>}
      {state.errorBook.map((item) => (
        <article key={item.id} className="card">
          <p className="muted tiny">
            {item.date} · {item.wantedZh}
          </p>
          <p className="en" style={{ fontSize: "1.1rem", margin: "0.3rem 0 0.6rem" }}>
            {item.idiomaticEn}
          </p>
          <SpeakButton text={item.idiomaticEn} rate={0.9} label="朗读" />
          <div className="read-pips">
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} className={i < item.readCount ? "on" : ""} />
            ))}
          </div>
          <div className="btn-row">
            <button type="button" className="btn btn-accent" onClick={() => bumpReadCount(item.id)} disabled={item.readCount >= 10}>
              {item.readCount >= 10 ? "已满 10 遍" : `+1（${item.readCount}/10）`}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => removeError(item.id)}>
              删除
            </button>
          </div>
        </article>
      ))}

      <h2 style={{ marginTop: 24 }}>卡壳词</h2>
      <p className="muted tiny">来自场景复述。把想说的意思升级成完整地道句子后，可以删掉原记录。</p>
      {state.stuckWords.length === 0 && <p className="muted">暂时没有卡壳记录。</p>}
      {state.stuckWords.map((w) => (
        <article key={w.id} className="card">
          <p className="kicker">{w.date}</p>
          <p>{w.word}</p>
          {w.note && <p className="muted tiny">{w.note}</p>}
          <button type="button" className="btn btn-ghost" onClick={() => removeStuckWord(w.id)}>
            删除
          </button>
        </article>
      ))}
    </article>
  );
}
