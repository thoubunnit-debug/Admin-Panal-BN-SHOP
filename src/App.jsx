import { useState, useEffect, useRef } from 'react';
import {
  KEYS, DEFAULT_PRODUCTS, DEFAULT_CATEGORIES, DEFAULT_REVIEWS,
  DEFAULT_CMS, DEFAULT_ORDERS, DEFAULT_SETTINGS, load, save,
} from './lib/storage';
import { NAV } from './lib/icons';

import { Toast } from './pages/ui/Toast';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashbord';
import { Products } from './pages/Products';
import { Categories } from './pages/Categories';
import { Orders } from './pages/Orders';
import { Customers } from './pages/Customers';
import { Reviews } from './pages/Reviews';
import { CMS } from './pages/Cms';
import { Settings } from './pages/Settings';

/* ───────────────────────── Shell ───────────────────────── */
function App() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [products, setProductsState] = useState(() => load(KEYS.PRODUCTS, DEFAULT_PRODUCTS));
  const [orders, setOrdersState] = useState(() => {
    const stored = load(KEYS.ORDERS, null);
    return stored && stored.length > 0 ? stored : DEFAULT_ORDERS;
  });
  const [categories, setCategoriesState] = useState(() => load(KEYS.CATEGORIES, DEFAULT_CATEGORIES));
  const [reviews, setReviewsState] = useState(() => load(KEYS.REVIEWS, DEFAULT_REVIEWS));
  const [cms, setCmsState] = useState(() => load(KEYS.CMS, DEFAULT_CMS));
  const [settings, setSettingsState] = useState(() => load(KEYS.SETTINGS, DEFAULT_SETTINGS));

  const toastTimer = useRef(null);
  const notify = (msg, type = 'ok') => {
    setToast({ msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const setProducts = (v) => { setProductsState(v); save(KEYS.PRODUCTS, v); };
  const setOrders = (v) => { setOrdersState(v); save(KEYS.ORDERS, v); };
  const setCategories = (v) => { setCategoriesState(v); save(KEYS.CATEGORIES, v); };
  const setReviews = (v) => { setReviewsState(v); save(KEYS.REVIEWS, v); };
  const setCms = (v) => { setCmsState(v); save(KEYS.CMS, v); };
  const setSettings = (v) => { setSettingsState(v); save(KEYS.SETTINGS, v); };

  // Pick up changes made on the storefront tab (e.g. a live order) while admin is open
  useEffect(() => {
    const onFocus = () => {
      const storedOrders = load(KEYS.ORDERS, null);
      setOrdersState(storedOrders && storedOrders.length > 0 ? storedOrders : DEFAULT_ORDERS);
      setProductsState(load(KEYS.PRODUCTS, DEFAULT_PRODUCTS));
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const activeLabel = NAV.find(n => n.id === tab)?.label;

  const renderPage = () => {
    switch (tab) {
      case 'dashboard': return <Dashboard products={products} orders={orders} reviews={reviews} settings={settings} />;
      case 'products': return <Products products={products} setProducts={setProducts} categories={categories} notify={notify} />;
      case 'categories': return <Categories categories={categories} setCategories={setCategories} products={products} notify={notify} />;
      case 'orders': return <Orders orders={orders} setOrders={setOrders} notify={notify} />;
      case 'customers': return <Customers orders={orders} />;
      case 'reviews': return <Reviews reviews={reviews} setReviews={setReviews} products={products} notify={notify} />;
      case 'cms': return <CMS cms={cms} setCms={setCms} notify={notify} />;
      case 'settings': return <Settings settings={settings} setSettings={setSettings} notify={notify} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar
        tab={tab}
        setTab={setTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={() => setAuthed(false)}
      />

      <div className="flex-1 min-w-0">
        <Header activeLabel={activeLabel} settings={settings} setMobileOpen={setMobileOpen} />
        <main className="p-5 lg:p-8 max-w-[1400px]">
          {renderPage()}
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}

export default App;