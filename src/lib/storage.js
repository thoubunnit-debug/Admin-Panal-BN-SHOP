export const KEYS = {
  PRODUCTS: 'bunnit-products',
  ORDERS: 'bnshop-orders',
  CATEGORIES: 'bnshop-categories',
  REVIEWS: 'bnshop-reviews',
  CMS: 'bnshop-cms',
  SETTINGS: 'bnshop-settings',
  CREDS: 'bnshop-admin-creds',
};

export const DEFAULT_CREDS = {
  username: 'admin',
  password: 'admin123',
};

export const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Classic Tee', slug: 'classic-tee', category: 'Apparel', price: 24, oldPrice: 29, stock: 12, status: 'Active', featured: true },
  { id: 2, name: 'Urban Jacket', slug: 'urban-jacket', category: 'Outerwear', price: 89, stock: 5, status: 'Active', featured: true },
  { id: 3, name: 'Canvas Tote', slug: 'canvas-tote', category: 'Accessories', price: 32, stock: 0, status: 'Draft', featured: false },
];

export const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Apparel', slug: 'apparel' },
  { id: 2, name: 'Outerwear', slug: 'outerwear' },
  { id: 3, name: 'Accessories', slug: 'accessories' },
];

export const DEFAULT_REVIEWS = [
  { id: 1, product: 'Classic Tee', rating: 5, status: 'Approved', date: '2026-08-01', comment: 'Great quality and fast delivery.' },
  { id: 2, product: 'Urban Jacket', rating: 4, status: 'Pending', date: '2026-08-02', comment: 'Very stylish, looks premium.' },
];

export const DEFAULT_ORDERS = [
  {
    id: 1754035800000,
    customerName: 'Sophea Chan',
    phone: '012 345 678',
    address: '#12, St 210, Phnom Penh',
    date: '2026-08-01T09:30:00.000Z',
    status: 'Pending',
    items: [
      { name: 'Classic Tee', price: 24, qty: 2 },
      { name: 'Canvas Tote', price: 32, qty: 1 },
    ],
    subtotal: 80,
    tax: 4,
    total: 84,
  },
  {
    id: 1754122200000,
    customerName: 'Dara Sok',
    phone: '098 765 432',
    address: '#45, St 63, Phnom Penh',
    date: '2026-08-02T14:15:00.000Z',
    status: 'Completed',
    items: [
      { name: 'Urban Jacket', price: 89, qty: 1 },
    ],
    subtotal: 89,
    tax: 4.45,
    total: 93.45,
  },
  {
    id: 1754208600000,
    customerName: 'Sophea Chan',
    phone: '012 345 678',
    address: '#12, St 210, Phnom Penh',
    date: '2026-08-03T11:00:00.000Z',
    status: 'Cancelled',
    items: [
      { name: 'Urban Jacket', price: 89, qty: 1 },
    ],
    subtotal: 89,
    tax: 4.45,
    total: 93.45,
  },
];

export const DEFAULT_CMS = {
  heroTitle: 'BN-SHOP',
  heroSubtitle: 'Fresh products for every day.',
  announcement: 'Summer sale is live now.',
};

export const DEFAULT_SETTINGS = {
  storeName: 'BN SHOP',
  adminName: 'Admin',
  currency: 'USD',
  timezone: 'UTC',
};

function safeParse(raw) {
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function load(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  return safeParse(raw) ?? fallback;
}

export function save(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0));
}

export function fmtDate(input) {
  if (!input) return '—';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}