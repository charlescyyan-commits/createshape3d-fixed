import { ExternalLink, Settings } from 'lucide-react';
const WP_URL = import.meta.env.VITE_WP_URL || 'https://createshape3d.com';

export default function AdminSettings() {
  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6"><Settings className="w-6 h-6" /> Site Settings</h1>
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center max-w-lg mx-auto">
        <p className="text-neutral-500 mb-4">Site settings (logo, contact info, footer) have moved to the WordPress backend. Edit via Customizer or the Settings page.</p>
        <a href={`${WP_URL}/wp-admin/customize.php`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">
          <ExternalLink className="w-4 h-4" /> Open WordPress Customizer
        </a>
      </div>
    </div>
  );
}
