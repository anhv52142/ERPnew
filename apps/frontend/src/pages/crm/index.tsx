import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function LeadForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { firstName: '', lastName: '', email: '', phone: '', source: '', status: 'new', notes: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="First Name" value={form.firstName} onChange={set('firstName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Email" type="email" value={form.email} onChange={set('email')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Phone" value={form.phone} onChange={set('phone')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Source" value={form.source} onChange={set('source')} />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={set('status')}>
        <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="converted">Converted</option><option value="lost">Lost</option>
      </select>
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Notes" value={form.notes} onChange={set('notes')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function CrmLeadsPage() {
  return <CrudPage title="Leads" endpoint="/crm/leads" columns={[{ key: 'firstName', header: 'First Name' }, { key: 'lastName', header: 'Last Name' }, { key: 'email', header: 'Email' }, { key: 'phone', header: 'Phone' }, { key: 'status', header: 'Status' }]} FormComponent={LeadForm} />;
}

function CustomerForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { type: 'individual', firstName: '', lastName: '', companyName: '', email: '', phone: '', address: '', status: 'active' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={set('type')}><option value="individual">Individual</option><option value="company">Company</option></select>
      <input className="w-full px-3 py-2 border rounded" placeholder="First Name" value={form.firstName} onChange={set('firstName')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Company Name" value={form.companyName} onChange={set('companyName')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Email" type="email" value={form.email} onChange={set('email')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Phone" value={form.phone} onChange={set('phone')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Address" value={form.address} onChange={set('address')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function CrmCustomersPage() {
  return <CrudPage title="Customers" endpoint="/crm/customers" columns={[{ key: 'firstName', header: 'First Name' }, { key: 'lastName', header: 'Last Name' }, { key: 'companyName', header: 'Company' }, { key: 'email', header: 'Email' }, { key: 'phone', header: 'Phone' }, { key: 'status', header: 'Status' }]} FormComponent={CustomerForm} />;
}

function ContactForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { customerId: '', firstName: '', lastName: '', email: '', phone: '', position: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Customer ID" value={form.customerId} onChange={set('customerId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="First Name" value={form.firstName} onChange={set('firstName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Email" value={form.email} onChange={set('email')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Phone" value={form.phone} onChange={set('phone')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Position" value={form.position} onChange={set('position')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function CrmContactsPage() {
  return <CrudPage title="Contacts" endpoint="/crm/contacts" columns={[{ key: 'firstName', header: 'First Name' }, { key: 'lastName', header: 'Last Name' }, { key: 'email', header: 'Email' }, { key: 'phone', header: 'Phone' }, { key: 'position', header: 'Position' }]} FormComponent={ContactForm} />;
}

function OpportunityForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { title: '', value: 0, stage: 'new', probability: 0, customerId: '', leadId: '', closeDate: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit({ ...form, value: Number(form.value), probability: Number(form.probability) }); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Title" value={form.title} onChange={set('title')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Value" type="number" value={form.value} onChange={set('value')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Customer ID" value={form.customerId} onChange={set('customerId')} />
      <select className="w-full px-3 py-2 border rounded" value={form.stage} onChange={set('stage')}><option value="new">New</option><option value="negotiation">Negotiation</option><option value="won">Won</option><option value="lost">Lost</option></select>
      <input className="w-full px-3 py-2 border rounded" placeholder="Probability (%)" type="number" value={form.probability} onChange={set('probability')} />
      <input className="w-full px-3 py-2 border rounded" type="date" placeholder="Close Date" value={form.closeDate} onChange={set('closeDate')} />
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Notes" value={form.notes} onChange={set('notes')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function CrmOpportunitiesPage() {
  return <CrudPage title="Opportunities" endpoint="/crm/opportunities" columns={[{ key: 'title', header: 'Title' }, { key: 'value', header: 'Value' }, { key: 'stage', header: 'Stage' }, { key: 'probability', header: 'Probability %' }]} FormComponent={OpportunityForm} />;
}

function ActivityForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { title: '', type: 'call', description: '', dueDate: '', leadId: '', customerId: '', priority: 'medium', status: 'pending' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Title" value={form.title} onChange={set('title')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={set('type')}><option value="call">Call</option><option value="email">Email</option><option value="meeting">Meeting</option><option value="task">Task</option></select>
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={set('description')} />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.dueDate} onChange={set('dueDate')} />
      <select className="w-full px-3 py-2 border rounded" value={form.priority} onChange={set('priority')}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function CrmActivitiesPage() {
  return <CrudPage title="Activities" endpoint="/crm/activities" columns={[{ key: 'title', header: 'Title' }, { key: 'type', header: 'Type' }, { key: 'priority', header: 'Priority' }, { key: 'status', header: 'Status' }]} FormComponent={ActivityForm} />;
}
