"use client";

import { useMemo, useState } from "react";
import { PracticeFrame } from "@/components/PracticeFrame";
import { SpeakButton, SpeedToggle } from "@/components/SpeakButton";
import { Meaning } from "@/components/Meaning";
import { voiceForSpeaker } from "@/lib/audio";
import { dialogueFile } from "@/lib/audio-lookup";
import { useApp } from "@/components/AppProvider";
import { dialogueForPhaseDay, dialogueWordList, DIALOGUES } from "@/lib/content/dialogues";
import { TTS_DISCLAIMER } from "@/lib/content/materials";
import type { ListeningProgress } from "@/lib/types";

const STEPS: { id: keyof ListeningProgress["steps"]; title: string; hint: string }[] = [
  { id: "blind1", title: "盲听第 1 遍", hint: "先不要看文本，也不要点「意思」。只抓大意：谁在说话，大致在说什么。" },
  { id: "blind2", title: "盲听第 2 遍", hint: "再听一遍，试着补上刚才漏掉的信息。仍然先不要看中文。" },
  { id: "withText", title: "对照文本逐句听", hint: "打开文本，逐句听清连读和弱读。这一步可以点「意思」；看完中文后再听一遍，把声音和意思对上。点一下那些「认识但没听出来」的词。" },
  { id: "blind3", title: "脱稿盲听第 3 遍", hint: "收起文本和中文再听。刚才标过的词，这次应该更清楚。" },
  { id: "blind4", title: "脱稿盲听第 4 遍", hint: "再听一遍，直到每个词的声音都和意思对得上。" },
];

export default function ListeningPage() {
  const { status, state, setListening } = useApp();
  const [rate, setRate] = useState(0.8);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [openTextId, setOpenTextId] = useState<string | null>(null);
  const scheduled = dialogueForPhaseDay(status.phaseDay || 1);
  const dialogue = DIALOGUES.find((d) => d.id === (pickedId ?? scheduled.id)) ?? scheduled;
  const progress: ListeningProgress = state.listening[dialogue.id] ?? { missed: [], steps: {} };
  const fullText = dialogue.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");

  const showText = openTextId === dialogue.id;

  const wordsByLine = useMemo(
    () => dialogue.lines.map((l) => dialogueWordList(l.text)),
    [dialogue],
  );

  function patch(next: Partial<ListeningProgress>) {
    setListening(dialogue.id, {
      missed: next.missed ?? progress.missed,
      steps: next.steps ?? progress.steps,
      gist: next.gist ?? progress.gist,
    });
  }

  function toggleWord(word: string) {
    const key = word.toLowerCase();
    const missed = progress.missed.includes(key)
      ? progress.missed.filter((w) => w !== key)
      : [...progress.missed, key];
    patch({ missed });
  }

  return (
    <PracticeFrame
      moduleId="listening"
      phase={1}
      desc="选一段 1–2 分钟的慢速日常对话，按四步走：盲听 2 遍抓大意 → 对照文本逐句听清 → 脱稿再盲听 2 遍。下面是本站原创的短对话，两位说话人用不同的预录声音。也欢迎用 ESL Pod、6 Minute English 或你已有的剧集片段做同样的练习。"
    >
      <div className="card">
        <label className="field">
          <span>今日对话（也可换一段）</span>
          <select
            value={dialogue.id}
            onChange={(e) => setPickedId(e.target.value)}
          >
            {DIALOGUES.map((d) => (
              <option key={d.id} value={d.id}>
                第 {d.day} 天 · {d.titleZh} / {d.title}
              </option>
            ))}
          </select>
        </label>
        <p className="kicker">{dialogue.title}</p>
        <h2>{dialogue.titleZh}</h2>
        <p className="muted tiny">{dialogue.setting}</p>
        <div className="btn-row" style={{ marginTop: 10 }}>
          <SpeedToggle rate={rate} onChange={setRate} />
          <SpeakButton text="full" src={dialogueFile(dialogue.id)} rate={rate} label="整段朗读" />
        </div>
      </div>

      <label className="field">
        <span>听过前两遍后，用中文或英文随手记下大意</span>
        <textarea
          value={progress.gist ?? ""}
          onChange={(e) => patch({ gist: e.target.value })}
          placeholder="他们在谈什么？结果怎么样？"
        />
      </label>

      {STEPS.map((step, i) => {
        const on = !!progress.steps[step.id];
        return (
          <section key={step.id} className="card">
            <h2>
              {i + 1}. {step.title}
            </h2>
            <p className="muted tiny">{step.hint}</p>
            {step.id === "withText" && (
              <div style={{ marginTop: 10 }}>
                <button
                  type="button"
                  className={`btn ${showText ? "btn-primary" : "btn-accent"}`}
                  onClick={() => setOpenTextId((id) => (id === dialogue.id ? null : dialogue.id))}
                >
                  {showText ? "收起文本和意思" : "打开文本（可看意思）"}
                </button>
                {showText && (
                  <div style={{ marginTop: 10 }}>
                <p className="muted tiny">这一段在说什么</p>
                <Meaning zh={dialogue.gistZh} />
                {dialogue.lines.map((line, li) => (
                  <div key={`${line.speaker}-${li}`} className="line">
                    <p className="speaker">{line.speaker}</p>
                    <p className="en">
                      {wordsByLine[li].map((w, wi) => {
                        const onW = progress.missed.includes(w.toLowerCase());
                        return (
                          <button
                            key={`${w}-${wi}`}
                            type="button"
                            className={`word-chip ${onW ? "on" : ""}`}
                            onClick={() => toggleWord(w)}
                          >
                            {w}
                          </button>
                        );
                      })}
                    </p>
                    <SpeakButton text={line.text} voice={voiceForSpeaker(line.speaker)} rate={rate} label="听这句" />
                    <Meaning zh={line.zh} />
                  </div>
                ))}
                {progress.missed.length > 0 && (
                  <p className="notice">
                    认识但没听出来：{progress.missed.join(" · ")}。这些词回去再跟读几遍，不要做成单词表来背。
                  </p>
                )}
                  </div>
                )}
              </div>
            )}
            {step.id !== "withText" && (
              <div className="btn-row" style={{ marginTop: 10 }}>
                <SpeakButton text="full" src={dialogueFile(dialogue.id)} rate={rate} label="盲听整段" />
              </div>
            )}
            <div style={{ marginTop: 10 }}>
              <button
                type="button"
                className={`btn ${on ? "btn-primary" : "btn-accent"}`}
                onClick={() => patch({ steps: { ...progress.steps, [step.id]: !on } })}
              >
                {on ? "已完成这一步" : "标记完成"}
              </button>
            </div>
          </section>
        );
      })}
      {showText ? (
        <>
          <p className="muted tiny">整段文本（核对用）：</p>
          <details className="card">
            <summary>显示全文</summary>
            <pre className="en" style={{ whiteSpace: "pre-wrap", marginTop: 8, fontFamily: "inherit" }}>
              {fullText}
            </pre>
          </details>
        </>
      ) : (
        <p className="notice">对照文本这一步点「打开文本」之后，才能看全文。盲听时先不要展开。</p>
      )}
      <p className="notice">{TTS_DISCLAIMER}</p>
    </PracticeFrame>
  );
}
