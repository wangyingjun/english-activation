"use client";

import { CheckButton } from "@/components/CheckButton";
import { PageHeader } from "@/components/PageHeader";
import { Recorder } from "@/components/Recorder";
import { Timer } from "@/components/Timer";
import { useApp } from "@/components/AppProvider";
import { COMPARE_DAYS, isoForDay, isCompareDay } from "@/lib/calendar";

export default function ComparePage() {
  const { status, state, setComparePrompt, toggleCompare } = useApp();
  const start = state.startDate;
  const due = isCompareDay(status.day) && !status.notYet && !status.ended;
  const todayChecked = !!state.days[status.today]?.compare;

  return (
    <article>
      <PageHeader
        kicker="铁律 4"
        title="双周对照录音"
        desc="在第 1、14、28、42、56、70、84 天，用同一个题目录 1 分钟。听到自己语速提升、卡顿减少，是维持 3 个月的最佳正反馈。题目一旦选定，尽量不要改。"
      />
      {due && (
        <p className="notice warn">今天是第 {status.day} 天，正好是对照日。请用下面的同一题目录一分钟。</p>
      )}
      <label className="field">
        <span>固定题目（全程使用同一题）</span>
        <textarea
          value={state.comparePrompt}
          onChange={(e) => setComparePrompt(e.target.value)}
        />
      </label>
      {due && (
        <>
          <Timer id={`${status.today}:compare`} seconds={60} title="1 分钟" />
          <div className="card">
            <CheckButton checked={todayChecked} onChange={(v) => toggleCompare(status.today, v)}>
              {todayChecked ? "今天的对照录音已完成" : "勾选：今天已录完"}
            </CheckButton>
          </div>
        </>
      )}

      <h2>七次录音并排回放</h2>
      <p className="muted tiny" style={{ marginBottom: 8 }}>
        建议按时间顺序连续听一遍，只关注流利度和停顿，不要评判口音是否「标准」。
      </p>
      {COMPARE_DAYS.map((day) => {
        const iso = start ? isoForDay(start, day) : null;
        const done = iso ? !!state.days[iso]?.compare : false;
        return (
          <section key={day} className="card">
            <p className="kicker">
              第 {day} 天{iso ? ` · ${iso}` : ""}
              {status.day === day ? <span className="badge">今天</span> : null}
              {done ? <span className="badge">已勾选</span> : null}
            </p>
            <p className="en muted tiny">{state.comparePrompt}</p>
            <Recorder storageKey={`compare:${day}`} maxSeconds={90} label="1 分钟对照录音" />
          </section>
        );
      })}
    </article>
  );
}
