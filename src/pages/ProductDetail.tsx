import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, FileText, Mail, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { getWooProductBySlug, type WooProduct } from '@/lib/wp-client';
import { useCart } from '@/contexts/CartContext';

const specLabels: Record<string, string> = {
  xy_resolution: 'XY Resolution',
  build_volume: 'Build Volume',
  light_source: 'Light Source',
  print_speed: 'Print Speed',
  layer_height: 'Layer Height',
  z_axis: 'Z Axis',
  screen: 'Screen',
  machine_size: 'Machine Size',
  net_weight: 'Net Weight',
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<WooProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getWooProductBySlug(slug).then(p => {
      setProduct(p);
      setLoading(false);
    }).catch(err => {
      toast.error('Failed to load product');
      console.error(err);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-neutral-400">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-neutral-400">Product not found</div>;

  const images = product.images?.length ? product.images.map(img => img.src) : ['/placeholder-product.jpg'];
  const price = product.prices?.price || product.prices?.regular_price || '0';
  const isResin = product.categories?.some(c => c.slug === 'resin');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6"><ArrowLeft className="w-4 h-4" /> All Products</Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden mb-4">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === i ? 'border-blue-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs text-neutral-400 mb-2">{product.categories?.map(c => c.name).join(' / ') || 'Product'}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">${price}</span>
            {product.prices?.regular_price && product.prices.regular_price !== price && (
              <span className="text-lg text-neutral-400 line-through">${product.prices.regular_price}</span>
            )}
          </div>

          {product.short_description && (
            <div className="text-sm text-neutral-600 mb-6" dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center border border-neutral-200 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-50">-</button>
              <span className="px-3 py-2 text-sm w-10 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-50">+</button>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${product.stock_status === 'instock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                addToCart({ id: product.id, name: product.name, price: Number(price) || 0, image: images[0], quantity });
                toast.success('Added to cart');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <a
              href={`${product.permalink}?add-to-cart=${product.id}&quantity=${quantity}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Buy Now <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* SKU */}
          {product.sku && <p className="text-sm text-neutral-400 mb-2">SKU: {product.sku}</p>}

          {/* Inquiry buttons */}
          <div className="flex gap-3">
            <Link to={`/inquiry?product=${product.id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Mail className="w-4 h-4" /> Inquiry</Link>
            <Link to={`/inquiry?type=order&product=${product.id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><FileText className="w-4 h-4" /> Bulk Order</Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}
    </div>
  );
}
