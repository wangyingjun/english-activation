"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useApp } from "@/components/AppProvider";
import { PageHeader } from "@/components/PageHeader";
import { LEVEL_HINT, LIBRARY_ITEMS, LIBRARY_LEVELS, LIBRARY_TOPICS, formatTime, type LibraryLevel } from "@/lib/content/library";

export default function LibraryPage() {
  const { state } = useApp();
  const [level, setLevel] = useState<LibraryLevel | "全部">("全部");
  const [topic, setTopic] = useState<string>("全部");
  const items = useMemo(
    () => LIBRARY_ITEMS.filter((i) => (level === "全部" || i.level === level) && (topic === "全部" || i.topic === topic)),
    [level, topic],
  );
  const heard = LIBRARY_ITEMS.filter((i) => state.library?.[i.id]?.heard).length;
  const shadowed = LIBRARY_ITEMS.filter((i) => state.library?.[i.id]?.shadowed).length;
  const totalMin = Math.round(LIBRARY_ITEMS.reduce((n, i) => n + i.duration, 0) / 60);

  return (
    <article>
      <PageHeader
        kicker="站内直接播放 · 原文 + 中文翻译"
        title="听力素材"
        desc={`${LIBRARY_ITEMS.length} 段美国之音慢速英语（VOA Learning English）原声，共约 ${totalMin} 分钟。每句都有英文原文和中文翻译，点句子就能跳到那里听。`}
      />
      <div className="stat-row">
        <div className="stat"><b>{LIBRARY_ITEMS.length}</b><span>段素材</span></div>
        <div className="stat"><b>{heard}</b><span>听懂了</span></div>
        <div className="stat"><b>{shadowed}</b><span>会跟读</span></div>
      </div>

      <div className="card lib-filters">
        <div className="seg" role="radiogroup" aria-label="难度">
          {(["全部", ...LIBRARY_LEVELS] as const).map((l) => (
            <button key={l} type="button" role="radio" aria-checked={level === l} className={level === l ? "on" : ""} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
        </div>
        <label className="tiny muted lib-topic">
          话题
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="全部">全部</option>
            {LIBRARY_TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        {level !== "全部" && <p className="muted tiny">{LEVEL_HINT[level]}</p>}
      </div>

      <ul className="lib-list">
        {items.map((i) => {
          const p = state.library?.[i.id];
          return (
            <li key={i.id}>
              <Link href={`/library/${i.id}`} className="lib-item">
                <span className="lib-item-top">
                  <span className={`lib-level lv-${LIBRARY_LEVELS.indexOf(i.level)}`}>{i.level}</span>
                  <span className="tiny muted">{i.topic} · {formatTime(i.duration)} · {i.sents.length} 句</span>
                  {p?.heard && <span className="lib-badge">听懂</span>}
                  {p?.shadowed && <span className="lib-badge">会跟读</span>}
                </span>
                <span className="en lib-item-title">{i.title}</span>
                <span className="tiny">{i.titleZh}</span>
                <span className="tiny muted">{i.series}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="muted tiny">
        素材来自美国之音（VOA）自己制作的 Learning English 节目，属于美国政府作品，公有领域，可自由再分发。来源和署名见每段素材页底部和 <Link href="/credits#library">致谢页</Link>。
      </p>
    </article>
  );
}
