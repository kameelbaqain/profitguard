import React from 'react';
import { RecentInvoices } from '../components/invoices/RecentInvoices.jsx';
import { MetricCard } from '../components/ui/MetricCard.jsx';
import { useLocale } from '../i18n/LocaleProvider.jsx';
import { useAppState } from '../state/AppStateProvider.jsx';
import { formatJod } from '../utils/currency.js';

export function DashboardScreen() {
  const { currency, t } = useLocale();
  const { invoices, suppliers, items, metrics } = useAppState();

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label={t('total_spent_month')} value={formatJod(metrics.totalSpentMonth, currency)} tone="good" />
        <MetricCard label={t('active_alerts')} value={metrics.activeAlerts} tone="alert" />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t('recent_entries')}</h2>
        </div>
        <RecentInvoices invoices={invoices.slice(0, 8)} suppliers={suppliers} items={items} />
      </div>
    </section>
  );
}
