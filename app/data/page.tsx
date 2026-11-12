"use client";

import { useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useApp } from "@/components/AppProvider";
import { dateISO, formatZhDate } from "@/lib/calendar";
import type { BackupPayload } from "@/lib/storage";

export default function DataPage() {
  const { state, setStartDate, exportBackup, importBackup, resetAll } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pendingDate, setPendingDate] = useState(state.startDate ?? dateISO());

  async function onExport() {
    try {
      const payload = await exportBackup();
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `听说激活-备份-${dateISO()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMsg("备份已下载。文件里包含进度、句子和录音（录音会比较占空间）。");
    } catch {
      setMsg("导出失败。如果录音很多，可以稍后再试一次。");
    }
  }

  async function onImport(file: File) {
    try {
      const payload = JSON.parse(await file.text()) as BackupPayload;
      await importBackup(payload);
      setPendingDate(payload.state.startDate ?? dateISO());
      setMsg("备份已恢复到这台设备。");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "无法读取这份备份。");
    }
  }

  async function onReset() {
    if (!window.confirm("确定清空这台设备上的全部进度和录音？此操作不能撤销，除非你已先导出备份。")) return;
    await resetAll();
    setMsg("已清空。你可以重新选择开始日。");
  }

  return (
    <article>
      <PageHeader
        kicker="只存在这台设备"
        title="数据与设置"
        desc="没有账号，也没有云同步。换手机或清理浏览器数据前，请先导出备份。"
      />

      <section className="card">
        <h2>外观</h2>
        <ThemeToggle />
      </section>

      <section className="card">
        <h2>开始日</h2>
        <p className="muted tiny">
          当前开始日：{state.startDate ? formatZhDate(state.startDate) : "还没有设置"}。改日期会移动「第几天」的计算，已勾选的记录仍按日历日期保留。
        </p>
        <label className="field">
          <span>开始日</span>
          <input type="date" value={pendingDate} onChange={(e) => setPendingDate(e.target.value)} />
        </label>
        <button type="button" className="btn btn-primary" onClick={() => pendingDate && setStartDate(pendingDate)}>
          保存开始日
        </button>
      </section>

      <section className="card">
        <h2>备份</h2>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={onExport}>
            导出 JSON
          </button>
          <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
            导入备份
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onImport(file);
              e.target.value = "";
            }}
          />
        </div>
      </section>

      <section className="card">
        <h2>重置</h2>
        <p className="muted tiny">清除本地进度、语块造句、错题本和所有录音。</p>
        <button type="button" className="btn btn-danger" onClick={() => void onReset()}>
          清空全部数据
        </button>
      </section>
      {msg && <p className="notice">{msg}</p>}
    </article>
  );
}
