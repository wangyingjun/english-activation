"use client";

import { useState } from "react";
import Link from "next/link";
import { PracticeFrame } from "@/components/PracticeFrame";
import { SpeakButton } from "@/components/SpeakButton";
import { useApp } from "@/components/AppProvider";

export default function ReviewPage() {
  const { status, state, addError, bumpReadCount, removeError } = useApp();
  const [zh, setZh] = useState("");
  const [en, setEn] = useState("");
  const todayItems = state.errorBook.filter((e) => e.date === status.today);

  return (
    <PracticeFrame
      moduleId="review"
      phase={3}
      desc="回顾当天对话里「想说却没说出来」的 3 个表达，查出地道说法，大声朗读 10 遍，存入个人《高频口语错题本》。"
    >
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
        <h2>新增一条</h2>
        <p className="muted tiny">左边写当时想说的中文，右边写查到的地道英文。不要写成孤立单词。</p>
        <label className="field">
          <span>想说却没说出来（中文）</span>
          <input value={zh} onChange={(e) => setZh(e.target.value)} placeholder="例如：事情没我想象的那么糟" />
        </label>
        <label className="field">
          <span>地道说法（英文，完整句子更好）</span>
          <input value={en} onChange={(e) => setEn(e.target.value)} placeholder="It wasn't as bad as I thought." />
        </label>
        <button type="submit" className="btn btn-primary">
          存入错题本
        </button>
      </form>

      <section>
        <h2>今天要朗读的条目 {todayItems.length ? `· ${todayItems.length}` : ""}</h2>
        {todayItems.length === 0 && <p className="muted">还没有今天的条目。先写上 3 条再开始朗读。</p>}
        {todayItems.map((item) => (
          <article key={item.id} className="card">
            <p className="muted tiny">{item.wantedZh}</p>
            <p className="en" style={{ fontSize: "1.1rem", margin: "0.3rem 0 0.6rem" }}>
              {item.idiomaticEn}
            </p>
            <SpeakButton text={item.idiomaticEn} rate={0.9} label="听地道说法" allowMachine />
            <div className="read-pips" aria-label={`已朗读 ${item.readCount} 遍`}>
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} className={i < item.readCount ? "on" : ""} />
              ))}
            </div>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-primary"
                disabled={item.readCount >= 10}
                onClick={() => bumpReadCount(item.id)}
              >
                {item.readCount >= 10 ? "今天已满 10 遍" : `再读一遍（${item.readCount}/10）`}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => removeError(item.id)}>
                删除
              </button>
            </div>
          </article>
        ))}
      </section>
      <p className="muted tiny">
        全部条目在 <Link href="/book">错题本</Link> 里复习。
      </p>
    </PracticeFrame>
  );
}
