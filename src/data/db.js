import { seedInvoices, seedItems, seedSuppliers } from './seedData.js';

const DB_NAME = 'profit-guard-db';
const DB_VERSION = 1;

let dbPromise;

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export function openDb() {
  if (dbPromise) {
    return dbPromise;
  }

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains('suppliers')) {
        db.createObjectStore('suppliers', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('items')) {
        const store = db.createObjectStore('items', { keyPath: 'id' });
        store.createIndex('supplier_id', 'supplier_id', { unique: false });
      }

      if (!db.objectStoreNames.contains('invoices')) {
        const store = db.createObjectStore('invoices', { keyPath: 'id' });
        store.createIndex('supplier_id', 'supplier_id', { unique: false });
        store.createIndex('item_id', 'item_id', { unique: false });
        store.createIndex('supplier_item', ['supplier_id', 'item_id'], { unique: false });
        store.createIndex('date_logged', 'date_logged', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

export async function getAll(storeName) {
  const db = await openDb();
  const transaction = db.transaction(storeName, 'readonly');
  return requestToPromise(transaction.objectStore(storeName).getAll());
}

export async function putMany(storeName, records) {
  const db = await openDb();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  records.forEach((record) => store.put(record));
  await transactionDone(transaction);
}

export async function addOne(storeName, record) {
  const db = await openDb();
  const transaction = db.transaction(storeName, 'readwrite');
  transaction.objectStore(storeName).add(record);
  await transactionDone(transaction);
  return record;
}

export async function seedIfNeeded() {
  const suppliers = await getAll('suppliers');
  if (suppliers.length > 0) {
    return;
  }

  await putMany('suppliers', seedSuppliers);
  await putMany('items', seedItems);
  await putMany('invoices', seedInvoices);
}

export function byNewestDate(a, b) {
  return new Date(b.date_logged).getTime() - new Date(a.date_logged).getTime();
}
