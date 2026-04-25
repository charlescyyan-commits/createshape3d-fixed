import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useWPQueries';
import { formatWooPrice } from '@/lib/wp-client';

export default function ExploreProducts() {
  const { data: products } = useProducts({ per_page: 8 });

  if (!products?.length) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Products</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a1628]">Explore Our Products</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Link to="/products" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  const image = product.images?.[0]?.src || '/placeholder-product.jpg';
  const priceInfo = formatWooPrice(product);

  return (
    <Link to={`/product/${product.slug}`} className="group bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-neutral-50 relative overflow-hidden">
        <img src={image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-400 mb-1">{product.categories?.[0]?.name || 'Product'}</p>
        <h3 className="font-medium text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
        <p className="font-bold">{priceInfo.currencySymbol}{priceInfo.price}</p>
      </div>
    </Link>
  );
}
