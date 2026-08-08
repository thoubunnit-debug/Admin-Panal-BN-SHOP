import { useMemo } from 'react';
import { Icon, paths } from '../lib/icons';
import { fmt, fmtDate } from '../lib/storage';
import { PageHeader } from '../ui/PageHeader';
import { StatusPill } from '../ui/StatusPill';

export function Dashboard({ products, orders, reviews, settings }) {
  const totalProducts = products.length;
  const newOrders = orders.filter(o => o.status === 'Pending').length;
  const customers = useMemo(() => {
    const set = new Set(orders.map(o => (o.phone || o.customerName || '').toLowerCase()));
    return set.size;
  }, [orders]);
  const revenue = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + (o.total || 0), 0);
  const outOfStock = products.filter(p => (p.stock ?? 0) <= 0);
  const recentOrders = [...orders].sort((a,b)=> new Date(b.date) - new Date(a.date)).slice(0, 5);
  const pendingReviews = reviews.filter(r => r.status === 'Pending').length;

  const cards = [
    { label: 'Total Products', value: totalProducts, icon: paths.box, tint: 'bg-sky-50 text-sky-600' },
    { label: 'New Orders', value: newOrders, icon: paths.orders, tint: 'bg-amber-50 text-amber-600' },
    { label: 'Total Customers', value: customers, icon: paths.customers, tint: 'bg-violet-50 text-violet-600' },
    { label: 'Total Revenue', value: fmt(revenue), icon: paths.cash, tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'Out of Stock', value: outOfStock.length, icon: paths.alert, tint: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${settings.adminName}. Here's what's happening at ${settings.storeName}.`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-white border border-line rounded-2xl p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${c.tint}`}><Icon path={c.icon} className="w-[18px] h-[18px]" /></div>
            <div className="font-display text-2xl mb-0.5">{c.value}</div>
            <div className="text-xs font-medium text-muted">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h3 className="font-display text-lg">Recent Orders</h3>
            <span className="text-xs text-faint">{orders.length} total</span>
          </div>
          {recentOrders.length === 0 ? (
            <div className="p-10 text-center text-sm text-faint">No orders yet — they'll appear here once customers check out on the storefront.</div>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-b border-line last:border-0">
                    <td className="px-6 py-3.5 font-medium">#{String(o.id).slice(-6)}</td>
                    <td className="px-2 py-3.5 text-muted">{o.customerName}</td>
                    <td className="px-2 py-3.5 text-faint text-xs">{fmtDate(o.date)}</td>
                    <td className="px-2 py-3.5"><StatusPill status={o.status} /></td>
                    <td className="px-6 py-3.5 text-right font-semibold">{fmt(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white border border-line rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h3 className="font-display text-lg">Restock Needed</h3>
            <span className="text-xs text-faint">{outOfStock.length}</span>
          </div>
          {outOfStock.length === 0 ? (
            <div className="p-8 text-center text-sm text-faint">Everything's in stock. Nice.</div>
          ) : (
            <div className="divide-y divide-line">
              {outOfStock.slice(0,6).map(p => (
                <div key={p.id} className="px-6 py-3 flex items-center gap-3">
                  <img src={p.image} className="w-9 h-9 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{p.name}</div>
                    <div className="text-xs text-faint capitalize">{p.category}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {pendingReviews > 0 && (
            <div className="px-6 py-3 border-t border-line bg-amber-50/50 text-xs text-amber-700 font-medium">
              {pendingReviews} review{pendingReviews>1?'s':''} awaiting moderation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;