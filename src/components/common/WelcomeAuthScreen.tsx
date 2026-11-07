import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { PinkSheepMascot } from './PinkSheepMascot';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export const WelcomeAuthScreen: React.FC = () => {
  const { loginUser, registerUser, setActiveTab } = useApp();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg(t('auth.errorInvalidEmail'));
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t('auth.errorShortPass'));
      return;
    }

    if (mode === 'register' && !username.trim()) {
      setErrorMsg(t('auth.errorMissingName'));
      return;
    }

    setLoading(true);
    try {
      if (mode === 'register') {
        const res = await registerUser(username, email, password);
        if (!res.success) {
          setErrorMsg(res.error || t('auth.errorGeneric'));
        }
      } else {
        const res = await loginUser(email, password);
        if (!res.success) {
          setErrorMsg(res.error || t('auth.errorGeneric'));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5FA] via-white to-[#FFF8FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative text-left">
      {/* Return to landing button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => setActiveTab('landing')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full border border-[#FCE7F3] text-xs font-bold text-[#85818A] hover:text-[#EC008C] shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.backToLanding')}</span>
        </button>
      </div>

      {/* Language Switcher in top right corner */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher variant="header" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-block relative">
          <PinkSheepMascot size="xl" className="mx-auto shadow-md" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#EC008C] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            ✦
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#242124] tracking-tight">
          Pink<span className="text-[#EC008C]">Sheep</span> {t('auth.welcomeTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#85818A] max-w-sm mx-auto">
          {t('auth.welcomeSubtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#FCE7F3] shadow-xl shadow-[#EC008C]/10 space-y-6">
          {/* Segmented Mode Selector */}
          <div className="flex rounded-2xl bg-[#FFF8FC] p-1 border border-[#FCE7F3]">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white text-[#EC008C] shadow-xs'
                  : 'text-[#85818A] hover:text-[#242124]'
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-white text-[#EC008C] shadow-xs'
                  : 'text-[#85818A] hover:text-[#242124]'
              }`}
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium leading-relaxed">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
                  Ismingiz yoki taxallus
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Azizbek Otabekov"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
                Elektron pochta
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="talaba@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
                  Parol
                </label>
                <span className="text-[10px] text-[#85818A]">kamida 6 ta belgi</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#EC008C] hover:bg-[#d4007d] disabled:opacity-50 text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#EC008C]/25 transition-all mt-2 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Tekshirilmoqda...' : mode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Tizimga kirish'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Note */}
          <div className="p-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-center space-y-1">
            <span className="text-[10px] font-extrabold text-[#EC008C] uppercase tracking-wider block">
              Namoyish hisobi (Demo login)
            </span>
            <p className="text-[11px] text-[#85818A]">
              Email: <strong className="text-[#242124]">dilnurateshayeva58@gmail.com</strong> · Parol: <strong className="text-[#242124]">password123</strong>
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#85818A] border-t border-[#FAF0F5]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Xavfsiz SHA-256 shifrlangan ma'lumotlar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
