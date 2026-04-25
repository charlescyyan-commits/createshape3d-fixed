import { Link } from 'react-router';
import { LayoutDashboard, MessageSquare, ExternalLink, Globe, Package, FolderOpen } from 'lucide-react';
const WP_URL = import.meta.env.VITE_WP_URL || 'https://createshape3d.com';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-neutral-500">Product, category, and page management has been moved to the WordPress backend. Use the links below or the sidebar.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href={`${WP_URL}/wp-admin/edit.php?post_type=product`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><Package className="w-5 h-5" /></div>
          <div><p className="font-medium">Manage Products</p><p className="text-xs text-neutral-400">WooCommerce Products</p></div>
          <ExternalLink className="w-4 h-4 text-neutral-400 ml-auto" />
        </a>
        <a href={`${WP_URL}/wp-admin/edit-tags.php?taxonomy=product_cat&post_type=product`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600"><FolderOpen className="w-5 h-5" /></div>
          <div><p className="font-medium">Manage Categories</p><p className="text-xs text-neutral-400">WooCommerce Categories</p></div>
          <ExternalLink className="w-4 h-4 text-neutral-400 ml-auto" />
        </a>
        <a href={`${WP_URL}/wp-admin/edit.php?post_type=page`} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600"><Globe className="w-5 h-5" /></div>
          <div><p className="font-medium">Manage Pages</p><p className="text-xs text-neutral-400">WordPress Pages</p></div>
          <ExternalLink className="w-4 h-4 text-neutral-400 ml-auto" />
        </a>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Inquiries</h2>
        <p className="text-sm text-neutral-500 mb-3">Inquiries are still managed here.</p>
        <Link to="/admin/inquiries" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">View Inquiries</Link>
      </div>
    </div>
  );
}
