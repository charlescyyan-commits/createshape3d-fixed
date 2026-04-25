import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Loader2, Calendar, ArrowRight } from 'lucide-react';
import { getWPPosts } from '@/lib/wp-client';
import { Helmet } from 'react-helmet-async';

function getFeaturedImageFromEmbed(post: any): string {
  // _embed includes wp:featuredmedia with source_url
  const embedded = post._embedded;
  if (embedded && embedded['wp:featuredmedia'] && embedded['wp:featuredmedia'].length > 0) {
    const media = embedded['wp:featuredmedia'][0];
    if (media.source_url) return media.source_url;
    if (media.media_details?.sizes?.medium?.source_url) return media.media_details.sizes.medium.source_url;
    if (media.media_details?.sizes?.thumbnail?.source_url) return media.media_details.sizes.thumbnail.source_url;
  }
  return '/placeholder-blog.jpg';
}

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWPPosts({ per_page: 12 }).then(data => {
      setPosts(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Blog | CreateShape3D</title><meta name="description" content="Latest news, tips, and insights from CreateShape3D." /></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-neutral-500 mb-8">Latest news, tips, and insights from CreateShape3D.</p>

        {loading ? <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto" /></div> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => {
              const img = getFeaturedImageFromEmbed(post);
              return (
                <article key={post.id} className="bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-neutral-100 overflow-hidden">
                    <img src={img} alt={post.title?.rendered} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-blog.jpg'; }} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <h2 className="font-bold mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title?.rendered }} />
                    <div className="text-sm text-neutral-500 line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }} />
                    <Link to={`/blog/${post.slug}`} className="text-sm text-blue-600 font-medium inline-flex items-center gap-1 hover:underline">
                      Read More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-20 text-neutral-400">No blog posts found. Please check your WordPress setup.</div>
        )}
      </div>
    </>
  );
}
