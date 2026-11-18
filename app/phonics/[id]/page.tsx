"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { PageHeader } from "@/components/PageHeader";
import { SoundCard } from "@/components/phonics/SoundCard";
import { RuleCard } from "@/components/phonics/RuleCard";
import { QuizRunner } from "@/components/phonics/QuizRunner";
import { lessonQuiz } from "@/components/phonics/questions";
import { PART_LABEL, PHONICS_LESSONS, lessonNumber, phonicsLesson } from "@/lib/content/phonics";

export default function PhonicsLessonPage() {
  const params = useParams<{ id: string }>();
  const { state, setPhonicsLesson } = useApp();
  const lesson = phonicsLesson(params.id);
  const idx = PHONICS_LESSONS.findIndex((l) => l.id === params.id);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const t = window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }), 120);
    return () => window.clearTimeout(t);
  }, [params.id]);

  if (!lesson) {
    return (
      <article>
        <h1>没有找到这一课</h1>
        <Link href="/phonics" className="btn">回到自然拼读</Link>
      </article>
    );
  }
  const prog = state.phonics?.lessons?.[lesson.id];
  const prev = PHONICS_LESSONS[idx - 1];
  const next = PHONICS_LESSONS[idx + 1];

  return (
    <article>
      <p className="muted tiny" style={{ marginBottom: 6 }}>
        <Link href="/phonics">自然拼读</Link> · {PART_LABEL[lesson.part]}
      </p>
      <PageHeader kicker={`第 ${lessonNumber(lesson)} 课 · ${lesson.title}`} title={lesson.titleZh} desc={lesson.introZh} />
      {lesson.part === "A" ? (
        <nav className="ph-jump" aria-label="本课音标">
          {(lesson.sounds ?? []).map((s) => (
            <a key={s.id} href={`#${s.id}`}>/{s.us}/</a>
          ))}
        </nav>
      ) : (
        <nav className="ph-jump" aria-label="本课规则">
          {(lesson.rules ?? []).map((r) => (
            <a key={r.id} href={`#${r.id}`} className="en">{r.pattern}</a>
          ))}
        </nav>
      )}
      <p className="notice tiny">
        每个词都可以听（有「真人」的是真人录音，其余是预录的美音），也有一句例句。中文意思默认先藏起来，点「意思」再看。
      </p>
      {(lesson.sounds ?? []).map((s) => (
        <SoundCard key={s.id} sound={s} />
      ))}
      {(lesson.rules ?? []).map((r) => (
        <RuleCard key={r.id} rule={r} />
      ))}

      <section className="card" id="quiz">
        <h2>{lesson.part === "A" ? "小测：听到的是哪个音？" : "小测：听音选音标"}</h2>
        <p className="muted tiny">8 题，结果会记进「薄弱项」，方便以后复习。</p>
        <QuizRunner make={() => lessonQuiz(lesson)} lessonId={lesson.id} startLabel="开始小测" />
        {prog?.total ? (
          <p className="muted tiny" style={{ marginTop: 8 }}>
            本课累计：{prog.correct ?? 0} / {prog.total} 题正确。
          </p>
        ) : null}
      </section>

      <section className="card">
        <div className="btn-row">
          <button
            type="button"
            className={`btn ${prog?.done ? "btn-primary" : "btn-accent"}`}
            onClick={() => setPhonicsLesson(lesson.id, { done: !prog?.done })}
          >
            {prog?.done ? "✓ 本课已完成" : "学完了，标记完成"}
          </button>
          <Link className="btn" href={`/phonics/practice?scope=${lesson.id}`}>
            用本课的词练习
          </Link>
        </div>
        <div className="btn-row" style={{ marginTop: 10, justifyContent: "space-between" }}>
          {prev ? <Link href={`/phonics/${prev.id}`}>← {lessonNumber(prev)} {prev.titleZh}</Link> : <span />}
          {next ? <Link href={`/phonics/${next.id}`}>{lessonNumber(next)} {next.titleZh} →</Link> : <Link href="/phonics/practice">去练习 →</Link>}
        </div>
      </section>
    </article>
  );
}
