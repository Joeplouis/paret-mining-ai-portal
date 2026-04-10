
import type { CaseStatus } from '../data/mockData';

interface StatusBadgeProps {
  status: CaseStatus;
}

const config: Record<CaseStatus, { label: string; bg: string; color: string }> = {
  new: { label: 'New', bg: '#f0a50020', color: '#f0a500' },
  open: { label: 'Open', bg: '#1d4ed820', color: '#60a5fa' },
  resolved: { label: 'Resolved', bg: '#22c55e20', color: '#22c55e' },
  urgent: { label: 'Urgent', bg: '#f8514920', color: '#f85149' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] || config.new;
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: c.bg, color: c.color }}>
      {c.label}
    </span>
  );
}
