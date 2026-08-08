import { useState } from 'react';
import { PageHeader } from '../ui/PageHeader';
import { Field, inputCls } from '../ui/Field';

export function CMS({ cms, setCms, notify }) {
  const [f, setF] = useState(cms);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setCms(f); notify('Site content saved'); };

  return (
    <div>
      <PageHeader title="Content / CMS" subtitle="Edit the text and messaging shown across the storefront" />
      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-display text-lg mb-4">Hero Section</h3>
          <Field label="Badge Text"><input className={inputCls} value={f.heroBadge} onChange={set('heroBadge')} /></Field>
          <Field label="Headline"><input className={inputCls} value={f.heroTitle} onChange={set('heroTitle')} /></Field>
          <Field label="Subtext"><textarea rows="3" className={inputCls} value={f.heroSubtitle} onChange={set('heroSubtitle')} /></Field>
        </div>
        <div className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-display text-lg mb-4">Featured Banner</h3>
          <Field label="Tag"><input className={inputCls} value={f.bannerTag} onChange={set('bannerTag')} /></Field>
          <Field label="Title"><input className={inputCls} value={f.bannerTitle} onChange={set('bannerTitle')} /></Field>
          <Field label="Description"><textarea rows="3" className={inputCls} value={f.bannerText} onChange={set('bannerText')} /></Field>
        </div>
        <div className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-display text-lg mb-4">About Us</h3>
          <Field label="About Text"><textarea rows="5" className={inputCls} value={f.aboutUs} onChange={set('aboutUs')} /></Field>
        </div>
        <div className="bg-white border border-line rounded-2xl p-6">
          <h3 className="font-display text-lg mb-4">Contact Information</h3>
          <Field label="Phone"><input className={inputCls} value={f.contactPhone} onChange={set('contactPhone')} /></Field>
          <Field label="Email"><input className={inputCls} value={f.contactEmail} onChange={set('contactEmail')} /></Field>
          <Field label="Address"><input className={inputCls} value={f.contactAddress} onChange={set('contactAddress')} /></Field>
        </div>
        <div className="lg:col-span-2">
          <button type="submit" className="px-6 py-3 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accentDeep">Save Content</button>
        </div>
      </form>
    </div>
  );
}

export default CMS;