import React from 'react';
import { useLocale } from '../../i18n/LocaleProvider.jsx';

export function TopBar() {
  const { locale, toggleLocale, t } = useLocale();

  return (
    <header className="safe-top sticky top-0 z-30 bg-guard-bg/90 px-4 pb-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-guard-emerald">PWA</p>
          <h1 className="text-xl font-bold tracking-normal text-white">{t('app_title')}</h1>
        </div>
        <button
          type="button"
          onClick={toggleLocale}
          className="h-10 rounded-full bg-guard-card px-4 text-sm font-bold text-white ring-1 ring-white/10"
          aria-label="Toggle language"
        >
          <span className={locale === 'en' ? 'text-guard-emerald' : 'text-guard-muted'}>EN</span>
          <span className="mx-2 text-guard-muted">|</span>
          <span className={locale === 'ar' ? 'text-guard-emerald' : 'text-guard-muted'}>ع</span>
        </button>
      </div>
    </header>
  );
}
