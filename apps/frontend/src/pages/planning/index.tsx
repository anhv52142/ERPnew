import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function ProjectForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', code: '', description: '', startDate: '', endDate: '', status: 'planning', budget: 0, managerId: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, budget: Number(form.budget) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={s('code')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.startDate} onChange={s('startDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.endDate} onChange={s('endDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Budget" value={form.budget} onChange={s('budget')} />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={s('status')}><option value="planning">Planning</option><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={s('description')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function PlnProjectsPage() { return <CrudPage title="Projects" endpoint="/planning/projects" columns={[{ key: 'name', header: 'Name' }, { key: 'code', header: 'Code' }, { key: 'status', header: 'Status' }, { key: 'progress', header: 'Progress' }]} FormComponent={ProjectForm} />; }

function MilestoneForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { projectId: '', name: '', dueDate: '', status: 'pending' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Project ID" value={form.projectId} onChange={s('projectId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.dueDate} onChange={s('dueDate')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={s('status')}><option value="pending">Pending</option><option value="completed">Completed</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function PlnMilestonesPage() { return <CrudPage title="Milestones" endpoint="/planning/milestones" columns={[{ key: 'name', header: 'Name' }, { key: 'projectId', header: 'Project' }, { key: 'dueDate', header: 'Due' }, { key: 'status', header: 'Status' }]} FormComponent={MilestoneForm} />; }

function TaskForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { projectId: '', title: '', assigneeId: '', milestoneId: '', status: 'todo', priority: 'medium', startDate: '', dueDate: '', description: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Title" value={form.title} onChange={s('title')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Project ID" value={form.projectId} onChange={s('projectId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Assignee ID" value={form.assigneeId} onChange={s('assigneeId')} />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={s('status')}><option value="todo">To Do</option><option value="in_progress">In Progress</option><option value="done">Done</option></select>
      <select className="w-full px-3 py-2 border rounded" value={form.priority} onChange={s('priority')}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.dueDate} onChange={s('dueDate')} />
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={s('description')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function PlnTasksPage() { return <CrudPage title="Tasks" endpoint="/planning/tasks" columns={[{ key: 'title', header: 'Title' }, { key: 'status', header: 'Status' }, { key: 'priority', header: 'Priority' }, { key: 'assigneeId', header: 'Assignee' }]} FormComponent={TaskForm} />; }

function ResourceForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', type: 'equipment', employeeId: '', availability: 100, cost: 0 });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, availability: Number(form.availability), cost: Number(form.cost) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="equipment">Equipment</option><option value="material">Material</option><option value="personnel">Personnel</option></select>
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Availability %" value={form.availability} onChange={s('availability')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Cost" value={form.cost} onChange={s('cost')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Employee ID" value={form.employeeId} onChange={s('employeeId')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function PlnResourcesPage() { return <CrudPage title="Resources" endpoint="/planning/resources" columns={[{ key: 'name', header: 'Name' }, { key: 'type', header: 'Type' }, { key: 'availability', header: 'Avail %' }, { key: 'cost', header: 'Cost' }]} FormComponent={ResourceForm} />; }
