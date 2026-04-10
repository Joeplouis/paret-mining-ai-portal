import { useState, useEffect, useRef } from 'react';
import type { Message } from '../data/mockData';
import { knowledgeBase, formConfig } from '../data/mockData';
import UploadZone from './UploadZone';

interface QuickAction { label: string; icon: string; action: string; }
interface Props { quickActions: QuickAction[]; placeholder?: string; showAiBadge?: boolean; tabId: 'royalty' | 'compliance' | 'lead'; }

function SmartFormMini({ config, onSubmit, onCancel }: { config: { title: string; description: string; fields: string[] }; onSubmit: (d: Record<string, string>) => void; onCancel: () => void }) {
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return null;
  return (
    <div className="rounded-xl p-4 mt-2" style={{ background: '#1a2332', border: '1px solid #f0a50040' }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-amber-500 font-semibold text-sm">{config.title}</h4>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-300 text-xs cursor-pointer">✕ Cancel</button>
      </div>
      <p className="text-gray-400 text-xs mb-3">{config.description}</p>
      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); onSubmit(data); }} className="space-y-2">
        {config.fields.slice(0, 5).map(field => (
          field === 'Service Interest' ? (
            <select key={field} value={data[field] || ''} onChange={e => setData(p => ({ ...p, [field]: e.target.value }))} required
              className="w-full rounded-lg px-3 py-2 text-xs outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }}>
              <option value="">Select a service...</option>
              <option>Fuel Distribution (Chevron)</option>
              <option>Minerals / Calcium Carbonate</option>
              <option>Port &amp; Logistics</option>
              <option>Investment / Partnership</option>
            </select>
          ) : (
            <input key={field} type={field.includes('Email') ? 'email' : 'text'} placeholder={field} value={data[field] || ''} onChange={e => setData(p => ({ ...p, [field]: e.target.value }))} required
              className="w-full rounded-lg px-3 py-2 text-xs outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
          )
        ))}
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs py-2 rounded-lg cursor-pointer transition-colors">Submit Request</button>
      </form>
    </div>
  );
}

function LeadConnectForm({ onSubmit }: { onSubmit: (d: Record<string, string>) => void }) {
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return null;
  return (
    <div className="rounded-xl p-4 mt-2" style={{ background: '#1a2332', border: '1px solid #f0a50040' }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-amber-500 font-semibold text-sm">Connect With Our Team</h4>
      </div>
      <p className="text-gray-400 text-xs mb-3">Share your details and a member of our team will follow up within 1 business day.</p>
      <form onSubmit={e => { e.preventDefault(); setSubmitted(true); onSubmit(data); }} className="space-y-2">
        {['Full Name', 'Company Name', 'Email Address', 'Phone Number'].map(field => (
          <input key={field} type={field === 'Email Address' ? 'email' : 'text'} placeholder={field} value={data[field] || ''} onChange={e => setData(p => ({ ...p, [field]: e.target.value }))} required
            className="w-full rounded-lg px-3 py-2 text-xs outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
        ))}
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs py-2 rounded-lg cursor-pointer transition-colors">Send Inquiry</button>
      </form>
    </div>
  );
}

export default function ChatWindow({ quickActions, placeholder = 'Type your question...', showAiBadge = true, tabId }: Props) {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome', role: 'ai' as const,
    text: tabId === 'royalty'
      ? "Welcome! I'm your Paret Mining Royalty Owner assistant. I can help with address changes, direct deposit, check replacements, or general owner inquiries. How can I assist you today?"
      : tabId === 'compliance'
      ? "Welcome! I'm the Paret Mining USA Compliance Assistant. I can answer questions about our ethics policies, anti-bribery guidelines, due diligence requirements, and our Code of Conduct. What would you like to know?"
      : "Welcome! I'm your Paret Mining Business Development assistant. I can provide information about our fuel distribution, minerals, port & logistics operations, and investment opportunities. What can I help you with today?",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState<string>('');
  const [submittedCategory, setSubmittedCategory] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, showForm, showLeadForm, showUpload]);

  const sendAIMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text, timestamp: new Date() }]);
  };

  const handleMatch = (entry: typeof knowledgeBase[number]) => {
    sendAIMessage(entry.answer);
    if (tabId === 'lead') {
      setTimeout(() => {
        sendAIMessage("I'd love to connect you with our business development team. Fill out the form below and a representative will follow up within 1 business day.");
        setShowLeadForm(true);
      }, 1000);
    } else if (tabId === 'royalty' && entry.opensForm && entry.formAction) {
      setTimeout(() => {
        const form = formConfig[entry.formAction!];
        if (form) { sendAIMessage(`Click the form below to ${form.title.toLowerCase()}. All fields are required.`); setCurrentAction(entry.formAction!); setShowForm(true); }
      }, 1000);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: input.trim(), timestamp: new Date() }]);
    setInput(''); setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const q = input.toLowerCase();
      const match = knowledgeBase.find(e => e.tab === tabId && e.keywords.some(kw => q.includes(kw)));
      if (match) { handleMatch(match); }
      else { sendAIMessage("I'm not sure I have that specific information. Try clicking one of the quick action buttons above, or contact us directly."); }
    }, 900);
  };

  const handleQuickAction = (action: string) => {
    const match = knowledgeBase.find(e => e.action === action);
    if (match) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: `Tell me about: ${match.keywords[0]}`, timestamp: new Date() }]);
      setIsTyping(true);
      setTimeout(() => { setIsTyping(false); handleMatch(match); }, 900);
    }
  };

  const handleFormSubmit = (_data: Record<string, string>) => {
    const form = formConfig[currentAction || ''];
    setShowForm(false);
    const caseId = `RO-2026-${String(Math.floor(Math.random() * 90) + 10)}`;
    setSubmittedCaseId(caseId);
    setSubmittedCategory(form?.title || '');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: `[Submitted: ${form?.title}]`, timestamp: new Date() }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      sendAIMessage(
        `✅ ${form?.title} submitted successfully!\n\nCase ID: ${caseId}\nOur team will review your request and contact you within 2 business days.\n\nAfter submitting your documents below, our team will be able to process your request faster.`
      );
      setTimeout(() => setShowUpload(true), 800);
    }, 800);
  };

  const handleLeadFormSubmit = (_data: Record<string, string>) => {
    setShowLeadForm(false);
    const caseId = `BP-2026-${String(Math.floor(Math.random() * 90) + 10)}`;
    setSubmittedCaseId(caseId);
    setSubmittedCategory('Business Inquiry');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: '[Submitted business inquiry]', timestamp: new Date() }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      sendAIMessage(`✅ Thank you for your inquiry!\n\nCase ID: ${caseId}\nA member of our business development team will follow up within 1 business day.`);
    }, 800);
  };

  return (
    <div className="flex flex-col rounded-xl overflow-hidden" style={{ background: '#0d1117', border: '1px solid #30363d', height: '520px' }}>
      <div className="flex flex-wrap gap-2 p-4 border-b" style={{ borderColor: '#30363d' }}>
        {quickActions.map(action => (
          <button key={action.action} onClick={() => handleQuickAction(action.action)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-all hover:bg-amber-500 hover:text-black"
            style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}>
            <span>{action.icon}</span>{action.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-amber-500 text-black rounded-br-sm' : 'text-gray-200 rounded-bl-sm'}`}
              style={msg.role === 'user' ? {} : { background: '#161b22', border: '1px solid #30363d' }}>
              {msg.role === 'ai' && showAiBadge && <div className="text-xs font-semibold mb-1.5 flex items-center gap-1.5"><span className="text-amber-500">●</span><span className="text-amber-500 text-xs">PARET AI</span></div>}
              {msg.text.split('\n').map((line, i) => <div key={i} className={i > 0 ? 'mt-1' : ''}>{line}</div>)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3" style={{ background: '#161b22', border: '1px solid #30363d' }}>
              <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>
            </div>
          </div>
        )}
        {showForm && currentAction && formConfig[currentAction] && (
          <SmartFormMini config={formConfig[currentAction]} onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
        )}
        {showLeadForm && <LeadConnectForm onSubmit={handleLeadFormSubmit} />}
        {showUpload && submittedCaseId && (
          <UploadZone caseId={submittedCaseId} caseCategory={submittedCategory} onUploadComplete={() => {
            setMessages(prev => [...prev, {
              id: Date.now().toString(), role: 'ai',
              text: `📎 Document uploaded successfully! Once our team reviews it, we'll update your case status and reach out if we need anything else.`,
              timestamp: new Date()
            }]);
            setShowUpload(false);
          }} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t" style={{ borderColor: '#30363d' }}>
        <div className="flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={placeholder} className="flex-1 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2"
            style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3', '--tw-ring-color': '#f0a500' } as React.CSSProperties} />
          <button onClick={handleSend} disabled={!input.trim()}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-black font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 text-sm cursor-pointer">
            Send <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
