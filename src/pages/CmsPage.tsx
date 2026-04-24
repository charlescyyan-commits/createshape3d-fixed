import { useParams, Link } from 'react-router';
import { trpc } from '@/providers/trpc';
import { Loader2 } from 'lucide-react';

export default function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading } = trpc.page.bySlug.useQuery(
    { slug: slug || '' },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-neutral-500 mb-6">The page you are looking for does not exist or is not published.</p>
        <Link to="/" className="text-blue-600 hover:underline font-medium">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Header */}
      <section className="bg-[#0a1628] py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">{page.title}</h1>
          {page.metaDescription && (
            <p className="text-white/50 mt-4 max-w-xl mx-auto">{page.metaDescription}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          {page.content ? (
            <div
              className="prose prose-neutral max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-semibold prose-p:text-neutral-600 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="text-center py-12 text-neutral-400">
              <p>This page has no content yet. Please check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
