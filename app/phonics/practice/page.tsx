"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { PageHeader } from "@/components/PageHeader";
import { QuizRunner } from "@/components/phonics/QuizRunner";
import { ipaQuestion, questionForKey, shuffle, wordsInScope, type Question } from "@/components/phonics/questions";
import { PHONICS_LESSONS, PHONICS_WORDS, lessonNumber, phonicsLesson } from "@/lib/content/phonics";

type Mode = "read" | "spell" | "ipa" | "weak";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "read", label: "看词读音", hint: "看到词先自己读，可以录音，再听标准读音对照，最后自己判断对不对。" },
  { id: "spell", label: "听音拼写", hint: "只听声音，把词拼出来。马上告诉你对错。" },
  { id: "ipa", label: "听音选音标", hint: "听一个词，从 4 个音标里选出它的读法。" },
  { id: "weak", label: "薄弱项复习", hint: "把你答错过、正确率低的项目挑出来，混在一起再练。" },
];

function keyLabel(key: string): { mode: string; item: string } {
  const [kind, rest] = [key.slice(0, key.indexOf(":")), key.slice(key.indexOf(":") + 1)];
  if (kind === "sound") {
    const lesson = phonicsLesson(rest.split("-")[0]);
    const s = lesson?.sounds?.find((x) => x.id === rest);
    return { mode: "听辨音标", item: s ? `/${s.us}/（${s.nameZh}）` : rest };
  }
  const m = kind === "spell" ? "听音拼写" : kind === "read" ? "看词读音" : "听音选音标";
  return { mode: m, item: rest };
}

function Practice() {
  const params = useSearchParams();
  const initialScope = params.get("scope") ?? "all";
  const { state } = useApp();
  const [mode, setMode] = useState<Mode>("spell");
  const [scope, setScope] = useState<string>(phonicsLesson(initialScope) || initialScope === "scene" ? initialScope : "all");
  const items = state.phonics?.items ?? {};
  const weak = Object.entries(items)
    .filter(([, v]) => v.total > 0 && v.correct / v.total < 0.8)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total || b[1].total - a[1].total);
  const tried = Object.entries(items).filter(([, v]) => v.total > 0);

  function make(): Question[] {
    if (mode === "weak") {
      return weak
        .slice(0, 12)
        .map(([k]) => questionForKey(k))
        .filter((q): q is Question => q !== null);
    }
    const pool = wordsInScope(scope);
    const picked = shuffle(pool).slice(0, 10);
    if (mode === "ipa") return picked.map((w) => ipaQuestion(w, pool.length >= 4 ? pool : Object.keys(PHONICS_WORDS)));
    return picked.map((w) => ({ kind: mode, key: `${mode}:${w}`, word: w }) as Question);
  }

  const current = MODES.find((m) => m.id === mode)!;
  return (
    <article>
      <p className="muted tiny" style={{ marginBottom: 6 }}>
        <Link href="/phonics">自然拼读</Link> · 第三部分
      </p>
      <PageHeader kicker="自然拼读 · 练习" title="看、听、拼、读" desc="每轮 10 题。每一题的对错都会记下来，正确率低于 80% 的会出现在「薄弱项复习」里。" />
      <div className="seg ph-modes" role="tablist" aria-label="练习方式">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            className={mode === m.id ? "on" : ""}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <section className="card">
        <p className="muted">{current.hint}</p>
        {mode !== "weak" ? (
          <label className="field">
            <span>练哪些词</span>
            <select value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="all">全部词（{Object.keys(PHONICS_WORDS).length} 个）</option>
              <option value="scene">场景对话里出现过的词</option>
              {PHONICS_LESSONS.map((l) => (
                <option key={l.id} value={l.id}>
                  {lessonNumber(l)} {l.titleZh}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <QuizRunner
          key={`${mode}-${scope}`}
          make={make}
          startLabel="开始这一轮"
          emptyText="还没有薄弱项。先做几轮小测或拼写，答错的会出现在这里。"
        />
      </section>

      {mode === "weak" ? (
        <section className="card">
          <h2>每一项的正确率</h2>
          {tried.length === 0 ? (
            <p className="muted tiny">还没有记录。</p>
          ) : (
            <ul className="list-plain ph-stats">
              {[...tried]
                .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
                .slice(0, 40)
                .map(([k, v]) => {
                  const { mode: m, item } = keyLabel(k);
                  const pct = Math.round((v.correct / v.total) * 100);
                  return (
                    <li key={k} className={pct < 80 ? "weak" : ""}>
                      <span className="en">{item}</span>
                      <span className="muted tiny">{m}</span>
                      <span className="ph-pct">
                        {pct}%（{v.correct}/{v.total}）
                      </span>
                    </li>
                  );
                })}
            </ul>
          )}
        </section>
      ) : null}
    </article>
  );
}

export default function PhonicsPracticePage() {
  return (
    <Suspense fallback={<p className="muted">加载中…</p>}>
      <Practice />
    </Suspense>
  );
}
