import { Link, useSearchParams } from 'react-router';
import { trpc } from '@/providers/trpc';
import { Loader2, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

const fallbackProducts = [
  { id: 1, slug: 'washable-resin-premium', name: 'Washable Resin Premium', badge: 'BESTSELLER', basePrice: '25.99', mainImage: '/products/resin-washable-1kg.jpg', categorySlug: 'resin', subSlug: 'engineering-resin-series' },
  { id: 6, slug: 'casting-resin-gold', name: 'Casting Resin Gold', badge: null, basePrice: '32.99', mainImage: '/products/casting-resin.jpg', categorySlug: 'resin', subSlug: 'casting-resin-series' },
  { id: 7, slug: 'dental-resin-clear', name: 'Dental Resin Clear', badge: null, basePrice: '45.99', mainImage: '/products/dental-resin.jpg', categorySlug: 'resin', subSlug: 'dental-resin-series' },
  { id: 8, slug: 'rigid-resin-black', name: 'Rigid Resin Black', badge: null, basePrice: '28.99', mainImage: '/products/rigid-resin.jpg', categorySlug: 'resin', subSlug: 'rigid-resin-series' },
  { id: 2, slug: 'prolite-m4k', name: 'CS3D ProLite M4K', badge: 'POPULAR', basePrice: '299.99', mainImage: '/products/printer-main.jpg', categorySlug: '3d-printer', subSlug: 'industrial-3d-printer' },
  { id: 3, slug: 'dental-printer', name: 'Dental Stellar D100', badge: null, basePrice: '1299.99', mainImage: '/products/dental-printer.jpg', categorySlug: '3d-printer', subSlug: 'dental-3d-printer' },
  { id: 4, slug: 'industrial-nova-x1', name: 'Industrial Nova X1', badge: null, basePrice: '2499.99', mainImage: '/products/industrial-printer.jpg', categorySlug: '3d-printer', subSlug: 'industrial-3d-printer' },
  { id: 5, slug: 'jewelry-craft-g2', name: 'Jewelry Craft G2', badge: null, basePrice: '599.99', mainImage: '/products/jewelry-printer.jpg', categorySlug: '3d-printer', subSlug: 'jewelry-3d-printer' },
  { id: 12, slug: 'shoe-sole-printer', name: 'Shoe Sole Printer S3', badge: null, basePrice: '899.99', mainImage: '/products/shoe-printer.jpg', categorySlug: '3d-printer', subSlug: 'shoe-3d-printer' },
  { id: 11, slug: 'wash-cure-station', name: 'Wash & Cure Station', badge: null, basePrice: '149.99', mainImage: '/products/wash-cure.jpg', categorySlug: '3d-printer', subSlug: 'wash-cure-machine' },
  { id: 9, slug: 'mono-lcd-screen-6inch', name: 'Mono LCD Screen 6"', badge: null, basePrice: '89.99', mainImage: '/products/lcd-screen.jpg', categorySlug: 'accessories', subSlug: '3d-printer-mono-lcd' },
  { id: 10, slug: 'acf-film-pack', name: 'ACF/PFA Film Pack', badge: null, basePrice: '19.99', mainImage: '/products/fep-film.jpg', categorySlug: 'accessories', subSlug: 'acf-pfa-films' },
];

const fallbackCategories = [
  { id: 1, name: '3D Printer', slug: '3d-printer', description: 'Professional LCD/DLP 3D printers', parentId: null, children: [
    { id: 11, name: 'Dental 3d Printer', slug: 'dental-3d-printer', parentId: 1 },
    { id: 12, name: 'Industrial 3d Printer', slug: 'industrial-3d-printer', parentId: 1 },
    { id: 13, name: 'Jewelry 3d Printer', slug: 'jewelry-3d-printer', parentId: 1 },
    { id: 14, name: 'Shoe 3d Printer', slug: 'shoe-3d-printer', parentId: 1 },
    { id: 15, name: 'Wash & Cure Machine', slug: 'wash-cure-machine', parentId: 1 },
  ]},
  { id: 2, name: 'Resin', slug: 'resin', description: 'Premium photopolymer resins', parentId: null, children: [
    { id: 21, name: 'Casting Resin Series', slug: 'casting-resin-series', parentId: 2 },
    { id: 22, name: 'Dental Resin Series', slug: 'dental-resin-series', parentId: 2 },
    { id: 23, name: 'Engineering Resin Series', slug: 'engineering-resin-series', parentId: 2 },
    { id: 24, name: 'Rigid Resin Series', slug: 'rigid-resin-series', parentId: 2 },
    { id: 25, name: 'Other Resin Series', slug: 'other-resin-series', parentId: 2 },
  ]},
  { id: 3, name: 'Accessories', slug: 'accessories', description: 'Printer parts and tools', parentId: null, children: [
    { id: 31, name: '3d Printer Mono LCD', slug: '3d-printer-mono-lcd', parentId: 3 },
    { id: 32, name: 'ACF/PFA Films', slug: 'acf-pfa-films', parentId: 3 },
  ]},
];

// Sub-category to parent mapping for filtering
const subCategoryParents: Record<string, string> = {
  'dental-3d-printer': '3d-printer',
  'industrial-3d-printer': '3d-printer',
  'jewelry-3d-printer': '3d-printer',
  'shoe-3d-printer': '3d-printer',
  'wash-cure-machine': '3d-printer',
  'casting-resin-series': 'resin',
  'dental-resin-series': 'resin',
  'engineering-resin-series': 'resin',
  'rigid-resin-series': 'resin',
  'other-resin-series': 'resin',
  '3d-printer-mono-lcd': 'accessories',
  'acf-pfa-films': 'accessories',
};

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const { addItem } = useCart();

  const { data: apiProducts, isLoading } = trpc.product.list.useQuery({
    categorySlug: categorySlug || undefined,
    search: search || undefined,
  });
  const { data: apiCategories } = trpc.category.list.useQuery();
  
  const categories = (apiCategories && apiCategories.length > 0) ? apiCategories : fallbackCategories;
  const activeCat = categories?.find((c: any) => c.slug === categorySlug) || categories?.find((c: any) => c.children?.some((sub: any) => sub.slug === categorySlug))?.children?.find((sub: any) => sub.slug === categorySlug);

  // Determine which products to display
  let displayProducts: any[] = [];
  
  if (apiProducts && apiProducts.length > 0) {
    // API returned real products
    displayProducts = apiProducts;
  } else if (search) {
    // Search mode - filter fallback by name
    displayProducts = fallbackProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  } else if (categorySlug) {
    // Category mode - filter fallback precisely by category/sub-category
    const isSubCategory = subCategoryParents[categorySlug];
    if (isSubCategory) {
      // Sub-category selected: show products matching the sub-category
      displayProducts = fallbackProducts.filter(p => p.subSlug === categorySlug);
    } else {
      // Parent category selected: show all products in that parent category
      displayProducts = fallbackProducts.filter(p => p.categorySlug === categorySlug);
    }
  } else {
    // No filter - show all fallback products
    displayProducts = fallbackProducts;
  }

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
            <span className="text-sm text-neutral-500">{displayProducts?.length || 0} products</span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts?.map(product => (
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

          {displayProducts?.length === 0 && !isLoading && (
            <div className="text-center py-16 text-neutral-400">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
