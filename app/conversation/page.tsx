"use client";

import { useState } from "react";
import { PracticeFrame } from "@/components/PracticeFrame";
import { Recorder } from "@/components/Recorder";
import { SpeakButton } from "@/components/SpeakButton";
import { Meaning } from "@/components/Meaning";
import { Timer } from "@/components/Timer";
import { useApp } from "@/components/AppProvider";
import { DRILL_QUESTIONS, pickQuestions } from "@/lib/content/questions";
import { FIXED_TOPICS, SMALL_TALK, randomSmallTalk } from "@/lib/content/topics";

export default function ConversationPage() {
  const { status } = useApp();
  const [topicId, setTopicId] = useState(FIXED_TOPICS[0].id);
  const [chats, setChats] = useState(() => SMALL_TALK.slice(0, 6));
  const [questions, setQuestions] = useState(() => DRILL_QUESTIONS.slice(0, 8));
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "countdown" | "record">("idle");
  const [left, setLeft] = useState(3);
  const topic = FIXED_TOPICS.find((t) => t.id === topicId) ?? FIXED_TOPICS[0];
  const question = questions[qIndex] ?? questions[0];

  function startDrill() {
    setPhase("countdown");
    setLeft(3);
    let n = 3;
    const t = window.setInterval(() => {
      n -= 1;
      setLeft(n);
      if (n <= 0) {
        window.clearInterval(t);
        setPhase("record");
      }
    }, 1000);
  }

  return (
    <PracticeFrame
      moduleId="conversation"
      phase={3}
      desc="进行 1 对 1 实时语音对话。前 20 分钟围绕固定主题，后 20 分钟随机闲聊，尽量用自然语速。可约 Cambly / Preply 外教，或与任何能语音对话的 AI 练习。下面的主题卡和 3 秒反应练习，用来在约课之前热身。"
    >
      <section className="card">
        <h2>1. 固定主题 · 20 分钟</h2>
        <div className="btn-row" style={{ margin: "8px 0" }}>
          {FIXED_TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`btn ${t.id === topic.id ? "btn-primary" : ""}`}
              onClick={() => setTopicId(t.id)}
            >
              {t.titleZh}
            </button>
          ))}
        </div>
        <p className="en">{topic.title}</p>
        <ul className="lead" style={{ paddingLeft: "1.1rem", marginTop: 8 }}>
          {topic.prompts.map((p) => (
            <li key={p.text} className="en">
              {p.text}
              <Meaning zh={p.zh} />
            </li>
          ))}
        </ul>
        <Timer id={`${status.today}:convo-fixed`} seconds={20 * 60} title="主题对话 20 分钟" />
      </section>

      <section className="card">
        <h2>2. 随机闲聊 · 20 分钟</h2>
        <p className="muted tiny">把这些提示交给对话对象，或自己抽一张接着聊。</p>
        <ul className="list-plain">
          {chats.map((c) => (
            <li key={c.text} className="en">
              {c.text}
              <Meaning zh={c.zh} />
            </li>
          ))}
        </ul>
        <button type="button" className="btn" onClick={() => setChats(randomSmallTalk(6, chats))}>
          换一组闲聊提示
        </button>
        <Timer id={`${status.today}:convo-free`} seconds={20 * 60} title="闲聊 20 分钟" />
      </section>

      <section className="card">
        <h2>3. 三秒反应练习</h2>
        <p className="lead">先听问题，倒计时 3 秒内开口。不追求完美句子，先给一个合理回应。</p>
        <p className="en" style={{ fontSize: "1.15rem", margin: "0.4rem 0 0.8rem" }}>
          {question.text}
        </p>
        <Meaning zh={question.zh} />
        <div className="btn-row">
          <SpeakButton text={question.text} rate={1} label="听问题" />
          <button type="button" className="btn btn-accent" onClick={startDrill} disabled={phase === "countdown"}>
            开始 3 秒倒计时
          </button>
        </div>
        {phase === "countdown" && (
          <p className="timer-digits" style={{ textAlign: "center", margin: "0.8rem 0" }}>
            {left}
          </p>
        )}
        {(phase === "record" || phase === "idle") && (
          <Recorder
            storageKey={`drill:${status.today}:${qIndex}`}
            maxSeconds={30}
            label={phase === "record" ? "时间到，现在回答" : "练习回答（可先听再录）"}
          />
        )}
        <div className="btn-row" style={{ marginTop: 8 }}>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setQIndex((i) => (i + 1) % questions.length);
              setPhase("idle");
            }}
          >
            下一题
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQuestions(pickQuestions(8));
              setQIndex(0);
              setPhase("idle");
            }}
          >
            换一组问题
          </button>
        </div>
      </section>

      <section className="card">
        <h2>去找真人对话</h2>
        <p className="lead">把今天的主题卡发给老师或对话伙伴：前 20 分钟按主题，后 20 分钟闲聊，请对方用自然语速。</p>
        <div className="btn-row">
          <a className="btn btn-accent" href="https://www.cambly.com/" target="_blank" rel="noreferrer">
            Cambly
          </a>
          <a className="btn btn-accent" href="https://preply.com/" target="_blank" rel="noreferrer">
            Preply
          </a>
        </div>
      </section>
    </PracticeFrame>
  );
}
