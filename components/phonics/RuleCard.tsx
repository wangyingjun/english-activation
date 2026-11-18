"use client";

import type { PhonicsRule } from "@/lib/content/phonics";
import { WordCard } from "./WordCard";

export function RuleCard({ rule }: { rule: PhonicsRule }) {
  return (
    <section className="card ph-rule" id={rule.id}>
      <div className="ph-rule-head">
        <span className="ph-pattern en">{rule.pattern}</span>
        <span className="ph-arrow" aria-hidden="true">→</span>
        <span className="ph-symbol small">{rule.sound}</span>
      </div>
      <p className="muted" style={{ marginTop: 6 }}>{rule.note}</p>
      <ul className="ph-words">
        {rule.words.map((w) => (
          <WordCard key={w} word={w} />
        ))}
      </ul>
      {rule.exceptions.length ? (
        <>
          <h3 style={{ marginTop: 12 }}>常见例外</h3>
          <ul className="ph-words">
            {rule.exceptions.map((e) => (
              <WordCard key={e.word} word={e.word} note={e.note} />
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
