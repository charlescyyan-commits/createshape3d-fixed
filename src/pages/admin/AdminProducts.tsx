import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import ImageUpload from '@/components/ImageUpload';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(0);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const utils = trpc.useUtils();

  const { data: products } = trpc.product.list.useQuery({});
  const { data: categories } = trpc.category.list.useQuery();

  const deleteMutation = trpc.product.delete.useMutation({
    onSuccess: () => { toast.success('Deleted'); utils.product.list.invalidate(); },
  });
  const updateMutation = trpc.product.update.useMutation({
    onSuccess: () => { toast.success('Updated'); utils.product.list.invalidate(); setEditing(0); },
  });
  const createMutation = trpc.product.create.useMutation({
    onSuccess: () => { toast.success('Created'); utils.product.list.invalidate(); setEditing(0); },
  });

  const filtered = products?.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const startEdit = (product: any) => {
    setEditing(product.id);
    setEditForm({
      name: product.name || '', slug: product.slug || '', subtitle: product.subtitle || '',
      description: product.description || '', shortDesc: product.shortDesc || '',
      basePrice: String(product.basePrice || ''), compareAtPrice: String(product.compareAtPrice || ''),
      badge: product.badge || '', brand: product.brand || '', sku: product.sku || '',
      categoryId: String(product.categoryId || ''), mainImage: product.mainImage || '',
      tagline: product.tagline || '', isActive: String(product.isActive || true),
    });
  };

  const startNew = () => {
    setEditing(-1 as unknown as number);
    setEditForm({ name: '', slug: '', subtitle: '', description: '', shortDesc: '', basePrice: '', compareAtPrice: '', badge: '', brand: 'CreateShape3D', sku: '', categoryId: '', mainImage: '/products/resin-washable-1kg.jpg', tagline: '', isActive: 'true' });
  };

  const saveEdit = () => {
    const data = {
      name: editForm.name, slug: editForm.slug, subtitle: editForm.subtitle || undefined,
      description: editForm.description || undefined, shortDesc: editForm.shortDesc || undefined,
      basePrice: editForm.basePrice || undefined, compareAtPrice: editForm.compareAtPrice || undefined,
      badge: editForm.badge || undefined, brand: editForm.brand || undefined, sku: editForm.sku || undefined,
      categoryId: editForm.categoryId ? parseInt(editForm.categoryId) : undefined,
      mainImage: editForm.mainImage || undefined, tagline: editForm.tagline || undefined,
      isActive: editForm.isActive === 'true',
    };
    if (editing === -1) { createMutation.mutate(data as any); }
    else { updateMutation.mutate({ id: editing, data }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
      </div>

      {editing !== 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{(editing as number) === -1 ? 'New Product' : 'Edit Product'}</h2>
              <button onClick={() => setEditing(0)} className="p-1 hover:bg-neutral-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {['name','slug','tagline','badge','brand','sku','basePrice','compareAtPrice'].map(field => (
                <div key={field}>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block capitalize">{field}</label>
                  <input value={editForm[field] || ''} onChange={e => setEditForm({ ...editForm, [field]: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Product Image</label>
                <div className="flex gap-4">
                  <div className="w-40">
                    <ImageUpload
                      value={editForm.mainImage || ''}
                      onChange={(url) => setEditForm({ ...editForm, mainImage: url })}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-neutral-500 mb-1 block">Or paste image URL</label>
                    <input
                      value={editForm.mainImage || ''}
                      onChange={e => setEditForm({ ...editForm, mainImage: e.target.value })}
                      placeholder="/products/example.jpg or /uploads/xxx.jpg"
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900"
                    />
                    {editForm.mainImage && (
                      <p className="text-xs text-neutral-400 mt-1">{editForm.mainImage}</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Category</label>
                <select value={editForm.categoryId || ''} onChange={e => setEditForm({ ...editForm, categoryId: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
                  <option value="">None</option>
                  {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Active</label>
                <select value={editForm.isActive || 'true'} onChange={e => setEditForm({ ...editForm, isActive: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Subtitle</label>
                <input value={editForm.subtitle || ''} onChange={e => setEditForm({ ...editForm, subtitle: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Short Description</label>
                <input value={editForm.shortDesc || ''} onChange={e => setEditForm({ ...editForm, shortDesc: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Description</label>
                <textarea value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 resize-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={saveEdit} className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1"><Check className="w-4 h-4" /> Save</button>
              <button onClick={() => setEditing(0)} className="px-4 py-2 border border-neutral-200 text-sm rounded-lg hover:bg-neutral-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Product</th><th className="text-left px-4 py-3 font-medium">Price</th><th className="text-left px-4 py-3 font-medium">Category</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-right px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {filtered?.map(p => (
              <tr key={p.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.mainImage || ''} alt="" className="w-10 h-10 rounded object-cover" />
                    <div><p className="font-medium">{p.name}</p><p className="text-xs text-neutral-500">{p.sku}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3">${p.basePrice}</td>
                <td className="px-4 py-3"><span className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{p.category?.name || '-'}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>{p.isActive ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(p)} className="p-1.5 hover:bg-neutral-100 rounded inline-flex"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                  <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(p.id); }} className="p-1.5 hover:bg-neutral-100 rounded inline-flex ml-1"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered?.length && <div className="text-center py-12 text-neutral-400">No products</div>}
      </div>
    </div>
  );
}
