import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import uzTranslations from './locales/uz.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import { AppLanguage } from '../types';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'uz', name: "O'zbekcha", nativeName: "O‘zbekcha", flag: '🇺🇿' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
];

const translationsMap: Record<AppLanguage, any> = {
  uz: uzTranslations,
  en: enTranslations,
  ru: ruTranslations
};

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  supportedLanguages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'pinksheep_language_pref';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as AppLanguage | null;
      if (saved && (saved === 'uz' || saved === 'en' || saved === 'ru')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'uz'; // Default to Uzbek for first-time visitors
  });

  const setLanguage = useCallback((newLang: AppLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const parts = key.split('.');
      let current: any = translationsMap[language] || translationsMap.uz;

      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          // Fallback to Uzbek if translation missing
          let fallback: any = translationsMap.uz;
          for (const fbPart of parts) {
            if (fallback && typeof fallback === 'object' && fbPart in fallback) {
              fallback = fallback[fbPart];
            } else {
              fallback = undefined;
              break;
            }
          }
          current = fallback;
          break;
        }
      }

      if (typeof current !== 'string') {
        return key;
      }

      if (params) {
        let result = current;
        for (const [paramKey, paramVal] of Object.entries(params)) {
          result = result.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), String(paramVal));
        }
        return result;
      }

      return current;
    },
    [language]
  );

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageOption
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Convenient alias
export const useTranslation = useLanguage;
