import { useParams, Link } from 'react-router';
import { Loader2 } from 'lucide-react';
import { usePage } from '@/hooks/useWPQueries';
import { Helmet } from 'react-helmet-async';

export default function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading } = usePage(slug || '');

  if (isLoading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" /></div>;

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-neutral-500">This page does not exist. Please check the URL or go back to the <Link to="/" className="text-blue-600 hover:underline">homepage</Link>.</p>
      </div>
    );
  }

  const title = page.title?.rendered || page.title || '';
  const content = page.content?.rendered || page.content || '';
  const plainText = content.replace(/<[^>]*>/g, '').slice(0, 160);
  const canonical = `${import.meta.env.VITE_WP_URL || ''}/page/${slug}`;

  return (
    <>
      <Helmet>
        <title>{title} | CreateShape3D</title>
        <meta name="description" content={plainText} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}
