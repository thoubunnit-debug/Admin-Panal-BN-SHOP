# BN SHOP — Admin Panel (React + Tailwind, Vite)

A real React project (JSX, no CDN/Babel-in-browser) for managing your BN SHOP storefront.

## What's inside
- `src/App.jsx` — the whole admin app (Dashboard, Products, Categories, Orders, Customers, Reviews, Content/CMS, Settings)
- `src/main.jsx` — React entry point
- `src/index.css` — Tailwind + small custom styles
- `tailwind.config.js` — the brand's color/font tokens (accent `#1ab8e8`, Playfair Display + Inter)

## How it connects to your storefront
It reads and writes the **same `localStorage` keys** your storefront's `java.js` uses:
- `bunnit-products` — the product catalog
- `bnshop-orders` — orders placed at checkout

For that link to work, the built admin panel needs to run on the **same origin** as your storefront (e.g. both deployed under the same domain/path, such as `yoursite.com/` and `yoursite.com/admin/`).

## Setup
```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
```

## Build for deployment
```bash
npm run build      # outputs static files to dist/
```
Upload the contents of `dist/` to a path alongside your storefront (e.g. `/admin`) so both share the same domain and localStorage.

## Login
Default demo credentials: `admin` / `admin123` — changeable from Settings once signed in (stored in `localStorage` under `bnshop-admin-creds`).
# Admin-Panal-BN-SHOP
# Admin-Panal-BN-SHOP
