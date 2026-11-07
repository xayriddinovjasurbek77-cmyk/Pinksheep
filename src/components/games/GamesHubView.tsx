import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
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
} from 'lucide-react';

export const GamesHubView: React.FC = () => {
  const { stats, user, setActiveTab } = useApp();
  const { t, language } = useLanguage();

  const games = [
    {
      id: 'word-wolf' as ActiveTab,
      title: 'Word Wolf',
      subTitle: language === 'uz' ? 'So‘z bo‘risi' : language === 'ru' ? 'Слово-волк' : 'Word Hunter',
      desc: language === 'uz'
        ? 'Bo‘ri yetib kelguncha oddiy so‘zni kuchli akademik muqobiliga almashtiring.'
        : language === 'ru'
        ? 'Замените простое слово на академический аналог до прибытия волка.'
        : 'Swap a weak word for academic precision before the wolf arrives.',
      icon: <Zap className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-[#EC008C] to-[#FF4DA6]',
      reward: '10 Pink Coin',
      badge: language === 'uz' ? 'Tezkor poyga' : language === 'ru' ? 'Скоростная гонка' : 'Speed run'
    },
    {
      id: 'sentence-builder' as ActiveTab,
      title: 'Sentence Builder',
      subTitle: language === 'uz' ? 'Jumla quruvchi' : language === 'ru' ? 'Конструктор предложений' : 'Syntax builder',
      desc: language === 'uz'
        ? 'Aralashib ketgan so‘zlardan grammatik va mantiqiy mukammal akademik jumla tuzing.'
        : language === 'ru'
        ? 'Соберите перемешанные слова в грамматически и логически идеальное предложение.'
        : 'Rebuild shuffled words into a clean academic sentence.',
      icon: <Shuffle className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      reward: '10 Pink Coin',
      badge: language === 'uz' ? 'Sintaksis' : language === 'ru' ? 'Синтаксис' : 'Syntax'
    },
    {
      id: 'essay-logic' as ActiveTab,
      title: 'Essay Logic',
      subTitle: language === 'uz' ? 'Insho mantiqi' : language === 'ru' ? 'Логика эссе' : 'Essay reasoning',
      desc: language === 'uz'
        ? 'Eng kuchli tezis, ishonchli dalil yoki xulosa variantini tanlab insho tuzilishini mustahkamlang.'
        : language === 'ru'
        ? 'Выберите сильнейший тезис, аргумент или вывод для усиления структуры эссе.'
        : 'Pick the strongest argument, evidence or conclusion to reinforce structure.',
      icon: <Brain className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-sky-500 to-cyan-500',
      reward: '10 Pink Coin',
      badge: language === 'uz' ? 'Mantiq' : language === 'ru' ? 'Логика' : 'Logic'
    },
    {
      id: 'vocab-challenge' as ActiveTab,
      title: 'Vocabulary Challenge',
      subTitle: language === 'uz' ? 'Akademik lug‘at sinovi' : language === 'ru' ? 'Тест словарного запаса' : 'Vocab challenge',
      desc: language === 'uz'
        ? 'Xalqaro grantlar va IELTS 8.0+ uchun zarur bo‘lgan ilg‘or so‘zlarni ma\'nosi bilan juftlang.'
        : language === 'ru'
        ? 'Сопоставьте продвинутые слова для грантов и IELTS 8.0+ с их точными значениями.'
        : 'Match advanced academic words needed for scholarships and IELTS 8.0+.',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      reward: '10 Pink Coin',
      badge: language === 'uz' ? 'Leksika' : language === 'ru' ? 'Лексика' : 'Lexis'
    },
    {
      id: 'grammar-master' as ActiveTab,
      title: 'Grammar Master',
      subTitle: language === 'uz' ? 'Grammatika ustasi' : language === 'ru' ? 'Мастер грамматики' : 'Grammar master',
      desc: language === 'uz'
        ? 'Inversiya, murakkab shart jumlalari va bog‘lovchilar bo‘yicha to‘g‘ri grammatik variantni toping.'
        : language === 'ru'
        ? 'Найдите правильный вариант грамматики: инверсии, условные предложения и связки.'
        : 'Master inversion, complex conditionals, and connectors with rapid-fire questions.',
      icon: <Award className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
      reward: '10 Pink Coin',
      badge: language === 'uz' ? 'Grammatika' : language === 'ru' ? 'Грамматика' : 'Grammar'
    },
    {
      id: 'word-builder' as ActiveTab,
      title: 'Word Builder',
      subTitle: language === 'uz' ? 'So‘z yasovchi' : language === 'ru' ? 'Словообразование' : 'Morphology builder',
      desc: language === 'uz'
        ? 'Prefiks, suffiks va o‘zaklar yordamida akademik iboralar va so‘z birikmalarini hosil qiling.'
        : language === 'ru'
        ? 'Создавайте академические выражения с помощью префиксов, суффиксов и корней.'
        : 'Construct advanced academic vocabulary using prefixes, suffixes, and stems.',
      icon: <Puzzle className="w-5 h-5 text-white" />,
      color: 'bg-gradient-to-r from-rose-500 to-pink-600',
      reward: '10 Pink Coin',
      badge: language === 'uz' ? 'Morfologiya' : language === 'ru' ? 'Морфология' : 'Morphology'
    }
  ];

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
            {t('nav.games')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
            {t('games.hubTitle')}
          </h1>
          <p className="text-sm text-[#85818A] mt-0.5 max-w-2xl">
            {t('games.hubSubtitle')}
          </p>
        </div>

        {/* 3 Stat Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-white rounded-2xl border border-[#F5E6EF] shadow-xs flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#EC008C]" />
            <span className="text-xs font-extrabold text-[#242124] tabular-nums">
              {stats.gamesPlayed} {t('games.played')}
            </span>
          </div>

          <div className="px-4 py-2 bg-white rounded-2xl border border-[#F5E6EF] shadow-xs flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#EC008C]" />
            <span className="text-xs font-extrabold text-[#242124] tabular-nums">
              {stats.victories} {t('games.victories')}
            </span>
          </div>

          <div className="px-4 py-2 bg-[#FFF0F7] rounded-2xl border border-[#FCE7F3] shadow-xs flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#EC008C]" />
            <span className="text-xs font-extrabold text-[#EC008C] tabular-nums">
              {user.pinkCoins} {t('common.coins')}
            </span>
          </div>
        </div>
      </div>

      {/* 6 Games Grid */}
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
                  {game.subTitle}
                </p>
                <p className="text-xs text-[#85818A] leading-relaxed pt-2">
                  {game.desc}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#FAF0F5] flex items-center justify-between">
              <span className="text-xs font-bold text-[#EC008C] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>{t('games.playNow')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>

              <span className="text-[11px] font-semibold text-[#85818A]">
                +{game.reward}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rewards Explanatory Card */}
      <div className="p-6 rounded-3xl bg-[#FFF8FC] border border-[#FCE7F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-extrabold text-[#242124] uppercase tracking-wider">
            {t('games.howRewardsWork')}
          </h4>
          <p className="text-xs text-[#85818A] mt-1">
            {t('games.rewardsDesc')}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-[#242124] text-xs font-bold rounded-2xl border border-[#E8E4EC] shadow-xs shrink-0 self-start sm:self-auto"
        >
          {t('nav.leaderboard')} →
        </button>
      </div>
    </div>
  );
};
