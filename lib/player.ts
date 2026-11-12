"use client";

import { loadVoices, stopSpeaking, ttsSupported } from "@/lib/tts";

let currentAudio: HTMLAudioElement | null = null;
let playSeq = 0;

export function stopAllAudio() {
  playSeq += 1;
  if (currentAudio) {
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.pause();
    currentAudio.removeAttribute("src");
    currentAudio.load();
    currentAudio.remove();
    currentAudio = null;
  }
  stopSpeaking();
}

function applyRate(el: HTMLAudioElement, rate: number) {
  const r = rate > 0 ? rate : 1;
  el.defaultPlaybackRate = r;
  el.playbackRate = r;
  if ("preservesPitch" in el) el.preservesPitch = true;
  const anyEl = el as HTMLAudioElement & { mozPreservesPitch?: boolean; webkitPreservesPitch?: boolean };
  if ("mozPreservesPitch" in anyEl) anyEl.mozPreservesPitch = true;
  if ("webkitPreservesPitch" in anyEl) anyEl.webkitPreservesPitch = true;
}

export function playClip(src: string, rate = 1): Promise<void> {
  stopAllAudio();
  const seq = playSeq;
  const el = new Audio(src);
  el.preload = "auto";
  el.setAttribute("data-ea-player", "true");
  el.setAttribute("playsinline", "true");
  applyRate(el, rate);
  document.body.appendChild(el);
  currentAudio = el;
  return new Promise((resolve, reject) => {
    const done = () => {
      if (playSeq !== seq) {
        resolve();
        return;
      }
      if (currentAudio === el) currentAudio = null;
      resolve();
    };
    el.addEventListener("ended", done, { once: true });
    el.addEventListener(
      "error",
      () => {
        if (currentAudio === el) currentAudio = null;
        reject(new Error("音频播放失败"));
      },
      { once: true },
    );
    el.addEventListener(
      "loadedmetadata",
      () => {
        applyRate(el, rate);
      },
      { once: true },
    );
    const start = el.play();
    if (start && typeof start.then === "function") {
      start.catch((err: unknown) => {
        if (playSeq !== seq) {
          resolve();
          return;
        }
        if (currentAudio === el) currentAudio = null;
        reject(err instanceof Error ? err : new Error("音频播放失败"));
      });
    }
  });
}

export async function speakMachine(text: string, rate = 1): Promise<void> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    throw new Error("这台设备不支持语音朗读");
  }
  stopAllAudio();
  const seq = playSeq;
  const voices = await loadVoices();
  if (playSeq !== seq) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  // Browser rate 1 maps to our 1.0x; 0.8 stays 0.8.
  utter.rate = rate;
  const preferred = voices.find((v) =>
    /neural|natural|premium|enhanced|google|microsoft|samantha|karen|moira|daniel|aria|jenny|guy|davis|ava|andrew|emma|brian/i.test(
      v.name,
    ),
  );
  const en = preferred ?? voices.find((v) => /^en-US/i.test(v.lang)) ?? voices.find((v) => /^en[-_]/i.test(v.lang));
  if (en) utter.voice = en;
  await new Promise<void>((resolve, reject) => {
    utter.onend = () => resolve();
    utter.onerror = (e) => {
      if (e.error === "canceled" || e.error === "interrupted") resolve();
      else reject(new Error("朗读失败"));
    };
    window.speechSynthesis.speak(utter);
  });
}

export { ttsSupported };
