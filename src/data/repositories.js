import { addOne, byNewestDate, getAll, openDb } from './db.js';

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getSuppliers() {
  return getAll('suppliers');
}

export async function getItems() {
  return getAll('items');
}

export async function getItemsBySupplier(supplierId) {
  const db = await openDb();
  const transaction = db.transaction('items', 'readonly');
  const index = transaction.objectStore('items').index('supplier_id');
  return requestToPromise(index.getAll(supplierId));
}

export async function getInvoices() {
  const invoices = await getAll('invoices');
  return invoices.sort(byNewestDate);
}

export async function getRecentInvoices(limit = 8) {
  const invoices = await getInvoices();
  return invoices.slice(0, limit);
}

export async function getInvoicesForItemSupplier(itemId, supplierId) {
  const db = await openDb();
  const transaction = db.transaction('invoices', 'readonly');
  const index = transaction.objectStore('invoices').index('supplier_item');
  const records = await requestToPromise(index.getAll([supplierId, itemId]));
  return records.sort(byNewestDate);
}

export async function getPreviousInvoiceForItemSupplier(itemId, supplierId, beforeDate = null) {
  const records = await getInvoicesForItemSupplier(itemId, supplierId);
  if (!beforeDate) {
    return records[0] ?? null;
  }

  const currentTime = new Date(beforeDate).getTime();
  return records.find((invoice) => new Date(invoice.date_logged).getTime() < currentTime) ?? records[0] ?? null;
}

export async function createInvoice(invoice) {
  return addOne('invoices', {
    ...invoice,
    id: invoice.id ?? crypto.randomUUID()
  });
}
