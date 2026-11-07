import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { PinkSheepMascot } from '../common/PinkSheepMascot';
import {
  Settings,
  PenLine,
  Trophy,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, stats, achievements, currentLevelInfo, setActiveTab } = useApp();
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
            {t('nav.profile')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
            {user.username}
          </h1>
          <p className="text-sm text-[#85818A] mt-0.5">
            {t('profile.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('settings')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FFF8FC] border border-[#E8E4EC] text-[#242124] text-xs font-bold rounded-2xl shadow-xs transition-all"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t('nav.settings')}</span>
          </button>

          <button
            onClick={() => setActiveTab('essay-lab')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md shadow-[#EC008C]/25 transition-all"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>{t('common.startWriting')}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar & Personal Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6EF] shadow-xs flex flex-col items-center text-center space-y-5">
          <div className="relative">
            <PinkSheepMascot avatarId={user.avatarId} size="2xl" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-[#242124]">{user.username}</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-extrabold text-[#EC008C]">
              <span>{t('common.level')} {user.level} · {currentLevelInfo.name}</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold pt-1">
              ● {t('common.online')}
            </p>
          </div>

          <p className="text-xs text-[#85818A] max-w-xs leading-relaxed italic bg-[#FFF8FC] p-3.5 rounded-2xl border border-[#FCE7F3]">
            "{user.bio || (language === 'uz' ? 'Profil sozlamalarida maqsadlaringiz haqida qisqacha yozib qoldiring.' : language === 'ru' ? 'Напишите немного о себе в настройках профиля.' : 'Share a short note about your writing goals in settings.')}"
          </p>

          <div className="w-full grid grid-cols-2 gap-3 pt-2">
            <div
              onClick={() => setActiveTab('pink-coins')}
              className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] cursor-pointer hover:border-[#EC008C]/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-[#EC008C] font-extrabold text-base tabular-nums">
                <span>Ⓟ</span>
                <span>{user.pinkCoins}</span>
              </div>
              <span className="text-[10px] font-bold text-[#85818A] uppercase tracking-wider block mt-0.5">
                {t('common.coins')}
              </span>
            </div>

            <div
              onClick={() => setActiveTab('leaderboard')}
              className="p-3.5 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] cursor-pointer hover:border-[#EC008C]/50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-[#242124] font-extrabold text-base tabular-nums">
                <Trophy className="w-4 h-4 text-[#EC008C]" />
                <span>#{stats.rank}</span>
              </div>
              <span className="text-[10px] font-bold text-[#85818A] uppercase tracking-wider block mt-0.5">
                {t('nav.leaderboard')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Achievements (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top 3 Stats Strip */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-[#F5E6EF] shadow-xs text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A] block">
                {t('dashboard.completedEssaysCard')}
              </span>
              <span className="text-3xl font-extrabold text-[#242124] tabular-nums mt-1 block">
                {stats.essaysCompleted}
              </span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#F5E6EF] shadow-xs text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A] block">
                {t('dashboard.gamesPlayedCard')}
              </span>
              <span className="text-3xl font-extrabold text-[#242124] tabular-nums mt-1 block">
                {stats.gamesPlayed}
              </span>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-[#F5E6EF] shadow-xs text-left">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#85818A] block">
                {t('games.victories')}
              </span>
              <span className="text-3xl font-extrabold text-[#EC008C] tabular-nums mt-1 block">
                {stats.victories}
              </span>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EC008C]" />
              <h3 className="text-sm font-bold text-[#242124]">{t('profile.achievements')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-colors ${
                    ach.unlocked
                      ? 'bg-[#FFF8FC] border-[#FCE7F3]'
                      : 'bg-gray-50/50 border-gray-100 opacity-60'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-[#EC008C] text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {ach.unlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3 h-3" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#242124] truncate">{ach.title}</p>
                    <p className="text-[10px] text-[#85818A] truncate">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Level Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs space-y-4 text-left">
            <h3 className="text-sm font-bold text-[#242124]">
              {language === 'uz' ? 'Darajangiz imtiyozlari' : language === 'ru' ? 'Привилегии вашего уровня' : 'Your level benefits'}
            </h3>
            <div className="space-y-2">
              {currentLevelInfo.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#242124]">
                  <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
              {currentLevelInfo.lockedBenefits.map((lb, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-400">
                  <Lock className="w-4 h-4 text-gray-300 shrink-0" />
                  <span>{lb} ({language === 'uz' ? 'Qulflangan' : language === 'ru' ? 'Заблокировано' : 'Locked'})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
