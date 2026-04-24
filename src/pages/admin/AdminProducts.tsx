import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Check, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import MultiImageUpload from '@/components/MultiImageUpload';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(0);
  const [editForm, setEditForm] = useState<Record<string, any>>({});
  const [images, setImages] = useState<string[]>([]);
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
      tagline: product.tagline || '', isActive: String(product.isActive !== false),
    });
    setImages(product.images?.map((img: any) => img.url) || [product.mainImage].filter(Boolean));
  };

  const startNew = () => {
    setEditing(-1 as unknown as number);
    setEditForm({ name: '', slug: '', subtitle: '', description: '', shortDesc: '', basePrice: '', compareAtPrice: '', badge: '', brand: 'CreateShape3D', sku: '', categoryId: '', mainImage: '', tagline: '', isActive: 'true' });
    setImages([]);
  };

  const saveEdit = () => {
    const data: any = {
      name: editForm.name, slug: editForm.slug, subtitle: editForm.subtitle || undefined,
      description: editForm.description || undefined, shortDesc: editForm.shortDesc || undefined,
      basePrice: editForm.basePrice || undefined, compareAtPrice: editForm.compareAtPrice || undefined,
      badge: editForm.badge || undefined, brand: editForm.brand || undefined, sku: editForm.sku || undefined,
      categoryId: editForm.categoryId ? parseInt(editForm.categoryId) : undefined,
      mainImage: images[0] || undefined, tagline: editForm.tagline || undefined,
      isActive: editForm.isActive === 'true',
      images: images.length > 0 ? images : undefined,
    };
    if (editing === -1) { createMutation.mutate(data); }
    else { updateMutation.mutate({ id: editing, data }); }
  };

  const getCategoryName = (catId?: number | null) => {
    if (!catId || !categories) return null;
    for (const c of categories) {
      if (c.id === catId) return c.name;
      if (c.children) {
        const child = c.children.find(ch => ch.id === catId);
        if (child) return child.name;
      }
    }
    return null;
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
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{(editing as number) === -1 ? 'New Product' : 'Edit Product'}</h2>
              <button onClick={() => setEditing(0)} className="p-1 hover:bg-neutral-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Name <span className="text-red-400">*</span></label>
                <input value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">
                  Slug <span className="text-red-400">*</span>
                  <span className="text-neutral-400 font-normal ml-1">— URL-friendly ID, e.g. "prolite-m4k"</span>
                </label>
                <input value={editForm.slug || ''} onChange={e => setEditForm({ ...editForm, slug: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">SKU</label>
                <input value={editForm.sku || ''} onChange={e => setEditForm({ ...editForm, sku: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Tagline</label>
                <input value={editForm.tagline || ''} onChange={e => setEditForm({ ...editForm, tagline: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Badge</label>
                <input value={editForm.badge || ''} onChange={e => setEditForm({ ...editForm, badge: e.target.value })} placeholder="e.g. POPULAR, NEW, BESTSELLER" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Brand</label>
                <input value={editForm.brand || ''} onChange={e => setEditForm({ ...editForm, brand: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Base Price ($)</label>
                <input value={editForm.basePrice || ''} onChange={e => setEditForm({ ...editForm, basePrice: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Compare-at Price ($)</label>
                <input value={editForm.compareAtPrice || ''} onChange={e => setEditForm({ ...editForm, compareAtPrice: e.target.value })} placeholder="Original price for display" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Product Images</label>
                <MultiImageUpload images={images} onChange={setImages} />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Category</label>
                <select value={editForm.categoryId || ''} onChange={e => setEditForm({ ...editForm, categoryId: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
                  <option value="">None</option>
                  {categories?.map(c => (
                    <optgroup key={c.id} label={c.name}>
                      <option value={c.id}>{c.name} (Main)</option>
                      {c.children?.map(ch => (
                        <option key={ch.id} value={ch.id}>— {ch.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Status</label>
                <select value={editForm.isActive || 'true'} onChange={e => setEditForm({ ...editForm, isActive: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
                  <option value="true">Active — visible on storefront</option>
                  <option value="false">Inactive — hidden from storefront</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">
                  Subtitle
                  <span className="text-neutral-400 font-normal ml-1">— Short one-line description shown under product name</span>
                </label>
                <input value={editForm.subtitle || ''} onChange={e => setEditForm({ ...editForm, subtitle: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">
                  Short Description
                  <span className="text-neutral-400 font-normal ml-1">— Used for product cards and listings (keep under 100 chars)</span>
                </label>
                <input value={editForm.shortDesc || ''} onChange={e => setEditForm({ ...editForm, shortDesc: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-neutral-500 mb-1 block">
                  Full Description
                  <span className="text-neutral-400 font-normal ml-1">— HTML code is fully supported. Paste HTML directly for rich formatting, images, and embedded content.</span>
                </label>
                <textarea value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={6} placeholder="<h2>Product Overview</h2><p>Your product description here...</p><img src='/products/detail-1.jpg' />" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 resize-none font-mono" />
                <p className="text-[11px] text-neutral-400 mt-1">Tip: You can use any HTML tags — h1-h6, p, img, ul/li, div, iframe, etc. The code will render exactly as written on the product page.</p>
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
                    <img src={p.mainImage || p.images?.[0]?.url || ''} alt="" className="w-10 h-10 rounded object-cover" />
                    <div><p className="font-medium">{p.name}</p><p className="text-xs text-neutral-500">{p.sku}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3">${p.basePrice}</td>
                <td className="px-4 py-3"><span className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{getCategoryName(p.categoryId) || p.category?.name || '-'}</span></td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>{p.isActive !== false ? 'Active' : 'Inactive'}</span></td>
                <td className="px-4 py-3 text-right">
                  <a href={`/product/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-neutral-100 rounded inline-flex mr-1" title="Preview">
                    <ExternalLink className="w-4 h-4 text-neutral-400" />
                  </a>
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
