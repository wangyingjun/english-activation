"use client";

import { useState } from "react";
import { PracticeFrame } from "@/components/PracticeFrame";
import { Recorder } from "@/components/Recorder";
import { SpeakButton, SpeedToggle } from "@/components/SpeakButton";
import { voiceForSpeaker } from "@/lib/audio";
import { dialogueFile } from "@/lib/audio-lookup";
import { useApp } from "@/components/AppProvider";
import { dialogueForPhaseDay, DIALOGUES } from "@/lib/content/dialogues";
import { TTS_DISCLAIMER } from "@/lib/content/materials";

export default function ShadowingPage() {
  const { status } = useApp();
  const scheduled = dialogueForPhaseDay(status.phaseDay || 1);
  const [pickedId, setPickedId] = useState(scheduled.id);
  const [rate, setRate] = useState(0.8);
  const [index, setIndex] = useState(0);
  const dialogue = DIALOGUES.find((d) => d.id === pickedId) ?? scheduled;
  const line = dialogue.lines[index];
  const recKey = `shadow:${dialogue.id}:${index}`;

  return (
    <PracticeFrame
      moduleId="shadowing"
      phase={1}
      desc="针对精听的同一段材料跟读。不要背单词，像学唱歌一样模仿语调、重音和停顿。先听原句，再录音，然后并排回放对比。"
    >
      <div className="card">
        <label className="field">
          <span>跟读材料（建议与今天精听同一段）</span>
          <select value={dialogue.id} onChange={(e) => { setPickedId(e.target.value); setIndex(0); }}>
            {DIALOGUES.map((d) => (
              <option key={d.id} value={d.id}>
                第 {d.day} 天 · {d.titleZh} / {d.title}
              </option>
            ))}
          </select>
        </label>
        <div className="btn-row">
          <SpeedToggle rate={rate} onChange={setRate} />
        </div>
        <p className="muted tiny" style={{ marginTop: 8 }}>
          建议从 0.8× 开始，跟得上了再回到 1.0×。
        </p>
      </div>

      <div className="card">
        <p className="kicker">
          第 {index + 1} / {dialogue.lines.length} 句
        </p>
        <p className="speaker">{line.speaker}</p>
        <p className="en" style={{ fontSize: "1.15rem", margin: "0.3rem 0 0.8rem" }}>
          {line.text}
        </p>
        <div className="btn-row">
          <SpeakButton text={line.text} voice={voiceForSpeaker(line.speaker)} rate={rate} label="听原句" />
        </div>
        <Recorder storageKey={recKey} maxSeconds={30} label="录下你的跟读，再和原句并排回放" />
        <div className="btn-row" style={{ marginTop: 8 }}>
          <button
            type="button"
            className="btn"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            上一句
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={index >= dialogue.lines.length - 1}
            onClick={() => setIndex((i) => Math.min(dialogue.lines.length - 1, i + 1))}
          >
            下一句
          </button>
        </div>
      </div>

      <details className="card">
        <summary>整段跟读</summary>
        <p className="muted tiny" style={{ margin: "8px 0" }}>
          先听整段，再一次性跟读。卡壳了就回到逐句模式。
        </p>
        <SpeakButton text="full" src={dialogueFile(dialogue.id)} rate={rate} label="听整段" />
        <Recorder storageKey={`shadow:${dialogue.id}:full`} maxSeconds={180} label="整段跟读录音" />
      </details>
      <p className="notice">{TTS_DISCLAIMER}</p>
    </PracticeFrame>
  );
}
