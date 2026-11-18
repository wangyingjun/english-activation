"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/components/AppProvider";
import { SpeakButton } from "@/components/SpeakButton";
import { wordSrc } from "@/lib/human-audio";
import {
  PART_LABEL,
  PHONICS_LESSONS,
  SYMBOL_TABLE,
  lessonNumber,
  suggestedPhonicsLesson,
} from "@/lib/content/phonics";

export default function PhonicsHome() {
  const { state, status } = useApp();
  const progress = state.phonics?.lessons ?? {};
  const done = PHONICS_LESSONS.filter((l) => progress[l.id]?.done).length;
  const suggested = status.started && !status.notYet ? suggestedPhonicsLesson(status.day) : null;
  const notes = SYMBOL_TABLE.filter((s) => s.usNote);

  return (
    <article>
      <PageHeader
        kicker="自然拼读 · 选修"
        title="从 48 个音标开始"
        desc="先把课本里的 48 个音标一个个听清、说准，再学字母和发音的规律，最后用看词读音、听音拼写来巩固。课程按学校里学过的英式 48 音标来排，但读音用美音（和本站其他声音一致），差别会单独标出来。"
      />
      <section className="card">
        <p>
          已完成 <b>{done}</b> / {PHONICS_LESSONS.length} 课。
        </p>
        {suggested ? (
          <p className="muted tiny" style={{ marginTop: 4 }}>
            第 1 阶段（第 1–4 周）建议每天顺带学一点：今天可以看「{lessonNumber(suggested)} {suggested.titleZh}」。这是选修，不占每天 90 分钟。
          </p>
        ) : (
          <p className="muted tiny" style={{ marginTop: 4 }}>这是选修课，什么时候都可以打开。建议在第 1 阶段（第 1–4 周）每天顺带学一课。</p>
        )}
        <div className="btn-row" style={{ marginTop: 8 }}>
          <Link className="btn btn-primary" href={`/phonics/${(suggested ?? PHONICS_LESSONS.find((l) => !progress[l.id]?.done) ?? PHONICS_LESSONS[0]).id}`}>
            {done ? "继续学习" : "从第一课开始"}
          </Link>
          <Link className="btn" href="/phonics/practice">
            去练习
          </Link>
        </div>
      </section>

      {(["A", "B"] as const).map((part) => (
        <section key={part}>
          <h2>{PART_LABEL[part]}</h2>
          <ul className="ph-lessons">
            {PHONICS_LESSONS.filter((l) => l.part === part).map((l) => {
              const p = progress[l.id];
              const acc = p?.total ? Math.round(((p.correct ?? 0) / p.total) * 100) : null;
              return (
                <li key={l.id}>
                  <Link href={`/phonics/${l.id}`} className={`ph-lesson-link ${p?.done ? "done" : ""}`}>
                    <span className="ph-lesson-no">{lessonNumber(l)}</span>
                    <span className="ph-lesson-title">
                      {l.titleZh}
                      <span className="muted tiny">
                        {l.part === "A" ? (l.sounds ?? []).map((s) => `/${s.us}/`).join(" ") : `${(l.rules ?? []).length} 条规则`}
                      </span>
                    </span>
                    <span className="ph-lesson-state">{p?.done ? "✓ 已完成" : acc !== null ? `小测 ${acc}%` : ""}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section>
        <h2>{PART_LABEL.C}</h2>
        <div className="card">
          <p className="muted">看词读音、听音拼写、听音选音标，以及按正确率挑出的薄弱项复习。</p>
          <Link className="btn btn-accent" href="/phonics/practice" style={{ marginTop: 8 }}>
            打开练习
          </Link>
        </div>
      </section>

      <section className="card" id="table">
        <h2>英式（课本 48 个）· 美式 · KK 对照表</h2>
        <p className="muted tiny">
          左边是学校里学的英式 DJ 音标，中间是本站用的美音写法（接近剑桥词典美音），右边是台湾常见的 KK 音标。大多数音一样，不同的行标了 ★。
        </p>
        <div className="ph-table-wrap">
          <table className="ph-table">
            <thead>
              <tr>
                <th>课本</th>
                <th>美音</th>
                <th>KK</th>
                <th>例词</th>
              </tr>
            </thead>
            <tbody>
              {SYMBOL_TABLE.map((s) => {
                const diff = s.extra || s.dj !== s.us;
                return (
                  <tr key={s.id} className={diff ? "diff" : ""}>
                    <td>{s.extra ? "—" : `/${s.dj}/`}</td>
                    <td>
                      /{s.us}/{diff ? " ★" : ""}
                    </td>
                    <td>[{s.kk}]</td>
                    <td>
                      <Link href={`/phonics/${s.lessonId}#${s.id}`} className="en">
                        {s.example}
                      </Link>{" "}
                      <SpeakButton text={s.example} src={wordSrc(s.example)} label="听" className="ph-mini" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3 style={{ marginTop: 12 }}>美音主要差别</h3>
        <ul className="list-plain ph-notes">
          {notes.map((s) => (
            <li key={s.id}>
              <b>/{s.dj}/ → /{s.us}/</b>：{s.usNote}
            </li>
          ))}
          <li>
            <b>长短符号</b>：美式词典里 /iː/、/uː/ 的长音符号有时省略（KK 写作 [i]、[u]）。本站保留 ː，方便和课本对照。
          </li>
        </ul>
      </section>
    </article>
  );
}
