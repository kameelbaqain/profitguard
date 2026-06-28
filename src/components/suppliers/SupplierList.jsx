import React from 'react';
import { useLocale } from '../../i18n/LocaleProvider.jsx';

export function SupplierList({ suppliers, selectedSupplierId, onSelect }) {
  const { locale, t } = useLocale();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar md:grid md:grid-cols-3">
      {suppliers.map((supplier) => {
        const active = selectedSupplierId === supplier.id;
        return (
          <button
            key={supplier.id}
            type="button"
            onClick={() => onSelect(supplier.id)}
            className={`min-w-64 rounded-lg p-4 text-start ring-1 transition ${
              active ? 'bg-guard-emerald text-black ring-guard-emerald' : 'bg-guard-card text-white ring-white/5'
            }`}
          >
            <h3 className="font-bold">{supplier[locale === 'ar' ? 'name_ar' : 'name_en']}</h3>
            <p className={`mt-2 text-sm ${active ? 'text-black/70' : 'text-guard-muted'}`}>{t('contact')}: {supplier.contact_person}</p>
            <p className={`mt-1 text-sm ${active ? 'text-black/70' : 'text-guard-muted'}`}>{t('phone')}: {supplier.phone}</p>
          </button>
        );
      })}
    </div>
  );
}
