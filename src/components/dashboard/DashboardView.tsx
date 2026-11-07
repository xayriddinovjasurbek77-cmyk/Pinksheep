import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PenLine,
  BookOpen,
  Gamepad2,
  Trophy,
  Coins,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Lock,
  TrendingUp,
  Play,
  Users
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    user,
    stats,
    essays,
    transactions,
    achievements,
    setActiveTab,
    progressPercent,
    coinsNeededForNextLevel
  } = useApp();

  // Prepare chart data for essay scores
  const scoreTrendData = essays
    .filter(e => e.score !== undefined)
    .map((e, idx) => ({
      name: `Insho ${idx + 1}`,
      title: e.title,
      score: e.score,
    }));

  // Prepare coin balance data
  const coinHistoryData = [...transactions].reverse().map((t, idx) => ({
    name: t.timestamp.split(',')[0],
    balance: t.balanceAfter,
    amount: t.amount,
  }));

  // If coin history is short, add points for visual elegance
  const displayCoinData = coinHistoryData.length > 0 ? coinHistoryData : [
    { name: 'Start', balance: 50 },
    { name: 'Faollik', balance: 55 },
    { name: 'Insho', balance: 75 },
    { name: 'Tahlil', balance: 85 },
    { name: 'O\'yin', balance: 95 },
    { name: 'G\'alaba', balance: 105 },
  ];

  return (
    <div className="space-y-8 text-left pb-12">
      {/* Dashboard Top Header (Matches Screenshot 6) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
            Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
            Xush kelibsiz, {user.username}!
          </h1>
          <p className="text-sm text-[#85818A] mt-0.5">
            Yozish davomiyligi, tangalaringiz va keyingi qadam — barchasi bir joyda.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF0F7] rounded-full border border-[#FCE7F3] text-xs font-semibold text-[#242124]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Online</span>
          </div>

          <button
            onClick={() => setActiveTab('essay-lab')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-full shadow-md shadow-[#EC008C]/25 transition-all hover:shadow-lg active:scale-95"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Insho yozish</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards (Matches Screenshot 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pink Coins Card */}
        <div
          onClick={() => setActiveTab('pink-coins')}
          className="bg-gradient-to-br from-[#EC008C] to-[#FF4DA6] text-white rounded-3xl p-6 shadow-lg shadow-[#EC008C]/20 cursor-pointer transition-transform hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/90">
              Pink Coin balansi
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
              Ⓟ
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold tracking-tight tabular-nums">
              {user.pinkCoins}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-white/80 hover:text-white">
            <span>Tranzaksiyalar tarixi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Essays Completed Card */}
        <div
          onClick={() => setActiveTab('essay-history')}
          className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs cursor-pointer hover:border-[#EC008C]/40 transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#85818A]">
              Yozilgan insholar
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F7] flex items-center justify-center text-[#EC008C]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-[#242124] tracking-tight tabular-nums">
              {stats.essaysCompleted}
            </span>
          </div>
          <div className="mt-4 text-xs text-[#85818A] font-medium">
            <span>{stats.analysesRun} ta tahlil o‘tkazildi</span>
          </div>
        </div>

        {/* Games Played Card */}
        <div
          onClick={() => setActiveTab('games')}
          className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs cursor-pointer hover:border-[#EC008C]/40 transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#85818A]">
              O‘ynalgan o‘yinlar
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F7] flex items-center justify-center text-[#EC008C]">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-[#242124] tracking-tight tabular-nums">
              {stats.gamesPlayed}
            </span>
          </div>
          <div className="mt-4 text-xs text-[#85818A] font-medium">
            <span>{stats.victories} ta g‘alaba</span>
          </div>
        </div>

        {/* Leaderboard Rank Card */}
        <div
          onClick={() => setActiveTab('leaderboard')}
          className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs cursor-pointer hover:border-[#EC008C]/40 transition-all hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#85818A]">
              Reytingdagi o‘rningiz
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F7] flex items-center justify-center text-[#EC008C]">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold text-[#242124] tracking-tight tabular-nums">
              #{stats.rank}
            </span>
          </div>
          <div className="mt-4 text-xs text-[#85818A] font-medium">
            <span>Pink Coin bo‘yicha</span>
          </div>
        </div>
      </div>

      {/* Two Trend Charts Row (Matches Screenshot 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Essay Score Trend */}
        <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#242124]">Insho ballari dinamikasi</h3>
            <p className="text-xs text-[#85818A]">Eng qadimgi tahlildan yangisigacha barcha AI tekshiruvlari.</p>
          </div>

          <div className="mt-6 h-56 flex items-center justify-center">
            {scoreTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTrendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FCE7F3" vertical={false} />
                  <XAxis dataKey="name" stroke="#85818A" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#85818A" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #FCE7F3',
                      boxShadow: '0 4px 12px rgba(236,0,140,0.1)',
                      fontSize: '12px',
                      color: '#242124'
                    }}
                    formatter={(val: any) => [`${val} ball`, 'Natija']}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#EC008C"
                    strokeWidth={3}
                    dot={{ fill: '#EC008C', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center p-6 space-y-2">
                <TrendingUp className="w-8 h-8 text-[#EC008C] mx-auto opacity-70" />
                <p className="text-xs text-[#85818A] max-w-xs">
                  Birinchi AI insho tahlilini o‘tkazing va bu yerda ballar grafigi chiziladi.
                </p>
                <button
                  onClick={() => setActiveTab('essay-lab')}
                  className="mt-2 text-xs font-bold text-[#EC008C] hover:underline"
                >
                  Insho yozishni boshlash →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pink Coins Over Time Area Chart */}
        <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#242124]">Pink Coin to‘plash grafigi</h3>
              <p className="text-xs text-[#85818A]">Har bir ta'limiy mashqdan keyingi balans o‘sishi.</p>
            </div>
            <span className="text-xs font-extrabold text-[#EC008C] bg-[#FFF0F7] px-3 py-1 rounded-full border border-[#FCE7F3]">
              {user.pinkCoins} hozir
            </span>
          </div>

          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayCoinData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="pinkCoinGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC008C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#EC008C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#FCE7F3" vertical={false} />
                <XAxis dataKey="name" stroke="#85818A" fontSize={11} tickLine={false} />
                <YAxis stroke="#85818A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #FCE7F3',
                    fontSize: '12px',
                    color: '#242124'
                  }}
                  formatter={(val: any) => [`${val} tanga`, 'Balans']}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#EC008C"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#pinkCoinGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Level Progress & Achievements (Matches Screenshot 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Level 1 Progress Card (8 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF0F7] flex items-center justify-center text-[#EC008C] font-bold text-xs">
                L{user.level}
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EC008C]">
                  LEVEL {user.level} · {user.level === 1 ? "Oddiy Qo'y" : user.level === 2 ? "Ijodkor Qo'y" : "Afsonaviy Qo'y"}
                </span>
                <p className="text-xs font-semibold text-[#85818A]">
                  {user.pinkCoins} tanga to‘plangan
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#85818A]">
                Keyingi: {user.level === 1 ? "Ijodkor Qo'y" : "Afsonaviy Qo'y"}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#242124]">Keyingi darajagacha progress</span>
              <span className="text-[#EC008C] tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-[#FFF0F7] rounded-full overflow-hidden p-0.5 border border-[#FCE7F3]">
              <div
                className="h-full bg-[#EC008C] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Metrics needed */}
          <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#FAF0F5]">
            <div>
              <p className="text-xs text-[#85818A] font-medium">Kerakli Pink Coin</p>
              <p className="text-xl font-extrabold text-[#242124] tabular-nums mt-0.5">
                {coinsNeededForNextLevel}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#85818A] font-medium">Kerakli insholar soni</p>
              <p className="text-xl font-extrabold text-[#242124] tabular-nums mt-0.5">
                {Math.max(0, 3 - stats.essaysCompleted)}
              </p>
            </div>
          </div>

          {/* Unlocked / Locked Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3] text-[11px] text-[#242124] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
              <span className="truncate">Asosiy AI tahlili</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3] text-[11px] text-[#242124] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
              <span className="truncate">Boshlang‘ich o‘yinlar</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FFF8FC] border border-[#FCE7F3] text-[11px] text-[#242124] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#EC008C] shrink-0" />
              <span className="truncate">Standart profil</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-400 font-medium">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Kengaytirilgan tahlil</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-400 font-medium">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Haftalik reyting</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-400 font-medium">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Neon profil ramkasi</span>
            </div>
          </div>
        </div>

        {/* Recent Achievements Card (5 cols) (Matches Screenshot 7) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#EC008C]" />
              <h3 className="text-base font-bold text-[#242124]">So‘nggi yutuqlar</h3>
            </div>

            <div className="space-y-3">
              {achievements.slice(0, 5).map((ach) => (
                <div
                  key={ach.id}
                  className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-colors ${
                    ach.unlocked
                      ? 'bg-[#FFF8FC] border-[#FCE7F3]'
                      : 'bg-gray-50/50 border-gray-100 opacity-60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-[#EC008C] text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {ach.unlocked ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#242124] truncate">{ach.title}</p>
                    <p className="text-[11px] text-[#85818A] truncate">{ach.description}</p>
                  </div>
                  {ach.unlocked && (
                    <span className="text-[10px] font-extrabold text-[#EC008C] shrink-0">
                      +{ach.rewardCoins} Ⓟ
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#FAF0F5] text-center">
            <button
              onClick={() => setActiveTab('profile')}
              className="text-xs font-bold text-[#EC008C] hover:underline"
            >
              Barcha yutuqlarni ko‘rish →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Essay Activity & Keep The Momentum (Matches Screenshot 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent essay activity (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#242124]">So‘nggi insholar faolligi</h3>
            <button
              onClick={() => setActiveTab('essay-history')}
              className="text-xs font-bold text-[#EC008C] hover:underline"
            >
              Barchasini ko‘rish
            </button>
          </div>

          {essays.length > 0 ? (
            <div className="space-y-3">
              {essays.slice(0, 2).map((es) => (
                <div
                  key={es.id}
                  onClick={() => setActiveTab('essay-lab')}
                  className="p-4 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] hover:border-[#EC008C]/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EC008C]">
                      {es.essayType || es.category || 'Akademik'}
                    </span>
                    <h4 className="text-sm font-bold text-[#242124]">{es.title}</h4>
                    <p className="text-xs text-[#85818A] line-clamp-1">{es.content}</p>
                  </div>

                  <div className="text-right pl-4 shrink-0">
                    {es.score ? (
                      <div className="px-3 py-1 bg-white rounded-xl border border-[#FCE7F3] shadow-xs">
                        <span className="text-sm font-extrabold text-[#EC008C] tabular-nums">
                          {es.score}
                        </span>
                        <span className="text-[10px] text-[#85818A] block">/ 100 ball</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#85818A]">Qoralama</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF0F7] flex items-center justify-center mx-auto text-[#EC008C]">
                <PenLine className="w-6 h-6" />
              </div>
              <p className="text-xs text-[#85818A]">
                Hozircha insholar yo‘q. Qoralamalaringiz va tahlillaringiz shu yerda aks etadi.
              </p>
              <button
                onClick={() => setActiveTab('essay-lab')}
                className="px-5 py-2 bg-[#EC008C] text-white text-xs font-bold rounded-full shadow-md"
              >
                Insho yozishni boshlash
              </button>
            </div>
          )}
        </div>

        {/* Keep the Momentum (5 cols) (Matches Screenshot 7) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#242124]">Sur'atni saqlang</h3>
            <p className="text-xs text-[#85818A] mt-1 leading-relaxed">
              Kuniga ikki daqiqa lug‘at va jumla mashqi oddiy inshoni xalqaro darajada raqobatbardosh qiladi.
            </p>
          </div>

          <div className="space-y-2.5 mt-6">
            <button
              onClick={() => setActiveTab('essay-lab')}
              className="w-full py-3 px-4 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl flex items-center justify-between shadow-md shadow-[#EC008C]/20 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <PenLine className="w-4 h-4" />
                <span>Essay Lab'ni ochish</span>
              </div>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('word-wolf')}
              className="w-full py-3 px-4 bg-white hover:bg-[#FFF8FC] border border-[#E8E4EC] hover:border-[#EC008C]/40 text-[#242124] text-xs font-bold rounded-2xl flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-[#EC008C]" />
                <span>Word Wolf o‘ynash</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#85818A]" />
            </button>

            <button
              onClick={() => setActiveTab('essay-history')}
              className="w-full py-3 px-4 bg-white hover:bg-[#FFF8FC] border border-[#E8E4EC] hover:border-[#EC008C]/40 text-[#242124] text-xs font-bold rounded-2xl flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#EC008C]" />
                <span>Insholar tarixini ko‘rish</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#85818A]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
