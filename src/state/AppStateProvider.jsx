import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { seedIfNeeded } from '../data/db.js';
import { createInvoice, getInvoices, getItems, getSuppliers } from '../data/repositories.js';
import { isThisMonth } from '../utils/dates.js';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshData = useCallback(async () => {
    const [nextSuppliers, nextItems, nextInvoices] = await Promise.all([
      getSuppliers(),
      getItems(),
      getInvoices()
    ]);

    setSuppliers(nextSuppliers);
    setItems(nextItems);
    setInvoices(nextInvoices);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function boot() {
      try {
        setLoading(true);
        await seedIfNeeded();
        if (isMounted) {
          await refreshData();
        }
      } catch (bootError) {
        if (isMounted) {
          setError(bootError.message || 'Unable to load local data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    boot();
    return () => {
      isMounted = false;
    };
  }, [refreshData]);

  const addInvoice = useCallback(
    async (invoice) => {
      await createInvoice(invoice);
      await refreshData();
    },
    [refreshData]
  );

  const metrics = useMemo(() => {
    const totalSpentMonth = invoices
      .filter((invoice) => isThisMonth(invoice.date_logged))
      .reduce((total, invoice) => total + Number(invoice.quantity) * Number(invoice.unit_price_jod), 0);

    const activeAlerts = invoices.filter((invoice) => invoice.price_status === 'spike').length;
    const averageUnitPrice =
      invoices.length === 0
        ? 0
        : invoices.reduce((total, invoice) => total + Number(invoice.unit_price_jod), 0) / invoices.length;

    return {
      totalSpentMonth,
      activeAlerts,
      averageUnitPrice,
      invoiceCount: invoices.length
    };
  }, [invoices]);

  const value = useMemo(
    () => ({
      activeScreen,
      setActiveScreen,
      suppliers,
      items,
      invoices,
      loading,
      error,
      metrics,
      addInvoice,
      refreshData
    }),
    [activeScreen, addInvoice, error, invoices, items, loading, metrics, refreshData, suppliers]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return context;
}
