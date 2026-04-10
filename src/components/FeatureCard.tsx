import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export default function FeatureCard({ icon, title, description, badge }: FeatureCardProps) {
  return (
    <div className="rounded-xl p-6 border transition-all hover:border-amber-500/50 group" style={{ background: '#161b22', borderColor: '#30363d' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#f0a50020', border: '1px solid #f0a50040' }}>
          {icon}
        </div>
        {badge && (
          <span className="text-xs font-medium px-2 py-1 rounded" style={{ background: '#f0a50020', color: '#f0a500', border: '1px solid #f0a50040' }}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      <a href="#portal" className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center gap-1 transition-colors group-hover:gap-2">
        Try it now →
      </a>
    </div>
  );
}
