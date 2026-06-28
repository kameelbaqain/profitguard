import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dictionary } from './dictionary.js';

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [dir, locale]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      currency: dictionary[locale].currency,
      toggleLocale: () => setLocale((current) => (current === 'en' ? 'ar' : 'en')),
      t: (key) => dictionary[locale][key] ?? key
    }),
    [dir, locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return context;
}
