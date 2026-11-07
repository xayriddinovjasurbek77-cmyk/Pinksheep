import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const CoinHistoryView: React.FC = () => {
  const { user, transactions } = useApp();
  const { t, language } = useLanguage();

  const totalEarned = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSpent = Math.abs(
    transactions
      .filter(t => t.amount < 0)
      .reduce((acc, curr) => acc + curr.amount, 0)
  );

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar */}
      <div>
        <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
          {t('nav.pinkCoins')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
          {t('coins.title')}
        </h1>
        <p className="text-sm text-[#85818A] mt-0.5">
          {t('coins.subtitle')}
        </p>
      </div>

      {/* 3 Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Balance Card (Pink) */}
        <div className="bg-[#EC008C] text-white rounded-3xl p-6 shadow-xl shadow-[#EC008C]/20 flex flex-col justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/90">
            {t('coins.totalBalance')}
          </span>
          <div className="my-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-black">
              Ⓟ
            </div>
            <span className="text-4xl font-extrabold tracking-tight tabular-nums">
              {user.pinkCoins}
            </span>
          </div>
          <span className="text-xs text-white/80 font-medium">
            {language === 'uz' ? 'Foydalanishga tayyor' : language === 'ru' ? 'Доступно к использованию' : 'Ready to use'}
          </span>
        </div>

        {/* Earned (Recent) */}
        <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#85818A]">
            {t('coins.totalEarned')}
          </span>
          <div className="my-3">
            <span className="text-4xl font-extrabold text-emerald-600 tracking-tight tabular-nums">
              +{totalEarned}
            </span>
          </div>
          <span className="text-xs text-[#85818A]">
            {language === 'uz' ? 'Insholar va o‘yinlar orqali' : language === 'ru' ? 'За эссе и победы в играх' : 'From essays and game victories'}
          </span>
        </div>

        {/* Adjusted down */}
        <div className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#85818A]">
            {t('coins.totalSpent')}
          </span>
          <div className="my-3">
            <span className="text-4xl font-extrabold text-[#242124] tracking-tight tabular-nums">
              -{totalSpent}
            </span>
          </div>
          <span className="text-xs text-[#85818A]">
            {language === 'uz' ? 'Maxsus imtiyozlar uchun' : language === 'ru' ? 'На особые привилегии' : 'For exclusive benefits'}
          </span>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E6EF] shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#242124]">{t('coins.history')}</h3>

        <div className="divide-y divide-[#FAF0F5]">
          {transactions.map((tx) => {
            const isPositive = tx.amount >= 0;

            return (
              <div
                key={tx.id}
                className="py-4 flex items-center justify-between gap-4 hover:bg-[#FFF8FC] px-2 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isPositive
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#242124]">
                      {tx.title}
                    </h4>
                    <p className="text-[11px] text-[#85818A]">
                      {tx.description} · {tx.timestamp}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-sm font-extrabold tabular-nums block ${
                      isPositive ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {isPositive ? `+${tx.amount}` : tx.amount}
                  </span>
                  <span className="text-[10px] text-[#85818A] tabular-nums">
                    {language === 'uz' ? 'balans:' : language === 'ru' ? 'баланс:' : 'balance:'} {tx.balanceAfter}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
