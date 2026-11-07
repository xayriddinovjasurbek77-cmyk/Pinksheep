import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { PinkSheepLogo, PinkSheepMascot } from './PinkSheepMascot';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  LayoutGrid,
  PenLine,
  Gamepad2,
  Trophy,
  User,
  BookOpen,
  Coins,
  Settings,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, user, logoutUser } = useApp();
  const { t } = useLanguage();

  // Exactly the 8 main navigation items + Chiqish at bottom
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t('nav.home'), icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'essay-lab', label: t('nav.essayLab'), icon: <PenLine className="w-5 h-5" /> },
    { id: 'games', label: t('nav.games'), icon: <Gamepad2 className="w-5 h-5" /> },
    { id: 'leaderboard', label: t('nav.leaderboard'), icon: <Trophy className="w-5 h-5" /> },
    { id: 'profile', label: t('nav.profile'), icon: <User className="w-5 h-5" /> },
    { id: 'essay-history', label: t('nav.essayHistory'), icon: <BookOpen className="w-5 h-5" /> },
    { id: 'pink-coins', label: t('nav.pinkCoins'), icon: <Coins className="w-5 h-5" /> },
    { id: 'settings', label: t('nav.settings'), icon: <Settings className="w-5 h-5" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (setMobileOpen) setMobileOpen(false);
  };

  const isGameActive = [
    'games',
    'word-wolf',
    'sentence-builder',
    'essay-logic',
    'vocab-challenge',
    'grammar-master',
    'word-builder'
  ].includes(activeTab);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#F5E6EF] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-6 pb-2 border-b border-[#FAF0F5] flex items-center justify-between">
          <PinkSheepLogo onClick={() => handleNavClick('landing')} />
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'games' && isGameActive);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#FFF0F7] text-[#EC008C] font-bold shadow-xs'
                    : 'text-[#85818A] hover:bg-[#FFF8FC] hover:text-[#242124]'
                }`}
              >
                <span className={isActive ? 'text-[#EC008C]' : 'text-[#85818A]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-4 bg-[#EC008C] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* User Mini Profile Card at Bottom */}
        <div className="p-4 border-t border-[#FAF0F5]">
          <LanguageSwitcher variant="sidebar" className="mb-3" />

          <div className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] space-y-3">
            <div
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <PinkSheepMascot avatarId={user.avatarId} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#242124] truncate group-hover:text-[#EC008C] transition-colors">
                  {user.username}
                </p>
                <p className="text-[11px] font-medium text-[#85818A]">
                  {t('common.level')} {user.level} · {user.level === 1 ? t('landing.level1Title') : user.level === 2 ? t('landing.level2Title') : t('landing.level3Title')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs border-t border-[#F8E1EE]">
              <div
                onClick={() => handleNavClick('pink-coins')}
                className="flex items-center gap-1.5 text-[#EC008C] font-bold cursor-pointer hover:underline"
              >
                <div className="w-5 h-5 rounded-full bg-[#EC008C] text-white flex items-center justify-center text-[10px]">
                  Ⓟ
                </div>
                <span>{user.pinkCoins}</span>
                <span className="text-[10px] text-[#85818A] uppercase tracking-wider font-semibold">{t('common.coins')}</span>
              </div>

              <button
                onClick={logoutUser}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#85818A] hover:text-[#EC008C] transition-colors cursor-pointer"
                title={t('common.logout')}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('common.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
