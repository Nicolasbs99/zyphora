"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  // Load language preference from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zyphora_language') as Language;
    if (saved === 'es' || saved === 'en') {
      // eslint-disable-next-line
      setLanguage(saved);
      document.title = translations[saved].metadata.title;
      document.documentElement.lang = saved;
    } else {
      // Auto-detect browser language, default to es, switch to en if explicit
      if (typeof navigator !== 'undefined' && navigator.language.startsWith('en')) {
        // eslint-disable-next-line
        setLanguage('en');
        document.title = translations['en'].metadata.title;
        document.documentElement.lang = 'en';
      } else {
        document.title = translations['es'].metadata.title;
        document.documentElement.lang = 'es';
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('zyphora_language', lang);
    document.title = translations[lang].metadata.title;
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
