import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  Zap,
  Shuffle,
  Brain,
  BookOpen,
  Award,
  Puzzle,
  Gamepad2,
  Trophy,
  Coins,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const GamesHubView: React.FC = () => {
  const { stats, user, setActiveTab } = useApp();

  const games = [
    {
      id: 'word-wolf' as ActiveTab,
      title: 'Word Wolf',
      uzbekTitle: 'So‘z bo‘risi',
      desc: 'Bo‘ri yetib kelguncha oddiy so‘zni kuchli akademik muqobiliga almashtiring.',
      icon: <Zap className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-[#EC008C] to-[#FF4DA6]',
      reward: '10 Pink Coin',
      difficulty: 'Oson / O‘rta',
      badge: 'Tezkor poyga'
    },
    {
      id: 'sentence-builder' as ActiveTab,
      title: 'Sentence Builder',
      uzbekTitle: 'Jumla quruvchi',
      desc: 'Aralashib ketgan so‘zlardan grammatik va mantiqiy mukammal akademik jumla tuzing.',
      icon: <Shuffle className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      reward: '10 Pink Coin',
      difficulty: 'O‘rta',
      badge: 'Sintaksis'
    },
    {
      id: 'essay-logic' as ActiveTab,
      title: 'Essay Logic',
      uzbekTitle: 'Insho mantiqi',
      desc: 'Eng kuchli tezis, ishonchli dalil yoki xulosa variantini tanlab insho tuzilishini mustahkamlang.',
      icon: <Brain className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-sky-500 to-cyan-500',
      reward: '10 Pink Coin',
      difficulty: 'Akademik',
      badge: 'Tanqidiy fikr'
    },
    {
      id: 'vocab-challenge' as ActiveTab,
      title: 'Vocabulary Challenge',
      uzbekTitle: 'Akademik lug‘at sinovi',
      desc: "Xalqaro grantlar va IELTS 8.0+ uchun zarur bo‘lgan ilg‘or so‘zlarni o‘zbekcha ma'nosi bilan juftlang.",
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      reward: '10 Pink Coin',
      difficulty: 'Ilg‘or',
      badge: 'Leksika'
    },
    {
      id: 'grammar-master' as ActiveTab,
      title: 'Grammar Master',
      uzbekTitle: 'Grammatika ustasi',
      desc: 'Inversiya, murakkab shart jumlalari va bog‘lovchilar bo‘yicha to‘g‘ri grammatik variantni toping.',
      icon: <Award className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
      reward: '10 Pink Coin',
      difficulty: 'Qiyin',
      badge: 'Stilistika'
    },
    {
      id: 'word-builder' as ActiveTab,
      title: 'Word Builder',
      uzbekTitle: 'So‘z yasovchi',
      desc: 'Prefiks, suffiks va o‘zaklar yordamida akademik iboralar va so‘z birikmalarini hosil qiling.',
      icon: <Puzzle className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-rose-500 to-pink-600',
      reward: '10 Pink Coin',
      difficulty: 'O‘rta',
      badge: 'Morfologiya'
    }
  ];

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar (Matches Screenshot 9) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
            O‘yinlar
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
            Ikki daqiqada mashq qiling
          </h1>
          <p className="text-sm text-[#85818A] mt-0.5 max-w-2xl">
            Insholaringizga zarur bo‘lgan so‘z boyligi va akademik tafakkurni shakllantiruvchi qisqa o‘yinlar. Har bir to‘g‘ri javob Pink Coin to‘laydi.
          </p>
        </div>

        {/* 3 Stat Badges (Matches Screenshot 9) */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-white rounded-2xl border border-[#F5E6EF] shadow-xs flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#EC008C]" />
            <span className="text-xs font-extrabold text-[#242124] tabular-nums">
              {stats.gamesPlayed} ta o‘yin
            </span>
          </div>

          <div className="px-4 py-2 bg-white rounded-2xl border border-[#F5E6EF] shadow-xs flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#EC008C]" />
            <span className="text-xs font-extrabold text-[#242124] tabular-nums">
              {stats.victories} ta g‘alaba
            </span>
          </div>

          <div className="px-4 py-2 bg-[#FFF0F7] rounded-2xl border border-[#FCE7F3] shadow-xs flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#EC008C]" />
            <span className="text-xs font-extrabold text-[#EC008C] tabular-nums">
              {user.pinkCoins} Pink Coin
            </span>
          </div>
        </div>
      </div>

      {/* 6 Games Grid (Matches Screenshot 9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => setActiveTab(game.id)}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] hover:border-[#EC008C]/50 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${game.color} flex items-center justify-center shadow-md shadow-pink-500/10`}>
                  {game.icon}
                </div>
                <span className="text-[10px] font-extrabold text-[#EC008C] bg-[#FFF0F7] px-2.5 py-1 rounded-full border border-[#FCE7F3]">
                  {game.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#242124] group-hover:text-[#EC008C] transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs font-semibold text-[#85818A]">
                  {game.uzbekTitle}
                </p>
                <p className="text-xs text-[#85818A] leading-relaxed pt-2">
                  {game.desc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#FAF0F5] flex items-center justify-between">
              <span className="text-xs font-bold text-[#EC008C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>O‘ynash</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>

              <span className="text-[11px] font-semibold text-[#85818A]">
                +{game.reward}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rewards Explanatory Card (Matches Screenshot 9) */}
      <div className="p-6 rounded-3xl bg-[#FFF8FC] border border-[#FCE7F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-extrabold text-[#242124] uppercase tracking-wider">
            Mukofotlar qanday hisoblanadi?
          </h4>
          <p className="text-xs text-[#85818A] mt-1">
            Har bir savol uchun tanga bir marta to‘lanadi. Ilk g‘alabangiz uchun bir martalik maxsus bonus taqdim etiladi.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-[#242124] text-xs font-bold rounded-2xl border border-[#E8E4EC] shadow-xs shrink-0 self-start sm:self-auto"
        >
          Reytingni ko‘rish →
        </button>
      </div>
    </div>
  );
};
