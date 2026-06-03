import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function CompanyForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', slug: '', email: '', phone: '', address: '', city: '', country: 'VN' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Slug" value={form.slug} onChange={s('slug')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Email" type="email" value={form.email} onChange={s('email')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Phone" value={form.phone} onChange={s('phone')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Address" value={form.address} onChange={s('address')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="City" value={form.city} onChange={s('city')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}

export function CompaniesPage() { return <CrudPage title="Companies" endpoint="/companies" columns={[{ key: 'name', header: 'Name' }, { key: 'slug', header: 'Slug' }, { key: 'email', header: 'Email' }, { key: 'phone', header: 'Phone' }, { key: 'plan', header: 'Plan' }]} FormComponent={CompanyForm} />; }

function UserForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Email" type="email" value={form.email} onChange={s('email')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Password" type="password" value={form.password} onChange={s('password')} required />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}

export function UsersPage() { return <CrudPage title="Users" endpoint="/users" columns={[{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }, { key: 'isActive', header: 'Active', render: (u: any) => u.isActive ? 'Yes' : 'No' }]} FormComponent={UserForm} />; }
