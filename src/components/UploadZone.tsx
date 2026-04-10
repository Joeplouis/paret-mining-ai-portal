import { useState, useRef } from 'react';

interface UploadZoneProps {
  caseId: string;
  caseCategory: string;
  onUploadComplete?: (fileName: string) => void;
}

export default function UploadZone({ caseId, caseCategory, onUploadComplete }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    setUploading(true);
    Array.from(files).forEach((file, i) => {
      setTimeout(() => {
        setUploadedFiles(prev => [...prev, file.name]);
        onUploadComplete?.(file.name);
        if (i === files.length - 1) setUploading(false);
      }, (i + 1) * 800);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="mt-3 rounded-xl p-4" style={{ background: '#1a2332', border: '1px solid #f0a50040' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-500 text-sm">📎</span>
        <h4 className="text-amber-500 font-semibold text-sm">Upload Your Documents</h4>
      </div>

      <p className="text-gray-400 text-xs mb-3 leading-relaxed">
        Based on your request, you may need to upload supporting documents. Accepted formats: <strong className="text-gray-300">PDF, JPG, PNG</strong> (max 20MB each).
      </p>

      {/* What to upload based on category */}
      <div className="mb-3 p-2.5 rounded-lg" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
        <div className="text-gray-500 text-xs mb-1">Documents typically needed for this request:</div>
        {caseCategory === 'Change of Address' && (
          <div className="text-xs text-gray-300">• Proof of new address (utility bill, bank statement — within 90 days)<br/>• Signed ownership statement</div>
        )}
        {caseCategory === 'Direct Deposit' && (
          <div className="text-xs text-gray-300">• Voided check OR bank letter on official letterhead<br/>• Bank name, routing, and account number</div>
        )}
        {caseCategory === 'Check Replacement' && (
          <div className="text-xs text-gray-300">• Notarized affidavit of lost check<br/>• Copy of original check if available</div>
        )}
        {caseCategory === 'New Owner Contact' && (
          <div className="text-xs text-gray-300">• Copy of deed, division order, or assignment document<br/>• Government-issued photo ID</div>
        )}
        {caseCategory === 'Business Inquiry' && (
          <div className="text-xs text-gray-300">• Company registration / business license<br/>• Insurance certificate or W-9</div>
        )}
        {!['Change of Address', 'Direct Deposit', 'Check Replacement', 'New Owner Contact', 'Business Inquiry'].includes(caseCategory) && (
          <div className="text-xs text-gray-300">• Any relevant supporting documents<br/>• Government-issued ID</div>
        )}
      </div>

      {/* Upload area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all"
        style={{ borderColor: dragging ? '#f0a500' : '#30363d', background: dragging ? '#f0a50010' : '#0d1117' }}
      >
        <input ref={inputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
        <div className="text-2xl mb-1">📤</div>
        <div className="text-white text-sm font-medium">{dragging ? 'Drop files here' : 'Click or drag files to upload'}</div>
        <div className="text-gray-500 text-xs mt-1">PDF, JPG, PNG · max 20MB</div>
      </div>

      {/* Uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {uploadedFiles.map(file => (
            <div key={file} className="flex items-center gap-2 text-xs text-green-400">
              <span>✓</span> <span>{file}</span>
              <span className="text-gray-600">— uploaded</span>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-500">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          Uploading...
        </div>
      )}

      <div className="mt-3 text-xs text-gray-600 text-center">
        Case ID: <span className="text-amber-500 font-mono">{caseId}</span> · Files are encrypted and stored securely
      </div>
    </div>
  );
}
