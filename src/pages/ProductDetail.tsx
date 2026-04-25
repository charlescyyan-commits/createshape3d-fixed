import { useParams, Link } from 'react-router';
import { useMemo, useState } from 'react';
import { ShoppingCart, ArrowLeft, FileText, Mail, ExternalLink, Check, ChevronRight, MessageCircle } from 'lucide-react';
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
  const images = useMemo(() => {
    const base = local?.images?.length ? local.images : ['/placeholder-product.jpg'];
    // Add a few tasteful fallback alternates so the gallery never looks empty.
    const extras = ['/products/print-sample-1.jpg', '/products/print-sample-2.jpg', '/products/print-sample-3.jpg'];
    const all = [...base, ...extras].filter(Boolean);
    // de-dupe while preserving order
    return all.filter((v, i) => all.indexOf(v) === i);
  }, [local?.images]);
  const priceText = local?.priceText || '';
  const canonical = buildCanonical(`/product/${slug || ''}`);
  const categoryLabel = local?.categoryLabel || 'Product';
  const shortDesc =
    local?.shortDescription ||
    `This is a product detail page for “${effectiveName}”. Detailed specifications may be added soon.`;
  const specs = local?.specs || {};
  const hasSpecs = Object.keys(specs).length > 0;
  const subtitle = local?.subtitle || '';
  const highlights = local?.highlights?.length
    ? local.highlights
    : [
        'Professional-grade build and finish',
        'Optimized for consistent printing results',
        'Designed for easy setup and maintenance',
        'Compatible with common workflows and materials',
        'Backed by responsive support',
      ];

  return (
    <div>
      <Helmet>
        <title>{effectiveName} | CreateShape3D</title>
        <meta name="description" content={`View details and pricing for ${effectiveName}.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      {/* ===== Product Hero ===== */}
      <section className="bg-[#f8f9fc] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-neutral-500 mb-6">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <Link to="/products" className="hover:text-neutral-900">Products</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <span className="text-neutral-900 font-medium">{effectiveName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            {/* LEFT: Images */}
            <div className="grid grid-cols-1 sm:grid-cols-[72px_1fr] gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2.5 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {images.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    onClick={() => setSelectedImage(i)}
                    className={`w-[68px] h-[68px] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${i === selectedImage ? 'border-neutral-900 shadow-[0_0_0_2px_rgba(0,0,0,0.1)]' : 'border-neutral-200 hover:border-neutral-400'}`}
                    aria-label={`View image ${i + 1}`}
                    type="button"
                  >
                    <img src={img || '/placeholder-product.jpg'} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="bg-white rounded-xl border border-neutral-200 flex items-center justify-center overflow-hidden min-h-[360px] lg:min-h-[480px] order-1 sm:order-2">
                <img
                  src={images[selectedImage] || '/placeholder-product.jpg'}
                  alt={effectiveName}
                  className="max-w-full max-h-[520px] object-contain transition-opacity duration-300"
                />
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                <span>{categoryLabel}</span>
              </div>
              <h1 className="text-2xl lg:text-[2rem] font-extrabold leading-tight mb-2">{effectiveName}</h1>
              {subtitle ? (
                <p className="text-base text-neutral-600 font-medium mb-4">{subtitle}</p>
              ) : (
                <div className="mb-4" />
              )}

              {priceText ? (
                <p className="text-2xl lg:text-[2rem] font-extrabold mb-4">
                  {priceText} <span className="text-sm font-normal text-neutral-500">USD</span>
                </p>
              ) : (
                <div className="mb-4" />
              )}

              <p className="text-neutral-600 leading-relaxed mb-5 text-[0.95rem]">{shortDesc}</p>

              <ul className="mb-6 space-y-1.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-neutral-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center border border-neutral-200 rounded-lg bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-50" type="button">-</button>
                  <span className="px-3 py-2 text-sm w-10 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-50" type="button">+</button>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">In Stock</span>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const numeric = Number(String(local?.priceText || '').replace(/[^0-9.]/g, ''));
                    addItem({
                      productId: -1,
                      productName: effectiveName,
                      productImage: (images[0] || '/placeholder-product.jpg') as string,
                      variantId: null,
                      variantLabel: '',
                      price: Number.isFinite(numeric) ? numeric : 0,
                      quantity,
                    });
                    toast.success('Added to cart');
                  }}
                  className="flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all hover:-translate-y-0.5"
                  type="button"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 font-semibold rounded-lg border-[1.5px] border-neutral-200 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Cart
                </Link>
                <Link
                  to={`/inquiry?product=${encodeURIComponent(slug || '')}`}
                  className="flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 font-semibold rounded-lg border-[1.5px] border-neutral-200 hover:border-indigo-600 hover:text-indigo-600 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Technical Specifications ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-bold">Technical Specifications</h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {hasSpecs ? (
                Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-2 px-6 py-3">
                    <span className="text-sm font-medium text-neutral-500">{specLabels[key] || key}</span>
                    <span className="text-sm text-neutral-900">{value || '—'}</span>
                  </div>
                ))
              ) : (
                <div className="px-6 py-6 text-sm text-neutral-500">
                  Specifications for this product will be added soon.
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-lg font-bold">Product Description</h2>
            </div>
            <div className="px-6 py-5">
              {local?.descriptionHtml ? (
                <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: sanitizeHtml(local.descriptionHtml) }} />
              ) : (
                <p className="text-sm text-neutral-600 leading-relaxed">{shortDesc}</p>
              )}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
