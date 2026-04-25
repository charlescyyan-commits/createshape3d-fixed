import { Link } from 'react-router';
import { useEffect } from 'react';
import { Loader2, Calendar, ArrowRight } from 'lucide-react';
import { useWPPostsQuery } from '@/hooks/useWPQueries';
import { Helmet } from 'react-helmet-async';
import { buildCanonical } from '@/lib/seo';
import { sanitizeHtml } from '@/lib/sanitize';

export default function BlogPage() {
  const { data, isLoading: loading, error } = useWPPostsQuery({ per_page: 12 });
  const posts = Array.isArray(data) ? data : [];

  useEffect(() => {
    // keep UI stable; just avoid silent failures
    if (error) {
      // no-op fallback; UI already shows "No blog posts found" when posts is empty
    }
  }, [error]);

  if (loading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Blog / News | CreateShape3D</title>
        <meta
          name="description"
          content="Read CreateShape3D articles on 3D printing: guides, applications, workflows, materials, and tips for dental and industrial printing."
        />
        <link rel="canonical" href={buildCanonical('/blog')} />
      </Helmet>
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-neutral-500 mb-8">Latest news, tips, and insights from CreateShape3D.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <article key={post.id} className="bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-neutral-100">
              <img
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-blog.jpg'}
                alt={post.title?.rendered}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-blog.jpg'; }}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <h2 className="font-bold mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title?.rendered) }} />
              <div className="text-sm text-neutral-500 line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt?.rendered) }} />
              <Link to={`/blog/${post.slug}`} className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:underline">
                Read More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-neutral-400">No blog posts found. Please check your WordPress setup.</div>
      )}
    </div>
  );
}
