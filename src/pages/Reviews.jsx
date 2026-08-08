import { useState } from 'react';
import { Icon, paths } from '../lib/icons';
import { fmtDate } from '../lib/storage';
import { PageHeader } from '../ui/PageHeader';
import { StatusPill } from '../ui/StatusPill';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export function Stars({ n }) {
  return <div className="flex gap-0.5 text-amber-400">{[1,2,3,4,5].map(i => <Icon key={i} path={paths.star} className={`w-3.5 h-3.5 ${i<=n ? 'fill-amber-400' : 'fill-none'} text-amber-400`} />)}</div>;
}

export function Reviews({ reviews, setReviews, products, notify }) {
  const [filter, setFilter] = useState('all');
  const [del, setDel] = useState(null);
  const productName = (id) => products.find(p => p.id === id)?.name || 'Unknown product';

  const filtered = filter === 'all' ? reviews : reviews.filter(r => r.status === filter);

  const setStatus = (id, status) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
    notify(status === 'Approved' ? 'Review approved' : status === 'Rejected' ? 'Review rejected' : 'Review updated');
  };
  const handleDelete = () => { setReviews(reviews.filter(r => r.id !== del.id)); notify('Review deleted'); setDel(null); };

  return (
    <div>
      <PageHeader title="Reviews" subtitle="Moderate customer feedback shown on product pages" />
      <div className="flex gap-2 mb-5">
        {['all','Pending','Approved','Rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${filter===s ? 'bg-ink text-white border-ink' : 'bg-white text-muted border-line hover:border-ink'}`}>{s === 'all' ? 'All' : s}</button>
        ))}
      </div>
      <div className="grid gap-3">
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-line rounded-2xl p-5 flex items-start gap-4 flex-wrap sm:flex-nowrap">
            <div className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center text-sm font-bold text-muted shrink-0">{(r.customer || 'A').charAt(0).toUpperCase()}</div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-sm">{r.customer || 'Anonymous'}</span>
                <Stars n={r.rating} />
                <span className="text-xs text-faint">on {r.product || productName(r.productId)}</span>
              </div>
              <p className="text-sm text-muted mb-2 leading-relaxed">{r.comment}</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-faint">{fmtDate(r.date)}</span>
                <StatusPill status={r.status} />
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              {r.status !== 'Approved' && <button onClick={() => setStatus(r.id, 'Approved')} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100">Approve</button>}
              {r.status !== 'Rejected' && <button onClick={() => setStatus(r.id, 'Rejected')} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100">Reject</button>}
              <button onClick={() => setDel(r)} className="w-8 h-8 rounded-lg hover:bg-surface2 flex items-center justify-center text-muted"><Icon path={paths.trash} className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="bg-white border border-line rounded-2xl p-12 text-center text-sm text-faint">No reviews in this filter.</div>}
      </div>
      <ConfirmDialog open={!!del} title="Delete this review?" body="This will permanently remove the review." onConfirm={handleDelete} onCancel={() => setDel(null)} />
    </div>
  );
}

export default Reviews;
