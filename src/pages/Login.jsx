import { useState } from 'react';
import { KEYS, DEFAULT_CREDS, load } from '../lib/storage';
import { Field, inputCls } from '../ui/Field';

export function Login({ onLogin }) {
  const [creds] = useState(() => load(KEYS.CREDS, DEFAULT_CREDS));
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const stored = load(KEYS.CREDS, DEFAULT_CREDS);
    if (u === stored.username && p === stored.password) { setErr(''); onLogin(); }
    else setErr('Incorrect username or password.');
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.15]" style={{background:"radial-gradient(circle at 30% 20%, #1ab8e8 0%, transparent 45%)"}}></div>
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="font-display text-2xl mb-1">BN SHOP<span className="text-accent">.</span></div>
        <div className="text-xs font-semibold tracking-widest uppercase text-faint mb-8">Admin Panel</div>
        <form onSubmit={submit}>
          <Field label="Username">
            <input className={inputCls} value={u} onChange={e=>setU(e.target.value)} placeholder="admin" autoFocus />
          </Field>
          <Field label="Password">
            <input type="password" className={inputCls} value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••" />
          </Field>
          {err && <div className="text-xs text-rose-600 font-medium mb-4 -mt-2">{err}</div>}
          <button className="w-full py-3 bg-accent hover:bg-accentDeep text-white rounded-lg text-sm font-semibold transition">Sign In</button>
        </form>
        <div className="mt-6 pt-5 border-t border-line text-xs text-faint leading-relaxed">
          Demo credentials — <strong className="text-muted">admin / admin123</strong>. Change these anytime from Settings.
        </div>
      </div>
    </div>
  );
}

export default Login;