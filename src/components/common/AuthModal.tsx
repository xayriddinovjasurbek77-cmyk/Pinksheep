import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { PinkSheepMascot } from './PinkSheepMascot';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser,
    registerUser,
  } = useApp();
  const { t, language } = useLanguage();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

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

    if (authMode === 'register' && !username.trim()) {
      setErrorMsg(t('auth.errorMissingName'));
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'register') {
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-[#FCE7F3] shadow-2xl relative text-left">
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mascot & Welcome Header */}
        <div className="text-center space-y-2">
          <PinkSheepMascot size="lg" className="mx-auto shadow-sm" />
          <h2 className="text-2xl font-extrabold text-[#242124] tracking-tight">
            Pink<span className="text-[#EC008C]">Sheep</span> {t('auth.welcomeTitle')}
          </h2>
          <p className="text-xs text-[#85818A] max-w-xs mx-auto">
            {authMode === 'register'
              ? (language === 'uz' ? 'Yangi hisob oching va darhol 50 Pink Coin start bonusiga ega bo‘ling' : language === 'ru' ? 'Создайте аккаунт и получите 50 Pink Coins бонуса' : 'Create an account and get 50 Pink Coins bonus')
              : t('auth.welcomeSubtitle')}
          </p>
        </div>

        {/* Auth Mode Tabs Switcher */}
        <div className="flex rounded-2xl bg-[#FFF8FC] p-1 border border-[#FCE7F3]">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-white text-[#EC008C] shadow-xs'
                : 'text-[#85818A] hover:text-[#242124]'
            }`}
          >
            {t('auth.loginTab')}
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-white text-[#EC008C] shadow-xs'
                : 'text-[#85818A] hover:text-[#242124]'
            }`}
          >
            {t('auth.registerTab')}
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
                {t('auth.usernameLabel')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('auth.usernamePlaceholder')}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
              {t('auth.emailLabel')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FFF8FC] border border-[#FCE7F3] text-xs font-semibold text-[#242124] focus:outline-none focus:border-[#EC008C]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-extrabold text-[#85818A] uppercase tracking-wider">
                {t('auth.passwordLabel')}
              </label>
              <span className="text-[10px] text-[#85818A]">{t('auth.minChars')}</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.passwordPlaceholder')}
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
            <span>{loading ? t('auth.submitting') : authMode === 'register' ? t('auth.submitRegister') : t('auth.submitLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge note */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#85818A] border-t border-[#FAF0F5]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t('auth.encryptedNote')}</span>
        </div>
      </div>
    </div>
  );
};
