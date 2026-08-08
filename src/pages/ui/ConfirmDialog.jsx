export function ConfirmDialog({ open, message, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white border border-line shadow-2xl p-4">
        <div className="text-sm text-ink mb-4">{message}</div>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 rounded-lg text-sm text-muted hover:bg-surface" onClick={onCancel}>Cancel</button>
          <button className="px-3 py-2 rounded-lg text-sm bg-rose-600 text-white hover:bg-rose-700" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
