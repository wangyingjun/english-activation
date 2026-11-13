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
