import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Right 3D Printer Resin for Your Application',
    excerpt: 'Not all resins are created equal. Learn how to select the perfect resin formulation for dental models, jewelry casting, and engineering prototypes based on key material properties.',
    image: '/products/resin-washable-1kg.jpg',
    category: 'Guide',
    date: 'Apr 15, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Dental 3D Printing: Complete Workflow from Scan to Model',
    excerpt: 'A step-by-step guide to implementing chairside 3D printing in your dental practice, covering scanner integration, software setup, and post-processing techniques.',
    image: '/products/dental-printer.jpg',
    category: 'Dental',
    date: 'Apr 8, 2025',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 3,
    title: 'Understanding LCD Screen Lifespan and When to Replace',
    excerpt: 'Everything you need to know about monochrome LCD screens in 3D printers: expected lifespan, signs of degradation, replacement procedures, and tips for extending screen life.',
    image: '/products/lcd-screen.jpg',
    category: 'Maintenance',
    date: 'Mar 28, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Jewelry Casting with 3D Printed Patterns: Best Practices',
    excerpt: 'Master the art of creating burnable casting patterns with resin 3D printing. Tips on model design, resin selection, sprue placement, and burnout schedules for flawless castings.',
    image: '/products/jewelry-printer.jpg',
    category: 'Jewelry',
    date: 'Mar 20, 2025',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Post-Processing Guide: Washing, Curing, and Surface Finishing',
    excerpt: 'Achieve professional-quality results with proper post-processing. Learn the optimal washing and curing parameters, plus advanced techniques for sanding, painting, and polishing.',
    image: '/products/wash-cure.jpg',
    category: 'Guide',
    date: 'Mar 12, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 6,
    title: 'The Future of Digital Dentistry: Trends for 2025 and Beyond',
    excerpt: 'Explore emerging technologies shaping the dental industry, from AI-powered design automation to next-generation biocompatible materials and fully integrated digital workflows.',
    image: '/products/print-sample-1.jpg',
    category: 'Industry',
    date: 'Mar 5, 2025',
    readTime: '9 min read',
    featured: false,
  },
];

const categories = ['All', 'Guide', 'Dental', 'Jewelry', 'Maintenance', 'Industry'];

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0a1628] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">CreateShape3D Blog</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Insights, guides, and industry news from the world of professional 3D printing.</p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 lg:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-4">Featured Article</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100">
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{featuredPost.category}</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{featuredPost.date}</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-neutral-900 mb-3 leading-tight">{featuredPost.title}</h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5">{featuredPost.excerpt}</p>
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="pb-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-neutral-400 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="pb-16 lg:pb-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{post.category}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-blue-600 transition-colors leading-tight mb-2">{post.title}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#0a1628] py-12 lg:py-16">
        <div className="max-w-xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-3">Stay Updated</h2>
          <p className="text-white/50 mb-6">Get the latest 3D printing tips, product updates, and industry news delivered to your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
