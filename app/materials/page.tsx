import { PageHeader } from "@/components/PageHeader";
import { MATERIALS, TTS_DISCLAIMER } from "@/lib/content/materials";

export default function MaterialsPage() {
  return (
    <article>
      <PageHeader
        kicker="原声比合成语音重要"
        title="推荐材料"
        desc="站内练习用浏览器语音合成，只为让你随时能走完流程。真正的连读、气口和情绪，请回到这些原声材料。"
      />
      <p className="notice">{TTS_DISCLAIMER}</p>
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
