import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';

export default function AdminSettings() {
  const { data: settings } = trpc.setting.list.useQuery();
  const utils = trpc.useUtils();
  const [editing, setEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const setMutation = trpc.setting.set.useMutation({
    onSuccess: () => { toast.success('Saved'); utils.setting.list.invalidate(); setEditing(null); },
    onError: (e) => toast.error(e.message),
  });
  const delMutation = trpc.setting.delete.useMutation({
    onSuccess: () => { toast.success('Deleted'); utils.setting.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const addSetting = () => {
    if (!newKey || !newValue) { toast.error('Key and value required'); return; }
    setMutation.mutate({ key: newKey, value: newValue, label: newLabel || undefined });
    setNewKey(''); setNewValue(''); setNewLabel('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      {/* Add new */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-6">
        <h2 className="font-semibold mb-3">Add Setting</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="Key (e.g. phone)" className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
          <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label (e.g. Phone Number)" className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
          <input value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Value" className="px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
        </div>
        <button onClick={addSetting} className="mt-3 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">Add</button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Key</th><th className="text-left px-4 py-3 font-medium">Label</th><th className="text-left px-4 py-3 font-medium">Value</th><th className="text-right px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {settings?.map(s => (
              <tr key={s.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                <td className="px-4 py-3 font-mono text-xs">{s.key}</td>
                <td className="px-4 py-3 text-neutral-500">{s.label || '-'}</td>
                <td className="px-4 py-3">
                  {editing === s.id ? (
                    <input value={editValue} onChange={e => setEditValue(e.target.value)} className="w-full px-2 py-1 border border-neutral-300 rounded text-sm" autoFocus />
                  ) : (
                    <span className="text-neutral-700">{s.value || '-'}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {editing === s.id ? (
                    <>
                      <button onClick={() => setMutation.mutate({ key: s.key, value: editValue, label: s.label || undefined })} className="p-1.5 hover:bg-green-100 rounded inline-flex"><Check className="w-4 h-4 text-green-600" /></button>
                      <button onClick={() => setEditing(null)} className="p-1.5 hover:bg-neutral-100 rounded inline-flex ml-1"><X className="w-4 h-4 text-neutral-500" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditing(s.id); setEditValue(s.value || ''); }} className="p-1.5 hover:bg-neutral-100 rounded inline-flex"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                      <button onClick={() => { if (confirm('Delete?')) delMutation.mutate(s.id); }} className="p-1.5 hover:bg-red-100 rounded inline-flex ml-1"><X className="w-4 h-4 text-red-400" /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!settings?.length && <div className="text-center py-12 text-neutral-400">No settings</div>}
      </div>
    </div>
  );
}
