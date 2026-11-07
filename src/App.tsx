import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { LanguageSwitcher } from './components/common/LanguageSwitcher';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { EssayLabView } from './components/essay/EssayLabView';
import { EssayHistoryView } from './components/essay/EssayHistoryView';
import { GamesHubView } from './components/games/GamesHubView';
import { WordWolfGame } from './components/games/WordWolfGame';
import { SentenceBuilderGame } from './components/games/SentenceBuilderGame';
import { EssayLogicGame } from './components/games/EssayLogicGame';
import { VocabularyChallengeGame } from './components/games/VocabularyChallengeGame';
import { GrammarMasterGame } from './components/games/GrammarMasterGame';
import { WordBuilderGame } from './components/games/WordBuilderGame';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { ProfileView } from './components/profile/ProfileView';
import { CoinHistoryView } from './components/coins/CoinHistoryView';
import { SettingsView } from './components/settings/SettingsView';
import { AuthModal } from './components/common/AuthModal';
import { WelcomeAuthScreen } from './components/common/WelcomeAuthScreen';
import { PinkSheepMascot, PinkSheepLogo } from './components/common/PinkSheepMascot';
import { Menu, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, user, notification } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on landing page, show public landing page
  if (activeTab === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#242124] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-pink-500/30 animate-fade-in text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#FF4DA6]" />
            <span>{notification}</span>
          </div>
        )}
      </>
    );
  }

  // Route protection: If user is not authenticated, show Welcome and Auth screen
  if (!user.isAuthenticated) {
    return (
      <>
        <WelcomeAuthScreen />
        <AuthModal />
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#242124] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-pink-500/30 animate-fade-in text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#FF4DA6]" />
            <span>{notification}</span>
          </div>
        )}
      </>
    );
  }

  // Dashboard / Portal layout with Sidebar (authenticated users only)
  return (
    <div className="min-h-screen bg-[#FFF8FC] text-[#242124]">
      {/* Sidebar for desktop & mobile drawer */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Mobile Top Navigation Bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F5E6EF] px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#242124] hover:bg-[#FFF0F7] rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <PinkSheepLogo onClick={() => setActiveTab('dashboard')} />
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="compact" />
            <button
              onClick={() => setActiveTab('pink-coins')}
              className="flex items-center gap-1 px-3 py-1 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-bold text-[#EC008C]"
            >
              <span>Ⓟ</span>
              <span className="tabular-nums">{user.pinkCoins}</span>
            </button>

            <button onClick={() => setActiveTab('profile')}>
              <PinkSheepMascot avatarId={user.avatarId} size="xs" />
            </button>
          </div>
        </header>

        {/* Global Toast Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#242124] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-pink-500/40 text-xs font-semibold max-w-sm">
            <div className="w-6 h-6 rounded-full bg-[#EC008C] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="leading-tight">{notification}</span>
          </div>
        )}

        {/* View Switcher */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'essay-lab' && <EssayLabView />}
          {activeTab === 'essay-history' && <EssayHistoryView />}
          {activeTab === 'games' && <GamesHubView />}
          {activeTab === 'word-wolf' && <WordWolfGame />}
          {activeTab === 'sentence-builder' && <SentenceBuilderGame />}
          {activeTab === 'essay-logic' && <EssayLogicGame />}
          {activeTab === 'vocab-challenge' && <VocabularyChallengeGame />}
          {activeTab === 'grammar-master' && <GrammarMasterGame />}
          {activeTab === 'word-builder' && <WordBuilderGame />}
          {activeTab === 'leaderboard' && <LeaderboardView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'pink-coins' && <CoinHistoryView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
