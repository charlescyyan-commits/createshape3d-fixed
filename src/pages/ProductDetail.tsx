import { useParams, Link } from 'react-router';
import { useMemo, useState } from 'react';
import { ShoppingCart, ArrowLeft, FileText, Mail, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { buildCanonical } from '@/lib/seo';
import { sanitizeHtml } from '@/lib/sanitize';
import { getLocalProductBySlug } from '@/lib/local-products';
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
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const local = useMemo(() => getLocalProductBySlug(slug), [slug]);

  const fallbackNameFromSlug = useMemo(() => {
    const s = (slug || 'product').replace(/[-_]+/g, ' ').trim();
    return s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : 'Product';
  }, [slug]);

  const effectiveName = local?.name || fallbackNameFromSlug;
  const images = local?.images?.length ? local.images : ['/placeholder-product.jpg'];
  const priceText = local?.priceText || '';
  const canonical = buildCanonical(`/product/${slug || ''}`);
  const categoryLabel = local?.categoryLabel || 'Product';
  const shortDesc =
    local?.shortDescription ||
    `This is a product detail page for “${effectiveName}”. Detailed specifications may be added soon.`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>{effectiveName} | CreateShape3D</title>
        <meta name="description" content={`View details and pricing for ${effectiveName}.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6"><ArrowLeft className="w-4 h-4" /> All Products</Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden mb-4">
            <img src={images[selectedImage]} alt={effectiveName} className="w-full h-full object-cover" />
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
          <p className="text-xs text-neutral-400 mb-2">{categoryLabel}</p>
          <h1 className="text-3xl font-bold mb-4">{effectiveName}</h1>
          {priceText ? (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">{priceText}</span>
            </div>
          ) : (
            <div className="mb-6" />
          )}

          <div className="text-sm text-neutral-600 mb-6">{shortDesc}</div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center border border-neutral-200 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-50">-</button>
              <span className="px-3 py-2 text-sm w-10 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-50">+</button>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">In Stock</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              type="button"
              onClick={() => {
                const numeric = Number(String(local?.priceText || '').replace(/[^0-9.]/g, ''));
                addItem({
                  productId: -1,
                  productName: effectiveName,
                  productImage: images[0] || '/placeholder-product.jpg',
                  variantId: null,
                  variantLabel: '',
                  price: Number.isFinite(numeric) ? numeric : 0,
                  quantity,
                });
                toast.success('Added to cart');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <Link
              to="/cart"
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              View Cart <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Inquiry buttons */}
          <div className="flex gap-3">
            <Link to={`/inquiry?product=${encodeURIComponent(slug || '')}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Mail className="w-4 h-4" /> Inquiry</Link>
            <Link to={`/inquiry?type=order&product=${encodeURIComponent(slug || '')}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><FileText className="w-4 h-4" /> Bulk Order</Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {local?.descriptionHtml ? (
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: sanitizeHtml(local.descriptionHtml) }} />
        </div>
      ) : (
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="text-sm text-neutral-600">
            <p>{shortDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
