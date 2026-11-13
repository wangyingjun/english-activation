"use client";

import { SpeakButton } from "@/components/SpeakButton";
import { dictionaryUrl, humanSrc } from "@/lib/human-audio";

export function HumanPlay({
  word,
  rate = 1,
  className = "",
}: {
  word: string;
  rate?: number;
  className?: string;
}) {
  const src = humanSrc(word);
  if (src) {
    return <SpeakButton text={word} src={src} rate={rate} label="真人发音" className={className} />;
  }
  const href = dictionaryUrl(word);
  if (!href) return null;
  return (
    <a className={`dict-link ${className}`.trim()} href={href} target="_blank" rel="noreferrer">
      词典发音
    </a>
  );
}
