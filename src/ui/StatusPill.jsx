export function StatusPill({ status }) {
  const tone = {
    Active: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Approved: 'bg-emerald-50 text-emerald-700',
    Draft: 'bg-slate-100 text-slate-600',
    Cancelled: 'bg-rose-50 text-rose-700',
    Complete: 'bg-emerald-50 text-emerald-700',
    Processing: 'bg-sky-50 text-sky-700',
  }[status] || 'bg-slate-100 text-slate-600';

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}>{status}</span>;
}
