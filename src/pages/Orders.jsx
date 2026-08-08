import { useState } from 'react';
import { fmt, fmtDate } from '../lib/storage';
import { PageHeader } from '../ui/PageHeader';
import { StatusPill } from '../ui/StatusPill';
import { Modal } from '../ui/Modal';
import { Field, inputCls } from '../ui/Field';
import { Icon, paths } from '../lib/icons';

export function Orders({ orders, setOrders, notify }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState(null);

  const filtered = orders.filter(o =>
    (status === 'all' || o.status === status) &&
    (o.customerName?.toLowerCase().includes(q.toLowerCase()) || String(o.id).includes(q) || o.phone?.includes(q))
  ).sort((a,b) => new Date(b.date) - new Date(a.date));

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    notify('Order status updated');
    if (view && view.id === id) setView({ ...view, status: newStatus });
  };

  return (
    <div>
      <PageHeader title="Orders" subtitle={`${orders.length} orders placed on the storefront`} />
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Icon path={paths.search} className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input className={inputCls + " pl-10"} placeholder="Search by name, phone, or order ID..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <select className={inputCls + " max-w-[180px]"} value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white border border-line rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="text-left text-xs font-semibold text-faint uppercase tracking-wide border-b border-line">
              <th className="px-6 py-3.5">Order ID</th>
              <th className="px-2 py-3.5">Customer</th>
              <th className="px-2 py-3.5">Date</th>
              <th className="px-2 py-3.5">Total</th>
              <th className="px-2 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                <td className="px-6 py-3.5 font-medium">#{String(o.id).slice(-6)}</td>
                <td className="px-2 py-3.5">
                  <div className="font-medium">{o.customerName}</div>
                  <div className="text-xs text-faint">{o.phone}</div>
                </td>
                <td className="px-2 py-3.5 text-muted text-xs">{fmtDate(o.date)}</td>
                <td className="px-2 py-3.5 font-semibold">{fmt(o.total)}</td>
                <td className="px-2 py-3.5"><StatusPill status={o.status} /></td>
                <td className="px-6 py-3.5 text-right">
                  <button onClick={() => setView(o)} className="text-accent text-xs font-semibold hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {filtered.length === 0 && <div className="p-12 text-center text-sm text-faint">No orders found. Place a test order from the storefront to see it here.</div>}
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title={view ? `Order #${String(view.id).slice(-6)}` : ''} width="max-w-lg">
        {view && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
              <div><div className="text-xs font-semibold text-faint uppercase mb-1">Customer</div><div>{view.customerName}</div></div>
              <div><div className="text-xs font-semibold text-faint uppercase mb-1">Phone</div><div>{view.phone}</div></div>
              <div className="col-span-2"><div className="text-xs font-semibold text-faint uppercase mb-1">Shipping Address</div><div>{view.address}</div></div>
              <div><div className="text-xs font-semibold text-faint uppercase mb-1">Date</div><div>{fmtDate(view.date)}</div></div>
              <div><div className="text-xs font-semibold text-faint uppercase mb-1">Status</div><StatusPill status={view.status} /></div>
            </div>
            <div className="border border-line rounded-xl overflow-hidden mb-5">
              {(view.items||[]).map((it,i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm border-b border-line last:border-0">
                  <span>{it.name} <span className="text-faint">× {it.qty}</span></span>
                  <span className="font-medium">{fmt(it.price * it.qty)}</span>
                </div>
              ))}
              <div className="px-4 py-2.5 text-sm flex justify-between border-b border-line bg-surface/50"><span className="text-muted">Subtotal</span><span>{fmt(view.subtotal)}</span></div>
              <div className="px-4 py-2.5 text-sm flex justify-between bg-surface/50"><span className="text-muted">Tax</span><span>{fmt(view.tax)}</span></div>
              <div className="px-4 py-3 text-sm flex justify-between font-bold bg-surface"><span>Total</span><span>{fmt(view.total)}</span></div>
            </div>
            <Field label="Update Status">
              <select className={inputCls} value={view.status} onChange={(e) => updateStatus(view.id, e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </Field>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Orders;