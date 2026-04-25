import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Loader2, ShoppingCart, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { getWooProducts, getWooProductCategories, formatWooPrice, type WooProduct, type WPCategory } from '@/lib/wp-client';
import { Helmet } from 'react-helmet-async';

export default function ProductList() {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    Promise.all([
      getWooProducts({ per_page: 24 }),
      getWooProductCategories(),
    ]).then(([prods, cats]) => {
      setProducts(prods || []);
      setCategories(cats || []);
      setLoading(false);
    }).catch(err => {
      toast.error('Failed to load products');
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(p => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCategory || p.categories?.some(c => c.slug === selectedCategory || String(c.id) === selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Helmet><title>Products | CreateShape3D</title><meta name="description" content="Explore our range of 3D printers, resins, and accessories." /></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="flex-1 sm:w-64 px-4 py-2 border border-neutral-200 rounded-lg text-sm" />
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-neutral-200 rounded-lg text-sm">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {loading ? <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-neutral-400" /></div> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-neutral-400">No products found. Please check your WooCommerce setup.</div>
        )}
      </div>
    </>
  );
}

function ProductCard({ product }: { product: WooProduct }) {
  const image = product.images?.[0]?.src || '/placeholder-product.jpg';
  const priceInfo = formatWooPrice(product);
  const addToCartUrl = `${product.permalink}?add-to-cart=${product.id}`;

  return (
    <div className="group bg-white border border-neutral-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-neutral-50 relative">
          <img src={image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-neutral-400 mb-1">{product.categories?.[0]?.name || 'Product'}</p>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-medium mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold">{priceInfo.currencySymbol}{priceInfo.price}</span>
          {priceInfo.regularPrice && <span className="text-sm text-neutral-400 line-through">{priceInfo.currencySymbol}{priceInfo.regularPrice}</span>}
        </div>
        <div className="flex gap-2">
          <a href={addToCartUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">
            <ShoppingCart className="w-4 h-4" /> Add
          </a>
          <Link to={`/product/${product.slug}`} className="flex-1 flex items-center justify-center py-2 border border-neutral-200 text-sm rounded-lg hover:bg-neutral-50 transition-colors text-center">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
