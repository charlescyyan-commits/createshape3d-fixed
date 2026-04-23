import { Link, useSearchParams } from 'react-router';
import { trpc } from '@/providers/trpc';
import { Loader2 } from 'lucide-react';

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const { data: products, isLoading } = trpc.product.list.useQuery({
    categorySlug: categorySlug || undefined,
    search: search || undefined,
  });

  const { data: categories } = trpc.category.list.useQuery();
  const activeCat = categories?.find(c => c.slug === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-500 mb-6">
        <Link to="/" className="hover:text-neutral-900">Home</Link>
        <span className="mx-2">/</span>
        {activeCat ? (
          <><Link to="/products" className="hover:text-neutral-900">Products</Link><span className="mx-2">/</span><span className="text-neutral-900 font-medium">{activeCat.name}</span></>
        ) : search ? (
          <><Link to="/products" className="hover:text-neutral-900">Products</Link><span className="mx-2">/</span><span className="text-neutral-900 font-medium">Search: "{search}"</span></>
        ) : (
          <span className="text-neutral-900 font-medium">All Products</span>
        )}
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <h2 className="font-semibold text-sm mb-4">Categories</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/products" className={`block text-sm py-1.5 px-3 rounded-lg ${!categorySlug ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                All Products
              </Link>
            </li>
            {categories?.map(cat => (
              <li key={cat.id}>
                <Link to={`/products?category=${cat.slug}`} className={`block text-sm py-1.5 px-3 rounded-lg ${categorySlug === cat.slug ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">
              {activeCat ? activeCat.name : search ? `Search: "${search}"` : 'All Products'}
            </h1>
            <span className="text-sm text-neutral-500">{products?.length || 0} products</span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map(product => (
                <Link key={product.id} to={`/product/${product.slug}`} className="group">
                  <div className="bg-neutral-50 rounded-xl overflow-hidden mb-3 relative">
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">{product.badge}</span>
                    )}
                    <img
                      src={product.mainImage || '/products/resin-washable-1kg.jpg'}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-1">
                    <p className="text-xs text-neutral-500 mb-0.5">{product.brand}</p>
                    <h3 className="text-sm font-semibold mb-1 group-hover:text-neutral-600 transition-colors line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">${product.basePrice}</span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-neutral-400 line-through">${product.compareAtPrice}</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{product.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {products?.length === 0 && !isLoading && (
            <div className="text-center py-16 text-neutral-400">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
