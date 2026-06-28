import React from 'react';
import { useLocale } from '../../i18n/LocaleProvider.jsx';
import { formatJod } from '../../utils/currency.js';
import { Modal } from '../ui/Modal.jsx';

export function PriceSpikeModal({ pending, onConfirm, onEdit }) {
  const { currency, t } = useLocale();

  return (
    <Modal>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-guard-coral/20 text-2xl text-red-100">
        !
      </div>
      <h2 className="mt-4 text-center text-xl font-extrabold text-red-100">{t('alert_title')}</h2>
      <p className="mt-2 text-center text-sm leading-6 text-guard-muted">{t('alert_desc')}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-black/25 p-3">
          <p className="text-xs text-guard-muted">{t('old_price')}</p>
          <p className="mt-1 font-bold">{formatJod(pending.previous.unit_price_jod, currency)}</p>
        </div>
        <div className="rounded-lg bg-guard-coral/15 p-3 ring-1 ring-guard-coral/30">
          <p className="text-xs text-red-100">{t('new_price')}</p>
          <p className="mt-1 font-bold text-red-100">{formatJod(pending.invoice.unit_price_jod, currency)}</p>
        </div>
        <div className="rounded-lg bg-black/25 p-3">
          <p className="text-xs text-guard-muted">{t('price_jump')}</p>
          <p className="mt-1 font-bold">{pending.comparison.percentageIncrease.toFixed(1)}%</p>
        </div>
        <div className="rounded-lg bg-black/25 p-3">
          <p className="text-xs text-guard-muted">{t('profit_leak')}</p>
          <p className="mt-1 font-bold">{formatJod(pending.comparison.batchLoss, currency)}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <button
          type="button"
          onClick={onConfirm}
          className="h-12 rounded-lg bg-guard-coral text-base font-bold text-white"
        >
          {t('confirm_btn')}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="h-12 rounded-lg bg-white/10 text-base font-bold text-white"
        >
          {t('edit_btn')}
        </button>
      </div>
    </Modal>
  );
}
