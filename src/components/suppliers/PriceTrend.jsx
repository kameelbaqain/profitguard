import React from 'react';
import { useLocale } from '../../i18n/LocaleProvider.jsx';
import { formatJod } from '../../utils/currency.js';
import { formatShortDate } from '../../utils/dates.js';

export function PriceTrend({ invoices }) {
  const { locale, currency, t } = useLocale();
  const ordered = [...invoices].sort((a, b) => new Date(a.date_logged) - new Date(b.date_logged));
  const max = Math.max(...ordered.map((invoice) => Number(invoice.unit_price_jod)), 1);

  if (ordered.length === 0) {
    return <div className="rounded-lg bg-guard-card p-5 text-guard-muted">{t('no_entries')}</div>;
  }

  return (
    <div className="rounded-lg bg-guard-card p-4 ring-1 ring-white/5">
      <h3 className="text-lg font-bold">{t('price_trend')}</h3>
      <div className="mt-4 space-y-3">
        {ordered.map((invoice) => {
          const width = Math.max((Number(invoice.unit_price_jod) / max) * 100, 8);
          return (
            <div key={invoice.id ?? `${invoice.date_logged}-${invoice.unit_price_jod}`}>
              <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                <span className="text-guard-muted">{formatShortDate(invoice.date_logged, locale)}</span>
                <span className="font-semibold">{formatJod(invoice.unit_price_jod, currency)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${invoice.price_status === 'spike' ? 'bg-guard-coral' : 'bg-guard-emerald'}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
