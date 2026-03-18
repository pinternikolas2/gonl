import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cz from '../locales/cz.json';
import sk from '../locales/sk.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

const locales = { cz, sk, en };

export function LanguageProvider({ children }) {
  const location = useLocation();
  const [language, setLanguage] = useState(() => {
    // 1. Check persistence
    const saved = localStorage.getItem('gonl_lang');
    if (saved) return saved;

    // 2. Domain detection
    const host = window.location.hostname;
    if (host.endsWith('.cz')) return 'cz';
    if (host.endsWith('.sk')) return 'sk';

    return 'cz'; // Default
  });

  // 3. Route enforcement (Forced EN for /partner/*)
  useEffect(() => {
    if (location.pathname.startsWith('/partner')) {
      // We don't change the state but we can potentially force translations to EN
      // However, for pure B2B, force EN state
      if (language !== 'en') {
        // setLanguage('en'); 
        // Note: Forcing state might annoy users who want to switch back.
        // Better to just use 'en' directly in those components if needed,
        // but user requested "vždy vynuť EN".
        setLanguage('en');
      }
    }
  }, [location.pathname]);

  // Persistence
  useEffect(() => {
    localStorage.setItem('gonl_lang', language);
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let result = locales[language] || locales['cz']; // Fallback to cz if language invalid
    for (const key of keys) {
      if (!result || !result[key]) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
}
