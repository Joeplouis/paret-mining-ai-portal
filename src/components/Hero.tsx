import { useI18n } from '../i18n/index';

export default function Hero() {
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a2332 100%)' }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#f0a500 1px, transparent 1px), linear-gradient(90deg, #f0a500 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-amber-500 text-xs font-medium tracking-wide uppercase">{t('hero.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            {t('hero.headline')}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">{t('hero.subtext')}</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#features" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3.5 rounded text-center transition-colors">{t('hero.cta1')}</a>
            <button className="border border-gray-600 hover:border-amber-500 text-gray-300 hover:text-amber-500 font-semibold px-8 py-3.5 rounded text-center transition-colors cursor-pointer">{t('hero.cta2')}</button>
          </div>
          <div className="flex gap-8 pt-8 border-t border-gray-800">
            {[['stat1Value','stat1Label'],['stat2Value','stat2Label'],['stat3Value','stat3Label'],['stat4Value','stat4Label']].map(([v,l]) => (
              <div key={l as string}>
                <div className="text-2xl font-bold text-amber-500">{t(`hero.${v}`)}</div>
                <div className="text-gray-500 text-xs mt-0.5 tracking-wide">{t(`hero.${l}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}