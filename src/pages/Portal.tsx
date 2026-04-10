import { useState } from 'react';
import NavBar from '../components/NavBar';
import ChatWindow from '../components/ChatWindow';
import { useI18n } from '../i18n/index';

const tabConfigs = [
  { id: 'royalty' as const, icon: '👤', quickActions: [
    { label: 'Change Address', icon: '🏠', action: 'change-address' },
    { label: 'Direct Deposit', icon: '🏦', action: 'direct-deposit' },
    { label: 'Check Replacement', icon: '📄', action: 'check-replacement' },
    { label: 'New Owner', icon: '✨', action: 'new-owner' },
  ]},
  { id: 'compliance' as const, icon: '🛡️', quickActions: [
    { label: 'Anti-Bribery Policy', icon: '⚖️', action: 'anti-bribery' },
    { label: 'Ethics Reporting', icon: '📋', action: 'ethics' },
    { label: 'Due Diligence', icon: '🔍', action: 'due-diligence' },
    { label: 'Code of Conduct', icon: '📖', action: 'code-of-conduct' },
  ]},
  { id: 'lead' as const, icon: '📈', quickActions: [
    { label: 'Fuel Distribution', icon: '⛽', action: 'lead-fuel' },
    { label: 'Minerals', icon: '🪨', action: 'lead-minerals' },
    { label: 'Logistics', icon: '🚢', action: 'lead-logistics' },
    { label: 'Investment', icon: '💼', action: 'lead-investment' },
  ]},
];

const workflowSteps: Record<string, string[]> = {
  royalty: ['Owner submits request', 'AI answers instantly', 'Smart intake form opens', 'Case created in dashboard', 'Team reviews & resolves'],
  compliance: ['Staff submits compliance question', 'AI pulls from policy docs', 'Full answer displayed', 'Escalation flagged if needed', 'Response logged for audit'],
  lead: ['Prospect selects a service', 'AI gives full service details', 'Follow-up form offered', 'Inquiry captured as case', 'Sales team follows up within 1 day'],
};

export default function Portal() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'royalty' | 'compliance' | 'lead'>('royalty');
  const current = tabConfigs.find(tab => tab.id === activeTab)!;

  const tabLabels: Record<string, string> = {
    royalty: t('portal.tabs.royalty'),
    compliance: t('portal.tabs.compliance'),
    lead: t('portal.tabs.business'),
  };

  const placeholders: Record<string, string> = {
    royalty: t('portal.royaltyPlaceholder'),
    compliance: t('portal.compliancePlaceholder'),
    lead: t('portal.businessPlaceholder'),
  };

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh' }}>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">{t('portal.title')}</h1>
          <p className="text-gray-400 text-sm">{t('portal.subtitle')}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4" style={{ borderColor: '#30363d' }}>
          {tabConfigs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === tab.id ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              style={{ border: 'none' }}>
              <span>{tab.icon}</span><span>{tabLabels[tab.id]}</span>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-500 self-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{t('nav.aiOnline')}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatWindow key={activeTab} quickActions={current.quickActions}
              placeholder={placeholders[activeTab]}
              showAiBadge={true} tabId={activeTab} />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl p-5" style={{ background: '#161b22', border: '1px solid #30363d' }}>
              <h3 className="text-white font-semibold mb-3 text-sm">Workflow Steps</h3>
              <div className="space-y-2">
                {(workflowSteps[activeTab] || workflowSteps.royalty).map((step: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            {activeTab === 'lead' && (
              <div className="rounded-xl p-4" style={{ background: '#1a2332', border: '1px solid #f0a50030' }}>
                <p className="text-gray-300 text-xs leading-relaxed">💡 <span className="text-amber-500 font-semibold">Business Tip:</span> After the AI answers, a "Connect With Our Team" form appears automatically.</p>
              </div>
            )}
            {activeTab === 'compliance' && (
              <div className="rounded-xl p-4" style={{ background: '#1a2332', border: '1px solid #f0a50030' }}>
                <p className="text-gray-300 text-xs leading-relaxed">🛡️ <span className="text-amber-500 font-semibold">Internal Use:</span> Answers sourced from official Paret Mining policies.</p>
              </div>
            )}
            <div className="rounded-xl p-5" style={{ background: '#161b22', border: '1px solid #30363d' }}>
              <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-3">{t('portal.aiPerf.title')}</h4>
              {[
                { label: t('portal.aiPerf.responseTime'), value: '< 2 sec' },
                { label: t('portal.aiPerf.casesToday'), value: '16' },
                { label: t('portal.aiPerf.resolutionRate'), value: '94%' },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-500">{stat.label}</span>
                  <span className="text-amber-500 font-semibold text-xs">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
