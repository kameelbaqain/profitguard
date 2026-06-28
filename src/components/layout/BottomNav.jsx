import React from 'react';
import { useAppState } from '../../state/AppStateProvider.jsx';
import { useLocale } from '../../i18n/LocaleProvider.jsx';

const tabs = [
  { id: 'dashboard', key: 'dashboard', icon: '⌂' },
  { id: 'log', key: 'log_invoice', icon: '+' },
  { id: 'suppliers', key: 'suppliers', icon: '≡' },
  { id: 'analytics', key: 'analytics', icon: '◌' }
];

export function BottomNav() {
  const { activeScreen, setActiveScreen } = useAppState();
  const { t } = useLocale();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-guard-card/95 px-3 pt-2 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const active = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveScreen(tab.id)}
              className={`flex min-h-14 flex-col items-center justify-center rounded-lg px-1 text-xs font-semibold transition ${
                active ? 'bg-guard-emerald text-black' : 'text-guard-muted'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="mt-1 max-w-full truncate">{t(tab.key)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
