import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function DepartmentForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', code: '', branchId: '', managerId: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={set('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={set('code')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Branch ID" value={form.branchId} onChange={set('branchId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Manager ID" value={form.managerId} onChange={set('managerId')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function HrmDepartmentsPage() {
  return <CrudPage title="Departments" endpoint="/hrm/departments" columns={[{ key: 'name', header: 'Name' }, { key: 'code', header: 'Code' }, { key: 'branchId', header: 'Branch' }]} FormComponent={DepartmentForm} />;
}

function PositionForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { title: '', code: '', departmentId: '', description: '', salaryMin: '', salaryMax: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Title" value={form.title} onChange={set('title')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={set('code')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Department ID" value={form.departmentId} onChange={set('departmentId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={set('description')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Salary Min" value={form.salaryMin} onChange={set('salaryMin')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Salary Max" value={form.salaryMax} onChange={set('salaryMax')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function HrmPositionsPage() {
  return <CrudPage title="Positions" endpoint="/hrm/positions" columns={[{ key: 'title', header: 'Title' }, { key: 'code', header: 'Code' }, { key: 'departmentId', header: 'Department' }]} FormComponent={PositionForm} />;
}

function EmployeeForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { firstName: '', lastName: '', employeeCode: '', email: '', phone: '', branchId: '', departmentId: '', positionId: '', hireDate: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="First Name" value={form.firstName} onChange={set('firstName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Last Name" value={form.lastName} onChange={set('lastName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Employee Code" value={form.employeeCode} onChange={set('employeeCode')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Email" type="email" value={form.email} onChange={set('email')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Phone" value={form.phone} onChange={set('phone')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Branch ID" value={form.branchId} onChange={set('branchId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Department ID" value={form.departmentId} onChange={set('departmentId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Position ID" value={form.positionId} onChange={set('positionId')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" placeholder="Hire Date" value={form.hireDate} onChange={set('hireDate')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function HrmEmployeesPage() {
  return <CrudPage title="Employees" endpoint="/hrm/employees" columns={[{ key: 'employeeCode', header: 'Code' }, { key: 'fullName', header: 'Full Name' }, { key: 'email', header: 'Email' }, { key: 'phone', header: 'Phone' }, { key: 'status', header: 'Status' }]} FormComponent={EmployeeForm} />;
}

function AttendanceForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { employeeId: '', date: '', checkIn: '', checkOut: '', status: 'present', notes: '' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit(form); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Employee ID" value={form.employeeId} onChange={set('employeeId')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.date} onChange={set('date')} required />
      <input className="w-full px-3 py-2 border rounded" type="datetime-local" value={form.checkIn} onChange={set('checkIn')} />
      <input className="w-full px-3 py-2 border rounded" type="datetime-local" value={form.checkOut} onChange={set('checkOut')} />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={set('status')}><option value="present">Present</option><option value="absent">Absent</option><option value="late">Late</option></select>
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Notes" value={form.notes} onChange={set('notes')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function HrmAttendancesPage() {
  return <CrudPage title="Attendance" endpoint="/hrm/attendances" columns={[{ key: 'employeeId', header: 'Employee' }, { key: 'date', header: 'Date' }, { key: 'status', header: 'Status' }]} FormComponent={AttendanceForm} />;
}

function LeaveForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { employeeId: '', leaveType: 'annual', startDate: '', endDate: '', totalDays: 1, reason: '', status: 'pending' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit({ ...form, totalDays: Number(form.totalDays) }); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Employee ID" value={form.employeeId} onChange={set('employeeId')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.leaveType} onChange={set('leaveType')}><option value="annual">Annual</option><option value="sick">Sick</option><option value="unpaid">Unpaid</option></select>
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.startDate} onChange={set('startDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.endDate} onChange={set('endDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Total Days" value={form.totalDays} onChange={set('totalDays')} />
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Reason" value={form.reason} onChange={set('reason')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function HrmLeavesPage() {
  return <CrudPage title="Leaves" endpoint="/hrm/leaves" columns={[{ key: 'employeeId', header: 'Employee' }, { key: 'leaveType', header: 'Type' }, { key: 'startDate', header: 'Start' }, { key: 'endDate', header: 'End' }, { key: 'status', header: 'Status' }]} FormComponent={LeaveForm} />;
}

function ContractForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { employeeId: '', type: 'fulltime', startDate: '', endDate: '', salary: 0, status: 'active' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setLoading(true); await onSubmit({ ...form, salary: Number(form.salary) }); setLoading(false); };
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Employee ID" value={form.employeeId} onChange={set('employeeId')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={set('type')}><option value="fulltime">Full-time</option><option value="parttime">Part-time</option><option value="contract">Contract</option></select>
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.startDate} onChange={set('startDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.endDate} onChange={set('endDate')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Salary" value={form.salary} onChange={set('salary')} required />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}

export function HrmContractsPage() {
  return <CrudPage title="Contracts" endpoint="/hrm/contracts" columns={[{ key: 'employeeId', header: 'Employee' }, { key: 'type', header: 'Type' }, { key: 'startDate', header: 'Start' }, { key: 'salary', header: 'Salary' }, { key: 'status', header: 'Status' }]} FormComponent={ContractForm} />;
}
