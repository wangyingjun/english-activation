"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { stopAllAudio } from "@/lib/player";
import type { Question } from "./questions";
import { QuestionView } from "./QuestionView";

export function QuizRunner({
  title,
  make,
  lessonId,
  startLabel = "开始",
  emptyText,
}: {
  title?: string;
  make: () => Question[];
  lessonId?: string;
  startLabel?: string;
  emptyText?: string;
}) {
  const { recordPhonics, setPhonicsLesson } = useApp();
  const [qs, setQs] = useState<Question[] | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const [empty, setEmpty] = useState(false);

  function start() {
    const next = make();
    setEmpty(next.length === 0);
    setQs(next.length ? next : null);
    setI(0);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  return (
    <div className="ph-quiz">
      {title ? <h3>{title}</h3> : null}
      {!qs || finished ? (
        <div>
          {finished ? (
            <p className="lead">
              这一轮 {score.correct} / {score.total} 题正确。
            </p>
          ) : null}
          {empty && emptyText ? <p className="muted tiny">{emptyText}</p> : null}
          <button type="button" className="btn btn-primary" onClick={start}>
            {finished ? "再来一轮" : startLabel}
          </button>
        </div>
      ) : (
        <QuestionView
          key={`${i}-${qs[i].key}`}
          q={qs[i]}
          index={i}
          total={qs.length}
          onAnswer={(ok) => {
            recordPhonics(qs[i].key, ok);
            if (lessonId) setPhonicsLesson(lessonId, { correct: ok });
            setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
          }}
          onNext={() => {
            stopAllAudio();
            if (i + 1 >= qs.length) setFinished(true);
            else setI(i + 1);
          }}
        />
      )}
    </div>
  );
}
