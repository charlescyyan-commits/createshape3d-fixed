import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import ImageUpload from '@/components/ImageUpload';

export default function AdminBanners() {
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: '', subtitle: '', description: '', image: '', buttonText: '', buttonLink: '', sortOrder: '0', isActive: 'true',
  });
  const utils = trpc.useUtils();

  const { data: banners, isLoading } = trpc.banner.adminList.useQuery();
  const create = trpc.banner.create.useMutation({
    onSuccess: () => { toast.success('Banner created'); utils.banner.adminList.invalidate(); setEditing(null); },
    onError: (e) => toast.error(e.message),
  });
  const update = trpc.banner.update.useMutation({
    onSuccess: () => { toast.success('Banner updated'); utils.banner.adminList.invalidate(); setEditing(null); },
    onError: (e) => toast.error(e.message),
  });
  const del = trpc.banner.delete.useMutation({
    onSuccess: () => { toast.success('Banner deleted'); utils.banner.adminList.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const startNew = () => {
    setEditing(-1);
    setForm({ title: '', subtitle: '', description: '', image: '', buttonText: '', buttonLink: '', sortOrder: '0', isActive: 'true' });
  };

  const startEdit = (b: any) => {
    setEditing(b.id);
    setForm({
      title: b.title || '',
      subtitle: b.subtitle || '',
      description: b.description || '',
      image: b.image || '',
      buttonText: b.buttonText || '',
      buttonLink: b.buttonLink || '',
      sortOrder: String(b.sortOrder || 0),
      isActive: String(b.isActive !== false),
    });
  };

  const save = () => {
    const data = {
      title: form.title,
      subtitle: form.subtitle || undefined,
      description: form.description || undefined,
      image: form.image,
      buttonText: form.buttonText || undefined,
      buttonLink: form.buttonLink || undefined,
      sortOrder: parseInt(form.sortOrder) || 0,
      isActive: form.isActive === 'true',
    };
    if (editing === -1) create.mutate(data);
    else if (editing !== null) update.mutate({ id: editing, data });
  };

  const preview = (b: any) => {
    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:8px;background:#fff;">
        <img src="${b.image}" style="width:100%;height:300px;object-fit:cover;border-radius:8px;margin-bottom:16px;" />
        <h2 style="font-size:24px;font-weight:bold;margin:0 0 8px;">${b.title}</h2>
        <p style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#666;margin:0 0 8px;">${b.subtitle || ''}</p>
        <p style="font-size:14px;color:#555;margin:0 0 16px;line-height:1.5;">${b.description || ''}</p>
        ${b.buttonText ? `<a href="${b.buttonLink || '#'}" style="display:inline-block;padding:10px 24px;background:#0a1628;color:#fff;text-decoration:none;border-radius:6px;font-size:14px;">${b.buttonText}</a>` : ''}
      </div>
    `;
    const w = window.open('', '_blank', 'width=700,height=500');
    if (w) w.document.write(html);
  };

  if (isLoading) return <div className="text-center py-20 text-neutral-400">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Home Banners</h1>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <p className="text-sm text-neutral-500 mb-6">
        These banners appear in the hero carousel on your homepage. Only the first 3 active banners are displayed.
      </p>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing === -1 ? 'New Banner' : 'Edit Banner'}</h2>
              <button onClick={() => setEditing(null)} className="p-1 hover:bg-neutral-100 rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Title <span className="text-red-400">*</span></label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. CS3D ProLite M4K" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Subtitle <span className="text-neutral-400 font-normal">— small uppercase text above title</span></label>
                <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. 4K MONOCHROME LCD 3D PRINTER" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} placeholder="Short description shown on the banner" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900 resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-neutral-500 mb-1 block">Banner Image <span className="text-red-400">*</span></label>
                <div className="flex gap-3">
                  <div className="w-32">
                    <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-neutral-500 mb-1 block">Or paste image URL</label>
                    <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/slides/hero-1.jpg" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Button Text</label>
                  <input value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} placeholder="Shop Now" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Button Link</label>
                  <input value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} placeholder="/product/prolite-m4k" className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-500 mb-1 block">Status</label>
                  <select value={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.value })} className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
                    <option value="true">Active — shown on homepage</option>
                    <option value="false">Inactive — hidden</option>
                  </select>
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
          <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Banner</th><th className="text-left px-4 py-3 font-medium">Button</th><th className="text-left px-4 py-3 font-medium">Order</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-right px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {banners?.map(b => (
              <tr key={b.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {b.image ? <img src={b.image} alt="" className="w-16 h-10 rounded object-cover" /> : <div className="w-16 h-10 bg-neutral-100 rounded flex items-center justify-center"><ImageIcon className="w-4 h-4 text-neutral-300" /></div>}
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="text-xs text-neutral-400">{b.subtitle || '—'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-500">{b.buttonText || '—'}</td>
                <td className="px-4 py-3 text-neutral-500">{b.sortOrder}</td>
                <td className="px-4 py-3">
                  {b.isActive !== false ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full"><Eye className="w-3 h-3" /> Active</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full"><EyeOff className="w-3 h-3" /> Inactive</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => preview(b)} className="p-1.5 hover:bg-neutral-100 rounded inline-flex" title="Preview"><Eye className="w-4 h-4 text-neutral-400" /></button>
                  <button onClick={() => startEdit(b)} className="p-1.5 hover:bg-neutral-100 rounded inline-flex ml-1" title="Edit"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                  <button onClick={() => { if (confirm('Delete this banner?')) del.mutate(b.id); }} className="p-1.5 hover:bg-neutral-100 rounded inline-flex ml-1" title="Delete"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!banners || banners.length === 0) && <div className="text-center py-12 text-neutral-400">No banners yet. Add your first banner above.</div>}
      </div>
    </div>
  );
}
