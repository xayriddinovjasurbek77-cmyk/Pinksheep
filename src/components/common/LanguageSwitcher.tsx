import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { AppLanguage } from '../../types';

interface LanguageSwitcherProps {
  variant?: 'header' | 'compact' | 'inline' | 'sidebar';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { language, setLanguage, supportedLanguages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: AppLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Inline variant (e.g. for Settings page cards)
  if (variant === 'inline') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {supportedLanguages.map((opt) => {
          const isSelected = opt.code === language;
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => handleSelect(opt.code)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#FFF0F7] border-[#EC008C] shadow-xs'
                  : 'bg-white border-[#F5E6EF] hover:border-[#EC008C]/40 hover:bg-[#FFF8FC]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label={opt.name}>
                  {opt.flag}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#242124]">{opt.nativeName}</h4>
                  <p className="text-[10px] text-[#85818A]">{opt.name}</p>
                </div>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-[#EC008C] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-[#FCE7F3] hover:border-[#EC008C]/50 transition-all text-xs font-semibold text-[#242124] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{currentLanguageOption.flag}</span>
            <span>{currentLanguageOption.nativeName}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-[#85818A] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl border border-[#FCE7F3] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            {supportedLanguages.map((opt) => {
              const active = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FFF0F7] text-[#EC008C]'
                      : 'text-[#242124] hover:bg-[#FFF8FC] hover:text-[#EC008C]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{opt.flag}</span>
                    <span>{opt.nativeName}</span>
                  </div>
                  {active && <Check className="w-3.5 h-3.5 text-[#EC008C]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Header and Compact variants
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white hover:bg-[#FFF0F7] border border-[#FCE7F3] hover:border-[#EC008C]/50 text-xs font-bold text-[#242124] transition-all shadow-xs active:scale-95 cursor-pointer"
      >
        <span className="text-base leading-none" role="img" aria-label={currentLanguageOption.name}>
          {currentLanguageOption.flag}
        </span>
        {variant !== 'compact' && (
          <span className="hidden sm:inline-block text-[#242124]">
            {currentLanguageOption.nativeName}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#85818A] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#EC008C]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-2xl border border-[#FCE7F3] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#85818A] border-b border-[#FAF0F5] mb-1">
            Tilni tanlang / Language
          </div>
          {supportedLanguages.map((opt) => {
            const isSelected = opt.code === language;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => handleSelect(opt.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFF0F7] text-[#EC008C]'
                    : 'text-[#242124] hover:bg-[#FFF8FC] hover:text-[#EC008C]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg leading-none" role="img" aria-label={opt.name}>
                    {opt.flag}
                  </span>
                  <div className="text-left">
                    <span className="block leading-tight">{opt.nativeName}</span>
                    <span className="text-[10px] font-normal text-[#85818A] block">
                      {opt.name}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-[#EC008C] shrink-0 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
