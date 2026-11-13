"use client";

import { SceneTodayBanner } from "@/components/scene/SceneBanner";

import { useState } from "react";
import { PracticeFrame } from "@/components/PracticeFrame";
import { Recorder } from "@/components/Recorder";
import { Timer } from "@/components/Timer";
import { useApp } from "@/components/AppProvider";
import { scenarioForPhaseDay, SCENARIOS } from "@/lib/content/scenarios";
import { phraseMeaning } from "@/lib/content/chunks";
import { Meaning } from "@/components/Meaning";

export default function ScenarioPage() {
  const { status, addStuckWord } = useApp();
  const scheduled = scenarioForPhaseDay(status.phaseDay || 1);
  const [pickedId, setPickedId] = useState(scheduled.id);
  const [word, setWord] = useState("");
  const [note, setNote] = useState("");
  const scenario = SCENARIOS.find((s) => s.id === pickedId) ?? scheduled;

  return (
    <PracticeFrame
      moduleId="scenario"
      phase={2}
      desc="每天选一个生活场景，用刚刚学的简单句型自言自语 5 分钟。卡壳时强迫自己用最简单的词绕过去，并把卡住的词记下来。"
    >
      <SceneTodayBanner moduleId="scenario" />
      <div className="card">
        <label className="field">
          <span>今日场景</span>
          <select value={scenario.id} onChange={(e) => setPickedId(e.target.value)}>
            {SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>
                第 {s.day} 天 · {s.titleZh} / {s.title}
              </option>
            ))}
          </select>
        </label>
        <h2>{scenario.titleZh}</h2>
        <p className="en muted tiny">{scenario.title}</p>
        <p className="lead" style={{ marginTop: 8 }}>{scenario.setup}</p>
        <h3>可以顺着这三条说</h3>
        <ul className="lead" style={{ paddingLeft: "1.1rem" }}>
          {scenario.prompts.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="muted tiny" style={{ marginTop: 8 }}>建议用上的语块</p>
        <ul className="chunk-suggest">
          {scenario.chunks.map((c) => (
            <li key={c}>
              <p className="en">{c}</p>
              <Meaning zh={phraseMeaning(c)} compact />
            </li>
          ))}
        </ul>
      </div>

      <Timer id={`${status.today}:scenario-talk`} seconds={5 * 60} title="自言自语 5 分钟" />
      <div className="card">
        <Recorder storageKey={`scenario:${status.today}:${scenario.id}`} maxSeconds={8 * 60} label="可选：把这 5 分钟录下来" />
      </div>

      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          if (!word.trim()) return;
          addStuckWord(word.trim(), note.trim(), status.today);
          setWord("");
          setNote("");
        }}
      >
        <h2>卡壳词本</h2>
        <p className="muted tiny">记下当时想说却卡住的词或意思。稍后去错题本里补地道说法，不要现在停下来背单词。</p>
        <label className="field">
          <span>卡住的词 / 想说的意思</span>
          <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="e.g. 拖延 / put off" />
        </label>
        <label className="field">
          <span>当时的句子或情境（可选）</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="I wanted to say I kept delaying the report." />
        </label>
        <button type="submit" className="btn btn-primary">
          记一笔
        </button>
      </form>
    </PracticeFrame>
  );
}
