import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function AccountForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { code: '', name: '', type: 'asset', parentId: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={s('code')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="asset">Asset</option><option value="liability">Liability</option><option value="equity">Equity</option><option value="revenue">Revenue</option><option value="expense">Expense</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function FinAccountsPage() { return <CrudPage title="Chart of Accounts" endpoint="/finance/accounts" columns={[{ key: 'code', header: 'Code' }, { key: 'name', header: 'Name' }, { key: 'type', header: 'Type' }]} FormComponent={AccountForm} />; }

function BankAccountForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { bankName: '', accountName: '', accountNumber: '', branch: '', currency: 'VND' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Bank Name" value={form.bankName} onChange={s('bankName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Account Name" value={form.accountName} onChange={s('accountName')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Account Number" value={form.accountNumber} onChange={s('accountNumber')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Branch" value={form.branch} onChange={s('branch')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function FinBankAccountsPage() { return <CrudPage title="Bank Accounts" endpoint="/finance/bank-accounts" columns={[{ key: 'bankName', header: 'Bank' }, { key: 'accountName', header: 'Account' }, { key: 'accountNumber', header: 'Number' }]} FormComponent={BankAccountForm} />; }

function ExpenseForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { category: '', amount: 0, description: '', expenseDate: '', paidTo: '', paymentMethod: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, amount: Number(form.amount) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Category" value={form.category} onChange={s('category')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Amount" value={form.amount} onChange={s('amount')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.expenseDate} onChange={s('expenseDate')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Paid To" value={form.paidTo} onChange={s('paidTo')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Method" value={form.paymentMethod} onChange={s('paymentMethod')} />
      <textarea className="w-full px-3 py-2 border rounded" placeholder="Description" value={form.description} onChange={s('description')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function FinExpensesPage() { return <CrudPage title="Expenses" endpoint="/finance/expenses" columns={[{ key: 'category', header: 'Category' }, { key: 'amount', header: 'Amount' }, { key: 'expenseDate', header: 'Date' }]} FormComponent={ExpenseForm} />; }

function TaxForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', code: '', rate: 0, type: 'vat', description: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, rate: Number(form.rate) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={s('code')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Rate (%)" value={form.rate} onChange={s('rate')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="vat">VAT</option><option value="sales">Sales</option><option value="income">Income</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function FinTaxesPage() { return <CrudPage title="Taxes" endpoint="/finance/taxes" columns={[{ key: 'name', header: 'Name' }, { key: 'code', header: 'Code' }, { key: 'rate', header: 'Rate %' }, { key: 'type', header: 'Type' }]} FormComponent={TaxForm} />; }
