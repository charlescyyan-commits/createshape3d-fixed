import { Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, Package, FolderOpen, MessageSquare, Settings, FileText, ArrowLeft, Image } from 'lucide-react';

const nav = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/products', label: 'Products', icon: Package },
  { path: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { path: '/admin/banners', label: 'Banners', icon: Image },
  { path: '/admin/pages', label: 'CMS Pages', icon: FileText },
  { path: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-neutral-50">
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-neutral-900 rounded-sm flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">CS</span>
            </div>
            <span className="font-bold text-sm">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map(item => {
            const active = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                <item.icon className="w-4 h-4" />{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-neutral-200">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
