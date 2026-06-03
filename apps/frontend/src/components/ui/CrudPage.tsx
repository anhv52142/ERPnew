import { useCallback, useEffect, useState } from 'react';
import api from '../../api/client';
import { PageHeader } from '../ui/PageHeader';
import { DataTable, Pagination } from '../ui/DataTable';
import { Modal } from '../ui/Modal';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface CrudPageProps {
  title: string;
  description?: string;
  endpoint: string;
  columns: { key: string; header: string; render?: (item: any) => React.ReactNode }[];
  createLabel?: string;
  children?: React.ReactNode;
  FormComponent?: React.ComponentType<{ initialData?: any; onSubmit: (data: any) => Promise<void>; onCancel: () => void }>;
}

export function CrudPage({ title, description, endpoint, columns, createLabel = 'Create', FormComponent }: CrudPageProps) {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(endpoint, { params: { page, limit: 20 } });
      setItems(data.items || data || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async (formData: any) => {
    await api.post(endpoint, formData);
    setModalOpen(false);
    fetchData();
  };

  const handleUpdate = async (formData: any) => {
    await api.put(`${endpoint}/${editItem.id}`, formData);
    setEditItem(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await api.delete(`${endpoint}/${id}`);
    fetchData();
  };

  const allColumns = [
    ...columns,
    {
      key: 'actions',
      header: '',
      render: (item: any) => (
        <div className="flex items-center gap-1">
          {FormComponent && (
            <button onClick={() => setEditItem(item)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded">
              <Pencil className="h-4 w-4" />
            </button>
          )}
          <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={FormComponent && (
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            {createLabel}
          </button>
        )}
      />
      <DataTable columns={allColumns} data={items} loading={loading} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {FormComponent && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`Create ${title}`}>
          <FormComponent onSubmit={handleCreate} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
      {editItem && FormComponent && (
        <Modal open={true} onClose={() => setEditItem(null)} title={`Edit ${title}`}>
          <FormComponent initialData={editItem} onSubmit={handleUpdate} onCancel={() => setEditItem(null)} />
        </Modal>
      )}
    </div>
  );
}
