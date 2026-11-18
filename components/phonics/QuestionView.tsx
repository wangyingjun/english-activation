"use client";

import { useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { Meaning } from "@/components/Meaning";
import { Recorder } from "@/components/Recorder";
import { VOICE_DEFAULT } from "@/lib/audio";
import { clipFile } from "@/lib/audio-lookup";
import { wordSrc } from "@/lib/human-audio";
import { checkSpelling, phonicsWord } from "@/lib/content/phonics";
import type { Question } from "./questions";

/** One question. Calls onAnswer exactly once, then shows feedback and a 下一题 button. */
export function QuestionView({
  q,
  onAnswer,
  onNext,
  index,
  total,
}: {
  q: Question;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  index: number;
  total: number;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const info = phonicsWord(q.word);
  const src = wordSrc(q.word);

  function answer(correct: boolean) {
    if (result !== null) return;
    setResult(correct);
    onAnswer(correct);
  }

  const prompt =
    q.kind === "sound"
      ? "听这个词，它里面有哪个音？"
      : q.kind === "ipa"
        ? "听这个词，选出它的音标。"
        : q.kind === "spell"
          ? "听这个词，把拼写打出来。"
          : "看词读音：先自己读出来（可以录音），再看答案。";

  return (
    <div className="ph-q" data-kind={q.kind}>
      <p className="kicker">
        第 {index + 1} / {total} 题
      </p>
      <p>{prompt}</p>
      {q.kind === "read" ? (
        <p className="ph-big en">{q.word}</p>
      ) : (
        <div className="btn-row" style={{ margin: "8px 0" }}>
          <SpeakButton text={q.word} src={src} label="播放" />
          <SpeakButton text={q.word} src={src} rate={0.6} label="慢速" />
        </div>
      )}

      {q.kind === "sound" || q.kind === "ipa" ? (
        <div className="ph-options">
          {q.options.map((opt) => {
            const cls = picked == null ? "" : opt === q.answer ? "correct" : opt === picked ? "wrong" : "";
            return (
              <button
                key={opt}
                type="button"
                className={`quiz-choice ${cls}`}
                disabled={picked != null}
                onClick={() => {
                  setPicked(opt);
                  answer(opt === q.answer);
                }}
              >
                <span className="ph-ipa-opt">/{opt}/</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {q.kind === "spell" ? (
        <form
          className="ph-spell"
          onSubmit={(e) => {
            e.preventDefault();
            if (!typed.trim() || result !== null) return;
            answer(checkSpelling(typed, q.word));
          }}
        >
          <input
            type="text"
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="拼写"
            value={typed}
            disabled={result !== null}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="在这里输入拼写"
          />
          <button type="submit" className="btn btn-primary" disabled={result !== null || !typed.trim()}>
            检查
          </button>
        </form>
      ) : null}

      {q.kind === "read" ? (
        <>
          <Recorder storageKey={`phonics:read:${q.word}`} maxSeconds={10} label="读一遍并录音（可选）" />
          {!revealed ? (
            <button type="button" className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setRevealed(true)}>
              看答案
            </button>
          ) : result === null ? (
            <div style={{ marginTop: 8 }}>
              <p className="muted tiny">和标准读音比一比，你读对了吗？</p>
              <div className="btn-row" style={{ marginTop: 6 }}>
                <button type="button" className="btn btn-primary" onClick={() => answer(true)}>
                  读对了
                </button>
                <button type="button" className="btn" onClick={() => answer(false)}>
                  没读对
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {(result !== null || (q.kind === "read" && revealed)) && info ? (
        <div className={`ph-feedback ${result === true ? "ok" : result === false ? "no" : ""}`}>
          {result !== null ? <p className="ph-verdict">{result ? "对了 ✓" : "再听听 ✗"}</p> : null}
          <p>
            <span className="en ph-word-text">{q.word}</span> <span className="ph-ipa">/{info.ipa}/</span>
          </p>
          {q.kind === "spell" && result === false ? <p className="muted tiny">你写的是：{typed}</p> : null}
          <div className="btn-row" style={{ marginTop: 4 }}>
            <SpeakButton text={q.word} src={src} label="听答案" />
            <SpeakButton text={info.ex} src={clipFile(info.ex, VOICE_DEFAULT)} label="听例句" />
          </div>
          <p className="en ph-ex">{info.ex}</p>
          <Meaning zh={`${info.zh}；${info.exZh}`} compact />
        </div>
      ) : null}

      {result !== null ? (
        <button type="button" className="btn btn-accent" style={{ marginTop: 10 }} onClick={onNext}>
          {index + 1 >= total ? "完成" : "下一题"}
        </button>
      ) : null}
    </div>
  );
}
