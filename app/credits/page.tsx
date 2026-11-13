import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { uniqueCredits } from "@/lib/human-audio";

export default function CreditsPage() {
  const clips = uniqueCredits();
  const byLicense = new Map<string, number>();
  for (const c of clips) byLicense.set(c.license, (byLicense.get(c.license) ?? 0) + 1);

  return (
    <article>
      <PageHeader
        kicker="来源说明"
        title="真人发音致谢"
        desc="单词旁的「真人发音」来自维基共享资源（Wikimedia Commons）和维基词典上的美国英语录音。文件已转换为 MP3，仅用于本站的听说练习。"
      />
      <p className="lead">
        目前收录 {clips.length} 个词的真人录音。多数文件采用 Creative Commons 许可，需要保留作者和许可信息。详细文件页可在下方打开。
      </p>
      <p className="muted tiny">
        { [...byLicense.entries()].map(([lic, n]) => `${lic}：${n} 个`).join(" · ") }
      </p>
      <p className="muted tiny" style={{ marginTop: 8 }}>
        没有找到共享录音的词，会改为打开已经核对过的词典页（多为
        <a href="https://dictionary.cambridge.org/" target="_blank" rel="noreferrer">剑桥词典</a>
        ，个别词用牛津或 Dictionary.com），方便听该词的词典发音。
      </p>
      <ul className="credit-list">
        {clips.map((c) => (
          <li key={`${c.word}-${c.sourceFile}`}>
            <p className="en"><strong>{c.word}</strong></p>
            <p className="tiny">
              {c.author ? (
                c.authorUrl ? (
                  <a href={c.authorUrl} target="_blank" rel="noreferrer">{c.author}</a>
                ) : (
                  c.author
                )
              ) : (
                "未知作者"
              )}
              {" · "}
              {c.licenseUrl ? (
                <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a>
              ) : (
                c.license
              )}
              {" · "}
              <a href={c.page} target="_blank" rel="noreferrer">Commons 文件页</a>
            </p>
          </li>
        ))}
      </ul>
      <p className="muted tiny" style={{ marginTop: 12 }}>
        回到 <Link href="/sounds">发音练习</Link> 或 <Link href="/materials">推荐材料</Link>。
      </p>
    </article>
  );
}
