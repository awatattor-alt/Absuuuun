interface StatCardProps {
  key?: string;
  title: string;
  value: string;
  subtitle: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <article className="stat-card">
      <p>{title}</p>
      <h3>{value}</h3>
      <small>{subtitle}</small>
    </article>
  );
}
