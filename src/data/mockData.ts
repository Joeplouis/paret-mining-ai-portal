export type CaseStatus = 'new' | 'open' | 'resolved' | 'urgent';
export type CasePriority = 'normal' | 'high' | 'urgent';

export interface Case {
  id: string;
  category: string;
  submitter: string;
  company: string;
  aiSummary: string;
  status: CaseStatus;
  date: string;
  priority: CasePriority;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  tab: 'royalty' | 'compliance' | 'lead';
  action?: string;  // for quick action routing
  opensForm?: boolean; // only for royalty tab
  formAction?: string; // for royalty forms
}

// Specific answers for each compliance topic
export const complianceAnswers: Record<string, string> = {
  'anti-bribery': `PARET MINING USA — ANTI-BRIBERY AND ANTI-CORRUPTION POLICY

Paret Mining USA maintains a strict zero-tolerance policy regarding bribery and corruption in any form.

Key Points:
• All forms of bribery — including facilitation payments — are strictly prohibited
• No employee, agent, or third party may offer, promise, authorize, or give anything of value to influence any business decision
• All gifts and entertainment must be pre-approved and reported quarterly
• Anti-corruption obligations apply to all interactions with government officials and private sector parties
• Violations must be reported immediately through our Ethics Hotline

Consequences of Violation:
Violations may result in disciplinary action up to and including termination, and could expose both the individual and the company to civil and criminal penalties.

To report a concern: ethics@paretminingusa.com or call our confidential Ethics Hotline.`,
  'ethics': `PARET MINING USA — ETHICS REPORTING

Paret Mining USA is committed to the highest standards of ethical conduct. We encourage all employees, contractors, and business partners to report suspected unethical behavior without fear of retaliation.

How to Report:
1. Confidential Ethics Hotline: Available 24/7 — all reports are investigated
2. Email: ethics@paretminingusa.com
3. Direct Supervisor: If comfortable, discuss with your direct manager
4. Legal/Compliance Department: compliance@paretminingusa.com

What to Report:
• Fraud, waste, or abuse
• Conflicts of interest not disclosed
• Harassment or discrimination
• Safety violations
• Any suspected illegal activity

Your Rights:
• All reports are treated with strict confidentiality
• Retaliation against any reporter is a violation of company policy and may result in disciplinary action
• Reports may be made anonymously where permitted by applicable law`,
  'due-diligence': `PARET MINING USA — THIRD-PARTY DUE DILIGENCE REQUIREMENTS

Paret Mining USA conducts comprehensive due diligence on all prospective third parties before entering into any business relationship.

Required Steps:
1. Complete the Vendor/Partner Due Diligence Questionnaire
2. Provide proof of business registration and licensure
3. Pass sanctions screening (OFAC, BIS, and relevant government lists)
4. Disclose any pending litigation, regulatory actions, or investigations
5. Provide references from at least two prior business relationships
6. Complete anti-corruption training acknowledgment

Ongoing Monitoring:
All active third parties are subject to periodic re-screening and review. Any material changes in status must be disclosed within 10 business days.

Red Flags That May Disqualify:
• Adverse media or regulatory findings
• Connections to politically exposed persons without adequate explanation
• Refusal to provide required documentation
• Inconsistencies in provided information`,
  'code-of-conduct': `PARET MINING USA — CODE OF BUSINESS CONDUCT AND ETHICS

Our Code of Business Conduct and Ethics establishes the standards of integrity and professionalism expected of all personnel associated with Paret Mining USA.

Core Principles:
• Integrity: Act honestly and ethically in all business dealings
• Transparency: Disclose conflicts of interest promptly
• Compliance: Obey all applicable laws, regulations, and company policies
• Respect: Treat all individuals with dignity regardless of position or background
• Accountability: Take responsibility for your actions and decisions

Key Areas Covered:
• Anti-bribery and anti-corruption compliance
• Gifts, entertainment, and hospitality
• Confidential information and data protection
• Workplace safety and environmental responsibility
• Proper use of company assets
• Political contributions and community involvement

All personnel are required to annually certify compliance with this Code. Training is mandatory upon hire and upon significant updates to the Code.`,
};

// Business line info (no forms)
export const businessLines: Record<string, { headline: string; details: string }> = {
  'lead-fuel': {
    headline: 'Fuel Distribution — Chevron Lubricant Products',
    details: `Paret Mining USA is an authorized Chevron lubricant distributor serving industrial, commercial, and fleet customers across the southeastern United States.

Our Fuel & Lubricant Services Include:
• Full-range Chevron petroleum products — engine oils, hydraulic fluids, industrial lubricants
• Fleet fueling programs for commercial operations
• Bulk and packaged delivery available
• Technical support and product selection guidance
• Competitive volume pricing for qualified accounts

We serve manufacturing, transportation, construction, agriculture, and energy operations throughout Florida and the Southeast.

Minimum Order: Contact us for terms.
Delivery: Available throughout our service territory.`,
  },
  'lead-minerals': {
    headline: 'Industrial Minerals — Calcium Carbonate',
    details: `Paret Mining USA operates calcium carbonate mining and processing operations producing high-quality industrial mineral products for a range of sectors.

Our Mineral Products Include:
• Ground Calcium Carbonate (GCC) in various mesh sizes
• Custom mineral blends for specific industry applications
• Agricultural lime and soil amendment products
• Industrial filler materials for manufacturing

Industries Served:
• Construction and road building
• Agriculture and environmental remediation
• Manufacturing and plastics
• Water treatment
• Energy sector applications

We offer bulk supply, technical specifications, and reliable delivery. For pricing and availability, please share details about your project requirements.`,
  },
  'lead-logistics': {
    headline: 'Port & Logistics Operations',
    details: `Paret Mining USA provides integrated port and logistics services supporting the energy and industrial supply chain across the southeastern United States.

Our Logistics Capabilities:
• Fuel import, storage, and distribution
• Bulk mineral handling and transportation
• Terminal and storage facility access
• Freight coordination and supply chain management
• Fuel supply for maritime and port operations

Strategic Advantage:
Our integrated network connects maritime fuel supply with inland distribution, making us a single-point partner for port operators, shipping companies, and industrial facilities requiring reliable fuel and mineral logistics.

For partnership or service inquiries, please share your operational requirements and preferred terms.`,
  },
  'lead-investment': {
    headline: 'Investment & Strategic Partnerships',
    details: `Paret Mining USA welcomes inquiries from qualified investors and strategic partners interested in the energy, minerals, and logistics sectors.

Opportunity Overview:
We evaluate partnership and investment opportunities that align with our operational footprint in the southeastern United States, particularly in:
• Fuel distribution expansion
• Mineral processing and quarrying operations
• Port and logistics infrastructure
• Power generation and energy transition projects

What We Look For:
• Aligned strategic objectives
• Demonstrated track record in relevant sectors
• Capacity to commit capital and operational expertise
• Long-term partnership orientation

All inquiries are reviewed by our leadership team. We respond to qualified inquiries within 5 business days.`,
  },
};

// Knowledge base — combined
export const knowledgeBase: KnowledgeEntry[] = [
  // Royalty Owner
  {
    keywords: ['change', 'address', 'mailing', 'update address'],
    answer: `To change your mailing address as a Paret Mining USA royalty owner, please complete our Change of Address form. You will need to provide:

1. Your current account information (name and owner account number)
2. Your new mailing address including city, state, and ZIP code
3. A signed statement confirming ownership

Processing time: 5–7 business days. All royalty payments will be sent to your updated address once the change is processed.

Click the "Change Address" button below to begin.`,
    tab: 'royalty',
    opensForm: true,
    formAction: 'change-address',
  },
  {
    keywords: ['direct deposit', 'bank deposit', 'payment method', 'enroll'],
    answer: `To enroll in direct deposit for your royalty payments, please submit a Direct Deposit Authorization form. This requires:

1. A completed Direct Deposit Authorization form
2. A voided check OR a bank letter confirming your account details

Direct deposit is available to all Paret Mining USA royalty owners at no charge. Once enrolled, your payments will arrive faster and more securely than paper checks.

Click the "Direct Deposit" button below to get started.`,
    tab: 'royalty',
    opensForm: true,
    formAction: 'direct-deposit',
  },
  {
    keywords: ['check replacement', 'replace check', 'lost check', 'outstanding check'],
    answer: `To request a replacement check, please submit a Check Replacement Request form. Please note:

1. A stop-payment will be placed on the original check
2. A replacement will be issued once the original is confirmed outstanding for at least 10 business days
3. A $25 processing fee applies to each replacement request

Have the following ready: your owner account number, the original check number and date, and the amount.

Click "Check Replacement" below to submit your request.`,
    tab: 'royalty',
    opensForm: true,
    formAction: 'check-replacement',
  },
  {
    keywords: ['new owner', 'new owner contact', 'first royalty', 'just purchased'],
    answer: `Welcome as a new royalty owner! To ensure your account is properly established with Paret Mining USA, please complete our New Owner Contact form. This helps us verify your ownership interest and get you set up in our system.

Please have the following ready:
1. Your full legal name or entity name
2. Your property or royalty interest description
3. Mailing address, phone number, and email
4. Any relevant deed, division order, or assignment documentation

You can also reach our Owner Relations team directly at owner_relations@paretminingusa.com.

Click "New Owner" below to get started.`,
    tab: 'royalty',
    opensForm: true,
    formAction: 'new-owner',
  },
  // Compliance — no forms
  {
    action: 'anti-bribery',
    keywords: ['anti-bribery', 'anti corruption', 'bribery', 'facilation payment'],
    answer: complianceAnswers['anti-bribery'],
    tab: 'compliance',
    opensForm: false,
  },
  {
    action: 'ethics',
    keywords: ['ethics', 'report', 'whistleblower', 'confidential reporting', 'hotline'],
    answer: complianceAnswers['ethics'],
    tab: 'compliance',
    opensForm: false,
  },
  {
    action: 'due-diligence',
    keywords: ['due diligence', 'vendor', 'third party', 'background check', 'screening'],
    answer: complianceAnswers['due-diligence'],
    tab: 'compliance',
    opensForm: false,
  },
  {
    action: 'code-of-conduct',
    keywords: ['code of conduct', 'business ethics', 'integrity', 'ethics policy'],
    answer: complianceAnswers['code-of-conduct'],
    tab: 'compliance',
    opensForm: false,
  },
  // Business & Partner Inquiries
  {
    action: 'lead-fuel',
    keywords: ['fuel', 'lubricant', 'chevron', 'diesel', 'oil products', 'fleet'],
    answer: businessLines['lead-fuel'].details,
    tab: 'lead',
    opensForm: false,
  },
  {
    action: 'lead-minerals',
    keywords: ['mineral', 'calcium', 'carbonate', 'mining', 'aggregate', 'construction'],
    answer: businessLines['lead-minerals'].details,
    tab: 'lead',
    opensForm: false,
  },
  {
    action: 'lead-logistics',
    keywords: ['logistics', 'port', 'shipping', 'freight', 'transport', 'fuel supply'],
    answer: businessLines['lead-logistics'].details,
    tab: 'lead',
    opensForm: false,
  },
  {
    action: 'lead-investment',
    keywords: ['investment', 'partner', 'joint venture', 'acquisition', 'strategic'],
    answer: businessLines['lead-investment'].details,
    tab: 'lead',
    opensForm: false,
  },
];

export const formConfig: Record<string, { title: string; description: string; fields: string[] }> = {
  'change-address': {
    title: 'Change of Address Request',
    description: 'Provide your current and new address information. Processing takes 5–7 business days.',
    fields: ['Full Legal Name', 'Owner Account Number', 'Current Address', 'New Address', 'City, State, ZIP', 'Phone Number', 'Email Address'],
  },
  'direct-deposit': {
    title: 'Direct Deposit Enrollment',
    description: 'Submit your banking information for direct deposit of royalty payments.',
    fields: ['Full Name', 'Owner Account Number', 'Bank Name', 'Routing Number', 'Account Number', 'Account Type (Checking/Savings)'],
  },
  'check-replacement': {
    title: 'Check Replacement Request',
    description: 'Request a replacement for a lost or outstanding check. A $25 fee applies.',
    fields: ['Payee Name', 'Owner Account Number', 'Original Check Number', 'Original Check Date', 'Amount', 'Phone Number'],
  },
  'new-owner': {
    title: 'New Owner Contact Form',
    description: 'Welcome! Please provide your information so we can set up your account.',
    fields: ['Full Legal Name', 'Entity Name (if applicable)', 'Mailing Address', 'Phone Number', 'Email Address', 'Property/Royalty Interest Description'],
  },
};

export const leadFormConfig = {
  title: 'Connect With Our Team',
  description: 'Share your details and a member of our team will follow up within 1 business day.',
  fields: ['Full Name', 'Company Name', 'Email Address', 'Phone Number', 'Service Interest', 'Project Details / Message'],
};

export let mockCases: Case[] = [
  { id: 'RO-2026-001', category: 'Change of Address', submitter: 'Robert L. Whitfield', company: 'Whitfield Family Trust', aiSummary: 'Owner requesting address update from PO Box to physical address in Houston, TX. Supporting documentation pending.', status: 'open', date: '2026-04-06', priority: 'normal' },
  { id: 'RO-2026-002', category: 'Direct Deposit', submitter: 'Sandra K. Mitchell', company: 'Mitchell Minerals LLC', aiSummary: 'New direct deposit enrollment for quarterly royalty payments. Bank verification received, awaiting account confirmation.', status: 'new', date: '2026-04-06', priority: 'high' },
  { id: 'RO-2026-003', category: 'Check Replacement', submitter: 'James D. Patterson', company: 'Patterson Energy Partners', aiSummary: 'Check #8847 outstanding for 45+ days. Owner requests replacement. Stop-payment processing initiated.', status: 'open', date: '2026-04-05', priority: 'urgent' },
  { id: 'BP-2026-001', category: 'Business Inquiry — Fuel', submitter: 'Carlos Rivera', company: 'Rivera Fleet Services', aiSummary: 'Fleet fuel inquiry for 50-vehicle operation in Florida. Looking for competitive pricing on diesel and engine oils. Qualify for volume discount?', status: 'new', date: '2026-04-06', priority: 'high' },
  { id: 'RO-2026-004', category: 'Compliance Question', submitter: 'Angela Torres', company: 'Torres Logistics Inc.', aiSummary: 'Question about third-party due diligence requirements for logistics partnership application. Requesting clarification on required documentation.', status: 'resolved', date: '2026-04-04', priority: 'normal' },
  { id: 'BP-2026-002', category: 'Business Inquiry — Minerals', submitter: 'David Chen', company: 'Summit Construction Group', aiSummary: 'Calcium carbonate inquiry for road construction project in Georgia. Need 500 tons. Requesting quote and delivery timeline.', status: 'open', date: '2026-04-05', priority: 'normal' },
];

export function addCase(newCase: Case) {
  mockCases = [newCase, ...mockCases];
}

export function resolveCase(id: string) {
  mockCases = mockCases.map(c => c.id === id ? { ...c, status: 'resolved' as CaseStatus } : c);
}
