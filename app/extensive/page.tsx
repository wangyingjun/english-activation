"use client";

import { SceneTodayBanner } from "@/components/scene/SceneBanner";

import Link from "next/link";
import { PracticeFrame } from "@/components/PracticeFrame";
import { useApp } from "@/components/AppProvider";
import { MATERIALS } from "@/lib/content/materials";

const PODCASTS = MATERIALS.filter((m) =>
  ["All Ears English", "YouTube 日常生活 Vlog", "ESL Pod", "BBC 6 Minute English"].includes(m.name),
);

export default function ExtensivePage() {
  const { status, state, setListening } = useApp();
  const id = `extensive:${status.today}`;
  const note = state.listening[id]?.gist ?? "";

  return (
    <PracticeFrame
      moduleId="extensive"
      phase={2}
      desc="利用通勤或做家务时间听熟悉主题的英语。不求听懂 100%，只要能抓住关键词，习惯正常语速的语音流就好。"
    >
      <SceneTodayBanner moduleId="extensive" />
      <section className="card">
        <h2>今天可以这样听</h2>
        <ol className="lead" style={{ paddingLeft: "1.1rem" }}>
          <li>选一段你已经大致熟悉主题的内容，约 30 分钟，不必从头听到尾盯着屏幕。</li>
          <li>听到认识的词或语块就在心里点一下头，听不清的地方让它过去。</li>
          <li>听完后只写 3 个关键词或短语，不要变成听写练习。</li>
        </ol>
      </section>
      <section className="card">
        <h2>推荐材料</h2>
        <ul className="list-plain">
          {PODCASTS.map((m) => (
            <li key={m.name}>
              {m.href ? (
                <a href={m.href} target="_blank" rel="noreferrer">
                  {m.name}
                </a>
              ) : (
                m.name
              )}
              <p className="muted tiny">{m.note}</p>
            </li>
          ))}
        </ul>
        <p className="muted tiny">
          完整列表在 <Link href="/materials">材料页</Link>。
        </p>
      </section>
      <label className="field">
        <span>听完记下 3 个抓住的关键词或短语（英文即可）</span>
        <textarea
          value={note}
          onChange={(e) => setListening(id, { missed: [], steps: {}, gist: e.target.value })}
          placeholder="e.g. catch up, on the way, I feel like…"
        />
      </label>
    </PracticeFrame>
  );
}
