import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { PinkSheepLogo } from './PinkSheepMascot';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setActiveTab, setAuthModalOpen, setAuthMode, user } = useApp();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F5E6EF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand wordmark with PinkSheep logo */}
        <PinkSheepLogo onClick={() => setActiveTab('landing')} />

        {/* Zone 2: Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#85818A]">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            {t('nav.home')}
          </a>
          <a
            href="#features"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            {t('nav.features')}
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            {t('nav.howItWorks')}
          </a>
          <a
            href="#levels"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            {t('nav.levels')}
          </a>
        </nav>

        {/* Zone 3: Language selector & Primary action button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageSwitcher variant="header" />

          {!user.isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="hidden sm:inline-flex px-3.5 py-2 text-sm font-semibold text-[#242124] hover:text-[#EC008C] transition-colors whitespace-nowrap"
              >
                {t('common.login')}
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#EC008C] hover:bg-[#d4007d] rounded-full shadow-md shadow-[#EC008C]/25 transition-all hover:shadow-lg hover:shadow-[#EC008C]/35 active:scale-95 whitespace-nowrap"
              >
                <span>{t('common.register')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#EC008C] hover:bg-[#d4007d] rounded-full shadow-md shadow-[#EC008C]/25 transition-all hover:shadow-lg hover:shadow-[#EC008C]/35 active:scale-95 whitespace-nowrap"
            >
              <span>{t('common.goToCabinet')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
