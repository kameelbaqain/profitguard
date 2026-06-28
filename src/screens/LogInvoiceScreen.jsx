import React from 'react';
import { InvoiceForm } from '../components/invoices/InvoiceForm.jsx';
import { useLocale } from '../i18n/LocaleProvider.jsx';

export function LogInvoiceScreen() {
  const { t } = useLocale();

  return (
    <section className="mx-auto max-w-xl">
      <h2 className="mb-4 text-2xl font-extrabold tracking-normal">{t('log_invoice')}</h2>
      <div className="rounded-lg bg-guard-card p-4 shadow-soft ring-1 ring-white/5">
        <InvoiceForm />
      </div>
    </section>
  );
}
