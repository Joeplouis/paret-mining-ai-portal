import { useState } from 'react';

export default function RequestDemoModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', title: '', company: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
        <div className="w-full max-w-md rounded-2xl p-8 text-center" style={{ background: '#161b22', border: '1px solid #f0a500' }}>
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
          <p className="text-gray-400 text-sm mb-6">Thank you, {form.name.split(' ')[0]}! A member of our team will reach out within 1 business day to schedule your personalized demo.</p>
          <div className="p-4 rounded-xl mb-6" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
            <div className="text-xs text-gray-500 mb-1">What happens next:</div>
            <div className="text-sm text-gray-300 text-left space-y-1.5">
              <div>📧 You'll receive a confirmation email at <span className="text-amber-500">{form.email}</span></div>
              <div>📅 Our team will contact you within 24 hours</div>
              <div>💻 We'll schedule a live walkthrough of the portal</div>
            </div>
          </div>
          <button onClick={onClose} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-lg cursor-pointer transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: '#161b22', border: '1px solid #30363d' }}>
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: '#30363d', background: 'linear-gradient(135deg, #1a2332, #161b22)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">Request a Demo</h3>
              <p className="text-gray-400 text-sm mt-0.5">See the AI Operations Portal in action</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none cursor-pointer">×</button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Full Name *</label>
                <input required type="text" placeholder="John Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Job Title *</label>
                <input required type="text" placeholder="VP of Operations" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Company *</label>
              <input required type="text" placeholder="Paret Mining USA" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Work Email *</label>
                <input required type="email" placeholder="jsmith@paretmining.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Phone</label>
                <input type="tel" placeholder="(305) 555-0100" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm outline-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">What would you like to see? (optional)</label>
              <textarea placeholder="Tell us what workflows matter most to your team..." rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none resize-none" style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3' }} />
            </div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg text-sm cursor-pointer transition-colors">
              Submit Demo Request →
            </button>
            <p className="text-center text-gray-600 text-xs">No commitment required. We respond within 1 business day.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
