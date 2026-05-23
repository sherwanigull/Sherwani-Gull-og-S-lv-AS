// ── DATA LAYER ──────────────────────────────────────────────

const STORAGE_PREFIX = 'sherwani_register_';

const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + key)) || []; }
    catch { return []; }
  },
  set(key, val) { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val)); },
  getObj(key, fallback = {}) {
    try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + key)) || fallback; }
    catch { return fallback; }
  },
  setObj(key, val) { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val)); }
};

function getCustomers()    { return DB.get('customers'); }
function setCustomers(d)   { DB.set('customers', d); }
function getTransactions() { return DB.get('transactions'); }
function setTransactions(d){ DB.set('transactions', d); }
function getCustomerDocuments() { return DB.getObj('customerDocuments', {}); }
function setCustomerDocuments(d){ DB.setObj('customerDocuments', d); }
function getSettings()     { return DB.getObj('settings', { companyName: 'Sherwani Gull & Sølv AS', orgNr: '', address: '', phone: '47 99 62 51', email: 'post@sherwanigull.no', currency: 'NOK', vatRate: '25' }); }
function setSettings(d)    { DB.setObj('settings', d); }

function initData() {
  if (localStorage.getItem(STORAGE_PREFIX + 'customers') === null) setCustomers([]);
  if (localStorage.getItem(STORAGE_PREFIX + 'transactions') === null) setTransactions([]);
}

// ── HELPERS ─────────────────────────────────────────────────

function nextId(arr)    { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; }
function getCustomerById(id) { return getCustomers().find(c => c.id === Number(id)) || null; }

function formatAmount(n) {
  return 'kr ' + Number(n).toLocaleString('nb-NO', { minimumFractionDigits: 0 });
}

function transactionAmount(t) {
  const amount = Math.abs(Number(t.amount) || 0);
  return t.type === 'purchase' ? -amount : amount;
}

function transactionTypeLabel(type) {
  return type === 'purchase' ? 'Kjøpt fra kunde' : 'Salg til kunde';
}

function transactionTypeBadge(type) {
  const val = type === 'purchase' ? 'purchase' : 'sale';
  return `<span class="badge badge-type-${val}">${transactionTypeLabel(val)}</span>`;
}

function formatDate(d) {
  if (!d) return '–';
  return new Date(d).toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatFileSize(bytes) {
  const size = Number(bytes) || 0;
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return Math.round(size / 1024) + ' KB';
  return (size / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[ch]));
}

function getInitials(name) {
  return name.trim().split(/\s+/).map(p => p[0]).join('').substring(0, 2).toUpperCase();
}

function paymentBadge(p) {
  const icons = { kontant: '💵', kort: '💳', bank: '🏦' };
  const value = Object.hasOwn(icons, p) ? p : 'bank';
  return `<span class="badge badge-${value}">${icons[value]} ${value.charAt(0).toUpperCase() + value.slice(1)}</span>`;
}

function showToast(msg, icon = '✓') {
  if (getSettings().toasts === false) return;
  let el = document.getElementById('_toast');
  if (!el) {
    el = document.createElement('div');
    el.id = '_toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = `<span class="toast-icon">${escapeHtml(icon)}</span>${escapeHtml(msg)}`;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function installRegisterChrome() {
  document.body.classList.toggle('compact', !!getSettings().compact);
  const content = document.querySelector('.content');
  if (content) {
    const banner = document.createElement('div');
    banner.className = 'privacy-banner';
    banner.innerHTML = '<strong>Lokalt register</strong> Data lagres bare i denne nettleseren. Ikke registrer faktiske personopplysninger eller ID-dokumenter før løsningen er sikret og godkjent for intern bruk.';
    content.prepend(banner);
  }
  const footer = document.querySelector('.sidebar-footer');
  if (footer) {
    const link = document.createElement('a');
    link.className = 'portal-link';
    link.href = '../ansatt.html';
    link.textContent = 'Til ansattportal';
    footer.prepend(link);
  }
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ── INIT ────────────────────────────────────────────────────
initData();
installRegisterChrome();
