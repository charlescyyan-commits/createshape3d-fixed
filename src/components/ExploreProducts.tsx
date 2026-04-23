import { Link } from 'react-router';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import { useCart } from '@/contexts/CartContext';

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
    slug: 'prolite-m4k',
    name: 'CS3D ProLite M4K',
    subtitle: '4K Mono LCD · 0.05mm XY Precision',
    shortDesc: 'Desktop LCD resin 3D printer with 4K monochrome screen.',
    mainImage: '/products/printer-main.jpg',
    basePrice: '299.99',
    category: { name: '3D Printer' },
  },
  {
    id: 3,
    slug: 'dental-stellar-d100',
    name: 'Dental Stellar D100',
    subtitle: 'High-precision dental 3D printer',
    shortDesc: 'Professional dental 3D printer with advanced LCD technology.',
    mainImage: '/products/dental-printer.jpg',
    basePrice: '1299.99',
    category: { name: '3D Printer' },
  },
];

export default function ExploreProducts() {
  const { data: apiProducts } = trpc.product.list.useQuery({});
  const { addItem } = useCart();
  const exploreProducts = apiProducts && apiProducts.length > 0 ? apiProducts.slice(0, 3) : fallbackProducts;

  const handleAddToCart = (product: any) => {
    const price = parseFloat(String(product.basePrice || 0));
    addItem({ productId: product.id, productName: product.name, productImage: product.mainImage || '', variantId: null, variantLabel: '', price, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {exploreProducts.map((product: any) => (
            <div key={product.id} className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow">
              {/* Image area - clean, no text overlay */}
              <div className="relative bg-neutral-50 rounded-t-xl overflow-hidden aspect-[4/3]">
                <Link to={`/product/${product.slug}`}>
                  <img
                    src={product.mainImage || '/products/resin-washable-1kg.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>
              {/* Text below image */}
              <div className="p-4">
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider">{product.category?.name || 'Product'}</span>
                <h3 className="text-base font-bold text-neutral-900 mt-0.5">{product.name}</h3>
                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{product.shortDesc || product.subtitle}</p>
                <div className="flex items-center gap-3 mt-3">
                  <Link
                    to={`/product/${product.slug}`}
                    className="px-5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Shop Now
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
