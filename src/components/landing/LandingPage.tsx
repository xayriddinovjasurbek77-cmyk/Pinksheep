import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Navbar } from '../common/Navbar';
import { PinkSheepMascot } from '../common/PinkSheepMascot';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Trophy,
  Coins,
  CheckCircle2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();
  const { t, language } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('landing.step1Title'),
      desc: t('landing.step1Desc')
    },
    {
      num: '02',
      title: t('landing.step2Title'),
      desc: t('landing.step2Desc')
    },
    {
      num: '03',
      title: t('landing.step3Title'),
      desc: t('landing.step3Desc')
    },
    {
      num: '04',
      title: t('landing.step4Title'),
      desc: t('landing.step4Desc')
    },
    {
      num: '05',
      title: t('landing.step5Title'),
      desc: t('landing.step5Desc')
    },
    {
      num: '06',
      title: t('landing.step6Title'),
      desc: t('landing.step6Desc')
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#EC008C]" />,
      title: t('landing.feat1Title'),
      desc: t('landing.feat1Desc')
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#EC008C]" />,
      title: t('landing.feat2Title'),
      desc: t('landing.feat2Desc')
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-[#EC008C]" />,
      title: t('landing.feat3Title'),
      desc: t('landing.feat3Desc')
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#EC008C]" />,
      title: t('landing.feat4Title'),
      desc: t('landing.feat4Desc')
    },
    {
      icon: <Coins className="w-6 h-6 text-[#EC008C]" />,
      title: t('landing.feat5Title'),
      desc: t('landing.feat5Desc')
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#EC008C]" />,
      title: t('landing.feat6Title'),
      desc: t('landing.feat6Desc')
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#242124] flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FFF8FC] via-white to-white">
        {/* Subtle background ambient pink glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FCE7F3]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-[30rem] h-[30rem] bg-[#FF4DA6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and Actions */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Subtle brand badge */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EC008C] bg-[#FFF0F7] px-3.5 py-1.5 rounded-full border border-[#FCE7F3]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('landing.heroTag')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#242124] leading-[1.1] text-balance">
                {t('landing.heroTitle')}
              </h1>

              <p className="text-lg sm:text-xl text-[#85818A] max-w-xl font-normal leading-relaxed">
                {t('landing.heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('essay-lab')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#EC008C] hover:bg-[#d4007d] rounded-full shadow-lg shadow-[#EC008C]/30 transition-all hover:shadow-xl hover:shadow-[#EC008C]/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{t('landing.heroBtn1')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-7 py-4 text-base font-semibold text-[#242124] bg-white hover:bg-[#FFF8FC] border border-[#E8E4EC] rounded-full transition-all hover:border-[#EC008C]/40"
                >
                  {t('landing.heroBtn2')}
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex items-center gap-6 text-xs text-[#85818A] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EC008C]" />
                  <span>100 {t('common.ball')} · {t('essayLab.rubricTitle')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EC008C]" />
                  <span>{language === 'uz' ? 'O‘zbek tilidagi AI tahlili' : language === 'ru' ? 'AI анализ на русском языке' : 'AI Analysis in English'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Large 3D Pink Sheep Card with floating stats (Screenshot 1) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6EF] shadow-2xl shadow-[#EC008C]/10 text-center flex flex-col items-center">
                {/* Sheep character container */}
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-b from-[#FFF5FA] to-[#FFF0F7] p-4 flex items-center justify-center relative overflow-hidden group">
                  <img
                    src="/src/assets/images/pinksheep_hero_mascot_1793801569565.jpg"
                    alt="PinkSheep 3D Mascot"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-xl drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to SVG mascot if needed
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Brand signature on mascot card */}
                  <div className="absolute bottom-3 text-center">
                    <span className="text-xl font-extrabold text-[#242124]">
                      Pink<span className="text-[#EC008C]">Sheep</span>
                    </span>
                  </div>
                </div>

                {/* Floating pill badge matching Screenshot 1 */}
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#FCE7F3] shadow-md text-xs font-semibold text-[#242124]">
                  <div className="w-5 h-5 rounded-full bg-[#EC008C] text-white flex items-center justify-center text-[10px] font-bold">
                    Ⓟ
                  </div>
                  <span>{t('landing.heroFloatingCoins')}</span>
                </div>

                {/* Additional floating achievement card */}
                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl border border-[#FCE7F3] shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F7] flex items-center justify-center text-[#EC008C]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-medium text-[#85818A]">{t('landing.heroFloatingAchieve')}</p>
                    <p className="text-xs font-bold text-[#242124]">94/100 · {t('landing.heroFloatingEssays')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EC008C]">{t('landing.howItWorksTag')}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#242124] tracking-tight text-balance">
              {t('landing.howItWorksTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-[#FFF8FC] rounded-2xl p-7 border border-[#FCE7F3] hover:border-[#FF4DA6]/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-sm font-extrabold text-[#EC008C] tracking-wide block mb-4">
                    {st.num}
                  </span>
                  <h3 className="text-lg font-bold text-[#242124] mb-2">{st.title}</h3>
                  <p className="text-sm text-[#85818A] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-[#FFF8FC] border-y border-[#FCE7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EC008C]">{t('landing.featuresTag')}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#242124] tracking-tight text-balance">
              {t('landing.featuresTitle')}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#85818A]">
              {t('landing.featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#F5E6EF] hover:border-[#EC008C]/40 transition-all duration-300 hover:shadow-lg text-left space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0F7] flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-[#242124]">{feat.title}</h3>
                <p className="text-sm text-[#85818A] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEVELS & GAMIFICATION */}
      <section id="levels" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EC008C]">{t('landing.levelsTag')}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#242124] tracking-tight">
              {t('landing.levelsTitle')}
            </h2>
            <p className="mt-3 text-base text-[#85818A]">
              {t('landing.levelsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Oddiy Qo'y */}
            <div className="bg-[#FFF8FC] rounded-3xl p-7 border border-[#FCE7F3] text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#85818A]">{t('common.level')} 1</span>
                <h3 className="text-2xl font-extrabold text-[#242124] mt-1">{t('landing.level1Title')}</h3>
                <p className="text-sm font-semibold text-[#EC008C] mt-1">{t('landing.level1Coins')}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-[#242124]">
                    <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                    <span>{t('landing.level1Benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#242124]">
                    <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                    <span>{t('landing.level1Benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#242124]">
                    <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                    <span>{t('landing.level1Benefit3')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F5E6EF]">
                <span className="text-xs text-[#85818A]">{language === 'uz' ? 'Barcha yangi foydalanuvchilar shu darajadan boshlaydi' : language === 'ru' ? 'Все новые пользователи начинают с этого уровня' : 'All new students begin at this level'}</span>
              </div>
            </div>

            {/* Level 2: Ijodkor Qo'y */}
            <div className="bg-[#FFF0F7] rounded-3xl p-7 border-2 border-[#EC008C] text-left flex flex-col justify-between shadow-xl shadow-[#EC008C]/10 relative">
              <div className="absolute -top-3.5 right-6 bg-[#EC008C] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {language === 'uz' ? 'Ommabop' : language === 'ru' ? 'Популярный' : 'Popular'}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EC008C]">{t('common.level')} 2</span>
                <h3 className="text-2xl font-extrabold text-[#242124] mt-1">{t('landing.level2Title')}</h3>
                <p className="text-sm font-semibold text-[#EC008C] mt-1">{t('landing.level2Coins')}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-[#242124]">
                    <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                    <span>{t('landing.level2Benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#242124]">
                    <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                    <span>{t('landing.level2Benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#242124]">
                    <CheckCircle2 className="w-4 h-4 text-[#EC008C] shrink-0" />
                    <span>{t('landing.level2Benefit3')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F8D4E7]">
                <button
                  onClick={() => setActiveTab('games')}
                  className="w-full py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  {t('nav.games')}
                </button>
              </div>
            </div>

            {/* Level 3: Afsonaviy Qo'y */}
            <div className="bg-[#242124] text-white rounded-3xl p-7 border border-[#3A353A] text-left flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF4DA6]">{t('common.level')} 3</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{t('landing.level3Title')}</h3>
                <p className="text-sm font-semibold text-[#FF4DA6] mt-1">{t('landing.level3Coins')}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4DA6] shrink-0" />
                    <span>{t('landing.level3Benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4DA6] shrink-0" />
                    <span>{t('landing.level3Benefit2')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4DA6] shrink-0" />
                    <span>{t('landing.level3Benefit3')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#3A353A]">
                <span className="text-xs text-[#85818A]">{language === 'uz' ? 'Eng tirishqoq talabalar uchun' : language === 'ru' ? 'Для самых старательных студентов' : 'For the most dedicated writers'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#EC008C] rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-[#EC008C]/30">
            {/* Background circular decorations */}
            <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t('landing.ctaTitle')}
              </h2>
              <p className="text-base sm:text-xl text-white/90 font-medium">
                {t('landing.ctaSubtitle')}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="inline-flex items-center gap-2 px-9 py-4 bg-white text-[#EC008C] hover:bg-neutral-100 font-bold text-base rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <span>{t('landing.ctaButton')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-8 bg-white border-t border-[#F5E6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PinkSheepMascot size="sm" />
            <span className="text-sm font-bold text-[#242124]">
              Pink<span className="text-[#EC008C]">Sheep</span>
            </span>
          </div>
          <p className="text-xs text-[#85818A]">
            {t('landing.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};
