"use client";

export type SpeakOptions = {
  rate?: number;
  lang?: string;
};

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const enUS = voices.filter((v) => /^en-US/i.test(v.lang));
  const preferred = enUS.find((v) =>
    /natural|neural|premium|enhanced|google|samantha|jenny|aria|guy|davis|jason|sarah|nancy/i.test(
      v.name,
    ),
  );
  return preferred ?? enUS[0] ?? voices.find((v) => /^en[-_]/i.test(v.lang));
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    return Promise.resolve([]);
  }
  const existing = window.speechSynthesis.getVoices();
  if (existing.length) return Promise.resolve(existing);
  return new Promise((resolve) => {
    const done = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", done);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener("voiceschanged", done);
    window.setTimeout(done, 800);
  });
}

export async function speak(text: string, options: SpeakOptions = {}): Promise<void> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    throw new Error("这台设备不支持语音朗读");
  }
  const voices = await loadVoices();
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = options.lang ?? "en-US";
  utter.rate = options.rate ?? 1;
  const voice = pickVoice(voices);
  if (voice) utter.voice = voice;
  await new Promise<void>((resolve, reject) => {
    utter.onend = () => resolve();
    utter.onerror = (e) => {
      if (e.error === "canceled" || e.error === "interrupted") resolve();
      else reject(new Error("朗读失败"));
    };
    window.speechSynthesis.speak(utter);
  });
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function ttsSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
