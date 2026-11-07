import React from 'react';
import { useApp } from '../../context/AppContext';
import { PinkSheepLogo } from './PinkSheepMascot';
import { ArrowRight, Sparkles, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setActiveTab, setAuthModalOpen, setAuthMode, user } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F5E6EF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark with PinkSheep logo */}
        <PinkSheepLogo onClick={() => setActiveTab('landing')} />

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#85818A]">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            Bosh sahifa
          </a>
          <a
            href="#features"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            Imkoniyatlar
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            Qanday ishlaydi
          </a>
          <a
            href="#levels"
            onClick={(e) => { e.preventDefault(); setActiveTab('landing'); document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hover:text-[#EC008C] transition-colors whitespace-nowrap"
          >
            Darajalar
          </a>
        </nav>

        {/* Zone 3: Primary action button / User Portal */}
        <div className="flex items-center gap-3 shrink-0">
          {!user.isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-[#242124] hover:text-[#EC008C] transition-colors whitespace-nowrap"
              >
                Kirish
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#EC008C] hover:bg-[#d4007d] rounded-full shadow-md shadow-[#EC008C]/25 transition-all hover:shadow-lg hover:shadow-[#EC008C]/35 active:scale-95 whitespace-nowrap"
              >
                <span>Ro‘yxatdan o‘tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#EC008C] hover:bg-[#d4007d] rounded-full shadow-md shadow-[#EC008C]/25 transition-all hover:shadow-lg hover:shadow-[#EC008C]/35 active:scale-95 whitespace-nowrap"
            >
              <span>Kabinetga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
