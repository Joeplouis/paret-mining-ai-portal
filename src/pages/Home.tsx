import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import RequestDemoModal from '../components/RequestDemoModal';

const features = [
  {
    badge: 'Royalty Owners',
    title: 'Royalty Owner Assistant',
    description: 'Instant answers to owner questions — change of address, direct deposit, check replacement — with guided form workflows that feed directly into your back office.',
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    badge: 'Internal Staff',
    title: 'Compliance Assistant',
    description: 'Staff and partners can instantly query ethics policies, anti-bribery guidelines, due diligence requirements, and reporting procedures — 24/7.',
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    badge: 'Sales Team',
    title: 'Business & Partner Intake',
    description: 'Every fuel, minerals, or logistics inquiry is captured, qualified, and routed to your sales team as a clean case — no missed opportunities.',
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const phases = [
  {
    phase: 'Phase 1',
    name: 'AI Owner & Compliance Portal',
    price: '$2,500/mo',
    setup: '+ $3,500 setup',
    description: 'Everything you need to automate owner requests and compliance Q&A.',
    features: [
      'Royalty Owner AI Assistant (all 4 workflows)',
      'Compliance Policy AI Assistant',
      'Smart intake forms + case creation',
      'Staff dashboard with case management',
      'Email notifications on new cases',
      '1 team seat (admin access)',
      'Standard support',
    ],
    highlight: false,
  },
  {
    phase: 'Phase 2',
    name: '+ Business Development Intake',
    price: '$1,500/mo add-on',
    setup: '+ $2,000 setup',
    description: 'Adds business & partner inquiry capture and lead routing to Phase 1.',
    features: [
      'Everything in Phase 1',
      'Business & Partner Inquiry AI',
      'Lead capture form + CRM routing',
      '3 additional team seats',
      'Lead status tracking dashboard',
      'Priority support',
    ],
    highlight: true,
  },
  {
    phase: 'Add-on',
    name: 'Intelligent Document Processing',
    price: '$750/mo',
    setup: '+ $1,500 setup',
    description: 'AI reads, summarizes, and organizes every uploaded document automatically.',
    features: [
      'AI-powered document reading & summarization',
      'Auto-tagging and categorization',
      'Document approval workflow',
      'Secure storage + instant retrieval',
      'Compliance audit trail',
      'Unlimited document uploads',
    ],
    highlight: false,
  },
];

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh' }}>
      {showDemo && <RequestDemoModal onClose={() => setShowDemo(false)} />}
      <NavBar />
      <Hero />

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Three AI Workflows. One Platform.</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Each workflow handles a real pain point Paret Mining faces daily — paperwork, response time, and lead capture.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-t" style={{ borderColor: '#161b22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Before vs. After</h3>
              <div className="space-y-6">
                {[
                  { before: 'Owner emails with a request → staff reads → manually responds', after: 'AI reads the question, gives the right answer, and opens the form' },
                  { before: 'Staff manually creates a case in a spreadsheet or email', after: 'Case is auto-created, summarized, and routed to the dashboard' },
                  { before: 'No visibility on how many requests came in this week', after: 'Dashboard shows every case, status, and team workload in real time' },
                  { before: 'Missed emails, slow responses, lost leads', after: 'Instant response, 24/7 coverage, every inquiry captured' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: '#f0a500' }}>
                      <span className="text-black text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm line-through">✗ {item.before}</div>
                      <div className="text-green-400 text-sm mt-1">✓ {item.after}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ background: '#161b22', border: '1px solid #30363d' }}>
              <div className="p-3 border-b flex items-center gap-2" style={{ borderColor: '#30363d' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-500 text-xs ml-2">portal — live preview</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[['Today', '8', '#f0a500'], ['New', '3', '#60a5fa'], ['Open', '4', '#f0a500']].map(([label, val, color]) => (
                    <div key={label} className="text-center p-3 rounded-lg" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
                      <div className="text-2xl font-bold" style={{ color }}>{val}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[['RO-2026-001', 'Change of Address', 'New'], ['RO-2026-002', 'Direct Deposit', 'Open'], ['LQ-2026-001', 'Lead — Fuel', 'New']].map(([id, cat, status]) => (
                    <div key={id} className="flex items-center justify-between p-2 rounded-lg text-xs" style={{ background: '#0d1117' }}>
                      <span className="font-mono text-amber-500">{id}</span>
                      <span className="text-gray-400">{cat}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: status === 'New' ? '#f0a50020' : '#1d4ed820', color: status === 'New' ? '#f0a500' : '#60a5fa' }}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 border-t" style={{ borderColor: '#161b22' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Straightforward Pricing</h2>
            <p className="text-gray-400 max-w-xl mx-auto">No per-user fees. No surprise charges. One flat monthly price per phase.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {phases.map(phase => (
              <div
                key={phase.phase}
                className="rounded-2xl p-6"
                style={{
                  background: phase.highlight ? '#1a2332' : '#161b22',
                  border: phase.highlight ? '2px solid #f0a500' : '1px solid #30363d',
                }}
              >
                {phase.highlight && (
                  <div className="text-xs font-semibold text-black bg-amber-500 rounded-full px-3 py-1 mb-3 inline-block">Most Popular</div>
                )}
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{phase.phase}</div>
                <h3 className="text-white font-bold text-lg mb-1">{phase.name}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{phase.description}</p>
                <div className="mb-1">
                  <span className="text-3xl font-bold text-amber-500">{phase.price}</span>
                </div>
                <div className="text-gray-500 text-xs mb-6">{phase.setup}</div>
                <ul className="space-y-2 mb-6">
                  {phase.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-green-400 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowDemo(true)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                    phase.highlight
                      ? 'bg-amber-500 hover:bg-amber-600 text-black'
                      : 'border border-gray-600 hover:border-amber-500 text-gray-300 hover:text-amber-500'
                  }`}
                >
                  Request Demo
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              All plans include onboarding, training, and ongoing support.{' '}
              <button onClick={() => setShowDemo(true)} className="text-amber-500 hover:underline cursor-pointer bg-none border-none">Contact us</button> for custom enterprise pricing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-4">
        <h3 className="text-3xl font-bold text-white mb-4">Ready to see it live?</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Try the portal now or schedule a personalized demo with your team. No commitment needed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/portal" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3.5 rounded text-center transition-colors">
            Try the Portal →
          </Link>
          <button onClick={() => setShowDemo(true)} className="border border-gray-600 hover:border-amber-500 text-gray-300 hover:text-amber-500 font-semibold px-8 py-3.5 rounded text-center transition-colors cursor-pointer">
            Schedule Demo Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: '#161b22' }}>
        <p className="text-gray-600 text-sm">© 2026 Paret Mining USA · AI Operations Portal · Built by BookAI Studio</p>
      </footer>
    </div>
  );
}
