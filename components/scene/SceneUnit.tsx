"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Meaning } from "@/components/Meaning";
import { HumanPlay } from "@/components/HumanPlay";
import { Recorder } from "@/components/Recorder";
import { SpeakButton, SpeedToggle } from "@/components/SpeakButton";
import { Timer } from "@/components/Timer";
import { SceneRolePlay } from "@/components/scene/SceneRolePlay";
import { useApp } from "@/components/AppProvider";
import { voiceForSpeaker } from "@/lib/audio";
import { clipFile, dialogueFile } from "@/lib/audio-lookup";
import { dialogueWordList } from "@/lib/content/dialogues";
import {
  SCENE_STEP_LABEL,
  SCENE_STEPS,
  defaultListenRate,
  emphasizedSteps,
  roleplayCountdownSec,
  sceneFocusHint,
  type Scene,
  type SceneStepId,
} from "@/lib/content/scenes";
import type { ListeningProgress } from "@/lib/types";

const LISTEN_STEPS: { id: keyof ListeningProgress["steps"]; title: string; hint: string }[] = [
  { id: "blind1", title: "盲听第 1 遍", hint: "先不要看文本，也不要点「意思」。只抓大意：谁在说话，大致在说什么。" },
  { id: "blind2", title: "盲听第 2 遍", hint: "再听一遍，试着补上刚才漏掉的信息。仍然先不要看中文。" },
  { id: "withText", title: "对照文本逐句听", hint: "打开文本，逐句听清连读和弱读。这一步可以点「意思」。" },
  { id: "blind3", title: "脱稿盲听第 3 遍", hint: "收起文本和中文再听。刚才标过的词，这次应该更清楚。" },
  { id: "blind4", title: "脱稿盲听第 4 遍", hint: "再听一遍，直到每个词的声音都和意思对得上。" },
];

export function SceneUnit({ scene, review }: { scene: Scene; review?: boolean }) {
  const { status, state, setListening, setSceneStep, setSceneRole, setPhraseMark, toggleModule } = useApp();
  const phase = status.phase;
  const focus = emphasizedSteps(phase);
  const [rate, setRate] = useState(defaultListenRate(phase));
  const [openText, setOpenText] = useState(false);
  const [openVarZh, setOpenVarZh] = useState<Record<string, boolean>>({});
  const [openVarHint, setOpenVarHint] = useState<Record<string, boolean>>({});
  const progress = state.sceneProgress[scene.id] ?? { steps: {} };
  const listen: ListeningProgress = state.listening[scene.id] ?? { missed: [], steps: {} };
  const role = progress.role ?? "a";
  const fullSrc = dialogueFile(scene.id);
  const wordsByLine = useMemo(() => scene.lines.map((l) => dialogueWordList(l.text)), [scene]);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [scene.id]);

  function mark(step: SceneStepId, value = true) {
    setSceneStep(scene.id, step, value);
  }

  function patchListen(next: Partial<ListeningProgress>) {
    const merged: ListeningProgress = {
      missed: next.missed ?? listen.missed,
      steps: next.steps ?? listen.steps,
      gist: next.gist ?? listen.gist,
    };
    setListening(scene.id, merged);
    const done = LISTEN_STEPS.every((s) => merged.steps[s.id]);
    if (done) mark("listen", true);
  }

  function toggleWord(word: string) {
    const key = word.toLowerCase();
    const missed = listen.missed.includes(key)
      ? listen.missed.filter((w) => w !== key)
      : [...listen.missed, key];
    patchListen({ missed });
  }

  const showText = openText;

  return (
    <div className="scene-unit">
      <section className="scene-hero" id="card">
        <p className="scene-emoji" aria-hidden="true">{scene.emoji}</p>
        <p className="kicker">{scene.category}{review ? " · 复习" : ""} · 第 {phase} 阶段</p>
        <h1>{scene.titleZh}</h1>
        <p className="en muted">{scene.title}</p>
        <dl className="scene-meta">
          <div><dt>在哪里</dt><dd>{scene.whereZh}</dd></div>
          <div><dt>谁在场</dt><dd>{scene.whoZh}</dd></div>
          <div><dt>你想做成什么</dt><dd>{scene.goalZh}</dd></div>
        </dl>
        <p className="notice">{sceneFocusHint(phase)}</p>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <button type="button" className={`btn ${progress.steps.card ? "btn-primary" : "btn-accent"}`} onClick={() => mark("card", !progress.steps.card)}>
            {progress.steps.card ? "已看过场景卡" : "看完场景卡"}
          </button>
        </div>
      </section>

      <nav className="scene-steps" aria-label="场景步骤">
        {SCENE_STEPS.map((id) => (
          <a key={id} href={`#${id}`} className={focus.includes(id) ? "focus" : ""}>
            {SCENE_STEP_LABEL[id]}
            {progress.steps[id] ? " ✓" : ""}
          </a>
        ))}
      </nav>

      <section className="card" id="listen">
        <StepHead id="listen" focus={focus} done={!!progress.steps.listen} title="2. 先听完整对话" />
        <p className="muted tiny">一段原创的日常对话，两位说话人用不同的预录声音。按盲听 2 遍 → 对照文本 → 再盲听 2 遍。第 3 阶段建议先用正常语速，不到对照那一步不要打开文本。</p>
        <div className="btn-row" style={{ margin: "8px 0" }}>
          <SpeedToggle rate={rate} onChange={setRate} />
          <SpeakButton text="full" src={fullSrc} rate={rate} label="整段朗读" />
        </div>
        <label className="field">
          <span>听过前两遍后，用中文或英文随手记下大意</span>
          <textarea value={listen.gist ?? ""} onChange={(e) => patchListen({ gist: e.target.value })} placeholder="他们在谈什么？结果怎么样？" />
        </label>
        {LISTEN_STEPS.map((step, i) => {
          const on = !!listen.steps[step.id];
          return (
            <div key={step.id} className="scene-substep">
              <h3>{i + 1}. {step.title}</h3>
              <p className="muted tiny">{step.hint}</p>
              {step.id === "withText" ? (
                <div style={{ marginTop: 8 }}>
                  <button type="button" className={`btn ${showText ? "btn-primary" : "btn-accent"}`} onClick={() => setOpenText((v) => !v)}>
                    {showText ? "收起文本和意思" : "打开文本（可看意思）"}
                  </button>
                  {showText && (
                    <div style={{ marginTop: 10 }}>
                      <p className="muted tiny">这一段在说什么</p>
                      <Meaning zh={scene.gistZh} />
                      {scene.lines.map((line, li) => (
                        <div key={`${line.speaker}-${li}`} className="line">
                          <p className="speaker">{line.speaker}</p>
                          <p className="en">
                            {wordsByLine[li].map((w, wi) => {
                              const onW = listen.missed.includes(w.toLowerCase());
                              return (
                                <button key={`${w}-${wi}`} type="button" className={`word-chip ${onW ? "on" : ""}`} onClick={() => toggleWord(w)}>
                                  {w}
                                </button>
                              );
                            })}
                          </p>
                          <SpeakButton text={line.text} voice={voiceForSpeaker(line.speaker)} src={clipFile(line.text, voiceForSpeaker(line.speaker))} rate={rate} label="听这句" />
                          <Meaning zh={line.zh} />
                        </div>
                      ))}
                      {listen.missed.length > 0 && (
                        <p className="notice">认识但没听出来：{listen.missed.join(" · ")}。</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="btn-row" style={{ marginTop: 8 }}>
                  <SpeakButton text="full" src={fullSrc} rate={rate} label="盲听整段" />
                </div>
              )}
              <button type="button" className={`btn ${on ? "btn-primary" : "btn-accent"}`} style={{ marginTop: 8 }} onClick={() => patchListen({ steps: { ...listen.steps, [step.id]: !on } })}>
                {on ? "已完成这一步" : "标记完成"}
              </button>
            </div>
          );
        })}
        {showText ? (
          <details className="card" style={{ marginTop: 8 }}>
            <summary>显示全文</summary>
            <pre className="en" style={{ whiteSpace: "pre-wrap", marginTop: 8, fontFamily: "inherit" }}>
              {scene.lines.map((l) => `${l.speaker}: ${l.text}`).join("\n")}
            </pre>
          </details>
        ) : (
          <p className="notice">对照文本这一步点「打开文本」之后，才能看全文。盲听时先不要展开。</p>
        )}
      </section>

      <section className="card" id="sounds">
        <StepHead id="sounds" focus={focus} done={!!progress.steps.sounds} title="3. 场景里的声音" />
        <p className="muted tiny">这些音就出现在刚才的对话里。先听例句，再点开对应的对比训练和真人发音。</p>
        {scene.sounds.map((s) => (
          <div key={s.title} className="scene-sound">
            <h3>{s.titleZh}</h3>
            <p className="en muted tiny">{s.title}</p>
            <p>{s.note}</p>
            <p className="en" style={{ marginTop: 6 }}>{s.example}</p>
            <div className="btn-row" style={{ marginTop: 6 }}>
              <SpeakButton text={s.example} rate={Math.min(rate, 0.8)} label="听例句" />
              {s.words.map((w) => (
                <span key={w} style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                  <SpeakButton text={w} rate={0.7} label={w} />
                  <HumanPlay word={w} rate={0.7} />
                </span>
              ))}
              {s.contrastId && (
                <Link href={`/sounds#contrast-${s.contrastId}`} className="btn">打开对比训练</Link>
              )}
            </div>
          </div>
        ))}
        <button type="button" className={`btn ${progress.steps.sounds ? "btn-primary" : "btn-accent"}`} style={{ marginTop: 10 }} onClick={() => mark("sounds", !progress.steps.sounds)}>
          {progress.steps.sounds ? "已练过场景里的声音" : "练完了，记下"}
        </button>
      </section>

      <section className="card" id="phrases">
        <StepHead id="phrases" focus={focus} done={!!progress.steps.phrases} title="4. 场景短语 / 语块" />
        <p className="muted tiny">这些都是这段对话里会用到的说法。先听，再看什么时候用。完整资料库仍在「常用短语」和「语块」页。</p>
        <ul className="list-plain">
          {scene.phrases.map((p) => {
            const markId = p.phraseId ?? p.id;
            const m = state.phraseMarks[markId] ?? {};
            return (
              <li key={p.id} className="phrase-card">
                <p className="en">{p.text}</p>
                <SpeakButton text={p.text} rate={rate} label="听" />
                <Meaning zh={p.zh} />
                <p className="muted tiny">什么时候用：{p.note}</p>
                {p.chunkId && <p className="muted tiny"><Link href="/chunks">对应语块</Link></p>}
                <div className="btn-row" style={{ marginTop: 6 }}>
                  <button type="button" className={`btn ${m.heard ? "btn-primary" : ""}`} onClick={() => setPhraseMark(markId, { heard: !m.heard })}>{m.heard ? "已听懂" : "听懂了"}</button>
                  <button type="button" className={`btn ${m.spoken ? "btn-primary" : ""}`} onClick={() => setPhraseMark(markId, { spoken: !m.spoken })}>{m.spoken ? "已会说" : "会说了"}</button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="btn-row" style={{ marginTop: 8 }}>
          <Link href="/phrases" className="btn">常用短语库</Link>
          <Link href="/chunks" className="btn">语块库</Link>
          <button type="button" className={`btn ${progress.steps.phrases ? "btn-primary" : "btn-accent"}`} onClick={() => mark("phrases", !progress.steps.phrases)}>
            {progress.steps.phrases ? "已练过短语" : "练完了，记下"}
          </button>
        </div>
      </section>

      <section className="card" id="shadow">
        <StepHead id="shadow" focus={focus} done={!!progress.steps.shadow} title="5. 跟读" />
        <p className="muted tiny">一句一句模仿语调、重音和停顿。先听原句，再录音，然后回放对比。</p>
        <SceneShadow scene={scene} rate={rate} />
        <button type="button" className={`btn ${progress.steps.shadow ? "btn-primary" : "btn-accent"}`} style={{ marginTop: 10 }} onClick={() => mark("shadow", !progress.steps.shadow)}>
          {progress.steps.shadow ? "已跟读" : "跟读完了，记下"}
        </button>
      </section>

      <section className="card" id="roleplay">
        <StepHead id="roleplay" focus={focus} done={!!progress.steps.roleplay} title="6. 角色扮演" />
        <p className="muted tiny">你演其中一个角色。对方的句子由预录音播放，轮到你时会有 {roleplayCountdownSec(phase)} 秒倒计时，然后开始录音。第 3 阶段只有 3 秒，尽量立刻开口。需要时再看提示。</p>
        <SceneRolePlay
          scene={scene}
          role={role}
          onRoleChange={(r) => setSceneRole(scene.id, r)}
          countdownSec={roleplayCountdownSec(phase)}
          rate={phase === 1 ? Math.min(rate, 0.9) : 1}
          onComplete={() => mark("roleplay", true)}
        />
        <button type="button" className={`btn ${progress.steps.roleplay ? "btn-primary" : "btn-accent"}`} style={{ marginTop: 10 }} onClick={() => mark("roleplay", !progress.steps.roleplay)}>
          {progress.steps.roleplay ? "已完成角色扮演" : "演完了，记下"}
        </button>
      </section>

      <section className="card" id="vary">
        <StepHead id="vary" focus={focus} done={!!progress.steps.vary} title="7. 变一变" />
        <p className="muted tiny">同样的场景，情况变了。先听对方新的一句，再开口应对。第 3 阶段用正常语速，先不要看字幕。</p>
        {scene.variations.map((v) => {
          const hide = phase === 3 && !openVarZh[v.id];
          const cueRate = v.faster ? (phase === 3 ? 1.15 : 1.05) : (phase === 1 ? 0.85 : 1);
          return (
            <div key={v.id} className="scene-vary">
              <h3>{v.titleZh}</h3>
              <p>{v.setupZh}</p>
              <p className="muted tiny">{v.cueSpeaker} 会先说一句。</p>
              <div className="btn-row" style={{ marginTop: 6 }}>
                <SpeakButton text={v.cue} voice={voiceForSpeaker(v.cueSpeaker)} src={clipFile(v.cue, voiceForSpeaker(v.cueSpeaker))} rate={cueRate} label={v.faster ? "听（更快）" : "听对方说"} />
                {hide ? (
                  <button type="button" className="btn" onClick={() => setOpenVarZh((m) => ({ ...m, [v.id]: true }))}>显示字幕和意思</button>
                ) : (
                  <div>
                    <p className="en">{v.cue}</p>
                    <Meaning zh={v.cueZh} />
                  </div>
                )}
              </div>
              {openVarHint[v.id] ? (
                <ul className="lead" style={{ paddingLeft: "1.1rem", marginTop: 8 }}>
                  {v.hints.map((h) => <li key={h} className="en">{h}</li>)}
                </ul>
              ) : (
                <button type="button" className="btn" style={{ marginTop: 8 }} onClick={() => setOpenVarHint((m) => ({ ...m, [v.id]: true }))}>需要提示说法</button>
              )}
              <Recorder storageKey={`scene:${scene.id}:vary:${v.id}`} maxSeconds={30} label="录下你的回应" />
            </div>
          );
        })}
        <button type="button" className={`btn ${progress.steps.vary ? "btn-primary" : "btn-accent"}`} style={{ marginTop: 10 }} onClick={() => mark("vary", !progress.steps.vary)}>
          {progress.steps.vary ? "已练过变一变" : "练完了，记下"}
        </button>
      </section>

      <section className="card" id="micro">
        <StepHead id="micro" focus={focus} done={!!progress.steps.micro} title="8. 微输出" />
        <p>{scene.microPromptZh}</p>
        <p className="en muted tiny">{scene.microPromptEn}</p>
        <Timer id={`scene:${scene.id}:micro-timer`} seconds={60} title="1 分钟" />
        <Recorder storageKey={`scene:${scene.id}:micro`} maxSeconds={90} label="把这件事讲出来" />
        <button type="button" className={`btn ${progress.steps.micro ? "btn-primary" : "btn-accent"}`} style={{ marginTop: 10 }} onClick={() => mark("micro", !progress.steps.micro)}>
          {progress.steps.micro ? "已完成微输出" : "说完了，记下"}
        </button>
      </section>

      {status.started && !status.notYet && (
        <section className="card">
          <h2>对应今天的三个模块</h2>
          <p className="muted tiny">场景练完后，可以把今天的模块勾上。计时仍可在各模块页里用。</p>
          {status.modules.map((m) => {
            const done = !!state.days[status.today]?.modules[m.id];
            return (
              <div key={m.id} className="btn-row" style={{ marginTop: 8, justifyContent: "space-between" }}>
                <span>{m.title} · {m.minutes} 分钟</span>
                <button type="button" className={`btn ${done ? "btn-primary" : ""}`} onClick={() => toggleModule(status.today, m.id, !done)}>
                  {done ? "已完成" : "勾选完成"}
                </button>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

function StepHead({ id, title, focus, done }: { id: SceneStepId; title: string; focus: SceneStepId[]; done: boolean }) {
  return (
    <h2>
      {title}
      {focus.includes(id) ? <span className="badge">本阶段重点</span> : null}
      {done ? <span className="muted tiny"> 已记下</span> : null}
    </h2>
  );
}

function SceneShadow({ scene, rate }: { scene: Scene; rate: number }) {
  const [index, setIndex] = useState(0);
  const line = scene.lines[index];
  return (
    <div>
      <p className="muted tiny">第 {index + 1} / {scene.lines.length} 句 · {line.speaker}</p>
      <p className="en">{line.text}</p>
      <Meaning zh={line.zh} />
      <div className="btn-row" style={{ marginTop: 8 }}>
        <SpeakButton text={line.text} voice={voiceForSpeaker(line.speaker)} src={clipFile(line.text, voiceForSpeaker(line.speaker))} rate={rate} label="听原句" />
        <button type="button" className="btn" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>上一句</button>
        <button type="button" className="btn" disabled={index + 1 >= scene.lines.length} onClick={() => setIndex((i) => i + 1)}>下一句</button>
      </div>
      <Recorder storageKey={`scene:${scene.id}:shadow:${index}`} maxSeconds={20} label="跟读这一句" />
    </div>
  );
}
