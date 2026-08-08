import { useState } from 'react';
import { Icon, paths } from '../lib/icons';
import { fmt } from '../lib/storage';
import { PageHeader } from '../ui/PageHeader';
import { StatusPill } from '../ui/StatusPill';
import { Modal } from '../ui/Modal';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Field, inputCls } from '../ui/Field';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600';

// Files living in /public/img — Vite serves anything in /public at the site
// root. We prefix with import.meta.env.BASE_URL so the path resolves
// correctly both locally (base "/") and on GitHub Pages
// (base "/Admin-Panal-BN-SHOP/"). Add/remove filenames here whenever you
// add new photos to /public/img.
const LIBRARY_IMAGES = [
  'Aviator Sunglasses.jpg',
  'Brimmed Cap.jpg',
  'Canvas Backpack.jpg',
  'Chelsea Boots.jpg',
  'Chronograph Watch.jpg',
  'Floral Midi Dress.jpg',
  'moto_jecket.jpg',
  'Oversize Hoodie.jpg',
  'Pebbled Leather Tote.jpg',
  'runner_sneaker.jpg',
  'Slim Chinos.jpg',
  'white_sh.jpg',
].map((filename) => ({
  filename,
  label: filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
  src: `${import.meta.env.BASE_URL}img/${encodeURIComponent(filename)}`,
}));

export function emptyProduct() {
  return { id: null, name: '', price: '', oldPrice: '', image: '', category: '', brand: '', desc: '', badge: '', stock: '', createdAt: new Date().toISOString().slice(0,10) };
}

export function ProductForm({ initial, categories, onSave, onCancel }) {
  const [f, setF] = useState(initial);
  const [error, setError] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const pickFromLibrary = (src) => {
    setError('');
    setF((prev) => ({ ...prev, image: src }));
    setShowLibrary(false);
  };

  // Handles a file picked from the user's device and converts it to a
  // base64 data URL so it can be stored on the product just like a normal
  // image URL. No backend/upload endpoint required.
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    // Keep a sane size limit since base64 images are stored inline
    // (e.g. in localStorage). 2MB is plenty for a product thumbnail.
    if (file.size > 2 * 1024 * 1024) {
      setError('Image is too large. Please choose a file under 2MB.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = () => setF((prev) => ({ ...prev, image: reader.result }));
    reader.onerror = () => setError('Could not read that file. Please try another image.');
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || f.price === '' || !f.category) {
      setError('Please fill in product name, price, and category.');
      return;
    }
    setError('');
    onSave({
      ...f,
      id: f.id || Date.now(),
      price: Math.max(0, Number(f.price)),
      oldPrice: f.oldPrice === '' ? undefined : Math.max(0, Number(f.oldPrice)),
      stock: Math.max(0, Number(f.stock || 0)),
      image: f.image || FALLBACK_IMAGE,
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="col-span-2"><Field label="Product Name"><input className={inputCls} value={f.name} onChange={set('name')} placeholder="e.g. Classic White Tee" required /></Field></div>

        <div className="col-span-2">
          <Field label="Product Image">
            <div className="flex items-center gap-4">
              <img
                src={f.image || FALLBACK_IMAGE}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                className="w-16 h-16 rounded-lg object-cover border border-line shrink-0"
                alt="Product preview"
              />
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block w-full text-xs text-muted file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-surface2 file:text-xs file:font-semibold file:text-ink hover:file:bg-line cursor-pointer"
                />
                <div className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    value={f.image}
                    onChange={set('image')}
                    placeholder="...or paste an image URL"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLibrary((v) => !v)}
                    className="shrink-0 py-2.5 px-3 rounded-lg border border-line text-xs font-semibold hover:bg-surface2"
                  >
                    {showLibrary ? 'Hide library' : 'Choose from library'}
                  </button>
                </div>
              </div>
            </div>

            {showLibrary && (
              <div className="mt-3 p-3 border border-line rounded-lg bg-surface2/40 grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-56 overflow-y-auto">
                {LIBRARY_IMAGES.map((img) => (
                  <button
                    type="button"
                    key={img.filename}
                    onClick={() => pickFromLibrary(img.src)}
                    title={img.label}
                    className={
                      "group relative rounded-lg overflow-hidden border-2 transition " +
                      (f.image === img.src ? "border-accent" : "border-transparent hover:border-line")
                    }
                  >
                    <img src={img.src} alt={img.label} className="w-full aspect-square object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] leading-tight px-1 py-0.5 truncate capitalize opacity-0 group-hover:opacity-100 transition">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </Field>
        </div>

        <Field label="Category">
          <select className={inputCls} value={f.category} onChange={set('category')} required>
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Brand"><input className={inputCls} value={f.brand} onChange={set('brand')} placeholder="e.g. BN Studio" /></Field>
        <Field label="Price ($)"><input type="number" step="0.01" min="0" className={inputCls} value={f.price} onChange={set('price')} required /></Field>
        <Field label="Compare-at Price ($)"><input type="number" step="0.01" min="0" className={inputCls} value={f.oldPrice ?? ''} onChange={set('oldPrice')} placeholder="Optional" /></Field>
        <Field label="Stock Quantity"><input type="number" min="0" className={inputCls} value={f.stock} onChange={set('stock')} /></Field>
        <Field label="Badge"><input className={inputCls} value={f.badge} onChange={set('badge')} placeholder="e.g. New, Sale, Best Seller" /></Field>
        <div className="col-span-2"><Field label="Description"><textarea rows="3" className={inputCls} value={f.desc} onChange={set('desc')} placeholder="Short product description shown on the storefront" /></Field></div>
      </div>
      {error && <div className="text-xs text-rose-600 font-medium pt-3">{error}</div>}
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-lg border border-line text-sm font-semibold hover:bg-surface2">Cancel</button>
        <button type="submit" className="flex-1 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accentDeep">Save Product</button>
      </div>
    </form>
  );
}

export function Products({ products, setProducts, categories, notify }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [modal, setModal] = useState(null); // {mode:'add'|'edit', data}
  const [del, setDel] = useState(null);

  const query = q.trim().toLowerCase();
  const filtered = products.filter(p =>
    (cat === 'all' || p.category === cat) &&
    (p.name.toLowerCase().includes(query) || (p.brand||'').toLowerCase().includes(query))
  );

  const handleSave = (p) => {
    if (modal.mode === 'add') { setProducts([p, ...products]); notify('Product added'); }
    else { setProducts(products.map(x => x.id === p.id ? p : x)); notify('Product updated'); }
    setModal(null);
  };
  const handleDelete = () => {
    setProducts(products.filter(x => x.id !== del.id));
    notify('Product deleted');
    setDel(null);
  };

  return (
    <div>
      <PageHeader title="Products" subtitle={`${products.length} products in your catalog`} action={
        <button onClick={() => setModal({ mode: 'add', data: emptyProduct() })} className="flex items-center gap-2 bg-ink text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-black">
          <Icon path={paths.plus} className="w-4 h-4" /> Add Product
        </button>
      } />

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Icon path={paths.search} className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input className={inputCls + " pl-10"} placeholder="Search products or brand..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <select className={inputCls + " max-w-[180px]"} value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white border border-line rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-xs font-semibold text-faint uppercase tracking-wide border-b border-line">
              <th className="px-6 py-3.5">Product</th>
              <th className="px-2 py-3.5">Category</th>
              <th className="px-2 py-3.5">Price</th>
              <th className="px-2 py-3.5">Stock</th>
              <th className="px-2 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const status = (p.stock ?? 0) <= 0 ? 'Out of Stock' : (p.stock <= 5 ? 'Low Stock' : 'In Stock');
              return (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || FALLBACK_IMAGE}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMAGE; }}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                        alt={p.name}
                      />
                      <div className="min-w-0">
                        <div className="font-medium truncate max-w-[220px]">{p.name}</div>
                        <div className="text-xs text-faint">{p.brand || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3 capitalize text-muted">{p.category}</td>
                  <td className="px-2 py-3">
                    <div className="font-semibold">{fmt(p.price)}</div>
                    {p.oldPrice ? <div className="text-xs text-faint line-through">{fmt(p.oldPrice)}</div> : null}
                  </td>
                  <td className="px-2 py-3 text-muted">{p.stock ?? 0}</td>
                  <td className="px-2 py-3"><StatusPill status={status} /></td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button aria-label="Edit product" onClick={() => setModal({ mode: 'edit', data: {...p} })} className="w-8 h-8 rounded-lg hover:bg-surface2 flex items-center justify-center text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                        </svg>
                      </button>
                      <button aria-label="Delete product" onClick={() => setDel(p)} className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center text-muted hover:text-rose-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-faint">No products match your search.</div>}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === 'add' ? 'Add Product' : 'Edit Product'} width="max-w-xl">
        {modal && <ProductForm initial={modal.data} categories={categories} onSave={handleSave} onCancel={() => setModal(null)} />}
      </Modal>
      <ConfirmDialog open={!!del} title="Delete this product?" body={del ? `"${del.name}" will be removed from the storefront immediately. This can't be undone.` : ''} onConfirm={handleDelete} onCancel={() => setDel(null)} />
    </div>
  );
}

export default Products;