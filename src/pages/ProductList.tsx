import { Link, useSearchParams } from 'react-router';
import { trpc } from '@/providers/trpc';
import { Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const { addItem } = useCart();

  const { data: products, isLoading } = trpc.product.list.useQuery({
    categorySlug: categorySlug || undefined,
    search: search || undefined,
  });
  const { data: categories } = trpc.category.list.useQuery();
  const activeCat = categories?.find(c => c.slug === categorySlug);

  const handleQuickAdd = (product: any) => {
    const price = parseFloat(String(product.basePrice || 0));
    addItem({ productId: product.id, productName: product.name, productImage: product.mainImage || '', variantId: null, variantLabel: '', price, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
        <aside className="lg:w-56 flex-shrink-0">
          <h2 className="font-semibold text-sm mb-4">Categories</h2>
          <ul className="space-y-1">
            <li><Link to="/products" className={`block text-sm py-1.5 px-3 rounded-lg ${!categorySlug ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>All Products</Link></li>
            {categories?.filter(c => !c.parentId).map(cat => (
              <li key={cat.id}>
                <Link to={`/products?category=${cat.slug}`} className={`block text-sm py-1.5 px-3 rounded-lg ${categorySlug === cat.slug ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}>{cat.name}</Link>
                {cat.children && cat.children.length > 0 && (
                  <ul className="pl-3 mt-1 space-y-0.5">
                    {cat.children.map((sub: any) => (
                      <li key={sub.id}><Link to={`/products?category=${sub.slug}`} className={`block text-xs py-1 px-3 rounded-lg ${categorySlug === sub.slug ? 'bg-neutral-100 text-neutral-900 font-medium' : 'text-neutral-500 hover:bg-neutral-50'}`}>{sub.name}</Link></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">{activeCat ? activeCat.name : search ? `Search: "${search}"` : 'All Products'}</h1>
            <span className="text-sm text-neutral-500">{products?.length || 0} products</span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.map(product => (
                <div key={product.id} className="group">
                  <div className="relative bg-neutral-50 rounded-xl overflow-hidden aspect-square mb-3">
                    <Link to={`/product/${product.slug}`}>
                      <img
                        src={product.mainImage || '/products/resin-washable-1kg.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">{product.badge}</span>
                    )}
                    {/* Hover Add to Cart */}
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="absolute bottom-2 right-2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 hover:text-white"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Only product name below image */}
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="text-sm font-semibold text-center group-hover:text-neutral-600 transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {products?.length === 0 && !isLoading && (
            <div className="text-center py-16 text-neutral-400">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
