import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function CampaignForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', type: 'email', status: 'draft', startDate: '', endDate: '', budget: 0, description: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, budget: Number(form.budget) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="email">Email</option><option value="social">Social</option><option value="ads">Ads</option></select>
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.startDate} onChange={s('startDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.endDate} onChange={s('endDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Budget" value={form.budget} onChange={s('budget')} />
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={s('description')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function MktCampaignsPage() { return <CrudPage title="Campaigns" endpoint="/marketing/campaigns" columns={[{ key: 'name', header: 'Name' }, { key: 'type', header: 'Type' }, { key: 'status', header: 'Status' }, { key: 'budget', header: 'Budget' }]} FormComponent={CampaignForm} />; }

function LeadSourceForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', type: 'web' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="web">Web</option><option value="referral">Referral</option><option value="social">Social</option><option value="event">Event</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function MktLeadSourcesPage() { return <CrudPage title="Lead Sources" endpoint="/marketing/lead-sources" columns={[{ key: 'name', header: 'Name' }, { key: 'type', header: 'Type' }]} FormComponent={LeadSourceForm} />; }

function EmailForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { subject: '', body: '', recipient: '', campaignId: '', status: 'draft' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Subject" value={form.subject} onChange={s('subject')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Recipient" value={form.recipient} onChange={s('recipient')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Campaign ID" value={form.campaignId} onChange={s('campaignId')} />
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Body" value={form.body} onChange={s('body')} rows={4} required />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function MktEmailsPage() { return <CrudPage title="Emails" endpoint="/marketing/emails" columns={[{ key: 'subject', header: 'Subject' }, { key: 'recipient', header: 'Recipient' }, { key: 'status', header: 'Status' }]} FormComponent={EmailForm} />; }
