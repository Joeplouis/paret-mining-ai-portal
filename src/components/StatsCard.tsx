import { useEffect, useRef } from 'react';
interface Props { value: number | string; label: string; subtext?: string; color?: string; }
export default function StatsCard({ value, label, subtext, color = '#f0a500' }: Props) {
  const numRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof value !== 'number') return;
    const target = value, duration = 1000, start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (numRef.current) numRef.current.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return (
    <div className="rounded-xl p-5 flex-1 min-w-32" style={{ background: '#161b22', border: '1px solid #30363d', borderTop: `3px solid ${color}` }}>
      <div className="text-3xl font-bold" style={{ color }} ref={numRef}>{typeof value === 'number' ? 0 : value}</div>
      <div className="text-gray-400 text-sm font-medium mt-1">{label}</div>
      {subtext && <div className="text-gray-600 text-xs mt-0.5">{subtext}</div>}
    </div>
  );
}
