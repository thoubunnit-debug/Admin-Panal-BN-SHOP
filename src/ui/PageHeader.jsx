export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <div className="font-display text-2xl text-ink">{title}</div>
        {subtitle ? <div className="text-sm text-faint mt-1">{subtitle}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}