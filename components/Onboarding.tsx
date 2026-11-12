"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { dateISO } from "@/lib/calendar";
import { CORE_LOGIC, LEARNER } from "@/lib/content/phases";

export function Onboarding() {
  const { setStartDate } = useApp();
  const [date, setDate] = useState(dateISO());

  return (
    <div className="onboard">
      <p className="kicker">12 周听说激活</p>
      <h1>先定一个开始日</h1>
      <p className="lead">
        这份计划面向{LEARNER}
        核心逻辑是{CORE_LOGIC}
      </p>
      <p className="lead">
        进度、句子和录音都只存在这台设备上，不会上传。可以从今天开始，也可以选定一个即将到来的日期。
      </p>
      <label className="field">
        <span>开始日</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="button" className="btn btn-primary btn-block" onClick={() => date && setStartDate(date)}>
        从这一天开始
      </button>
      <p className="muted tiny center">
        开始前可以先看一看{" "}
        <Link href="/plan">计划总览</Link>、
        <Link href="/rules">四条铁律</Link>
        和 <Link href="/materials">推荐材料</Link>。
      </p>
    </div>
  );
}
