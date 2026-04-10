import { useState } from 'react';
import type { UploadedDocument } from '../data/documents';
import { updateDocStatus } from '../data/documents';

interface Props {
  documents: UploadedDocument[];
  onStatusChange?: (id: string, status: UploadedDocument['status']) => void;
}

const statusConfig: Record<UploadedDocument['status'], { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending Review', color: '#f0a500', bg: '#f0a50015' },
  reviewed: { label: 'Reviewed', color: '#60a5fa', bg: '#1d4ed820' },
  approved: { label: 'Approved', color: '#22c55e', bg: '#22c55e15' },
  rejected: { label: 'Rejected', color: '#f85149', bg: '#f8514915' },
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentPanel({ documents, onStatusChange }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<UploadedDocument | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [noteInput, setNoteInput] = useState('');

  const filtered = documents.filter(d => {
    if (filterStatus !== 'all' && d.status !== filterStatus) return false;
    if (filterCat !== 'all' && d.caseCategory !== filterCat) return false;
    return true;
  });

  const categories = ['all', ...Array.from(new Set(documents.map(d => d.caseCategory)))];
  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === 'pending').length,
    reviewed: documents.filter(d => d.status === 'reviewed').length,
    approved: documents.filter(d => d.status === 'approved').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold text-lg">Document Management</h2>
        <div className="flex gap-2">
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}>
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Total', value: stats.total, color: '#e6edf3' },
          { label: 'Pending', value: stats.pending, color: '#f0a500' },
          { label: 'Reviewed', value: stats.reviewed, color: '#60a5fa' },
          { label: 'Approved', value: stats.approved, color: '#22c55e' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: '#161b22', border: '1px solid #30363d', borderTop: `2px solid ${s.color}` }}>
            <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Document list */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">No documents found.</div>
        )}
        {filtered.map(doc => (
          <div key={doc.id} onClick={() => setSelectedDoc(doc)}
            className={`rounded-lg p-3 cursor-pointer transition-all ${selectedDoc?.id === doc.id ? 'border' : ''}`}
            style={{
              background: selectedDoc?.id === doc.id ? '#1a2332' : '#161b22',
              border: selectedDoc?.id === doc.id ? '1px solid #f0a50040' : '1px solid #30363d',
            }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {doc.fileType === 'application/pdf' ? '📄' : doc.fileType.startsWith('image/') ? '🖼️' : '📎'}
                </span>
                <div>
                  <div className="text-white text-xs font-medium truncate max-w-32">{doc.fileName}</div>
                  <div className="text-gray-500 text-xs">{doc.uploadDate} · {formatBytes(doc.fileSize)}</div>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: statusConfig[doc.status].bg, color: statusConfig[doc.status].color }}>
                {statusConfig[doc.status].label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selectedDoc && (
        <div className="mt-4 rounded-xl p-4" style={{ background: '#1a2332', border: '1px solid #f0a50040' }}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-amber-500 font-semibold text-sm">📄 {selectedDoc.fileName}</h4>
            <button onClick={() => setSelectedDoc(null)} className="text-gray-500 hover:text-gray-300 text-lg">×</button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
            <div>
              <div className="text-gray-500 mb-0.5">Case</div>
              <div className="text-amber-500 font-mono">{selectedDoc.caseId}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Category</div>
              <div className="text-white">{selectedDoc.caseCategory}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Uploaded By</div>
              <div className="text-white">{selectedDoc.uploadedBy}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Company</div>
              <div className="text-white">{selectedDoc.company}</div>
            </div>
          </div>

          {selectedDoc.aiSummary && (
            <div className="mb-3 p-3 rounded-lg" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
              <div className="text-gray-500 text-xs mb-1">🤖 AI Summary</div>
              <p className="text-gray-300 text-xs leading-relaxed">{selectedDoc.aiSummary}</p>
            </div>
          )}

          {selectedDoc.notes && (
            <div className="mb-3">
              <div className="text-gray-500 text-xs mb-1">Notes</div>
              <p className="text-gray-400 text-xs">{selectedDoc.notes}</p>
            </div>
          )}

          <div className="mb-3">
            <div className="text-gray-500 text-xs mb-1">Tags</div>
            <div className="flex flex-wrap gap-1">
              {selectedDoc.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: '#f0a50020', color: '#f0a500' }}>#{tag}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-3 mt-3" style={{ borderColor: '#30363d' }}>
            <div className="flex gap-2">
              <button
                onClick={() => { updateDocStatus(selectedDoc.id, 'approved'); onStatusChange?.(selectedDoc.id, 'approved'); setSelectedDoc({ ...selectedDoc, status: 'approved' }); }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors">
                ✓ Approve
              </button>
              <button
                onClick={() => { updateDocStatus(selectedDoc.id, 'rejected'); onStatusChange?.(selectedDoc.id, 'rejected'); setSelectedDoc({ ...selectedDoc, status: 'rejected' }); }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors">
                ✕ Reject
              </button>
              <button
                onClick={() => { updateDocStatus(selectedDoc.id, 'reviewed'); onStatusChange?.(selectedDoc.id, 'reviewed'); setSelectedDoc({ ...selectedDoc, status: 'reviewed' }); }}
                className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-colors">
                Mark Reviewed
              </button>
            </div>
            <div className="mt-2">
              <input type="text" placeholder="Add a note..." value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                className="w-full rounded-lg px-3 py-1.5 text-xs outline-none"
                style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
