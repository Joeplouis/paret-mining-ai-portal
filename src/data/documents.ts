export interface UploadedDocument {
  id: string;
  caseId: string;
  caseCategory: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  uploadedBy: string;
  company: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  aiSummary?: string;
  notes?: string;
  tags: string[];
}

export const mockDocuments: UploadedDocument[] = [
  {
    id: 'DOC-2026-001',
    caseId: 'RO-2026-001',
    caseCategory: 'Change of Address',
    fileName: 'whitfield_address_proof.pdf',
    fileType: 'application/pdf',
    fileSize: 248000,
    uploadDate: '2026-04-06',
    uploadedBy: 'Robert L. Whitfield',
    company: 'Whitfield Family Trust',
    status: 'pending',
    aiSummary: 'Utility bill showing Whitfield Family Trust, 2847 Marsh Lane, Houston TX 77001. Expiry: March 2027.',
    tags: ['address proof', 'utility bill', 'Texas'],
  },
  {
    id: 'DOC-2026-002',
    caseId: 'RO-2026-002',
    caseCategory: 'Direct Deposit',
    fileName: 'mitchell_bank_letter.pdf',
    fileType: 'application/pdf',
    fileSize: 187000,
    uploadDate: '2026-04-06',
    uploadedBy: 'Sandra K. Mitchell',
    company: 'Mitchell Minerals LLC',
    status: 'pending',
    aiSummary: 'Bank letter from First Florida Bank confirming account ending 4492, Mitchell Minerals LLC, routing 113025123. Verified.',
    tags: ['bank letter', 'direct deposit', 'verified'],
  },
  {
    id: 'DOC-2026-003',
    caseId: 'RO-2026-003',
    caseCategory: 'Check Replacement',
    fileName: 'patterson_affidavit_lost_check.pdf',
    fileType: 'application/pdf',
    fileSize: 312000,
    uploadDate: '2026-04-05',
    uploadedBy: 'James D. Patterson',
    company: 'Patterson Energy Partners',
    status: 'reviewed',
    aiSummary: 'Notarized affidavit of lost check #8847, dated March 15, 2026, amount $4,218.33. Notarized by T. Gonzalez, Commission #884471.',
    tags: ['affidavit', 'lost check', 'notarized'],
  },
  {
    id: 'DOC-2026-004',
    caseId: 'BP-2026-001',
    caseCategory: 'Business Inquiry — Fuel',
    fileName: 'rivera_fleet_insurance.pdf',
    fileType: 'application/pdf',
    fileSize: 524000,
    uploadDate: '2026-04-06',
    uploadedBy: 'Carlos Rivera',
    company: 'Rivera Fleet Services',
    status: 'pending',
    aiSummary: 'Fleet insurance certificate — Rivera Fleet Services. Policy #FL-44921. Commercial fleet coverage: 50 vehicles. Expiry: November 14, 2026.',
    tags: ['insurance', 'fleet', 'fuel distribution'],
  },
  {
    id: 'DOC-2026-005',
    caseId: 'BP-2026-002',
    caseCategory: 'Business Inquiry — Minerals',
    fileName: 'summit_w9.pdf',
    fileType: 'application/pdf',
    fileSize: 98000,
    uploadDate: '2026-04-05',
    uploadedBy: 'David Chen',
    company: 'Summit Construction Group',
    status: 'approved',
    aiSummary: 'IRS W-9 for Summit Construction Group, EIN 47-3829104. Signed by David Chen, CFO. Current year.',
    tags: ['W-9', 'tax document', 'verified'],
  },
];

export function addDocument(doc: Omit<UploadedDocument, 'id' | 'uploadDate'>) {
  const id = `DOC-2026-${String(mockDocuments.length + 1).padStart(3, '0')}`;
  const uploadDate = new Date().toISOString().split('T')[0];
  mockDocuments.unshift({ ...doc, id, uploadDate });
  return id;
}

export function updateDocStatus(id: string, status: UploadedDocument['status'], notes?: string) {
  const doc = mockDocuments.find(d => d.id === id);
  if (doc) {
    doc.status = status;
    if (notes) doc.notes = notes;
  }
}
