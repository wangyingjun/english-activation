"use client";

import { CheckButton } from "@/components/CheckButton";
import { PageHeader } from "@/components/PageHeader";
import { Recorder } from "@/components/Recorder";
import { Timer } from "@/components/Timer";
import { useApp } from "@/components/AppProvider";

export default function MicroPage() {
  const { status, state, setMicroText, toggleMicro } = useApp();
  const text = state.microTexts[status.today] ?? "";
  const checked = !!state.days[status.today]?.micro;

  return (
    <article>
      <PageHeader
        kicker="铁律 3"
        title="睡前 3 分钟微输出"
        desc="哪怕今天再忙，也用英语花 3 分钟总结今天做了什么。可以录音，也可以先写再读。没有输出倒逼，输入永远停在被动接收层。"
      />
      <Timer id={`${status.today}:micro`} seconds={3 * 60} title="3 分钟" />
      <label className="field">
        <span>也可以先写下来，再读出声</span>
        <textarea
          value={text}
          onChange={(e) => setMicroText(status.today, e.target.value)}
          placeholder="Today I… First,… Then,… I felt… Tomorrow I want to…"
        />
      </label>
      <div className="card">
        <Recorder storageKey={`micro:${status.today}`} maxSeconds={4 * 60} label="3 分钟口述录音" />
      </div>
      <div className="card">
        <CheckButton checked={checked} onChange={(v) => toggleMicro(status.today, v)}>
          {checked ? "今天的微输出已完成" : "勾选完成今天的微输出"}
        </CheckButton>
      </div>
    </article>
  );
}
