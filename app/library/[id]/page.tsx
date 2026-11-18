"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import { CheckButton } from "@/components/CheckButton";
import { LibraryPlayer } from "@/components/library/Player";
import { KeywordList } from "@/components/library/KeywordList";
import { LIBRARY_ITEMS, formatTime, libraryItem } from "@/lib/content/library";

export default function LibraryItemPage() {
  const params = useParams<{ id: string }>();
  const { state, setLibrary } = useApp();
  const item = libraryItem(params.id);

  if (!item) {
    return (
      <article>
        <h1>没有找到这段素材</h1>
        <Link href="/library" className="btn">回到听力素材</Link>
      </article>
    );
  }
  const prog = state.library?.[item.id] ?? {};
  const idx = LIBRARY_ITEMS.findIndex((i) => i.id === item.id);
  const next = LIBRARY_ITEMS[idx + 1];

  return (
    <article className="lib-page">
      <header className="page-header">
        <p className="kicker">
          <Link href="/library">听力素材</Link> · {item.level} · {item.topic} · {formatTime(item.duration)}
        </p>
        <h1 className="en lib-title">{item.title}</h1>
        <p className="lead" style={{ marginBottom: 4 }}>{item.titleZh}</p>
        <p className="muted tiny">{item.summaryZh}</p>
      </header>

      <div className="card lib-howto">
        <p className="tiny muted">
          建议：先「盲听」一遍抓大意 → 切到「英文」，听不懂的句子点一下反复听或开「单句循环」→ 还不懂再点「译」看中文 → 开「逐句跟读」一句句录音。
          句子时间是机器对齐的，个别句子可能早晚零点几秒。
        </p>
      </div>

      <LibraryPlayer item={item} />

      <section className="card">
        <h2>我的进度</h2>
        <div className="btn-row">
          <CheckButton checked={!!prog.heard} onChange={(v) => setLibrary(item.id, { heard: v })}>
            听懂了
          </CheckButton>
          <CheckButton checked={!!prog.shadowed} onChange={(v) => setLibrary(item.id, { shadowed: v })}>
            会跟读
          </CheckButton>
        </div>
        {prog.plays ? <p className="muted tiny" style={{ marginTop: 6 }}>已经打开播放 {prog.plays} 次。</p> : null}
      </section>

      {item.keywords.length > 0 && (
        <section className="card">
          <h2>关键词</h2>
          <KeywordList keywords={item.keywords} />
        </section>
      )}

      <section className="card lib-source">
        <h2>来源与许可</h2>
        <p className="tiny">
          {item.source} · {item.series} · {item.date}
          <br />
          {item.credit}
          <br />
          {item.license}。原文：<a href={item.url} target="_blank" rel="noreferrer">voanews.com 原页面</a>（音频已存在本站，不用跳转也能听）。中文翻译由本站编写。
        </p>
      </section>

      <div className="btn-row" style={{ marginBottom: 16 }}>
        <Link href="/library" className="btn">全部素材</Link>
        {next && (
          <Link href={`/library/${next.id}`} className="btn btn-accent">
            下一段：{next.titleZh}
          </Link>
        )}
      </div>
    </article>
  );
}
