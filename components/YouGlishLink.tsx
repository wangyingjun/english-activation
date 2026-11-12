import { youGlishUrl } from "@/lib/audio";

export function YouGlishLink({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const q = text.replace(/[…]/g, " ").replace(/\.\.\./g, " ").replace(/\s+/g, " ").trim();
  if (!q) return null;
  return (
    <a
      className={`youglish ${className}`.trim()}
      href={youGlishUrl(q)}
      target="_blank"
      rel="noreferrer"
      title={`在 YouGlish 里听真人说：${q}`}
    >
      听真人
    </a>
  );
}
