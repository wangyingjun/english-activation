"use client";

import { PracticeFrame } from "@/components/PracticeFrame";
import { SpeakButton, SpeedToggle } from "@/components/SpeakButton";
import { Meaning } from "@/components/Meaning";
import { emptyChunkWork, useApp } from "@/components/AppProvider";
import { chunksForPhaseDay } from "@/lib/content/chunks";
import { TTS_DISCLAIMER } from "@/lib/content/materials";
import { useState } from "react";

export default function ChunksPage() {
  const { status, state, setChunkWork } = useApp();
  const { chunks, review } = chunksForPhaseDay(status.phaseDay || 1);
  const [rate, setRate] = useState(1);

  return (
    <PracticeFrame
      moduleId="chunks"
      phase={2}
      desc="每天掌握 5 个万能功能句型。每个句型结合自己的真实生活造 3 个句子，并大声念出。用现成的语块，而不是临时用语法组装。"
    >
      <div className="btn-row" style={{ marginBottom: 8 }}>
        <SpeedToggle rate={rate} onChange={setRate} />
        {review && <span className="badge">今天是复习日</span>}
      </div>
      {review && (
        <p className="notice">两周前学过的 5 个语块再次出现。请用新的生活细节再造一遍句子，不要复制上次的。</p>
      )}
      {chunks.map((chunk) => {
        const work = state.chunkWork[chunk.id] ?? emptyChunkWork();
        return (
          <section key={chunk.id} className="card">
            <p className="kicker">{chunk.func}</p>
            <h2 className="en">{chunk.text}</h2>
            <Meaning zh={chunk.meaning} />
            <p className="lead">{chunk.note}</p>
            <p className="en muted tiny">{chunk.example}</p>
            <Meaning zh={chunk.exampleZh} compact />
            <SpeakButton text={`${chunk.text} ${chunk.example}`} rate={rate} label="听语块和例句" />
            {[0, 1, 2].map((i) => (
              <label key={i} className="field">
                <span>用自己的生活造句 {i + 1}</span>
                <textarea
                  rows={2}
                  value={work.sentences[i]}
                  onChange={(e) => {
                    const sentences = [...work.sentences] as [string, string, string];
                    sentences[i] = e.target.value;
                    setChunkWork(chunk.id, { ...work, sentences });
                  }}
                  placeholder={`Start with: ${chunk.text}`}
                />
                <button
                  type="button"
                  className={`btn ${work.said[i] ? "btn-primary" : "btn-ghost"}`}
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => {
                    const said = [...work.said] as [boolean, boolean, boolean];
                    said[i] = !said[i];
                    setChunkWork(chunk.id, { ...work, said });
                  }}
                >
                  {work.said[i] ? "已大声念出" : "标记：已大声念出"}
                </button>
                <SpeakButton text={work.sentences[i]} rate={rate} label="听我写的句子" allowMachine />
              </label>
            ))}
          </section>
        );
      })}
      <p className="notice">{TTS_DISCLAIMER}</p>
    </PracticeFrame>
  );
}
