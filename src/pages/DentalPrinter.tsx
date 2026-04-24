import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, Star, Shield, Truck, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

const productImages = [
  '/products/dental-printer.jpg',
  '/products/print-sample-1.jpg',
  '/products/print-sample-2.jpg',
  '/products/print-sample-3.jpg',
  '/products/printer-main.jpg',
  '/products/industrial-printer.jpg',
];

const highlights = [
  'Next-Level Printing with 16K Precision',
  'Smart Tank Heating at 30°C',
  'High Speed with Tilt Release Technology',
  'Auto-Leveling, Plug-N-Play Setup',
  'Integrated UV Post-Curing Chamber',
  'Upgraded Touchscreen Interface',
];

const awardBadges = [
  { label: 'BEST DENTAL 3D PRINTER', sub: 'UNDER $1,500', year: '2025' },
  { label: 'EDITOR\'S CHOICE', sub: 'Dental Technology', year: '' },
];

export default function DentalPrinter() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const nextImage = () => setSelectedImage((i) => (i + 1) % productImages.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + productImages.length) % productImages.length);

  const handleAddToCart = () => {
    addItem({
      productId: 101,
      productName: 'Dental Stellar D100',
      productImage: productImages[0],
      variantId: null,
      variantLabel: '',
      price: 1299.99,
      quantity: 1,
    });
    toast.success('Dental Stellar D100 added to cart');
  };

  return (
    <div className="bg-white">
      {/* ===== PRODUCT HERO ===== */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-neutral-400 mb-6">
          <Link to="/" className="hover:text-neutral-900">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products?category=3d-printer" className="hover:text-neutral-900">3D Printer</Link>
          <span className="mx-2">/</span>
          <Link to="/products?category=dental-3d-printer" className="hover:text-neutral-900">Dental 3d Printer</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">Dental Stellar D100</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2.5 w-16 lg:w-[72px] flex-shrink-0">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${i === selectedImage ? 'border-blue-600' : 'border-neutral-200 hover:border-neutral-400'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 relative">
              <div className="bg-neutral-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center relative group">
                {/* Award badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {awardBadges.map((badge, i) => (
                    <div key={i} className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
                      <div className="text-[10px] font-bold uppercase tracking-wider">{badge.label}</div>
                      {badge.sub && <div className="text-[10px] font-semibold">{badge.sub}</div>}
                      {badge.year && <div className="text-[9px] opacity-70">{badge.year}</div>}
                    </div>
                  ))}
                </div>
                <img
                  src={productImages[selectedImage]}
                  alt="Dental Stellar D100"
                  className="max-w-full max-h-full object-contain p-6 transition-opacity duration-300"
                />
                {/* Nav arrows */}
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div>
            {/* Tags */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">NEW</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-sm font-semibold text-neutral-900">4.9</span>
              <span className="text-sm text-neutral-400">(347 Reviews)</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-[2.5rem] font-extrabold tracking-tight mb-2">Dental Stellar D100</h1>
            <p className="text-sm text-neutral-500 mb-5">Shipping calculated at checkout.</p>

            {/* Price - BLACK like Elegoo */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">$1,299.99 <span className="text-base font-normal text-neutral-500">USD</span></span>
              <span className="text-xl text-neutral-400 line-through font-medium">$1,599.99 USD</span>
            </div>

            {/* Financing */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-5">
              <p className="text-sm text-neutral-600 mb-2">Starting at <strong className="text-neutral-900">$108.33/mo</strong> with <span className="font-semibold text-blue-600">PayPal</span>. <button className="text-blue-600 underline">Learn more</button></p>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <span className="bg-neutral-200 text-neutral-700 text-xs font-bold px-2 py-0.5 rounded">Klarna</span>
                <span>From <strong>$217/month</strong>, or 6 payments at 0% interest</span>
              </div>
            </div>

            {/* Highlights - bullet list like Elegoo */}
            <div className="bg-neutral-50 rounded-xl p-5 mb-6">
              <ul className="space-y-2.5">
                {highlights.map(h => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-blue-600" /> Free Shipping</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-600" /> 1-Year Warranty</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-blue-600" /> 30-Day Returns</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
              <Link
                to="/inquiry"
                className="flex items-center justify-center gap-2 border-2 border-neutral-200 text-neutral-700 font-semibold px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES OVERVIEW ===== */}
      <section className="bg-neutral-50 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Features</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Engineered for Dental Excellence</h2>
          </div>
          <img src="/products/industrial-printer.jpg" alt="Features Overview" className="w-full rounded-2xl shadow-lg mb-12" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '16K Ultra Resolution', desc: '8520×4320 pixel monochrome LCD delivers 18μm XY accuracy for capturing micron-level dental details.' },
              { title: '80mm/h Print Speed', desc: 'Advanced TSP release technology and high-power COB light source enable rapid, reliable production.' },
              { title: 'Integrated UV Curing', desc: 'Built-in post-curing chamber eliminates the need for separate equipment, saving workspace and cost.' },
              { title: '20,000H Light Source', desc: 'COB vertical point light source with uniform 405nm illumination across the full build area.' },
              { title: 'Auto-Leveling', desc: 'Smart auto-leveling system ensures perfect first-layer adhesion every time, plug-and-play ready.' },
              { title: 'Touchscreen Control', desc: '3.5-inch color touchscreen with intuitive interface for effortless print management.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLICATIONS ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Applications</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Designed for Modern Dentistry</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { name: 'Crown & Bridge', image: '/products/print-sample-1.jpg' },
              { name: 'Clear Aligners', image: '/products/print-sample-2.jpg' },
              { name: 'Surgical Guides', image: '/products/print-sample-3.jpg' },
              { name: 'Dental Models', image: '/products/print-sample-4.jpg' },
            ].map(app => (
              <div key={app.name} className="group rounded-2xl overflow-hidden border border-neutral-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm">{app.name}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src="/products/dental-printer.jpg" alt="Dental Applications" className="w-full" />
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Specifications</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Technical Details</h2>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            {[
              ['Printing Technology', 'LCD Stereolithography (MSLA)'],
              ['Light Source', '405nm COB Vertical Point'],
              ['XY Resolution', '18μm (8520×4320 pixels)'],
              ['Layer Thickness', '0.025 – 0.2mm'],
              ['Max Print Speed', '80mm/h'],
              ['Build Volume', '153 × 78 × 180mm'],
              ['Screen', '6.8" Monochrome LCD'],
              ['Light Source Lifespan', '20,000 hours'],
              ['Machine Dimensions', '355 × 274 × 546mm'],
              ['Net Weight', '18.6 kg'],
              ['Touchscreen', '3.5" Color LCD'],
              ['Connectivity', 'USB, Wi-Fi'],
              ['Certifications', 'CE / FCC / ISO13485'],
            ].map(([k, v], i, arr) => (
              <div key={k} className={`grid grid-cols-1 sm:grid-cols-[240px_1fr] ${i < arr.length - 1 ? 'border-b border-neutral-100' : ''}`}>
                <div className="px-6 py-3.5 bg-neutral-50 text-sm font-semibold text-neutral-600">{k}</div>
                <div className="px-6 py-3.5 text-sm text-neutral-800">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#0a1628] text-white py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">Ready to Transform Your Dental Practice?</h2>
          <p className="text-white/50 mb-8 text-lg">Get the Dental Stellar D100 and experience chairside 3D printing at its finest.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={handleAddToCart} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl">
              <ShoppingCart className="w-5 h-5" />
              Buy Now — $1,299.99
            </button>
            <Link to="/inquiry" className="flex items-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors">
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
