import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { formatWooPrice, type WooProduct } from '@/lib/wp-client';
import { useWooProductsQuery } from '@/hooks/useWPQueries';
import { sanitizeHtml } from '@/lib/sanitize';

const tabs = ['Popular products', 'Most-viewed products', 'Top selling'];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { data } = useWooProductsQuery({ per_page: 20 });
  const allProducts: WooProduct[] = Array.isArray(data) ? data : [];

  const popular = allProducts.slice(0, 5);
  const mostViewed = [...allProducts].reverse().slice(0, 5);
  const topSelling = allProducts.slice(5, 10);

  const renderPrice = (product: WooProduct) => {
    const p = formatWooPrice(product);
    return (
      <span
        className="text-sm font-bold"
        {...(p.html ? { dangerouslySetInnerHTML: { __html: sanitizeHtml(p.html) } } : { children: p.text })}
      />
    );
  };

  const currentProducts = activeTab === 0 ? popular : activeTab === 1 ? mostViewed : topSelling;

  const handleQuickAdd = (product: WooProduct) => {
    window.open(`${product.permalink}?add-to-cart=${product.id}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold">Featured products</h2>
          <div className="flex gap-1 bg-neutral-100 rounded-lg p-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === i ? 'bg-white text-neutral-900 shadow-sm font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative bg-neutral-50 rounded-xl overflow-hidden mb-3 aspect-square">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.images?.[0]?.src || '/products/resin-washable-1kg.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Badge */}
                {/* (No badge from Woo Store API) */}

                {/* Hover actions */}
                {hoveredProduct === product.id && (
                  <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 justify-center bg-gradient-to-t from-black/30 to-transparent">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-900 hover:text-white transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <Link
                      to={`/product/${product.slug}`}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-900 hover:text-white transition-colors"
                      title="Quick view"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-900 hover:text-white transition-colors"
                      title="Wishlist"
                      onClick={() => toast.info('Added to wishlist')}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="px-1">
                {/* Category tag */}
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">{product.categories?.[0]?.name || 'Product'}</span>
                <Link to={`/product/${product.slug}`}>
                  <h3 className="text-sm font-semibold mt-0.5 mb-1 group-hover:text-neutral-600 transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2">
                  {renderPrice(product)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div className="text-center py-12 text-neutral-400">No featured products yet</div>
        )}
      </div>
    </section>
  );
}
