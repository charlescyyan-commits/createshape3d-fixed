import { Link } from 'react-router';
import { LayoutDashboard, Package, FolderOpen, MessageSquare, ArrowLeft, Globe, ExternalLink } from 'lucide-react';
const WP_URL = import.meta.env.VITE_WP_URL || 'https://createshape3d.com';

const nav = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
];

const wpLinks = [
  { url: '{WP_URL}/wp-admin/edit.php?post_type=product', label: 'Manage Products', icon: Package },
  { url: '{WP_URL}/wp-admin/edit-tags.php?taxonomy=product_cat&post_type=product', label: 'Manage Categories', icon: FolderOpen },
  { url: '{WP_URL}/wp-admin/edit.php?post_type=page', label: 'Manage Pages', icon: Globe },
];

export default function AdminLayout() {
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
          {nav.map(item => (
            <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-neutral-600 hover:bg-neutral-100">
              <item.icon className="w-4 h-4" />{item.label}
            </Link>
          ))}
          <div className="pt-4 pb-2 px-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">WordPress Backend</div>
          {wpLinks.map(item => (
            <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-neutral-600 hover:bg-neutral-100">
              <item.icon className="w-4 h-4" />{item.label}<ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          ))}
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
