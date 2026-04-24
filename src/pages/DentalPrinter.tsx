import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, MessageCircle, Check, ChevronRight, Crown, Smile, MapPin, CircleDot, Compass } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

const productImages = [
  '/products/dental-printer.jpg',
  '/products/print-sample-1.jpg',
  '/products/print-sample-2.jpg',
  '/products/print-sample-3.jpg',
  '/products/printer-main.jpg',
  '/products/industrial-printer.jpg',
  '/products/wash-cure.jpg',
];

const highlights = [
  '9K Mono LCD — 8520×4320 resolution',
  '18μm XY accuracy for micron-level details',
  'Up to 80mm/h print speed',
  'Print & Cure — integrated UV post-curing',
  '20,000h light source lifespan',
];

const features = [
  {
    label: 'Precision',
    title: 'For Perfection in Details',
    desc: 'The print size of 153×78×180mm makes it a desktop classic. Whether delicate dental crowns or intricate jewelry patterns, every layer is placed with micron-level accuracy.',
    checks: [
      '18μm XY resolution for smooth surface finish',
      '6.8-inch monochrome LCD for longer screen life',
      'Press-type convenient platform for easy model removal',
    ],
    image: '/products/print-sample-1.jpg',
    reverse: false,
    dark: false,
  },
  {
    label: 'Speed',
    title: 'High-Speed Printing, Doubles Efficiency',
    desc: 'Uses advanced TSP release technology, which significantly reduces the peel force between each layer. Combined with our high-power COB light source, achieve up to 80mm/h printing speed.',
    checks: [
      'Advanced TSP release technology',
      '80mm/h max print speed',
      '20,000H light source lifespan',
    ],
    image: '/products/print-sample-2.jpg',
    reverse: true,
    dark: false,
  },
  {
    label: 'Integration',
    title: 'Post-Printing Curing Built Right In',
    desc: 'The device contains post-curing, which meets the function and is perfectly hidden in the body. No separate curing station needed — print, wash, and cure in one seamless workflow.',
    checks: [
      'Integrated UV curing chamber',
      'Saves workspace and equipment cost',
      'Streamlined chairside workflow',
    ],
    image: '/products/print-sample-3.jpg',
    reverse: false,
    dark: false,
  },
  {
    label: 'Light Source',
    title: 'COB Vertical Point Light Source',
    desc: 'The COB (Chip on Board) vertical point light source delivers uniform, high-intensity 405nm UV illumination across the entire build area. This eliminates edge light decay and ensures consistent curing from center to corner — critical for dental applications where accuracy cannot be compromised.',
    checks: [
      'Uniform light intensity across full LCD',
      '405nm wavelength optimized for dental resins',
      '20,000H rated lifespan for low cost of ownership',
      'No light decay at screen edges',
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

const printSpecs = [
  ['Printing Technology', 'LCD Stereolithography (MSLA)'],
  ['Light Source', '405nm COB Vertical Point Light Source'],
  ['XY Resolution', '18μm (8520×4320 pixels)'],
  ['Layer Thickness', '0.025 – 0.2mm'],
  ['Max Printing Speed', '80mm/h'],
  ['Build Volume', '153 × 78 × 180mm (L×W×H)'],
  ['Screen Size', '6.8-inch Monochrome LCD'],
  ['Light Source Lifespan', '20,000 hours'],
];

const hwSpecs = [
  ['Machine Dimensions', '355 × 274 × 546mm'],
  ['Net Weight', '18.6 kg'],
  ['Touchscreen', '3.5-inch Color LCD'],
  ['Connectivity', 'USB, Wi-Fi (optional)'],
  ['Supported Formats', 'STL, OBJ'],
  ['Slicer Software', 'CHITUBOX / Lychee Slicer'],
  ['Operating Systems', 'Windows / macOS'],
  ['Certifications', 'CE / FCC / ISO13485'],
];

export default function DentalPrinter() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

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
    <div>
      {/* ===== Product Hero ===== */}
      <section className="bg-[#f8f9fc] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="text-xs text-neutral-500 mb-6">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <Link to="/products?category=3d-printer" className="hover:text-neutral-900">3D Printer</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <Link to="/products?category=dental-3d-printer" className="hover:text-neutral-900">Dental 3d Printer</Link>
            <ChevronRight className="w-3 h-3 inline mx-1" />
            <span className="text-neutral-900 font-medium">Dental Stellar D100</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            {/* LEFT: Images */}
            <div className="grid grid-cols-1 sm:grid-cols-[72px_1fr] gap-4">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2.5 order-2 sm:order-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-[68px] h-[68px] rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${i === selectedImage ? 'border-neutral-900 shadow-[0_0_0_2px_rgba(0,0,0,0.1)]' : 'border-neutral-200 hover:border-neutral-400'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="bg-white rounded-xl border border-neutral-200 flex items-center justify-center overflow-hidden min-h-[360px] lg:min-h-[480px] order-1 sm:order-2">
                <img
                  src={productImages[selectedImage]}
                  alt="Dental Stellar D100"
                  className="max-w-full max-h-[520px] object-contain transition-opacity duration-300"
                />
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                <span>Dental 3D Printer</span>
              </div>
              <h1 className="text-2xl lg:text-[2rem] font-extrabold leading-tight mb-2">Dental Stellar D100</h1>
              <p className="text-base text-neutral-600 font-medium mb-4">16K High-Speed Chairside Dental 3D Printer</p>
              <p className="text-2xl lg:text-[2rem] font-extrabold mb-4">$1,299.99 <span className="text-sm font-normal text-neutral-500">USD</span></p>
              <p className="text-neutral-600 leading-relaxed mb-5 text-[0.95rem]">
                Experience unprecedented precision with 16K resolution and 0.03mm accuracy. The COB vertical point light source delivers up to 50mm/h max speed. Print and cure — all in one compact, medical-grade machine designed for modern dental practices.
              </p>
              <ul className="mb-6 space-y-1.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-neutral-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all hover:-translate-y-0.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </button>
                <Link
                  to="/inquiry"
                  className="flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 font-semibold rounded-lg border-[1.5px] border-neutral-200 hover:border-blue-600 hover:text-blue-600 transition-all"
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
          />
        </div>
      </section>

      {/* ===== Feature Sections ===== */}
      {features.map((feature, idx) => (
        <section
          key={feature.label}
          className={`py-12 lg:py-16 ${feature.dark ? 'bg-[#0f172a] text-white' : idx % 2 === 1 ? 'bg-[#f8f9fc]' : 'bg-white'}`}
        >
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center ${feature.reverse ? 'lg:grid-cols-[1fr_1.15fr]' : ''}`}>
              <div className={feature.reverse ? 'lg:order-2' : ''}>
                <p className={`text-xs font-bold uppercase tracking-[0.08em] mb-2.5 ${feature.dark ? 'text-blue-400' : 'text-blue-600'}`}>
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
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-blue-600 mb-2">Applications</p>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-neutral-900">Designed for Modern Dentistry</h2>
            <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
              From temporary restorations to surgical guides, Dental Stellar D100 covers the full spectrum of chairside digital workflow needs.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {applications.map((app) => (
              <div key={app.name} className="bg-white border border-neutral-100 rounded-xl p-5 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <app.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm text-neutral-800">{app.name}</h4>
              </div>
            ))}
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src="/products/dental-printer.jpg" alt="Printed Dental Models" className="w-full" />
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
                  {printSpecs.map(([k, v]) => (
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
                  {hwSpecs.map(([k, v]) => (
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
            <p className="text-neutral-500 text-sm mb-2">Package Dimensions: 430 × 340 × 620mm / Gross Weight: 22.5kg</p>
            <p className="text-neutral-400 text-xs">What's in the box: Dental Stellar D100 printer, Resin vat, Build platform, Power adapter, USB drive, Gloves, Funnel, User manual</p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#0f172a] text-white py-12 lg:py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl lg:text-[2rem] font-extrabold mb-3">Ready to Transform Your Dental Workflow?</h2>
          <p className="text-slate-400 mb-6 text-base lg:text-[1.05rem]">Get the Dental Stellar D100 today and experience chairside 3D printing at its finest.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now — $1,299.99
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
