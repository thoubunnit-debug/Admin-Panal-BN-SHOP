import { Icon, paths } from '../lib/icons';

export function Header({ activeLabel, settings, setMobileOpen }) {
  return (
    <header className="h-16 bg-white border-b border-line flex items-center justify-between px-5 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button className="lg:hidden w-9 h-9 rounded-lg hover:bg-surface2 flex items-center justify-center" onClick={() => setMobileOpen(true)}>
          <Icon path={paths.categories} className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-ink hidden sm:block">{activeLabel}</span>
      </div>
      <div className="flex items-center gap-3">
        <a href="index.html" target="_blank" rel="noopener" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-accent border border-line rounded-lg px-3 py-1.5">
          <Icon path={paths.external} className="w-3.5 h-3.5" /> View Storefront
        </a>
        <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center text-xs font-bold">{settings.adminName.charAt(0)}</div>
      </div>
    </header>
  );
}

export default Header;