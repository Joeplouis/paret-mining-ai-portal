import { useState } from 'react';
import type { Case } from "../data/mockData"
import { resolveCase } from '../data/mockData';
import StatusBadge from './StatusBadge';

interface DashboardTableProps {
  cases: Case[];
  onResolve?: (id: string) => void;
}

export default function DashboardTable({ cases, onResolve }: DashboardTableProps) {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  return (
    <div className="flex gap-4 h-full">
      {/* Table */}
      <div className="flex-1 overflow-x-auto rounded-xl" style={{ background: '#161b22', border: '1px solid #30363d' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b" style={{ borderColor: '#30363d' }}>
              {['Case #', 'Category', 'Submitter', 'AI Summary', 'Status', 'Date', ''].map(h => (
                <th key={h} className="px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cases.map(c => (
              <tr
                key={c.id}
                className="border-b cursor-pointer transition-colors hover:bg-white/5"
                style={{ borderColor: '#30363d' }}
                onClick={() => setSelectedCase(c)}
              >
                <td className="px-4 py-3 font-mono text-xs text-amber-500 font-semibold">{c.id}</td>
                <td className="px-4 py-3 text-gray-300 text-xs">{c.category}</td>
                <td className="px-4 py-3">
                  <div className="text-white text-xs font-medium">{c.submitter}</div>
                  <div className="text-gray-500 text-xs">{c.company}</div>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs max-w-xs truncate">{c.aiSummary}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{c.date}</td>
                <td className="px-4 py-3">
                  <button className="text-amber-500 hover:text-amber-400 text-xs font-medium">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Panel */}
      {selectedCase && (
        <div className="w-80 rounded-xl flex flex-col" style={{ background: '#161b22', border: '1px solid #30363d' }}>
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#30363d' }}>
            <span className="font-mono text-amber-500 text-sm font-semibold">{selectedCase.id}</span>
            <button onClick={() => setSelectedCase(null)} className="text-gray-500 hover:text-gray-300 text-lg">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Category</div>
              <div className="text-white text-sm font-medium">{selectedCase.category}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Submitter</div>
              <div className="text-white text-sm">{selectedCase.submitter}</div>
              <div className="text-gray-400 text-xs">{selectedCase.company}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Date</div>
              <div className="text-gray-300 text-sm">{selectedCase.date}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Status</div>
              <StatusBadge status={selectedCase.status} />
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">AI Summary</div>
              <p className="text-gray-300 text-xs leading-relaxed">{selectedCase.aiSummary}</p>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Suggested Action</div>
              <p className="text-amber-500 text-xs">
                {selectedCase.status === 'new' ? 'Review and assign to team member within 24 hours.' :
                 selectedCase.status === 'open' ? 'Follow up with submitter — missing documents or pending verification.' :
                 'Case closed. Archive and log resolution.'}
              </p>
            </div>
          </div>
          <div className="p-4 border-t space-y-2" style={{ borderColor: '#30363d' }}>
            {selectedCase.status !== 'resolved' && (
              <button
                onClick={() => { resolveCase(selectedCase.id); onResolve?.(selectedCase.id); setSelectedCase(null); }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors"
              >
                Mark Resolved ✓
              </button>
            )}
            <button className="w-full border border-gray-600 hover:border-gray-500 text-gray-300 text-sm py-2 rounded-lg transition-colors">
              Add Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
