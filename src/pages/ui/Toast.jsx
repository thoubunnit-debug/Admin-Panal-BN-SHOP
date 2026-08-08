export function Toast({ toast }) {
  if (!toast) return null;
  const tone = toast.type === 'error' ? 'bg-rose-600 text-white' : 'bg-ink text-white';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${tone}`}>{toast.msg}</div>
    </div>
  );
}
