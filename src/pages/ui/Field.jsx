export function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <div className="text-xs font-semibold text-faint uppercase tracking-wide mb-2">{label}</div>
      {children}
    </label>
  );
}

export const inputCls = 'w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent';
