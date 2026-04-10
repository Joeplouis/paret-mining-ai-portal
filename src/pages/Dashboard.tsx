import { useState } from 'react';
import NavBar from '../components/NavBar';
import StatsCard from '../components/StatsCard';
import DashboardTable from '../components/DashboardTable';
import DocumentPanel from '../components/DocumentPanel';
import { mockCases } from '../data/mockData';
import { mockDocuments } from '../data/documents';
import { useI18n } from '../i18n/index';

export default function Dashboard() {
  const { t } = useI18n();
  const [activeSection, setActiveSection] = useState<'cases' | 'documents'>('cases');
  const cases = mockCases;
  const documents = mockDocuments;

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh' }}>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">{t('dashboard.title')}</h1>
          <p className="text-gray-400 text-sm">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveSection('cases')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all ${activeSection === 'cases' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            style={{ border: 'none' }}>
            📋 {t('dashboard.tabs.cases')} ({cases.length})
          </button>
          <button onClick={() => setActiveSection('documents')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all ${activeSection === 'documents' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            style={{ border: 'none' }}>
            📎 {t('dashboard.tabs.documents')} ({documents.length})
          </button>
        </div>
        {activeSection === 'cases' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatsCard value={cases.length} label={t('dashboard.stats.totalCases')} color="#f0a500" />
              <StatsCard value={cases.filter(c => c.status === 'new').length} label={t('dashboard.stats.new')} color="#f0a500" />
              <StatsCard value={cases.filter(c => c.status === 'open').length} label={t('dashboard.stats.open')} color="#60a5fa" />
              <StatsCard value={documents.length} label={t('dashboard.stats.documents')} color="#22c55e" />
            </div>
            <div className="mb-4">
              <h2 className="text-white font-semibold mb-3">{t('dashboard.cases.title')}</h2>
            </div>
            <DashboardTable cases={cases} />
          </>
        )}
        {activeSection === 'documents' && (
          <>
            <div className="mb-4 p-4 rounded-xl" style={{ background: '#161b22', border: '1px solid #30363d' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📎</span>
                <div>
                  <h3 className="text-white font-semibold">{t('dashboard.docManager.title')}</h3>
                  <p className="text-gray-400 text-sm">{t('dashboard.docManager.desc')}</p>
                </div>
              </div>
            </div>
            <DocumentPanel documents={documents} />
          </>
        )}
      </div>
    </div>
  );
}
