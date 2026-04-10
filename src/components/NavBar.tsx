import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n, LANGUAGES } from '../i18n/index';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{ background: '#0d1117', borderBottom: '1px solid #30363d' }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-bold text-black text-sm">PM</div>
            <div>
              <span className="text-amber-500 font-bold text-lg tracking-tight">PARET</span>
              <span className="text-gray-400 text-lg ml-1">MINING</span>
              <span className="text-gray-600 text-xs block -mt-1 ml-1 tracking-widest">AI PORTAL</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}>{t('nav.home')}</Link>
            <Link to="/portal" className={`text-sm font-medium transition-colors ${isActive('/portal') ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}>{t('nav.portal')}</Link>
            <Link to="/portal/dashboard" className={`text-sm font-medium transition-colors ${isActive('/portal/dashboard') ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}>{t('nav.dashboard')}</Link>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}
              >
                <span>{LANGUAGES.find(l => l.code === lang)?.flag}</span>
                <span>{LANGUAGES.find(l => l.code === lang)?.label}</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 rounded-xl py-1 z-50 min-w-36" style={{ background: '#161b22', border: '1px solid #30363d' }}>
                  {LANGUAGES.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-colors ${lang === l.code ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}
                      style={{ background: 'none', border: 'none', textAlign: 'left' }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && <span className="ml-auto text-amber-500">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold px-5 py-2 rounded transition-colors">
              {t('nav.requestDemo')}
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-400 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ background: '#0d1117', borderColor: '#161b22' }}>
          <Link to="/" className="block text-gray-300 hover:text-amber-500 text-sm font-medium" onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link>
          <Link to="/portal" className="block text-gray-300 hover:text-amber-500 text-sm font-medium" onClick={() => setMenuOpen(false)}>{t('nav.portal')}</Link>
          <Link to="/portal/dashboard" className="block text-gray-300 hover:text-amber-500 text-sm font-medium" onClick={() => setMenuOpen(false)}>{t('nav.dashboard')}</Link>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setMenuOpen(false); }}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded cursor-pointer ${lang === l.code ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-300'}`}
                style={{ border: 'none' }}>
                <span>{l.flag}</span>{l.label}
              </button>
            ))}
          </div>
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-black text-sm font-semibold px-5 py-2 rounded">{t('nav.requestDemo')}</button>
        </div>
      )}
    </nav>
  );
}