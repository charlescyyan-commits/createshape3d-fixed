import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getWPPageBySlug } from '@/lib/wp-client';

export default function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getWPPageBySlug(slug)
      .then(p => setPage(p))
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" /></div>;

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-neutral-500">This page does not exist. Please check the URL or go back to the <Link to="/" className="text-blue-600 hover:underline">homepage</Link>.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{page.title?.rendered || page.title}</h1>
      <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: page.content?.rendered || page.content || '' }} />
    </div>
  );
}
