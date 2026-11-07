import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PinkSheepMascot } from './PinkSheepMascot';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    loginUser,
    registerUser,
    setActiveTab
  } = useApp();

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
      setErrorMsg('Iltimos, to‘g‘ri elektron pochta manzilini kiriting.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Parol kamida 6 ta belgidan iborat bo‘lishi lozim.');
      return;
    }

    if (authMode === 'register' && !username.trim()) {
      setErrorMsg('Iltimos, to‘liq ismingiz yoki taxallusingizni kiriting.');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'register') {
        const res = await registerUser(username, email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Ro‘yxatdan o‘tishda xatolik yuz berdi.');
        }
      } else {
        const res = await loginUser(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Kirishda xatolik yuz berdi.');
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
            Pink<span className="text-[#EC008C]">Sheep</span> Ta'lim Portali
          </h2>
          <p className="text-xs text-[#85818A] max-w-xs mx-auto">
            {authMode === 'register'
              ? 'Yangi hisob oching va darhol 50 Pink Coin start bonusiga ega bo‘ling'
              : 'Akademik insholar studiyasi va o‘yinlarga xush kelibsiz'}
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
            Kirish
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
            Ro‘yxatdan o‘tish
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
                Ism yoki taxallus
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="masalan: Azizbek Otabekov"
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
            <span>{loading ? 'Tekshirilmoqda...' : authMode === 'register' ? 'Ro‘yxatdan o‘tish' : 'Tizimga kirish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge note */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#85818A] border-t border-[#FAF0F5]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Xavfsiz SHA-256 shifrlangan autentifikatsiya tizimi</span>
        </div>
      </div>
    </div>
  );
};
