import { useState } from 'react';
import { Mail, MailOpen, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';

export default function AdminInquiries() {
  const [selected, setSelected] = useState<any>(null);
  const utils = trpc.useUtils();

  const { data: inquiries } = trpc.inquiry.list.useQuery({});
  const markRead = trpc.inquiry.markRead.useMutation({ onSuccess: () => { utils.inquiry.list.invalidate(); toast.success('Marked as read'); }, onError: (e) => toast.error(e.message) });
  const del = trpc.inquiry.delete.useMutation({ onSuccess: () => { utils.inquiry.list.invalidate(); setSelected(null); toast.success('Deleted'); }, onError: (e) => toast.error(e.message) });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Inquiries</h1>
      {selected ? (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-4"><ArrowLeft className="w-4 h-4" /> Back</button>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">{selected.name}</h2>
              <p className="text-sm text-neutral-500">{selected.email} · {selected.company || 'No company'}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${selected.isRead ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{selected.isRead ? 'Read' : 'New'}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
            <div><span className="text-neutral-500">Phone:</span> {selected.phone || '-'}</div>
            <div><span className="text-neutral-500">Type:</span> <span className="capitalize">{selected.type}</span></div>
            <div><span className="text-neutral-500">Order Type:</span> {selected.orderType || '-'}</div>
            <div><span className="text-neutral-500">Date:</span> {new Date(selected.createdAt).toLocaleString()}</div>
          </div>
          {selected.message && (
            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-neutral-700 whitespace-pre-wrap">{selected.message}</p>
            </div>
          )}
          <div className="flex gap-2">
            {!selected.isRead && <button onClick={() => markRead.mutate(selected.id)} className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1"><MailOpen className="w-4 h-4" /> Mark Read</button>}
            <button onClick={() => { if (confirm('Delete?')) del.mutate(selected.id); }} className="px-4 py-2 border border-red-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1"><Trash2 className="w-4 h-4" /> Delete</button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-neutral-200 bg-neutral-50"><th className="text-left px-4 py-3 font-medium">Name</th><th className="text-left px-4 py-3 font-medium">Email</th><th className="text-left px-4 py-3 font-medium">Type</th><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-right px-4 py-3 font-medium"></th></tr></thead>
            <tbody>
              {inquiries?.map(i => (
                <tr key={i.id} onClick={() => setSelected(i)} className="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer">
                  <td className="px-4 py-3 font-medium">{i.name}</td>
                  <td className="px-4 py-3 text-neutral-500">{i.email}</td>
                  <td className="px-4 py-3 capitalize">{i.type}</td>
                  <td className="px-4 py-3 text-neutral-500">{new Date(i.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{i.isRead ? <MailOpen className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4 text-amber-500" />}</td>
                  <td className="px-4 py-3 text-right"><ArrowRight className="w-4 h-4 text-neutral-300 inline" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!inquiries?.length && <div className="text-center py-12 text-neutral-400">No inquiries yet</div>}
        </div>
      )}
    </div>
  );
}
