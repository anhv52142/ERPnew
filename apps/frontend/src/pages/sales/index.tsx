import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function QuotationForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { customerId: '', quotationNumber: '', issueDate: '', expiryDate: '', subtotal: 0, discount: 0, taxAmount: 0, total: 0, currency: 'VND', status: 'draft', notes: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); const d = { ...form, subtotal: Number(form.subtotal), discount: Number(form.discount), taxAmount: Number(form.taxAmount), total: Number(form.total) }; onSubmit(d).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Customer ID" value={form.customerId} onChange={s('customerId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Quotation #" value={form.quotationNumber} onChange={s('quotationNumber')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.issueDate} onChange={s('issueDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.expiryDate} onChange={s('expiryDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Subtotal" value={form.subtotal} onChange={s('subtotal')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Discount" value={form.discount} onChange={s('discount')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Tax Amount" value={form.taxAmount} onChange={s('taxAmount')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Total" value={form.total} onChange={s('total')} required />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function SalesQuotationsPage() { return <CrudPage title="Quotations" endpoint="/sales/quotations" columns={[{ key: 'quotationNumber', header: '#' }, { key: 'customerId', header: 'Customer' }, { key: 'total', header: 'Total' }, { key: 'status', header: 'Status' }, { key: 'issueDate', header: 'Date' }]} FormComponent={QuotationForm} />; }

function SalesOrderForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { customerId: '', orderNumber: '', orderDate: '', deliveryDate: '', subtotal: 0, total: 0, status: 'pending', notes: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); const d = { ...form, subtotal: Number(form.subtotal), total: Number(form.total) }; onSubmit(d).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Customer ID" value={form.customerId} onChange={s('customerId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Order #" value={form.orderNumber} onChange={s('orderNumber')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.orderDate} onChange={s('orderDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.deliveryDate} onChange={s('deliveryDate')} />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Subtotal" value={form.subtotal} onChange={s('subtotal')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Total" value={form.total} onChange={s('total')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={s('status')}><option value="pending">Pending</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function SalesOrdersPage() { return <CrudPage title="Sales Orders" endpoint="/sales/orders" columns={[{ key: 'orderNumber', header: '#' }, { key: 'customerId', header: 'Customer' }, { key: 'total', header: 'Total' }, { key: 'status', header: 'Status' }]} FormComponent={SalesOrderForm} />; }

function InvoiceForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { customerId: '', invoiceNumber: '', issueDate: '', dueDate: '', subtotal: 0, total: 0, status: 'draft', notes: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); const d = { ...form, subtotal: Number(form.subtotal), total: Number(form.total) }; onSubmit(d).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Customer ID" value={form.customerId} onChange={s('customerId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Invoice #" value={form.invoiceNumber} onChange={s('invoiceNumber')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.issueDate} onChange={s('issueDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="date" value={form.dueDate} onChange={s('dueDate')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Subtotal" value={form.subtotal} onChange={s('subtotal')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Total" value={form.total} onChange={s('total')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.status} onChange={s('status')}><option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="overdue">Overdue</option></select>
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function SalesInvoicesPage() { return <CrudPage title="Invoices" endpoint="/sales/invoices" columns={[{ key: 'invoiceNumber', header: '#' }, { key: 'total', header: 'Total' }, { key: 'status', header: 'Status' }, { key: 'dueDate', header: 'Due' }]} FormComponent={InvoiceForm} />; }

function PaymentForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { invoiceId: '', amount: 0, paymentMethod: 'cash', reference: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, amount: Number(form.amount) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Invoice ID" value={form.invoiceId} onChange={s('invoiceId')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Amount" value={form.amount} onChange={s('amount')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.paymentMethod} onChange={s('paymentMethod')}><option value="cash">Cash</option><option value="transfer">Transfer</option><option value="card">Card</option></select>
      <input className="w-full px-3 py-2 border rounded" placeholder="Reference" value={form.reference} onChange={s('reference')} />
      <div className="flex gap-2 justify-end"><button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button></div>
    </form>
  );
}
export function SalesPaymentsPage() { return <CrudPage title="Payments" endpoint="/sales/payments" columns={[{ key: 'invoiceId', header: 'Invoice' }, { key: 'amount', header: 'Amount' }, { key: 'paymentMethod', header: 'Method' }, { key: 'paidAt', header: 'Date' }]} FormComponent={PaymentForm} />; }
