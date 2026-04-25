import { useParams, Link } from 'react-router';
import { useMemo, useState } from 'react';
import {
  ShoppingCart,
  MessageCircle,
  Check,
  ChevronRight,
  Crown,
  Smile,
  MapPin,
  CircleDot,
  Compass,
} from 'lucide-react';
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

  // Build a safe "product" object so the page never blanks.
  const product = useMemo(() => {
    const effectiveName = local?.name || fallbackNameFromSlug;
    const categoryLabel = local?.categoryLabel || 'Product';
    const subtitle = local?.subtitle || '';
    const priceText = local?.priceText || '';
    const currencyCode = local?.currencyCode || 'USD';
    const heroDescription =
      local?.heroDescription ||
      local?.shortDescription ||
      `Explore details and specifications for ${effectiveName}.`;
    const highlights = local?.highlights?.length
      ? local.highlights
      : [
          'Professional-grade build and finish',
          'Optimized for consistent printing results',
          'Designed for easy setup and maintenance',
          'Compatible with common workflows and materials',
          'Backed by responsive support',
        ];

    const baseImages = local?.images?.length ? local.images : ['/placeholder-product.jpg'];
    const extras = [
      '/products/print-sample-1.jpg',
      '/products/print-sample-2.jpg',
      '/products/print-sample-3.jpg',
      '/products/printer-main.jpg',
      '/products/industrial-printer.jpg',
      '/products/wash-cure.jpg',
    ];
    const images = [...baseImages, ...extras].filter(Boolean);
    const dedupedImages = images.filter((v, i) => images.indexOf(v) === i);

    const specs = local?.specs || {};
    const hasSpecs = Object.keys(specs).length > 0;

    const features =
      local?.features?.length
        ? local.features
        : [
            {
              label: 'Precision',
              title: 'For Perfection in Details',
              desc: 'Designed for consistent, high-detail printing. From intricate patterns to functional prototypes, each layer is placed with dependable accuracy.',
              checks: [
                'High-detail output for smooth surface finish',
                'Monochrome LCD for longer screen life',
                'Convenient platform design for easy model removal',
              ],
              image: '/products/print-sample-1.jpg',
              reverse: false,
              dark: false,
            },
            {
              label: 'Speed',
              title: 'High-Speed Printing, Boosts Efficiency',
              desc: 'Optimized peel and light-source performance helps reduce cycle time and improve throughput for everyday production.',
              checks: ['Optimized release performance', 'Faster workflows', 'Rated long-life light source'],
              image: '/products/print-sample-2.jpg',
              reverse: true,
              dark: false,
            },
            {
              label: 'Integration',
              title: 'Workflow-First Design',
              desc: 'Built for a practical daily workflow—easy to operate, easy to maintain, and ready to integrate into your existing process.',
              checks: ['Simple operation', 'Convenient maintenance', 'Fits common resin workflows'],
              image: '/products/print-sample-3.jpg',
              reverse: false,
              dark: false,
            },
            {
              label: 'Light Source',
              title: 'COB Vertical Point Light Source',
              desc: 'Uniform, high-intensity 405nm illumination across the build area helps ensure consistent curing from edge to edge.',
              checks: [
                'Uniform light intensity across the LCD',
                '405nm wavelength optimized for common resins',
                'Rated lifespan for low cost of ownership',
                'Designed to reduce edge light decay',
              ],
              image: '/products/printer-main.jpg',
              reverse: true,
              dark: true,
            },
          ];

    const applications = [
      { name: 'Temporary Crowns & Bridges', icon: Crown },
      { name: 'Dental Baseplates', icon: Smile },
      { name: 'Implant Surgical Guides', icon: MapPin },
      { name: 'Restoration Models', icon: CircleDot },
      { name: 'Casting Frameworks', icon: Compass },
    ];

    const printSpecs =
      local?.printSpecs?.length
        ? local.printSpecs
        : [
            ['Printing Technology', 'LCD Stereolithography (MSLA)'],
            ['Light Source', '405nm light source'],
            ['XY Resolution', hasSpecs ? (specs.xy_resolution || '—') : '—'],
            ['Layer Thickness', hasSpecs ? (specs.layer_height || '—') : '—'],
            ['Max Printing Speed', hasSpecs ? (specs.print_speed || '—') : '—'],
            ['Build Volume', hasSpecs ? (specs.build_volume || '—') : '—'],
            ['Screen', hasSpecs ? (specs.screen || '—') : '—'],
            ['Light Source Lifespan', '20,000 hours (rated)'],
          ];

    const hwSpecs =
      local?.hwSpecs?.length
        ? local.hwSpecs
        : [
            ['Machine Dimensions', hasSpecs ? (specs.machine_size || '—') : '—'],
            ['Net Weight', hasSpecs ? (specs.net_weight || '—') : '—'],
            ['Connectivity', 'USB / Wi-Fi (optional)'],
            ['Supported Formats', 'STL, OBJ'],
            ['Slicer Software', 'CHITUBOX / Lychee Slicer'],
            ['Operating Systems', 'Windows / macOS'],
            ['Certifications', 'CE / FCC'],
          ];

    const ctaTitle = local?.ctaTitle || 'Ready to Transform Your Workflow?';
    const ctaSubtitle =
      local?.ctaSubtitle ||
      'Get this product today and experience professional-grade 3D printing performance.';

    return {
      effectiveName,
      categoryLabel,
      subtitle,
      priceText,
      currencyCode,
      heroDescription,
      highlights,
      images: dedupedImages.length ? dedupedImages : ['/placeholder-product.jpg'],
      specs,
      hasSpecs,
      features,
      applications,
      printSpecs,
      hwSpecs,
      ctaTitle,
      ctaSubtitle,
    };
  }, [fallbackNameFromSlug, local]);

  const canonical = buildCanonical(`/product/${slug || ''}`);

  const handleAddToCart = () => {
    const numeric = Number(String(local?.priceText || '').replace(/[^0-9.]/g, ''));
    addItem({
      productId: -1,
      productName: product.effectiveName,
      productImage: product.images[0] || '/placeholder-product.jpg',
      variantId: null,
      variantLabel: '',
      price: Number.isFinite(numeric) ? numeric : 0,
      quantity,
    });
    toast.success('Added to cart');
  };

  return (
    <div>
      <Helmet>
        <title>{product.effectiveName} | CreateShape3D</title>
        <meta name="description" content={`View details and pricing for ${product.effectiveName}.`} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* ===== Product Hero ===== */}
      <section className="bg-[#f8f9fc] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-neutral-500 mb-6">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <Link to="/products?category=3d-printer" className="hover:text-neutral-900">3D Printer</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <span className="text-neutral-900 font-medium">{product.effectiveName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            {/* LEFT: Images */}
            <div className="grid grid-cols-1 sm:grid-cols-[72px_1fr] gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2.5 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {product.images.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    onClick={() => setSelectedImage(i)}
                    className={`w-[68px] h-[68px] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${i === selectedImage ? 'border-neutral-900 shadow-[0_0_0_2px_rgba(0,0,0,0.1)]' : 'border-neutral-200 hover:border-neutral-400'}`}
                    aria-label={`View image ${i + 1}`}
                    type="button"
                  >
                    <img
                      src={img || '/placeholder-product.jpg'}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/placeholder-product.jpg'; }}
                    />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="bg-white rounded-xl border border-neutral-200 flex items-center justify-center overflow-hidden min-h-[360px] lg:min-h-[480px] order-1 sm:order-2">
                <img
                  src={product.images[selectedImage] || '/placeholder-product.jpg'}
                  alt={product.effectiveName}
                  className="max-w-full max-h-[520px] object-contain transition-opacity duration-300"
                  onError={(e) => { e.currentTarget.src = '/placeholder-product.jpg'; }}
                />
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                <span>{product.categoryLabel}</span>
              </div>
              <h1 className="text-2xl lg:text-[2rem] font-extrabold leading-tight mb-2">{product.effectiveName}</h1>
              {product.subtitle ? (
                <p className="text-base text-neutral-600 font-medium mb-4">{product.subtitle}</p>
              ) : (
                <div className="mb-4" />
              )}

              {product.priceText ? (
                <p className="text-2xl lg:text-[2rem] font-extrabold mb-4">
                  {product.priceText} <span className="text-sm font-normal text-neutral-500">{product.currencyCode}</span>
                </p>
              ) : (
                <div className="mb-4" />
              )}

              <p className="text-neutral-600 leading-relaxed mb-5 text-[0.95rem]">
                {product.heroDescription}
              </p>

              <ul className="mb-6 space-y-1.5">
                {product.highlights.map((h) => (
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
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all hover:-translate-y-0.5"
                  type="button"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </button>
                <Link
                  to="/inquiry"
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

      {/* ===== Features Overview ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <img
            src="/products/industrial-printer.jpg"
            alt="Features Overview"
            className="w-full rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            onError={(e) => { e.currentTarget.src = '/placeholder-product.jpg'; }}
          />
        </div>
      </section>

      {/* ===== Feature Sections ===== */}
      {product.features.map((feature, idx) => (
        <section
          key={`${feature.label}-${idx}`}
          className={`py-12 lg:py-16 ${feature.dark ? 'bg-[#0f172a] text-white' : idx % 2 === 1 ? 'bg-[#f8f9fc]' : 'bg-white'}`}
        >
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center ${feature.reverse ? 'lg:grid-cols-[1fr_1.15fr]' : ''}`}>
              <div className={feature.reverse ? 'lg:order-2' : ''}>
                <p className={`text-xs font-bold uppercase tracking-[0.08em] mb-2.5 ${feature.dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  {feature.label}
                </p>
                <h2 className="text-2xl lg:text-[1.8rem] font-extrabold mb-3.5 leading-tight">{feature.title}</h2>
                <p className={`leading-relaxed mb-5 text-[0.95rem] ${feature.dark ? 'text-slate-300' : 'text-neutral-600'}`}>
                  {feature.desc}
                </p>
                <ul className="space-y-2">
                  {feature.checks.map((c) => (
                    <li key={c} className={`flex items-start gap-2.5 text-sm ${feature.dark ? 'text-slate-200' : 'text-neutral-700'}`}>
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={feature.reverse ? 'lg:order-1' : ''}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={`w-full rounded-xl ${feature.dark ? 'shadow-[0_8px_32px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]'}`}
                  onError={(e) => { e.currentTarget.src = '/placeholder-product.jpg'; }}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== Applications ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-indigo-600 mb-2">Applications</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-neutral-900">Designed for Professional Workflows</h2>
            <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
              Built to cover a broad range of production needs—from precision models to functional parts.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {product.applications.map((app) => (
              <div key={app.name} className="bg-white border border-neutral-100 rounded-xl p-5 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <app.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="font-bold text-sm text-neutral-800">{app.name}</h4>
              </div>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/products/dental-printer.jpg"
              alt="Applications"
              className="w-full"
              onError={(e) => { e.currentTarget.src = '/placeholder-product.jpg'; }}
            />
          </div>
        </div>
      </section>

      {/* ===== Technical Specifications ===== */}
      <section className="py-12 lg:py-16 bg-[#f8f9fc]">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-center text-neutral-900 mb-8">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Printing Parameters */}
            <div className="rounded-lg overflow-hidden bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th colSpan={2} className="px-4 py-3 text-left bg-slate-100 font-semibold text-sm text-neutral-900">Printing Parameters</th>
                  </tr>
                </thead>
                <tbody>
                  {product.printSpecs.map(([k, v]) => (
                    <tr key={k} className="border-b border-neutral-100">
                      <td className="px-4 py-3 text-sm font-medium text-neutral-500 w-[40%]">{k}</td>
                      <td className="px-4 py-3 text-sm text-neutral-900">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Hardware & Software */}
            <div className="rounded-lg overflow-hidden bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th colSpan={2} className="px-4 py-3 text-left bg-slate-100 font-semibold text-sm text-neutral-900">Hardware & Software</th>
                  </tr>
                </thead>
                <tbody>
                  {product.hwSpecs.map(([k, v]) => (
                    <tr key={k} className="border-b border-neutral-100">
                      <td className="px-4 py-3 text-sm font-medium text-neutral-500 w-[40%]">{k}</td>
                      <td className="px-4 py-3 text-sm text-neutral-900">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-neutral-500 text-sm mb-2">Package details may vary by configuration.</p>
            <p className="text-neutral-400 text-xs">Need exact packing list? Contact sales for the latest BOM and options.</p>
          </div>
        </div>
      </section>

      {/* ===== Product Details ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-indigo-600 mb-2">Details</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-neutral-900">Product Details</h2>
            <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
              Detailed content is provided from local product data while the storefront integration is pending.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            {local?.descriptionHtml ? (
              <div
                className="prose max-w-none text-neutral-700"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(local.descriptionHtml) }}
              />
            ) : (
              <div className="text-neutral-700 leading-relaxed">
                <p className="mb-3">
                  {product.heroDescription}
                </p>
                <p className="text-neutral-600">
                  This page uses local fallback data for now. If you need more technical information, please contact sales and we’ll provide the latest specification sheet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#0f172a] text-white py-12 lg:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl lg:text-[2rem] font-extrabold mb-3">{product.ctaTitle}</h2>
          <p className="text-slate-400 mb-6 text-base lg:text-[1.05rem]">{product.ctaSubtitle}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-10 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
              type="button"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now{product.priceText ? ` — ${product.priceText}` : ''}
            </button>
            <Link
              to="/inquiry"
              className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg border border-white/25 hover:border-white/50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
