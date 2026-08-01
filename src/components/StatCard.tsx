interface StatCardProps {
  title: string;
  value: number | string;
  label: string;
  loading?: boolean;
}

export function StatCard({ title, value, label, loading }: StatCardProps) {
  return (
    <article className="stat-card">
      <h2 className="stat-card-title">{title}</h2>
      <p className="stat-card-value">{loading ? '…' : value}</p>
      <p className="stat-card-label">{label}</p>
    </article>
  );
}
