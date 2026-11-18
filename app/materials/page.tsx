import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MATERIALS, TTS_DISCLAIMER } from "@/lib/content/materials";

export default function MaterialsPage() {
  return (
    <article>
      <PageHeader
        kicker="原声比合成语音重要"
        title="推荐材料"
        desc="内置练习已预录神经网络语音。单词旁的「真人发音」来自维基共享的真人录音，致谢见「真人发音致谢」页。下面这些原声材料仍然值得经常回去听。"
      />
      <p className="notice">{TTS_DISCLAIMER}</p>
      <section className="card">
        <p className="kicker">站内原声 · 原文 + 中文翻译</p>
        <h2>听力素材库</h2>
        <p className="lead">美国之音慢速英语（VOA Learning English）原声，分入门、初级、中级。音频就在本站播放，每句都有英文原文和中文翻译，支持单句循环、A-B 循环、变速和逐句跟读录音。</p>
        <Link href="/library" className="btn btn-accent">打开听力素材</Link>
      </section>
      <p className="muted tiny" style={{ marginBottom: 12 }}>
        <Link href="/credits">查看真人发音的作者和许可</Link>
      </p>
      {MATERIALS.map((m) => (
        <section key={m.name} className="card">
          <p className="kicker">
            {m.phase} · {m.kind}
          </p>
          <h2>{m.name}</h2>
          <p className="lead">{m.note}</p>
          {m.href && (
            <a className="btn btn-accent" href={m.href} target="_blank" rel="noreferrer">
              打开
            </a>
          )}
        </section>
      ))}
    </article>
  );
}
