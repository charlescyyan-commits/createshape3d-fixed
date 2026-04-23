import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Check, Star, Shield, Zap, Monitor, RotateCcw, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

const productImages = [
  '/products/lcd-screen.jpg',
  '/products/printer-main.jpg',
  '/products/print-sample-1.jpg',
  '/products/print-sample-2.jpg',
  '/products/fep-film.jpg',
  '/products/wash-cure.jpg',
];

const highlights = [
  '6.6-inch 4K Mono LCD with 3840×2400 resolution',
  '2000+ hour extended screen lifespan',
  '2-3 seconds fast per-layer curing time',
  'Direct replacement for Saturn / Mars series',
  'Pre-installed with tempered glass protection',
  'Plug-and-play installation, no tools required',
];

const features = [
  {
    icon: Monitor,
    label: 'Display',
    title: 'Crystal Clear 4K Resolution',
    desc: 'The 6.6-inch monochrome LCD delivers an impressive 3840×2400 resolution with 35μm XY pixel size. Every detail of your model is rendered with exceptional clarity, from the finest dental features to intricate jewelry patterns.',
    checks: ['3840×2400 native resolution', '35μm XY pixel accuracy', 'Anti-aliasing support for smoother edges'],
    image: '/products/lcd-screen.jpg',
    dark: false,
  },
  {
    icon: Zap,
    label: 'Performance',
    title: 'Lightning Fast Curing Speed',
    desc: 'Advanced mono LCD technology allows UV light to pass through with minimal scattering, achieving 2-3 second per-layer exposure. Print a full dental arch in under 30 minutes.',
    checks: ['2-3s layer exposure time', 'Compatible with fast resins', 'Consistent light transmission'],
    image: '/products/print-sample-1.jpg',
    dark: false,
  },
  {
    icon: Shield,
    label: 'Durability',
    title: 'Built to Last 2000+ Hours',
    desc: 'Industrial-grade LCD panel rated for over 2000 hours of continuous printing. The pre-installed tempered glass protector shields against resin spills and scratches.',
    checks: ['2000+ hour rated lifespan', 'Tempered glass protection', 'Anti-scratch coating'],
    image: '/products/printer-main.jpg',
    dark: true,
  },
];

const specs = [
  ['Screen Size', '6.6-inch Monochrome LCD'],
  ['Resolution', '3840 × 2400 pixels'],
  ['XY Pixel Size', '35μm'],
  ['Light Transmission', '≥ 5% UV light transmittance'],
  ['Lifespan', '2000+ hours'],
  ['Interface', '40-pin MIPI DSI'],
  ['Compatible Resin', '405nm UV-curing resins'],
  ['Dimensions', '165 × 103 × 3.5mm'],
  ['Weight', '85g'],
  ['Installation', 'Plug-and-play, tool-free'],
];

const compatiblePrinters = [
  'ELEGOO Saturn / Saturn S',
  'ELEGOO Mars 3 / Mars 3 Pro',
  'ELEGOO Saturn 2 / Saturn 3',
  'Anycubic Photon Mono X',
  'Creality HALOT-ONE Plus',
  'Voxelab Proxima 6.0',
];

export default function MonoLCDProduct() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: 301,
      productName: 'Mono LCD Screen 6.6" 4K Replacement',
      productImage: productImages[0],
      variantId: null,
      variantLabel: '',
      price: 89.99,
      quantity: 1,
    });
    toast.success('Mono LCD Screen added to cart');
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-white to-neutral-50 pt-8 pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* LEFT: Gallery */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 w-16 lg:w-20 flex-shrink-0">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${i === selectedImage ? 'border-indigo-600 shadow-[0_0_0_3px_rgba(79,70,229,0.1)]' : 'border-neutral-200 hover:border-neutral-400'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden aspect-square flex items-center justify-center group">
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full z-10">4K MONO</span>
                  <img src={productImages[selectedImage]} alt="Mono LCD Screen" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* RIGHT: Info */}
            <div className="pt-2">
              <nav className="text-xs text-neutral-400 mb-4">
                <Link to="/" className="hover:text-neutral-900">Home</Link>
                <span className="mx-1.5">/</span>
                <Link to="/category/accessories" className="hover:text-neutral-900">Accessories</Link>
                <span className="mx-1.5">/</span>
                <Link to="/products?category=3d-printer-mono-lcd" className="hover:text-neutral-900">Mono LCD</Link>
                <span className="mx-1.5">/</span>
                <span className="text-neutral-900">6.6&quot; 4K</span>
              </nav>

              <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Monitor className="w-3 h-3" /> Replacement LCD Screen
              </div>

              <h1 className="text-3xl lg:text-[2.5rem] font-extrabold leading-tight tracking-tight mb-3">Mono LCD Screen 6.6&quot; 4K</h1>
              <p className="text-base text-neutral-500 mb-5">Professional-grade replacement monochrome LCD screen for LCD/MSLA 3D printers. 3840×2400 resolution, 35μm pixel size, 2000+ hour lifespan.</p>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-neutral-500"><strong className="text-neutral-900">4.8</strong> out of 5 — 1,256 Reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-neutral-100">
                <span className="text-4xl lg:text-[2.625rem] font-extrabold text-indigo-600 tracking-tight">$89.99</span>
                <span className="text-xl text-neutral-400 line-through font-medium">$129.99</span>
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3.5 py-1.5 rounded-full">SAVE 31%</span>
              </div>

              <ul className="mb-6 space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart — $89.99
                </button>
                <Link
                  to="/inquiry"
                  className="flex items-center justify-center gap-2 border-2 border-neutral-200 text-neutral-700 font-semibold px-6 py-4 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all"
                >
                  Contact Sales
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-5 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> 30-Day Returns</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 6-Month Warranty</span>
                <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURE SECTIONS ===== */}
      {features.map((feature, idx) => (
        <section
          key={feature.title}
          className={`py-16 lg:py-20 ${feature.dark ? 'bg-[#1a1a2e] text-white' : idx % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${idx % 2 === 1 ? '' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-3 ${feature.dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <feature.icon className="w-3.5 h-3.5" />
                  {feature.label}
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 leading-tight">{feature.title}</h2>
                <p className={`leading-relaxed mb-6 ${feature.dark ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {feature.desc}
                </p>
                <ul className="space-y-3">
                  {feature.checks.map((c) => (
                    <li key={c} className={`flex items-center gap-2.5 text-sm ${feature.dark ? 'text-neutral-200' : 'text-neutral-700'}`}>
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className={`rounded-3xl overflow-hidden ${feature.dark ? 'shadow-2xl shadow-black/30' : 'shadow-xl'}`}>
                  <img src={feature.image} alt={feature.title} className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== COMPATIBILITY ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                <Monitor className="w-3.5 h-3.5" />
                Compatibility
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 leading-tight">Works With Most 6-inch LCD Printers</h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                This replacement LCD screen is designed to fit a wide range of popular LCD/MSLA 3D printers. Check your printer model below to confirm compatibility.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {compatiblePrinters.map((printer) => (
                  <div key={printer} className="flex items-center gap-2 text-sm text-neutral-700 bg-white border border-neutral-200 rounded-xl px-4 py-3">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {printer}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src="/products/printer-main.jpg" alt="Compatible Printers" className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
              <Monitor className="w-3.5 h-3.5" />
              Specifications
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">Technical Details</h2>
            <p className="text-neutral-500">Complete technical specifications for the Mono LCD Screen 6.6&quot; 4K.</p>
          </div>
          <div className="border border-neutral-100 rounded-2xl overflow-hidden">
            {specs.map(([label, value], i) => (
              <div key={label} className={`grid grid-cols-1 sm:grid-cols-[280px_1fr] ${i < specs.length - 1 ? 'border-b border-neutral-100' : ''}`}>
                <div className="px-6 py-4 bg-neutral-50 text-sm font-semibold text-neutral-700">{label}</div>
                <div className="px-6 py-4 text-sm text-neutral-500">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#1a1a2e] text-white py-20 lg:py-24 text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <h2 className="text-3xl lg:text-[2.625rem] font-extrabold mb-4 tracking-tight">Upgrade Your Printer Today</h2>
          <p className="text-white/60 mb-8 text-lg">Restore your printer to peak performance with a crystal-clear 4K Mono LCD replacement screen.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart — $89.99
            </button>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Bulk Inquiry <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-5 text-white/40 text-sm">Free shipping on orders over $99</p>
        </div>
      </section>
    </div>
  );
}
