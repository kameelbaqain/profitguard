import React, { useMemo, useState } from 'react';
import { SupplierItems } from '../components/suppliers/SupplierItems.jsx';
import { SupplierList } from '../components/suppliers/SupplierList.jsx';
import { PriceTrend } from '../components/suppliers/PriceTrend.jsx';
import { useLocale } from '../i18n/LocaleProvider.jsx';
import { useAppState } from '../state/AppStateProvider.jsx';

export function SuppliersScreen() {
  const { t } = useLocale();
  const { suppliers, items, invoices } = useAppState();
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id ?? '');
  const supplierId = selectedSupplierId || suppliers[0]?.id || '';
  const supplierItems = useMemo(() => items.filter((item) => item.supplier_id === supplierId), [items, supplierId]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const itemId = selectedItemId || supplierItems[0]?.id || '';
  const trendInvoices = invoices.filter((invoice) => invoice.supplier_id === supplierId && invoice.item_id === itemId);

  function handleSupplierSelect(nextSupplierId) {
    setSelectedSupplierId(nextSupplierId);
    setSelectedItemId('');
  }

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-extrabold tracking-normal">{t('suppliers')}</h2>
      <SupplierList suppliers={suppliers} selectedSupplierId={supplierId} onSelect={handleSupplierSelect} />

      <div>
        <h3 className="mb-3 text-lg font-bold">{t('supplier_items')}</h3>
        <SupplierItems items={supplierItems} selectedItemId={itemId} onSelect={setSelectedItemId} />
      </div>

      <PriceTrend invoices={trendInvoices} />
    </section>
  );
}
