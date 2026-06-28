import React from 'react';
import { useLocale } from '../../i18n/LocaleProvider.jsx';

export function SupplierItems({ items, selectedItemId, onSelect }) {
  const { locale, t } = useLocale();

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => {
        const active = selectedItemId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`rounded-lg p-4 text-start ring-1 transition ${
              active ? 'bg-white text-black ring-white' : 'bg-guard-card text-white ring-white/5'
            }`}
          >
            <h3 className="font-bold">{item[locale === 'ar' ? 'item_name_ar' : 'item_name_en']}</h3>
            <p className={`mt-2 text-sm ${active ? 'text-black/70' : 'text-guard-muted'}`}>{t('unit')}: {item.unit}</p>
          </button>
        );
      })}
    </div>
  );
}
