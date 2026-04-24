import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { trpc } from '@/providers/trpc';

const fallbackProducts = [
  {
    id: 1,
    slug: 'washable-resin-premium',
    name: 'Washable Resin Premium',
    subtitle: 'No IPA needed — just wash with water',
    shortDesc: 'Professional-grade water-washable resin for 405nm LCD/DLP 3D printers.',
    mainImage: '/products/resin-washable-1kg.jpg',
    basePrice: '25.99',
    category: { name: 'Resin' },
  },
  {
    id: 2,
    slug: 'dental-printer',
    name: 'Dental Stellar D100',
    subtitle: '16K Chairside Dental 3D Printer',
    shortDesc: 'Professional dental 3D printer with 16K resolution and 0.03mm precision.',
    mainImage: '/products/dental-printer.jpg',
    basePrice: '1299.99',
    category: { name: '3D Printer' },
  },
  {
    id: 3,
    slug: 'casting-resin',
    name: 'Casting Resin Grey 12KG',
    subtitle: 'Low shrinkage · High precision',
    shortDesc: 'Premium casting resin for jewelry and industrial applications.',
    mainImage: '/products/casting-resin.jpg',
    basePrice: '129.99',
    category: { name: 'Resin' },
  },
];

export default function ExploreProducts() {
  const { data: apiProducts } = trpc.product.list.useQuery({});
  const exploreProducts = apiProducts && apiProducts.length > 0 ? apiProducts.slice(0, 3) : fallbackProducts;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Featured</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a1628]">Explore Our Products</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {exploreProducts.map((product: any) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl transition-all hover:-translate-y-1">
              {/* Image */}
              <div className="relative bg-neutral-50 overflow-hidden aspect-[4/3]">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.mainImage || '/products/resin-washable-1kg.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-neutral-600 px-3 py-1 rounded-full">
                  {product.category?.name || 'Product'}
                </span>
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#0a1628] group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{product.shortDesc || product.subtitle}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-extrabold text-[#0a1628]">${product.basePrice}</span>
                  <Link
                    to={`/product/${product.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Shop Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
