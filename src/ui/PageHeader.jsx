export function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="font-display text-2xl text-ink">{title}</div>
      {subtitle ? <div className="text-sm text-faint mt-1">{subtitle}</div> : null}
    </div>
  );
}
