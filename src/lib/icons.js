import { createElement } from 'react';

export const paths = {
  dashboard: 'M3 12.75V6.5A1.5 1.5 0 0 1 4.5 5h4.25A1.5 1.5 0 0 1 10.25 6.5v6.25A1.5 1.5 0 0 1 8.75 14H4.5A1.5 1.5 0 0 1 3 12.75Zm10.75 0V10.5A1.5 1.5 0 0 1 15.25 9h4.25A1.5 1.5 0 0 1 21 10.5v2.25A1.5 1.5 0 0 1 19.5 14h-4.25A1.5 1.5 0 0 1 13.75 12.75Zm0 6.25V15.5A1.5 1.5 0 0 1 15.25 14h4.25A1.5 1.5 0 0 1 21 15.5v3.5A1.5 1.5 0 0 1 19.5 20h-4.25A1.5 1.5 0 0 1 13.75 18.75ZM3 18.75V15.5A1.5 1.5 0 0 1 4.5 14h4.25A1.5 1.5 0 0 1 10.25 15.5v3.25A1.5 1.5 0 0 1 8.75 20H4.5A1.5 1.5 0 0 1 3 18.75Z',
  box: 'M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Zm2.5-.5a.5.5 0 0 0-.5.5v.75h12v-.75a.5.5 0 0 0-.5-.5h-11Zm.5 4.25h10v5H7v-5Z',
  orders: 'M7 4h10l1.5 2.5v11A2.5 2.5 0 0 1 16 20H8a2.5 2.5 0 0 1-2.5-2.5v-11L7 4Zm2 2.5h6l-.5-1h-5l-.5 1Zm-1 2.5h8v2H8v-2Zm0 4h8v2H8v-2Z',
  customers: 'M12 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 12Zm-6 7a6 6 0 0 1 12 0v1H6v-1Zm13.5-3.5a4.5 4.5 0 0 0-2.5-4.05 5.5 5.5 0 0 1 .7 2.55v1.5h1.8v-1.5a4.5 4.5 0 0 0 .5-1.5Z',
  cash: 'M12 3v18M16.5 6.5c0-1.1-.9-2-2-2h-3a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5h-3a2 2 0 0 1-2-2M4 9.5h16M4 14.5h16',
  alert: 'M12 3 2.5 20h19L12 3Zm0 6v4m0 3.75h.01',
  categories: 'M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm4 1.5h8v2H8V8Zm0 4h8v2H8v-2Z',
  settings: 'M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 0 0 12 8.5Zm8 3.5-.9-.3a7.53 7.53 0 0 0-.6-1.4l.5-.8a1 1 0 0 0-.1-1.2l-1.1-1.1a1 1 0 0 0-1.2-.1l-.8.5c-.45-.25-.93-.45-1.42-.6L13 4a1 1 0 0 0-1-.8h-2a1 1 0 0 0-1 .8l-.3.9c-.5.15-.98.35-1.42.6l-.8-.5a1 1 0 0 0-1.2.1L4.2 6.1a1 1 0 0 0-.1 1.2l.5.8c-.25.45-.45.93-.6 1.42L3 10a1 1 0 0 0-.8 1v2a1 1 0 0 0 .8 1l.9.3c.15.5.35.98.6 1.42l-.5.8a1 1 0 0 0 .1 1.2l1.1 1.1a1 1 0 0 0 1.2.1l.8-.5c.45.25.93.45 1.42.6l.3.9a1 1 0 0 0 1 .8h2a1 1 0 0 0 1-.8l.3-.9c.5-.15.98-.35 1.42-.6l.8.5a1 1 0 0 0 1.2-.1l1.1-1.1a1 1 0 0 0 .1-1.2l-.5-.8c.25-.45.45-.93.6-1.42l.9-.3a1 1 0 0 0 .8-1v-2a1 1 0 0 0-.8-1Z',
  logout: 'M10 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M15 12H3m4-4-4 4 4 4',
  external: 'M14 3h7v7m-1-6-8 8M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4',
  review: 'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 5h8m-8 4h5',
  cms: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 4h8m-8 4h5',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  trash: 'M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
};

export const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: paths.dashboard },
  { id: 'products', label: 'Products', icon: paths.box },
  { id: 'categories', label: 'Categories', icon: paths.categories },
  { id: 'orders', label: 'Orders', icon: paths.orders },
  { id: 'customers', label: 'Customers', icon: paths.customers },
  { id: 'reviews', label: 'Reviews', icon: paths.review },
  { id: 'cms', label: 'CMS', icon: paths.cms },
  { id: 'settings', label: 'Settings', icon: paths.settings },
];

export function Icon({ path, className = 'w-4 h-4' }) {
  return createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }, createElement('path', { d: path }));
}
