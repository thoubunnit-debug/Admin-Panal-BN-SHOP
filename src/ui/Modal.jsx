export function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white border border-line shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="font-semibold text-ink">{title}</div>
          <button className="text-faint hover:text-ink" onClick={onClose}>✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
