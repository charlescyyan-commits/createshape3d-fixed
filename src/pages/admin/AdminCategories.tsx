import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';

export default function AdminCategories() {
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '' });
  const utils = trpc.useUtils();

  const { data: categories } = trpc.category.list.useQuery();
  const create = trpc.category.create.useMutation({ onSuccess: () => { toast.success('Created'); utils.category.list.invalidate(); setEditing(null); }, onError: (e) => toast.error(e.message) });
  const update = trpc.category.update.useMutation({ onSuccess: () => { toast.success('Updated'); utils.category.list.invalidate(); setEditing(null); }, onError: (e) => toast.error(e.message) });
  const del = trpc.category.delete.useMutation({ onSuccess: () => { toast.success('Deleted'); utils.category.list.invalidate(); }, onError: (e) => toast.error(e.message) });

  const startNew = () => { setEditing(-1 as number); setForm({ name: '', slug: '', description: '', image: '' }); };
  const startEdit = (c: any) => { setEditing(Number(c.id) as number); setForm({ name: c.name, slug: c.slug, description: c.description || '', image: c.image || '' }); };
  const save = () => {
    const data = { ...form, description: form.description || undefined, image: form.image || undefined };
    if (editing === -1) create.mutate(data); else update.mutate({ id: editing, data });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"><Plus className="w-4 h-4" /> Add</button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing === -1 ? 'New Category' : 'Edit Category'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-neutral-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 mb-4">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Slug (e.g. 3d-printer)" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="Image URL (optional)" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
            </div>
            <div className="flex gap-2">
              <button onClick={save} className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1"><Check className="w-4 h-4" /> Save</button>
              <button onClick={() => setEditing(null)} className="px-4 py-2 border border-neutral-200 text-sm rounded-lg hover:bg-neutral-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Name</th><th className="text-left px-4 py-3 font-medium">Slug</th><th className="text-right px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {categories?.map(c => (
              <tr key={c.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-neutral-500">{c.slug}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(c)} className="p-1.5 hover:bg-neutral-100 rounded inline-flex"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                  <button onClick={() => { if (confirm('Delete?')) del.mutate(c.id); }} className="p-1.5 hover:bg-neutral-100 rounded inline-flex ml-1"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
