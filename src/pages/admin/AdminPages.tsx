import { useState } from 'react';
import { trpc } from '@/providers/trpc';
import { Loader2, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPages() {
  const utils = trpc.useUtils();
  const { data: pages, isLoading } = trpc.page.adminList.useQuery();

  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', content: '', metaDescription: '', isActive: true, sortOrder: 0,
  });

  const createMutation = trpc.page.create.useMutation({
    onSuccess: () => { toast.success('Page created'); utils.page.adminList.invalidate(); resetForm(); },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.page.update.useMutation({
    onSuccess: () => { toast.success('Page updated'); utils.page.adminList.invalidate(); resetForm(); },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.page.delete.useMutation({
    onSuccess: () => { toast.success('Page deleted'); utils.page.adminList.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ title: '', slug: '', content: '', metaDescription: '', isActive: true, sortOrder: 0 });
  };

  const startEdit = (page: any) => {
    setEditing(page);
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content || '',
      metaDescription: page.metaDescription || '',
      isActive: page.isActive !== false,
      sortOrder: page.sortOrder || 0,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-300" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">CMS Pages</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Page
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" placeholder="about-us" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <input value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" placeholder="Brief description for SEO" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content (HTML supported)</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 h-48 font-mono" placeholder="<p>Your page content here...</p>" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4" />
              Active
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">Sort Order:</span>
              <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-20 px-3 py-1 border border-neutral-300 rounded-lg text-sm" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50">
              {editing ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={resetForm} className="border border-neutral-300 hover:bg-neutral-50 px-5 py-2 rounded-lg text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Slug</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {pages?.map((page) => (
              <tr key={page.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium">{page.title}</td>
                <td className="px-4 py-3 text-neutral-500 font-mono text-xs">/{page.slug}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${page.isActive !== false ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
                  {page.isActive !== false ? 'Active' : 'Inactive'}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <a href={`/page/${page.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-neutral-400 hover:text-blue-600 transition-colors" title="Preview">
                      <Eye className="w-4 h-4" />
                    </a>
                    <button onClick={() => startEdit(page)} className="p-1.5 text-neutral-400 hover:text-blue-600 transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => { if (confirm('Delete this page?')) deleteMutation.mutate({ id: page.id }); }} className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!pages || pages.length === 0) && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-neutral-400">No pages yet. Create your first page above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
