"use client";

import { useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";
import { useApp } from "@/components/AppProvider";
import { CONTRAST_ORDER, contrastGuide, isContrastWeak } from "@/lib/content/contrasts";
import { SOUND_GROUPS, type MinimalPair, type SoundGroup } from "@/lib/content/sounds";
import { carrierText, pairSources } from "@/lib/human-audio";
import { playSequence, stopAllAudio } from "@/lib/player";

function pickPair(group: SoundGroup): MinimalPair {
  const pairs = group.pairs ?? [];
  return pairs[Math.floor(Math.random() * pairs.length)] ?? pairs[0];
}

export function ContrastScoreboard() {
  const { state } = useApp();
  const rows = CONTRAST_ORDER.map((id) => {
    const g = SOUND_GROUPS[id];
    const stats = state.contrastStats[id];
    const guide = contrastGuide(id);
    const weak = isContrastWeak(stats);
    const acc = stats && stats.total ? Math.round((stats.correct / stats.total) * 100) : null;
    return { id, title: g?.title ?? id, stats, weak, acc, difficulty: guide?.difficulty ?? 3 };
  });
  const weakRows = rows.filter((r) => r.weak);
  const untried = rows.filter((r) => !r.stats || r.stats.total === 0);
  return (
    <section className="card">
      <h2>听辨进度</h2>
      <p className="muted tiny">
        从差别更明显的对比开始，慢慢做到更难的。正确率还不稳定的组会标出来，建议再练一轮。
      </p>
      {weakRows.length > 0 && (
        <p className="notice" style={{ marginTop: 8 }}>
          目前还比较弱：{weakRows.map((r) => r.title.replace(/^[^：:]*[：:]/, "").trim() || r.title).join("、")}
        </p>
      )}
      {untried.length === rows.length && (
        <p className="muted tiny" style={{ marginTop: 8 }}>
          还没有听辨记录。可以先从下面最前面几组开始。
        </p>
      )}
      <ul className="contrast-score">
        {rows.map((r) => (
          <li key={r.id} className={r.weak ? "weak" : r.acc != null && r.acc >= 75 ? "ok" : ""}>
            <a href={`#contrast-${r.id}`}>{r.title}</a>
            <span className="muted tiny">
              {r.acc == null ? "还没练" : `${r.stats!.correct}/${r.stats!.total}（${r.acc}%）`}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContrastTrainer({ group, rate }: { group: SoundGroup; rate: number }) {
  const { recordContrast, state } = useApp();
  const guide = contrastGuide(group.id);
  const stats = state.contrastStats[group.id];
  const [stage, setStage] = useState<"listen" | "same" | "which" | "abx" | "done">("listen");
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [item, setItem] = useState<DrillItem | null>(null);

  const totalForStage = stage === "same" ? 6 : stage === "which" || stage === "abx" ? 8 : 0;

  function sources(pair: MinimalPair) {
    return pairSources(pair.left, pair.right);
  }

  async function playPair(pair: MinimalPair, slow = false) {
    const s = sources(pair);
    if (!s.left || !s.right) return;
    const r = slow ? Math.min(rate, 0.7) : rate;
    try {
      await playSequence([
        { src: s.left, rate: r, gapMs: slow ? 700 : 450 },
        { src: s.right, rate: r, gapMs: 0 },
      ]);
    } catch {
      /* ignore */
    }
  }

  async function playContrast(pair: MinimalPair) {
    const s = sources(pair);
    if (!s.left || !s.right) return;
    try {
      await playSequence([
        { src: s.left, rate: 0.7, gapMs: 700 },
        { src: s.right, rate: 0.7, gapMs: 700 },
        { src: s.left, rate: 0.7, gapMs: 700 },
        { src: s.right, rate: 0.7, gapMs: 0 },
      ]);
    } catch {
      /* ignore */
    }
  }

  function startStage(next: "same" | "which" | "abx", resetScore = false) {
    stopAllAudio();
    setStage(next);
    setQi(0);
    if (resetScore) setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setLocked(false);
    const it = makeItem(next, group);
    setItem(it);
    void replayItem(it);
  }

  async function replayItem(it: DrillItem, afterWrong = false) {
    try {
      if (it.kind === "same") {
        if (!it.srcA || !it.srcB) return;
        await playSequence([
          { src: it.srcA, rate, gapMs: 500 },
          { src: it.srcB, rate, gapMs: afterWrong ? 400 : 0 },
        ]);
        if (afterWrong && it.pair) await playPair(it.pair, true);
      } else if (it.kind === "which") {
        if (it.srcX) await playSequence([{ src: it.srcX, rate, gapMs: afterWrong ? 400 : 0 }]);
        if (afterWrong && it.pair) await playPair(it.pair, true);
      } else if (it.kind === "abx") {
        if (!it.srcA || !it.srcB || !it.srcX) return;
        await playSequence([
          { src: it.srcA, rate, gapMs: 450 },
          { src: it.srcB, rate, gapMs: 600 },
          { src: it.srcX, rate, gapMs: afterWrong ? 400 : 0 },
        ]);
        if (afterWrong && it.pair) await playPair(it.pair, true);
      }
    } catch {
      /* ignore */
    }
  }

  async function answer(choice: string) {
    if (!item || locked) return;
    setLocked(true);
    const ok = choice === item.answer;
    recordContrast(group.id, ok);
    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
    setFeedback(ok ? "对了。" : `还不是。${item.explain}`);
    if (!ok) await replayItem(item, true);
    const nextI = qi + 1;
    window.setTimeout(() => {
      setFeedback(null);
      setLocked(false);
      if (nextI >= totalForStage) {
        if (stage === "same") startStage("which");
        else if (stage === "which") startStage("abx");
        else setStage("done");
        return;
      }
      setQi(nextI);
      const nxt = makeItem(stage === "done" ? "same" : stage, group);
      setItem(nxt);
      void replayItem(nxt);
    }, ok ? 700 : 1600);
  }

  const firstPair = group.pairs?.[0];
  const src0 = firstPair ? sources(firstPair) : { left: undefined, right: undefined, human: false };

  return (
    <div className="contrast-box" id={`contrast-${group.id}`}>
      {guide && (
        <div className="contrast-guide">
          <h3>怎么听出区别</h3>
          <p><strong>口型、舌位：</strong>{guide.mouth}</p>
          <p><strong>和中文比：</strong>{guide.vsChinese}</p>
          <p><strong>常见失误：</strong>{guide.mistake}</p>
        </div>
      )}
      {firstPair && (
        <div className="btn-row" style={{ marginTop: 8 }}>
          <SpeakButton text={firstPair.left} src={src0.left} rate={0.7} label={`慢听 ${firstPair.left}`} />
          <SpeakButton text={firstPair.right} src={src0.right} rate={0.7} label={`慢听 ${firstPair.right}`} />
          <button type="button" className="btn btn-accent" onClick={() => playContrast(firstPair)}>
            慢速对比
          </button>
          <button type="button" className="btn" onClick={() => playPair(firstPair, false)}>
            连着听一遍
          </button>
        </div>
      )}
      <p className="muted tiny" style={{ marginTop: 6 }}>
        {src0.human ? "这一组两个词都有真人录音，对比时用同一批真人声音。" : "这一组对比用同一条预录音，避免换声音干扰判断。有真人录音的词仍可单独点「真人发音」。"}
      </p>
      {firstPair && (
        <div style={{ marginTop: 8 }}>
          <p className="muted tiny">放进句子里再听一次</p>
          <div className="line">
            <p className="en">{carrierText(firstPair.left)}</p>
            <SpeakButton text={carrierText(firstPair.left)} rate={rate} label="听句子" />
          </div>
          <div className="line">
            <p className="en">{carrierText(firstPair.right)}</p>
            <SpeakButton text={carrierText(firstPair.right)} rate={rate} label="听句子" />
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <h3>听辨训练</h3>
        <p className="muted tiny">先听同一对 → 判断相同还是不同 → 再判断是哪一个。答错会自动再播一遍正确的对比。</p>
        {stats && stats.total > 0 && (
          <p className="muted tiny">这组累计 {stats.correct}/{stats.total}{isContrastWeak(stats) ? " · 还需要多练" : " · 已经比较稳"}</p>
        )}
        {stage === "listen" && (
          <button type="button" className="btn btn-primary" onClick={() => startStage("same", true)}>
            开始听辨
          </button>
        )}
        {stage !== "listen" && stage !== "done" && item && (
          <div>
            <p className="muted tiny">
              {stage === "same" ? "相同还是不同" : stage === "which" ? "刚才是哪一个" : "第三个音和哪一个一样"}
              · 第 {qi + 1} / {totalForStage} 题
            </p>
            <div className="btn-row">
              <button type="button" className="btn btn-accent" onClick={() => item && replayItem(item)} disabled={locked}>
                再听一遍
              </button>
            </div>
            {stage === "same" && (
              <div className="btn-row" style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-primary" disabled={locked} onClick={() => answer("same")}>相同</button>
                <button type="button" className="btn btn-primary" disabled={locked} onClick={() => answer("diff")}>不同</button>
              </div>
            )}
            {stage === "which" && item.pair && (
              <div className="btn-row" style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-primary" disabled={locked} onClick={() => answer("left")}>{item.pair.left}</button>
                <button type="button" className="btn btn-primary" disabled={locked} onClick={() => answer("right")}>{item.pair.right}</button>
              </div>
            )}
            {stage === "abx" && (
              <div className="btn-row" style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-primary" disabled={locked} onClick={() => answer("A")}>和第一个一样</button>
                <button type="button" className="btn btn-primary" disabled={locked} onClick={() => answer("B")}>和第二个一样</button>
              </div>
            )}
            {feedback && <p className="notice" style={{ marginTop: 8 }}>{feedback}</p>}
            <p className="muted tiny" style={{ marginTop: 6 }}>本轮 {score.correct}/{score.total}</p>
          </div>
        )}
        {stage === "done" && (
          <div>
            <p className="lead">这组练完了。本轮 {score.correct}/{score.total || 22}。</p>
            <button type="button" className="btn btn-primary" onClick={() => startStage("same", true)}>
              再练一轮
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type DrillItem = {
  kind: "same" | "which" | "abx";
  pair: MinimalPair;
  srcA?: string;
  srcB?: string;
  srcX?: string;
  answer: string;
  explain: string;
};

function makeItem(stage: string, group: SoundGroup): DrillItem {
  const pair = pickPair(group);
  const s = pairSources(pair.left, pair.right);
  if (stage === "same") {
    const same = Math.random() < 0.5;
    const leftFirst = Math.random() < 0.5;
    const a = leftFirst ? s.left : s.right;
    const b = same ? a : leftFirst ? s.right : s.left;
    return {
      kind: "same",
      pair,
      srcA: a,
      srcB: b,
      answer: same ? "same" : "diff",
      explain: same ? "这两个是同一个词。" : `这是 ${pair.left} 和 ${pair.right}。`,
    };
  }
  if (stage === "which") {
    const left = Math.random() < 0.5;
    return {
      kind: "which",
      pair,
      srcX: left ? s.left : s.right,
      answer: left ? "left" : "right",
      explain: `刚才是 ${left ? pair.left : pair.right}。`,
    };
  }
  const xIsA = Math.random() < 0.5;
  const leftFirst = Math.random() < 0.5;
  const srcA = leftFirst ? s.left : s.right;
  const srcB = leftFirst ? s.right : s.left;
  return {
    kind: "abx",
    pair,
    srcA,
    srcB,
    srcX: xIsA ? srcA : srcB,
    answer: xIsA ? "A" : "B",
    explain: `第三个是 ${xIsA ? (leftFirst ? pair.left : pair.right) : (leftFirst ? pair.right : pair.left)}，和${xIsA ? "第一" : "第二"}个一样。`,
  };
}

export function NextContrastHint() {
  const { state } = useApp();
  const next = CONTRAST_ORDER.find((id) => {
    const st = state.contrastStats[id];
    return !st || st.total < 6 || isContrastWeak(st);
  });
  if (!next) return null;
  const g = SOUND_GROUPS[next];
  return (
    <p className="muted tiny">
      建议接下来练：<a href={`#contrast-${next}`}>{g?.title ?? next}</a>
    </p>
  );
}
