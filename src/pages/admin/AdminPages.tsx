import { ExternalLink, FileText } from 'lucide-react';

export default function AdminPages() {
  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6"><FileText className="w-6 h-6" /> CMS Pages</h1>
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center max-w-lg mx-auto">
        <p className="text-neutral-500 mb-4">Page management (About Us, FAQ, Contact, etc.) has moved to the WordPress backend.</p>
        <a href="https://createshape3d.com/wp-admin/edit.php?post_type=page" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">
          <ExternalLink className="w-4 h-4" /> Open WordPress Pages
        </a>
      </div>
    </div>
  );
}
