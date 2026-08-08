import { useState } from 'react';
import { PageHeader } from '../ui/PageHeader';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Field, inputCls } from '../ui/Field';

export function Categories({ categories, setCategories, products, notify }) {
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);
  const [del, setDel] = useState(null);

  const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const addCategory = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editing) {
      setCategories(categories.map(c => c.id === editing.id ? { ...c, name: name.trim(), slug: slugify(name) } : c));
      notify('Category updated');
      setEditing(null);
    } else {
      setCategories([...categories, { id: Date.now(), name: name.trim(), slug: slugify(name) }]);
      notify('Category added');
    }
    setName('');
  };

  const startEdit = (c) => { setEditing(c); setName(c.name); };
  const handleDelete = () => {
    setCategories(categories.filter(c => c.id !== del.id));
    notify('Category deleted');
    setDel(null);
  };

  const countFor = (slug) => products.filter(p => p.category === slug).length;

  return (
    <div>
      <PageHeader title="Categories" subtitle="Organize how products are grouped across the storefront" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-faint uppercase tracking-wide border-b border-line">
                <th className="px-6 py-3.5">Category</th>
                <th className="px-2 py-3.5">Slug</th>
                <th className="px-2 py-3.5">Products</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c => (
                <tr key={c.id} className="border-b border-line last:border-0">
                  <td className="px-6 py-3.5 font-medium">{c.name}</td>
                  <td className="px-2 py-3.5 text-faint">/{c.slug}</td>
                  <td className="px-2 py-3.5 text-muted">{countFor(c.slug)}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <button aria-label="Edit category" onClick={() => startEdit(c)} className="w-8 h-8 rounded-lg hover:bg-surface2 flex items-center justify-center text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                        </svg>
                      </button>
                      <button aria-label="Delete category" onClick={() => setDel(c)} className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center text-muted hover:text-rose-600">
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
              ))}
            </tbody>
          </table>
          {categories.length === 0 && <div className="p-12 text-center text-sm text-faint">No categories yet.</div>}
        </div>

        <div className="bg-white border border-line rounded-2xl p-6 h-fit">
          <h3 className="font-display text-lg mb-4">{editing ? 'Edit Category' : 'New Category'}</h3>
          <form onSubmit={addCategory}>
            <Field label="Category Name">
              <input className={inputCls} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Outerwear" autoFocus />
            </Field>
            <div className="flex gap-2">
              {editing && <button type="button" onClick={()=>{setEditing(null);setName('');}} className="flex-1 py-2.5 rounded-lg border border-line text-sm font-semibold hover:bg-surface2">Cancel</button>}
              <button type="submit" className="flex-1 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accentDeep">{editing ? 'Save' : 'Add Category'}</button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmDialog open={!!del} title="Delete this category?" body={del ? `"${del.name}" has ${countFor(del.slug)} product(s) assigned. Existing products will keep their category tag but it will no longer appear as a filter.` : ''} onConfirm={handleDelete} onCancel={() => setDel(null)} />
    </div>
  );
}

export default Categories;