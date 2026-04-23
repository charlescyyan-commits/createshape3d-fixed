import { Package, FolderOpen, MessageSquare, DollarSign } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function AdminDashboard() {
  const { data: products } = trpc.product.list.useQuery({});
  const { data: categories } = trpc.category.list.useQuery();
  const { data: inquiries } = trpc.inquiry.list.useQuery({});

  const stats = [
    { label: 'Products', value: products?.length || 0, icon: Package },
    { label: 'Categories', value: categories?.length || 0, icon: FolderOpen },
    { label: 'Inquiries', value: inquiries?.length || 0, icon: MessageSquare },
    { label: 'Avg Price', value: products?.length ? `$${(products.reduce((s, p) => s + parseFloat(String(p.basePrice || 0)), 0) / products.length).toFixed(0)}` : '$0', icon: DollarSign },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon className="w-5 h-5 text-neutral-400" />
              <span className="text-2xl font-bold">{s.value}</span>
            </div>
            <p className="text-sm text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-semibold mb-4">Recent Inquiries</h2>
        {inquiries && inquiries.length > 0 ? (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-neutral-200 text-left text-neutral-500"><th className="pb-2 font-medium">Name</th><th className="pb-2 font-medium">Type</th><th className="pb-2 font-medium">Date</th><th className="pb-2 font-medium">Status</th></tr></thead>
            <tbody>
              {inquiries.slice(0, 5).map(i => (
                <tr key={i.id} className="border-b border-neutral-100"><td className="py-2.5">{i.name}</td><td className="py-2.5 capitalize">{i.type}</td><td className="py-2.5 text-neutral-500">{new Date(i.createdAt).toLocaleDateString()}</td><td className="py-2.5"><span className={`text-xs px-2 py-0.5 rounded-full ${i.isRead ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{i.isRead ? 'Read' : 'New'}</span></td></tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-neutral-400 text-sm">No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}
