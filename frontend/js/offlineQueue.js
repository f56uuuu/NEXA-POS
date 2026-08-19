// frontend/js/offlineQueue.js
// Minimal offline-first fallback for the POS checkout flow.
//
// Scope/limits, stated plainly:
//   - Covers the checkout (create_order) call only — the highest-value case
//     during an internet dropout. Product/category edits, employee
//     management, etc. still require connectivity.
//   - Conflict handling is "best effort, last write wins": each queued order
//     is replayed through the same create_order RPC once online, so shift/
//     stock validation still applies at sync time (e.g. a queued sale could
//     fail to replay if the shift was closed in the meantime — it stays in
//     the queue and the cashier is shown an error rather than silently
//     dropping the sale).
//   - This is a real IndexedDB queue, not a simulation, but it hasn't been
//     tested against actual flaky-network conditions — treat it as a
//     starting point, not a guarantee.

const DB_NAME = 'nexa_offline';
const STORE = 'pending_orders';

function openQueueDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function queueOfflineOrder(payload) {
  const db = await openQueueDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).add({ payload, queued_at: new Date().toISOString() });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function listQueuedOrders() {
  const db = await openQueueDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteQueuedOrder(id) {
  const db = await openQueueDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function flushOfflineQueue() {
  if (!navigator.onLine || typeof supabase === 'undefined') return;
  const pending = await listQueuedOrders();
  for (const row of pending) {
    const { error } = await supabase.rpc('create_order', row.payload);
    if (!error) await deleteQueuedOrder(row.id);
    // On error we deliberately leave it queued — it'll retry on the next
    // 'online' event or the next manual checkout rather than being dropped.
  }
}

window.addEventListener('online', flushOfflineQueue);
document.addEventListener('DOMContentLoaded', flushOfflineQueue);
