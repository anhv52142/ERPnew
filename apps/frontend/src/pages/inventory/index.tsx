import { useState } from 'react';
import { CrudPage } from '../../components/ui/CrudPage';

function CategoryForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', code: '', parentId: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={s('code')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Parent ID" value={form.parentId} onChange={s('parentId')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}

export function InvCategoriesPage() { return <CrudPage title="Categories" endpoint="/inventory/categories" columns={[{ key: 'name', header: 'Name' }, { key: 'code', header: 'Code' }]} FormComponent={CategoryForm} />; }

function ProductForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', sku: '', barcode: '', categoryId: '', costPrice: 0, sellingPrice: 0, unit: '', minStock: 0, description: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, costPrice: Number(form.costPrice), sellingPrice: Number(form.sellingPrice), minStock: Number(form.minStock) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="SKU" value={form.sku} onChange={s('sku')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Barcode" value={form.barcode} onChange={s('barcode')} />
      <input className="w-full px-3 py-2 border rounded" placeholder="Category ID" value={form.categoryId} onChange={s('categoryId')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Cost Price" value={form.costPrice} onChange={s('costPrice')} required />
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Selling Price" value={form.sellingPrice} onChange={s('sellingPrice')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Unit" value={form.unit} onChange={s('unit')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}

export function InvProductsPage() { return <CrudPage title="Products" endpoint="/inventory/products" columns={[{ key: 'sku', header: 'SKU' }, { key: 'name', header: 'Name' }, { key: 'costPrice', header: 'Cost' }, { key: 'sellingPrice', header: 'Price' }]} FormComponent={ProductForm} />; }

function WarehouseForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { name: '', code: '', branchId: '', address: '', managerId: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit(form).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={form.name} onChange={s('name')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Code" value={form.code} onChange={s('code')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Branch ID" value={form.branchId} onChange={s('branchId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Address" value={form.address} onChange={s('address')} />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}

export function InvWarehousesPage() { return <CrudPage title="Warehouses" endpoint="/inventory/warehouses" columns={[{ key: 'name', header: 'Name' }, { key: 'code', header: 'Code' }, { key: 'address', header: 'Address' }]} FormComponent={WarehouseForm} />; }

function StockMovementForm({ initialData, onSubmit, onCancel }: any) {
  const [form, setForm] = useState(initialData || { productId: '', warehouseId: '', type: 'in', quantity: 0, reference: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const h = (e: React.FormEvent) => { e.preventDefault(); setLoading(true); onSubmit({ ...form, quantity: Number(form.quantity) }).finally(() => setLoading(false)); };
  const s = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={h} className="space-y-3">
      <input className="w-full px-3 py-2 border rounded" placeholder="Product ID" value={form.productId} onChange={s('productId')} required />
      <input className="w-full px-3 py-2 border rounded" placeholder="Warehouse ID" value={form.warehouseId} onChange={s('warehouseId')} required />
      <select className="w-full px-3 py-2 border rounded" value={form.type} onChange={s('type')}><option value="in">In</option><option value="out">Out</option><option value="transfer">Transfer</option></select>
      <input className="w-full px-3 py-2 border rounded" type="number" placeholder="Quantity" value={form.quantity} onChange={s('quantity')} required />
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-sm">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}

export function InvStockMovementsPage() { return <CrudPage title="Stock Movements" endpoint="/inventory/stock-movements" columns={[{ key: 'productId', header: 'Product' }, { key: 'warehouseId', header: 'Warehouse' }, { key: 'type', header: 'Type' }, { key: 'quantity', header: 'Qty' }]} FormComponent={StockMovementForm} />; }
