import { useState, useMemo } from 'react';
import { Icon, paths } from '../lib/icons';
import { fmt, fmtDate } from '../lib/storage';
import { PageHeader } from '../ui/PageHeader';
import { inputCls } from '../ui/Field';

export function Customers({ orders }) {
  const [q, setQ] = useState('');
  const customers = useMemo(() => {
    const map = new Map();
    orders.forEach(o => {
      const key = (o.phone || o.customerName || '').toLowerCase();
      if (!map.has(key)) map.set(key, { name: o.customerName, phone: o.phone, address: o.address, orders: 0, spent: 0, lastOrder: o.date });
      const c = map.get(key);
      c.orders += 1;
      c.spent += o.total || 0;
      if (new Date(o.date) > new Date(c.lastOrder)) { c.lastOrder = o.date; c.address = o.address; }
    });
    return [...map.values()].sort((a,b) => b.spent - a.spent);
  }, [orders]);

  const filtered = customers.filter(c => c.name?.toLowerCase().includes(q.toLowerCase()) || c.phone?.includes(q));

  return (
    <div>
      <PageHeader title="Customers" subtitle={`${customers.length} unique customers, derived from order history`} />
      <div className="relative max-w-sm mb-5">
        <Icon path={paths.search} className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
        <input className={inputCls + " pl-10"} placeholder="Search customers..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="bg-white border border-line rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-xs font-semibold text-faint uppercase tracking-wide border-b border-line">
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-2 py-3.5">Phone</th>
              <th className="px-2 py-3.5">Orders</th>
              <th className="px-2 py-3.5">Total Spent</th>
              <th className="px-6 py-3.5">Last Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c,i) => (
              <tr key={i} className="border-b border-line last:border-0 hover:bg-surface/60">
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center text-xs font-bold text-muted shrink-0">{(c.name||'?').charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-faint truncate max-w-[220px]">{c.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3.5 text-muted">{c.phone}</td>
                <td className="px-2 py-3.5 text-muted">{c.orders}</td>
                <td className="px-2 py-3.5 font-semibold">{fmt(c.spent)}</td>
                <td className="px-6 py-3.5 text-xs text-faint">{fmtDate(c.lastOrder)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-faint">No customers yet — they appear automatically once orders come in.</div>}
      </div>
    </div>
  );
}

export default Customers;