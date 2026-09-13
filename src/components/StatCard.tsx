interface StatCardProps {
  title: string;
  value: number | string;
  label: string;
  loading?: boolean;
  onClick: () => void;
}

export function StatCard({ title, value, label, loading, onClick }: StatCardProps) {
  return (
    <button type="button" className="stat-card" onClick={onClick}>
      <span className="stat-card-title">{title}</span>
      <span className="stat-card-value">{loading ? '…' : value}</span>
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-link" aria-hidden="true">
        View details →
      </span>
    </button>
  );
}
