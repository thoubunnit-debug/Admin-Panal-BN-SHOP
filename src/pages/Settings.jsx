import { useState } from 'react';
import { KEYS, DEFAULT_CREDS, load, save } from '../lib/storage';
import { PageHeader } from '../ui/PageHeader';
import { Field, inputCls } from '../ui/Field';

export function Settings({ settings, setSettings, notify }) {
  const [f, setF] = useState(settings);
  const [creds, setCredsState] = useState(() => load(KEYS.CREDS, DEFAULT_CREDS));
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const saveGeneral = (e) => { e.preventDefault(); setSettings(f); notify('Settings saved'); };

  const changePassword = (e) => {
    e.preventDefault();
    if (pw.current !== creds.password) { notify('Current password is incorrect', 'error'); return; }
    if (pw.next.length < 6) { notify('New password must be at least 6 characters', 'error'); return; }
    if (pw.next !== pw.confirm) { notify('New passwords do not match', 'error'); return; }
    const updated = { ...creds, password: pw.next };
    save(KEYS.CREDS, updated);
    setCredsState(updated);
    setPw({ current: '', next: '', confirm: '' });
    notify('Password updated');
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage admin account and general store information" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={saveGeneral} className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-display text-lg mb-4">Store & Admin</h3>
          <Field label="Store Name"><input className={inputCls} value={f.storeName} onChange={set('storeName')} /></Field>
          <Field label="Currency"><input className={inputCls} value={f.currency} onChange={set('currency')} /></Field>
          <Field label="Admin Display Name"><input className={inputCls} value={f.adminName} onChange={set('adminName')} /></Field>
          <Field label="Admin Email"><input type="email" className={inputCls} value={f.adminEmail} onChange={set('adminEmail')} /></Field>
          <button type="submit" className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accentDeep">Save Changes</button>
        </form>

        <form onSubmit={changePassword} className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-display text-lg mb-4">Change Password</h3>
          <div className="text-xs text-faint mb-4">Signed in as <strong className="text-muted">{creds.username}</strong></div>
          <Field label="Current Password"><input type="password" className={inputCls} value={pw.current} onChange={e=>setPw({...pw,current:e.target.value})} /></Field>
          <Field label="New Password"><input type="password" className={inputCls} value={pw.next} onChange={e=>setPw({...pw,next:e.target.value})} /></Field>
          <Field label="Confirm New Password"><input type="password" className={inputCls} value={pw.confirm} onChange={e=>setPw({...pw,confirm:e.target.value})} /></Field>
          <button type="submit" className="px-6 py-2.5 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-black">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;