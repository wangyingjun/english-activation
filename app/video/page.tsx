"use client";

import { SceneTodayBanner } from "@/components/scene/SceneBanner";

import Link from "next/link";
import { PracticeFrame } from "@/components/PracticeFrame";
import { useApp } from "@/components/AppProvider";
import { MATERIALS } from "@/lib/content/materials";

const ITEMS = MATERIALS.filter((m) =>
  ["YouTube 街头采访 / 脱口秀片段", "Netflix 轻喜剧", "《老友记》《摩登家庭》片段"].includes(m.name),
);

export default function VideoPage() {
  const { status, state, setListening } = useApp();
  const id = `video:${status.today}`;
  const prev = state.listening[id] ?? { missed: [], steps: {}, gist: "" };

  return (
    <PracticeFrame
      moduleId="video"
      phase={3}
      desc="观看带英文字幕（逐步过渡到无字幕）的访谈或情景剧，训练在杂音、快语速和口音干扰下抓取关键信息的能力。"
    >
      <SceneTodayBanner moduleId="video" />
      <section className="card">
        <h2>今天的看片方式</h2>
        <ol className="lead" style={{ paddingLeft: "1.1rem" }}>
          <li>选 20–30 分钟访谈、街头采访、脱口秀或轻喜剧片段。</li>
          <li>前两周开英文字幕；能跟上大意后，试着关掉字幕再看一遍关键片段。</li>
          <li>不要暂停查每一个词。只在看完后写下「他们主要在说什么」和 1–2 个想学的表达。</li>
        </ol>
      </section>
      <section className="card">
        <h2>从哪里找</h2>
        <ul className="list-plain">
          {ITEMS.map((m) => (
            <li key={m.name}>
              {m.href ? (
                <a href={m.href} target="_blank" rel="noreferrer">
                  {m.name}
                </a>
              ) : (
                <strong>{m.name}</strong>
              )}
              <p className="muted tiny">{m.note}</p>
            </li>
          ))}
        </ul>
        <p className="muted tiny">
          更多入口见 <Link href="/materials">材料页</Link>。
        </p>
      </section>
      <label className="field">
        <span>看完后的大意 + 想留下的 1–2 个表达</span>
        <textarea
          value={prev.gist ?? ""}
          onChange={(e) => setListening(id, { ...prev, gist: e.target.value })}
          placeholder="They were talking about… I want to remember: …"
        />
      </label>
      <div className="btn-row">
        <button
          type="button"
          className={`btn ${prev.steps.withText ? "btn-primary" : ""}`}
          onClick={() => setListening(id, { ...prev, steps: { ...prev.steps, withText: !prev.steps.withText } })}
        >
          {prev.steps.withText ? "今天已开字幕看完" : "标记：开字幕看完"}
        </button>
        <button
          type="button"
          className={`btn ${prev.steps.blind1 ? "btn-primary" : ""}`}
          onClick={() => setListening(id, { ...prev, steps: { ...prev.steps, blind1: !prev.steps.blind1 } })}
        >
          {prev.steps.blind1 ? "已尝试关字幕" : "标记：尝试关字幕"}
        </button>
      </div>
    </PracticeFrame>
  );
}
