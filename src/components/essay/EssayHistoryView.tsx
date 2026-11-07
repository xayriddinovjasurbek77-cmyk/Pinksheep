import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { BookOpen, PenLine, Calendar, ChevronRight } from 'lucide-react';

export const EssayHistoryView: React.FC = () => {
  const { essays, setActiveTab } = useApp();
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filtered = essays.filter(
    e => filterCategory === 'All' || (e.essayType || e.category) === filterCategory
  );

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold tracking-wider text-[#EC008C] uppercase">
            {t('essayHistory.title')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight">
            {t('essayHistory.title')}
          </h1>
          <p className="text-sm text-[#85818A] mt-0.5">
            {t('essayHistory.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('essay-lab')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EC008C] hover:bg-[#d4007d] text-white text-xs font-bold rounded-2xl shadow-md shadow-[#EC008C]/25 transition-all self-start md:self-auto"
        >
          <PenLine className="w-3.5 h-3.5" />
          <span>{t('essayHistory.writeNew')}</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Scholarship / Statement of Purpose', 'Argumentative', 'IELTS Task 2', 'Problem & Solution', 'Discursive'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-[#EC008C] text-white shadow-xs'
                : 'bg-white border border-[#E8E4EC] text-[#85818A] hover:bg-[#FFF8FC] hover:text-[#242124]'
            }`}
          >
            {cat === 'All' ? t('essayHistory.filterAll') : cat}
          </button>
        ))}
      </div>

      {/* Essays List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((essay) => (
            <div
              key={essay.id}
              onClick={() => setActiveTab('essay-lab')}
              className="bg-white rounded-3xl p-6 border border-[#F5E6EF] shadow-xs hover:border-[#EC008C]/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EC008C] bg-[#FFF0F7] px-2.5 py-1 rounded-md border border-[#FCE7F3]">
                    {essay.essayType || essay.category || 'Academic'}
                  </span>
                  {essay.score ? (
                    <div className="px-3 py-1 bg-[#FFF0F7] rounded-xl border border-[#FCE7F3] text-right">
                      <span className="text-xs font-extrabold text-[#EC008C] tabular-nums">
                        {essay.score} {t('common.of100')}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#85818A]">{t('essayHistory.draft')}</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#242124] group-hover:text-[#EC008C] transition-colors">
                  {essay.title}
                </h3>

                <p className="text-xs text-[#85818A] line-clamp-3 leading-relaxed">
                  {essay.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#FAF0F5] flex items-center justify-between text-xs text-[#85818A]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(essay.updatedAt).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>{essay.wordCount} {t('common.words')}</span>
                </div>

                <span className="font-bold text-[#EC008C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{t('essayLab.viewDraft')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-[#F5E6EF] text-center max-w-md mx-auto space-y-3">
          <BookOpen className="w-12 h-12 text-[#EC008C] mx-auto opacity-70" />
          <h3 className="text-base font-bold text-[#242124]">{t('essayHistory.empty')}</h3>
          <p className="text-xs text-[#85818A]">
            {t('essayHistory.emptyDesc')}
          </p>
        </div>
      )}
    </div>
  );
};
