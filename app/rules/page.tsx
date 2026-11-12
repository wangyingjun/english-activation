import { PageHeader } from "@/components/PageHeader";
import { IRON_RULES } from "@/lib/content/rules";
import { MeaningHelp } from "@/components/Meaning";
import Link from "next/link";

export default function RulesPage() {
  return (
    <article>
      <PageHeader
        kicker="决定 3 个月成败"
        title="四条铁律"
        desc="这四条比任何材料和工具都重要。计划可以拆开做，铁律不能打折。"
      />
      <MeaningHelp />
      {IRON_RULES.map((rule) => (
        <section key={rule.id} className="card">
          <p className="kicker">铁律 {rule.id}</p>
          <h2>{rule.title}</h2>
          <p className="lead">{rule.body}</p>
          {rule.id === 1 && (
            <p className="muted tiny" style={{ marginTop: 8 }}>
              不懂意思时：先听 2 遍猜 → 看中文 → 再听一遍把声音和意思对上 → 跟读。中文只是对照，不要拿来当单词表背。
            </p>
          )}
          {rule.id === 3 && (
            <Link href="/micro" className="btn btn-accent">
              去做今天的微输出
            </Link>
          )}
          {rule.id === 4 && (
            <Link href="/compare" className="btn btn-accent">
              打开对照录音
            </Link>
          )}
        </section>
      ))}
    </article>
  );
}
