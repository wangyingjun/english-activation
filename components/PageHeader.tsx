export function PageHeader({
  kicker,
  title,
  desc,
}: {
  kicker?: string;
  title: string;
  desc?: string;
}) {
  return (
    <header className="page-header">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h1>{title}</h1>
      {desc ? <p className="lead">{desc}</p> : null}
    </header>
  );
}
