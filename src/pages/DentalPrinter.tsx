import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Check, ChevronRight, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

const productImages = [
  '/products/dental-printer.jpg',
  '/products/print-sample-1.jpg',
  '/products/print-sample-2.jpg',
  '/products/print-sample-3.jpg',
];

const specs = [
  { label: 'Technology', value: 'LCD Stereolithography' },
  { label: 'Screen Resolution', value: '15120 x 6230 (16K)' },
  { label: 'XY Resolution', value: '0.03mm (30μm)' },
  { label: 'Build Volume', value: '211 × 118 × 35 mm' },
  { label: 'Print Speed', value: '30mm/h' },
  { label: 'Wavelength', value: '405nm UV LED' },
  { label: 'Screen Lifespan', value: '20,000 hours' },
  { label: 'Machine Weight', value: '32kg' },
  { label: 'Connectivity', value: 'USB / WiFi' },
  { label: 'Software', value: 'CHITUBOX Pro' },
];

const highlights = [
  '16K ultra-high resolution for dental-grade precision',
  '24-hour continuous automated production',
  '0.03mm XY accuracy for crown & bridge models',
  'Compatible with all standard 405nm dental resins',
  'WiFi connectivity for remote print management',
  'Industrial-grade LCD with 20,000 hour lifespan',
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
    <div className="max-w-7xl mx-auto px-4 py-6">
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

      {/* Product Hero - Two Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Left: Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden aspect-square mb-4">
            <img
              src={productImages[selectedImage]}
              alt="Dental Stellar D100"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3">
            {productImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-neutral-900' : 'border-neutral-200 hover:border-neutral-400'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <span className="text-[11px] font-semibold text-red-500 uppercase tracking-wider">Dental 3D Printer</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mt-2">Dental Stellar D100</h1>
          <p className="text-lg text-neutral-500 mt-2">
            Professional 16K LCD dental 3D printer with 0.03mm precision for crown, bridge, and aligner production
          </p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-neutral-900">$1,299.99</span>
            <span className="text-lg text-neutral-400 line-through">$1,599.99</span>
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">SAVE $300</span>
          </div>

          {/* Highlights */}
          <div className="mt-6 space-y-2">
            {highlights.map((h) => (
              <div key={h} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-700">{h}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <Link
              to="/inquiry"
              className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-neutral-900 text-neutral-900 font-semibold rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Inquiry
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-neutral-500">
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="font-semibold text-neutral-700">Free Shipping</p>
              <p>Orders over $99</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="font-semibold text-neutral-700">2-Year Warranty</p>
              <p>Full coverage</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="font-semibold text-neutral-700">7-Day Returns</p>
              <p>Easy exchange</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mb-12">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-bold">Technical Specifications</h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {specs.map((spec, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 px-6 py-3">
              <span className="text-sm font-medium text-neutral-500">{spec.label}</span>
              <span className="text-sm text-neutral-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Dental Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group">
            <div className="bg-neutral-50 rounded-xl overflow-hidden aspect-[4/3] mb-3">
              <img src="/products/print-sample-1.jpg" alt="Crown & Bridge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-semibold text-neutral-900">Crown & Bridge Models</h3>
            <p className="text-sm text-neutral-500 mt-1">95% surface accuracy within 50μm of CAD designs</p>
          </div>
          <div className="group">
            <div className="bg-neutral-50 rounded-xl overflow-hidden aspect-[4/3] mb-3">
              <img src="/products/print-sample-2.jpg" alt="Aligners" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-semibold text-neutral-900">Clear Aligners</h3>
            <p className="text-sm text-neutral-500 mt-1">Precision dental models for transparent aligner production</p>
          </div>
          <div className="group">
            <div className="bg-neutral-50 rounded-xl overflow-hidden aspect-[4/3] mb-3">
              <img src="/products/print-sample-3.jpg" alt="Surgical Guides" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-semibold text-neutral-900">Surgical Guides</h3>
            <p className="text-sm text-neutral-500 mt-1">Biocompatible surgical guides for implant procedures</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-neutral-900 rounded-2xl p-8 lg:p-12 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Upgrade Your Dental Lab</h2>
        <p className="text-neutral-400 mb-6 max-w-lg mx-auto">3x production output with 24-hour automated printing. Request a sample print or schedule a demo.</p>
        <div className="flex justify-center gap-3">
          <Link to="/inquiry" className="px-6 py-3 bg-white text-neutral-900 text-sm font-semibold rounded-lg hover:bg-neutral-100 transition-colors">
            Request a Demo
          </Link>
          <button onClick={handleAddToCart} className="px-6 py-3 border border-white text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
