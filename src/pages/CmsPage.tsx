import { useParams, Link } from 'react-router';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useWPPageBySlugQuery } from '@/hooks/useWPQueries';
import { Helmet } from 'react-helmet-async';
import { buildCanonical, stripHtmlToText, truncateText } from '@/lib/seo';
import { sanitizeHtml } from '@/lib/sanitize';

export default function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading: loading, error } = useWPPageBySlugQuery(slug);
  useEffect(() => {
    if (error) {
      // no-op; keep existing "Page Not Found" fallback when page is null
    }
  }, [error]);

  if (loading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" /></div>;

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Helmet>
          <title>Page Not Found | CreateShape3D</title>
          <meta name="description" content="This page does not exist. Please check the URL or return to the homepage." />
          <link rel="canonical" href={buildCanonical(slug ? `/page/${slug}` : '/page')} />
        </Helmet>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-neutral-500">This page does not exist. Please check the URL or go back to the <Link to="/" className="text-blue-600 hover:underline">homepage</Link>.</p>
      </div>
    );
  }

  const pageTitle = page.title?.rendered || page.title || 'Page';
  const descSource = page.excerpt?.rendered || page.content?.rendered || page.content || '';
  const pageDesc = truncateText(stripHtmlToText(descSource), 160);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{pageTitle} | CreateShape3D</title>
        <meta name="description" content={pageDesc || `Read ${pageTitle} on CreateShape3D.`} />
        <link rel="canonical" href={buildCanonical(slug ? `/page/${slug}` : '/page')} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{page.title?.rendered || page.title}</h1>
      <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: sanitizeHtml(page.content?.rendered || page.content || '') }} />
    </div>
  );
}
