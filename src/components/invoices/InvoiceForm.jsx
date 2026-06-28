import React, { useMemo, useState } from 'react';
import { getPreviousInvoiceForItemSupplier } from '../../data/repositories.js';
import { useLocale } from '../../i18n/LocaleProvider.jsx';
import { useAppState } from '../../state/AppStateProvider.jsx';
import { todayInputValue } from '../../utils/dates.js';
import { comparePrice } from '../../utils/priceMath.js';
import { Field } from '../ui/Field.jsx';
import { SelectField } from '../ui/SelectField.jsx';
import { PriceSpikeModal } from './PriceSpikeModal.jsx';

const initialForm = {
  supplier_id: '',
  item_id: '',
  quantity: '',
  unit_price_jod: '',
  date_logged: todayInputValue()
};

export function InvoiceForm() {
  const { locale, t } = useLocale();
  const { suppliers, items, addInvoice, setActiveScreen } = useAppState();
  const [form, setForm] = useState(initialForm);
  const [pendingSpike, setPendingSpike] = useState(null);

  const supplierItems = useMemo(
    () => items.filter((item) => item.supplier_id === form.supplier_id),
    [form.supplier_id, items]
  );

  function updateField(field, value) {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === 'supplier_id') {
        next.item_id = '';
      }
      return next;
    });
  }

  async function saveInvoice(invoice, comparison, previous) {
    await addInvoice({
      ...invoice,
      previous_unit_price_jod: previous?.unit_price_jod ?? null,
      price_change_percent: comparison.percentageIncrease,
      price_status: comparison.status,
      batch_loss_jod: comparison.batchLoss
    });

    setForm(initialForm);
    setPendingSpike(null);
    setActiveScreen('dashboard');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const invoice = {
      supplier_id: form.supplier_id,
      item_id: form.item_id,
      quantity: Number(form.quantity),
      unit_price_jod: Number(form.unit_price_jod),
      date_logged: form.date_logged
    };

    const previous = await getPreviousInvoiceForItemSupplier(invoice.item_id, invoice.supplier_id, invoice.date_logged);
    const comparison = comparePrice({
      currentPrice: invoice.unit_price_jod,
      previousPrice: previous?.unit_price_jod,
      quantity: invoice.quantity
    });

    if (comparison.shouldIntercept) {
      setPendingSpike({ invoice, previous, comparison });
      return;
    }

    await saveInvoice(invoice, comparison, previous);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField
          label={t('select_supplier')}
          value={form.supplier_id}
          onChange={(event) => updateField('supplier_id', event.target.value)}
          required
        >
          <option value="">{t('no_supplier')}</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier[locale === 'ar' ? 'name_ar' : 'name_en']}
            </option>
          ))}
        </SelectField>

        <SelectField
          label={t('select_item')}
          value={form.item_id}
          onChange={(event) => updateField('item_id', event.target.value)}
          required
          disabled={!form.supplier_id}
        >
          <option value="">{t('no_item')}</option>
          {supplierItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item[locale === 'ar' ? 'item_name_ar' : 'item_name_en']} · {item.unit}
            </option>
          ))}
        </SelectField>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label={t('quantity')}
            type="number"
            min="0.001"
            step="0.001"
            value={form.quantity}
            onChange={(event) => updateField('quantity', event.target.value)}
            required
          />
          <Field
            label={t('unit_price')}
            type="number"
            min="0.001"
            step="0.001"
            value={form.unit_price_jod}
            onChange={(event) => updateField('unit_price_jod', event.target.value)}
            required
          />
        </div>

        <Field
          label={t('date')}
          type="date"
          value={form.date_logged}
          onChange={(event) => updateField('date_logged', event.target.value)}
          required
        />

        <button type="submit" className="h-13 min-h-14 w-full rounded-lg bg-guard-emerald text-base font-extrabold text-black">
          {t('save_entry')}
        </button>
      </form>

      {pendingSpike && (
        <PriceSpikeModal
          pending={pendingSpike}
          onEdit={() => setPendingSpike(null)}
          onConfirm={() => saveInvoice(pendingSpike.invoice, pendingSpike.comparison, pendingSpike.previous)}
        />
      )}
    </>
  );
}
