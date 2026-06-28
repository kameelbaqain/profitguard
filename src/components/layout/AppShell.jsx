import React from 'react';
import { useLocale } from '../../i18n/LocaleProvider.jsx';
import { useAppState } from '../../state/AppStateProvider.jsx';
import { AnalyticsScreen } from '../../screens/AnalyticsScreen.jsx';
import { DashboardScreen } from '../../screens/DashboardScreen.jsx';
import { LogInvoiceScreen } from '../../screens/LogInvoiceScreen.jsx';
import { SuppliersScreen } from '../../screens/SuppliersScreen.jsx';
import { BottomNav } from './BottomNav.jsx';
import { TopBar } from './TopBar.jsx';

const desktopTabs = [
  { id: 'dashboard', key: 'dashboard' },
  { id: 'log', key: 'log_invoice' },
  { id: 'suppliers', key: 'suppliers' },
  { id: 'analytics', key: 'analytics' }
];

export function AppShell() {
  const { locale, dir, t } = useLocale();
  const { activeScreen, setActiveScreen, loading, error } = useAppState();

  const screen = {
    dashboard: <DashboardScreen />,
    log: <LogInvoiceScreen />,
    suppliers: <SuppliersScreen />,
    analytics: <AnalyticsScreen />
  }[activeScreen];

  return (
    <div lang={locale} dir={dir} className={`dark min-h-screen bg-guard-bg text-white ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <TopBar />
      <div className="mx-auto hidden max-w-5xl px-4 md:block">
        <div className="grid grid-cols-4 gap-2 rounded-lg bg-guard-card p-1 ring-1 ring-white/10">
          {desktopTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveScreen(tab.id)}
              className={`h-11 rounded-md text-sm font-semibold transition ${
                activeScreen === tab.id ? 'bg-guard-emerald text-black' : 'text-guard-muted hover:text-white'
              }`}
            >
              {t(tab.key)}
            </button>
          ))}
        </div>
      </div>
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-4 md:pb-10">
        {loading && <div className="rounded-lg bg-guard-card p-5 text-guard-muted">Loading...</div>}
        {error && <div className="rounded-lg bg-guard-coral/15 p-5 text-red-100">{error}</div>}
        {!loading && !error && screen}
      </main>
      <BottomNav />
    </div>
  );
}
