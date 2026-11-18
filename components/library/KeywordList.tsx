"use client";

import { SpeakButton } from "@/components/SpeakButton";
import { humanSrc } from "@/lib/human-audio";
import type { LibraryKeyword } from "@/lib/content/library";

export function KeywordList({ keywords }: { keywords: LibraryKeyword[] }) {
  return (
    <ul className="lib-keywords">
      {keywords.map((k) => {
        const human = humanSrc(k.w);
        return (
          <li key={k.w}>
            <span className="en lib-kw">{k.w}</span>
            <span className="tiny muted lib-kw-zh">{k.zh}</span>
            <SpeakButton text={k.w} src={human} label={human ? "真人" : "听"} className="tiny" />
          </li>
        );
      })}
    </ul>
  );
}
