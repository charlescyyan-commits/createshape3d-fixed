import { useState } from 'react';
import { Pencil, Check, X, Phone, Mail, MapPin, Globe, Truck, Image } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';

const PRESET_KEYS = [
  { key: 'site_name', label: 'Site Name', icon: Globe, placeholder: 'CreateShape3D' },
  { key: 'site_logo', label: 'Logo URL', icon: Image, placeholder: '/logo.png' },
  { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '+86 400-888-3D88' },
  { key: 'email', label: 'Email Address', icon: Mail, placeholder: 'sales@createshape3d.com' },
  { key: 'address', label: 'Business Address', icon: MapPin, placeholder: 'Shenzhen, China' },
  { key: 'currency', label: 'Currency', icon: Globe, placeholder: 'USD' },
  { key: 'free_shipping_threshold', label: 'Free Shipping Threshold ($)', icon: Truck, placeholder: '99' },
];

export default function AdminSettings() {
  const { data: settings } = trpc.setting.list.useQuery();
  const utils = trpc.useUtils();
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const setMutation = trpc.setting.set.useMutation({
    onSuccess: () => { toast.success('Saved'); utils.setting.list.invalidate(); setEditing(null); },
    onError: (e) => toast.error(e.message),
  });

  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || '';

  const startEdit = (key: string) => {
    setEditing(key);
    setEditValue(getSetting(key));
  };

  const save = (key: string, label: string) => {
    setMutation.mutate({ key, value: editValue, label });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <p className="text-sm text-neutral-500 mb-6">Manage your store information, contact details, and display preferences. These values appear throughout your website.</p>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium w-48">Setting</th><th className="text-left px-4 py-3 font-medium">Value</th><th className="text-right px-4 py-3 font-medium w-24">Actions</th></tr></thead>
          <tbody className="divide-y divide-neutral-100">
            {PRESET_KEYS.map(preset => {
              const isEditing = editing === preset.key;
              const value = getSetting(preset.key);
              return (
                <tr key={preset.key} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <preset.icon className="w-4 h-4 text-neutral-400" />
                      <span className="font-medium">{preset.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input value={editValue} onChange={e => setEditValue(e.target.value)} placeholder={preset.placeholder} className="w-full px-2 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:border-blue-500" autoFocus />
                    ) : (
                      <span className={value ? 'text-neutral-700' : 'text-neutral-400 italic'}>{value || 'Not set'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => save(preset.key, preset.label)} className="p-1.5 hover:bg-green-100 rounded"><Check className="w-4 h-4 text-green-600" /></button>
                        <button onClick={() => setEditing(null)} className="p-1.5 hover:bg-neutral-100 rounded"><X className="w-4 h-4 text-neutral-500" /></button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(preset.key)} className="p-1.5 hover:bg-neutral-100 rounded"><Pencil className="w-4 h-4 text-neutral-500" /></button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Custom settings */}
      {settings && settings.some(s => !PRESET_KEYS.find(p => p.key === s.key)) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Custom Settings</h2>
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Key</th><th className="text-left px-4 py-3 font-medium">Value</th></tr></thead>
              <tbody className="divide-y divide-neutral-100">
                {settings.filter(s => !PRESET_KEYS.find(p => p.key === s.key)).map(s => (
                  <tr key={s.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 font-mono text-xs">{s.key}</td>
                    <td className="px-4 py-3">{s.value || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
