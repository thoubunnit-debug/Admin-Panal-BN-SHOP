import { Icon, NAV, paths } from '../lib/icons';

export function SidebarContent({ tab, setTab, setMobileOpen, onLogout }) {
  return (
    <>
      <div className="px-6 pt-7 pb-6">
        <div className="font-display text-xl text-white">BN SHOP<span className="text-accent">.</span></div>
        <div className="text-[11px] font-semibold tracking-widest uppercase text-white/35 mt-0.5">Admin Panel</div>
      </div>
      <nav className="px-3 flex-1">
        {NAV.map(n => (
          <button key={n.id} onClick={() => { setTab(n.id); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium mb-1 transition ${tab===n.id ? 'bg-accent text-white' : 'text-white/55 hover:text-white hover:bg-white/5'}`}>
            <Icon path={n.icon} className="w-[18px] h-[18px] shrink-0" />
            {n.label}
          </button>
        ))}
      </nav>
      <div className="px-3 pb-6">
        <div className="flex items-center gap-2 px-3.5 py-2 mb-2 text-[11px] text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot"></span> Synced with storefront
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5">
          <Icon path={paths.logout} className="w-[18px] h-[18px]" /> Sign Out
        </button>
      </div>
    </>
  );
}

export function Sidebar({ tab, setTab, mobileOpen, setMobileOpen, onLogout }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-ink min-h-screen sticky top-0">
        <SidebarContent tab={tab} setTab={setTab} setMobileOpen={setMobileOpen} onLogout={onLogout} />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)}></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-ink flex flex-col">
            <SidebarContent tab={tab} setTab={setTab} setMobileOpen={setMobileOpen} onLogout={onLogout} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;