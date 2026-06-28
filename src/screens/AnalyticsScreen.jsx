import React from 'react';
import { MetricCard } from '../components/ui/MetricCard.jsx';
import { useLocale } from '../i18n/LocaleProvider.jsx';
import { useAppState } from '../state/AppStateProvider.jsx';
import { formatJod } from '../utils/currency.js';

export function AnalyticsScreen() {
  const { currency, t } = useLocale();
  const { metrics } = useAppState();

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-extrabold tracking-normal">{t('analytics')}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label={t('total_spent_month')} value={formatJod(metrics.totalSpentMonth, currency)} tone="good" />
        <MetricCard label={t('active_alerts')} value={metrics.activeAlerts} tone="alert" />
        <MetricCard label={t('total_invoices')} value={metrics.invoiceCount} />
        <MetricCard label={t('average_unit_price')} value={formatJod(metrics.averageUnitPrice, currency)} />
      </div>
    </section>
  );
}
