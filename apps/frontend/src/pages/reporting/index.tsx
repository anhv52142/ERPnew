import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function ReportForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', type: 'sales', config: {}, isScheduled: false, schedule: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="sales">Sales</option><option value="finance">Finance</option><option value="hrm">HRM</option><option value="inventory">Inventory</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function RptReportsPage() { return <CrudPage title="Reports" endpoint="/reporting/reports" columns={[{ key: 'name', header: 'Name' }, { key: 'type', header: 'Type' }]} FormComponent={ReportForm} />; }

function DashboardForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', description: '', isDefault: false, layout: {} });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={s('description')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function RptDashboardsPage() { return <CrudPage title="Dashboards" endpoint="/reporting/dashboards" columns={[{ key: 'name', header: 'Name' }, { key: 'description', header: 'Description' }, { key: 'isDefault', header: 'Default' }]} FormComponent={DashboardForm} />; }
