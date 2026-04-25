import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, ExternalLink, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import ImageUpload from '@/components/ImageUpload';

export default function AdminCategories() {
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '', parentId: '', sortOrder: '0', isActive: 'true' });
  const utils = trpc.useUtils();

  const { data: categories } = trpc.category.adminList.useQuery();
  const create = trpc.category.create.useMutation({ onSuccess: () => { toast.success('Created'); utils.category.adminList.invalidate(); setEditing(null); }, onError: (e) => toast.error(e.message) });
  const update = trpc.category.update.useMutation({ onSuccess: () => { toast.success('Updated'); utils.category.adminList.invalidate(); setEditing(null); }, onError: (e) => toast.error(e.message) });
  const del = trpc.category.delete.useMutation({ onSuccess: () => { toast.success('Deleted'); utils.category.adminList.invalidate(); }, onError: (e) => toast.error(e.message) });

  const startNew = () => { setEditing(-1); setForm({ name: '', slug: '', description: '', image: '', parentId: '', sortOrder: '0', isActive: 'true' }); };
  const startEdit = (c: any) => { setEditing(c.id ?? 0); setForm({ name: c.name, slug: c.slug, description: c.description || '', image: c.image || '', parentId: c.parentId ? String(c.parentId) : '', sortOrder: String(c.sortOrder || 0), isActive: String(c.isActive !== false) }); };
  const save = () => {
    const data: any = { name: form.name, slug: form.slug, description: form.description || undefined, image: form.image || undefined, parentId: form.parentId ? parseInt(form.parentId) : undefined, sortOrder: parseInt(form.sortOrder) || 0, isActive: form.isActive === 'true' };
    if (editing === -1) create.mutate(data); else if (editing !== null) update.mutate({ id: editing, data });
  };

  const flatCategories: any[] = [];
  categories?.forEach((c: any) => { flatCategories.push(c); if (c.children) c.children.forEach((ch: any) => flatCategories.push({ ...ch, parentName: c.name })); });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><FolderOpen className="w-6 h-6" /> Categories</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors"><Plus className="w-4 h-4" /> Add Category</button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing === -1 ? 'New Category' : 'Edit Category'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-neutral-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 mb-4">
              <div><label className="text-xs font-medium text-neutral-500 mb-1 block">Name <span className="text-red-400">*</span></label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. 3D Printer" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" /></div>
              <div><label className="text-xs font-medium text-neutral-500 mb-1 block">Slug <span className="text-red-400">*</span> <span className="text-neutral-400 font-normal">— URL-friendly ID</span></label><input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="3d-printer" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" /></div>
              <div><label className="text-xs font-medium text-neutral-500 mb-1 block">Parent Category</label><select value={form.parentId} onChange={e => setForm({ ...form, parentId: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900"><option value="">None (Top-level)</option>{categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <div><label className="text-xs font-medium text-neutral-500 mb-1 block">Description</label><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description for SEO" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium text-neutral-500 mb-1 block">Sort Order</label><input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" /></div>
                <div><label className="text-xs font-medium text-neutral-500 mb-1 block">Status</label><select value={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900"><option value="true">Active</option><option value="false">Inactive</option></select></div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Category Image</label>
                <div className="flex gap-3">
                  <div className="w-28"><ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} /></div>
                  <div className="flex-1"><label className="text-xs font-medium text-neutral-500 mb-1 block">Or paste URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/categories/example.jpg" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" /></div>
                </div>
              </div>
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
          <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Name</th><th className="text-left px-4 py-3 font-medium">Slug</th><th className="text-left px-4 py-3 font-medium">Parent</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-right px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {flatCategories?.map(c => (
              <tr key={c.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    {c.image && <img src={c.image} alt="" className="w-8 h-8 rounded object-cover" />}
                    <span>{c.name}</span>
                    {c.parentName && <span className="text-xs text-neutral-400">← {c.parentName}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-500">{c.slug}</td>
                <td className="px-4 py-3 text-neutral-500">{c.parentName || '-'}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${c.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>{c.isActive !== false ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 text-right">
                  <a href={`/products?category=${c.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-neutral-100 rounded inline-flex mr-1" title="Preview"><ExternalLink className="w-4 h-4 text-neutral-400" /></a>
                  <button onClick={() => startEdit(c)} className="p-1.5 hover:bg-neutral-100 rounded inline-flex"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                  <button onClick={() => { if (confirm('Delete?')) del.mutate(c.id); }} className="p-1.5 hover:bg-neutral-100 rounded inline-flex ml-1"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!flatCategories || flatCategories.length === 0) && <div className="text-center py-12 text-neutral-400">No categories</div>}
      </div>
    </div>
  );
}
