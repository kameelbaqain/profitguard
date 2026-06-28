import React from 'react';
import { Badge } from '../ui/Badge.jsx';
import { useLocale } from '../../i18n/LocaleProvider.jsx';
import { formatJod } from '../../utils/currency.js';
import { formatShortDate } from '../../utils/dates.js';

export function RecentInvoices({ invoices, suppliers, items }) {
  const { locale, currency, t } = useLocale();

  if (invoices.length === 0) {
    return <div className="rounded-lg bg-guard-card p-5 text-guard-muted">{t('no_entries')}</div>;
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice) => {
        const supplier = suppliers.find((entry) => entry.id === invoice.supplier_id);
        const item = items.find((entry) => entry.id === invoice.item_id);
        const supplierName = supplier?.[locale === 'ar' ? 'name_ar' : 'name_en'] ?? invoice.supplier_id;
        const itemName = item?.[locale === 'ar' ? 'item_name_ar' : 'item_name_en'] ?? invoice.item_id;

        return (
          <article key={invoice.id} className="rounded-lg bg-guard-card p-4 ring-1 ring-white/5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-white">{itemName}</h3>
                <p className="mt-1 text-sm text-guard-muted">{supplierName}</p>
              </div>
              <Badge tone={invoice.price_status}>{invoice.price_status === 'spike' ? t('alert_title') : t('stable_price')}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-guard-muted">{t('quantity')}</p>
                <p className="mt-1 font-semibold">{invoice.quantity}</p>
              </div>
              <div>
                <p className="text-guard-muted">{t('unit_price')}</p>
                <p className="mt-1 font-semibold">{formatJod(invoice.unit_price_jod, currency)}</p>
              </div>
              <div>
                <p className="text-guard-muted">{t('date')}</p>
                <p className="mt-1 font-semibold">{formatShortDate(invoice.date_logged, locale)}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
