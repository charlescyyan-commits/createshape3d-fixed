import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Heart, Check, Star } from 'lucide-react';
import { toast } from 'sonner';

const productImages = [
  '/products/casting-resin.jpg',
  '/products/resin-washable-1kg.jpg',
  '/products/print-sample-1.jpg',
  '/products/print-sample-3.jpg',
];

const colors = [
  { name: 'Grey', class: 'bg-neutral-400' },
  { name: 'Black', class: 'bg-neutral-900' },
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Green', class: 'bg-emerald-500' },
  { name: 'Red', class: 'bg-blue-600' },
  { name: 'Clear', class: 'bg-gradient-to-br from-sky-100 to-sky-300' },
];

const sizes = ['1KG', '2KG', '5KG', '12KG'];

const features = [
  { title: 'Low Shrinkage, High Precision', desc: 'Specially formulated to minimize volume shrinkage during photopolymerization, ensuring your models maintain exact dimensions with smooth, refined surfaces.' },
  { title: 'Rapid Curing & Stability', desc: 'Excellent fluidity allows for faster printing cycles. The optimized formula cures in just 2-3 seconds per layer while maintaining structural stability.' },
  { title: 'Vivid Color Reproduction', desc: 'Premium-grade pigments and photoinitiators deliver pure, consistent color with an artistic finish that makes every print look like a masterpiece.' },
  { title: 'Low Odor Formula', desc: 'Refined formulation produces minimal odor with no irritating fumes, making it comfortable for extended printing sessions in home or studio environments.' },
  { title: 'Universal Compatibility', desc: 'Works seamlessly with most LCD, MSLA, and DLP 3D printers. Optimized for 405nm wavelength for best-in-class results.' },
  { title: 'Leak-Proof Packaging', desc: 'Each bottle features a secure anti-leak design, wrapped in protective bubble film and shipped in a premium box to ensure safe delivery.' },
];

const specs = [
  ['Product Name', 'CreateShape3D Casting Resin Grey 12KG Set'],
  ['Wavelength', '405nm UV Photopolymer Resin'],
  ['Package Contents', '12 bottles x 1KG each, total 12KG'],
  ['Viscosity', '150-250 mPa·s (25°C)'],
  ['Density', '1.10-1.15 g/cm³'],
  ['Shrinkage', '< 3.5% (volume)'],
  ['Hardness (Shore D)', '80-85D'],
  ['Tensile Strength', '30-45 MPa'],
  ['Elongation at Break', '8-15%'],
  ['Curing Time', '2-3 seconds per layer'],
  ['Compatible Printers', 'All LCD / MSLA / DLP 405nm printers'],
  ['Storage Temperature', '10°C - 35°C, avoid direct sunlight'],
  ['Shelf Life', '12 months (unopened)'],
];

export default function ResinProduct() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(3);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const priceMap: Record<number, string> = { 0: '$25.99', 1: '$45.99', 2: '$99.99', 3: '$129.99' };
  const origMap: Record<number, string> = { 0: '$39.99', 1: '$69.99', 2: '$149.99', 3: '$264.00' };

  const handleAddToCart = () => {
    window.location.href = '/products';
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-white to-neutral-50 pt-8 pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* LEFT: Gallery */}
            <div className="flex gap-4">
              {/* Thumbnails - flex-1 evenly distributes to match main image height */}
              <div className="flex flex-col gap-3 w-16 lg:w-20 flex-shrink-0">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-1 min-h-0 rounded-xl border-2 overflow-hidden transition-all ${i === selectedImage ? 'border-blue-600 shadow-[0_0_0_3px_rgba(37,99,235,0.1)]' : 'border-neutral-200 hover:border-neutral-400'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex-1 relative">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden aspect-square flex items-center justify-center group">
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full z-10">SAVE 51%</span>
                  <img
                    src={productImages[selectedImage]}
                    alt="Casting Resin"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="pt-2">
              {/* Breadcrumb */}
              <nav className="text-xs text-neutral-400 mb-4">
                <Link to="/" className="hover:text-neutral-900">Home</Link>
                <span className="mx-1.5">/</span>
                <Link to="/category/resin" className="hover:text-neutral-900">Resin</Link>
                <span className="mx-1.5">/</span>
                <Link to="/products?category=casting-resin-series" className="hover:text-neutral-900">Casting Resin</Link>
                <span className="mx-1.5">/</span>
                <span className="text-neutral-900">Grey 12KG</span>
              </nav>

              <h1 className="text-3xl lg:text-[2.5rem] font-extrabold leading-tight tracking-tight mb-3">Casting Resin Grey 12KG</h1>
              <p className="text-base text-neutral-500 mb-5">Premium 405nm Photopolymer Resin for LCD/MSLA/DLP 3D Printers. Low shrinkage, high precision, vivid color reproduction.</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-neutral-500"><strong className="text-neutral-900">4.9</strong> out of 5 — 2,847 Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-neutral-100">
                <span className="text-4xl lg:text-[2.625rem] font-extrabold text-neutral-900 tracking-tight">{priceMap[selectedSize]}</span>
                <span className="text-xl text-neutral-400 line-through font-medium">{origMap[selectedSize]}</span>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3.5 py-1.5 rounded-full">SAVE {selectedSize === 3 ? '$134' : selectedSize === 2 ? '$50' : selectedSize === 1 ? '$24' : '$14'}</span>
              </div>

              {/* Color Selector */}
              <div className="mb-5">
                <p className="text-sm font-semibold mb-3">Color: <span className="font-normal text-neutral-600">{colors[selectedColor].name}</span></p>
                <div className="flex gap-2.5">
                  {colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full border-[3px] transition-all ${c.class} ${i === selectedColor ? 'border-neutral-900 shadow-[0_0_0_3px_rgba(0,0,0,0.08)] scale-110' : 'border-transparent hover:scale-105'}`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-5">
                <p className="text-sm font-semibold mb-3">Size</p>
                <div className="flex gap-2.5 flex-wrap">
                  {sizes.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(i)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${i === selectedSize ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Buttons */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-neutral-50 transition-colors text-lg font-medium">−</button>
                  <input type="text" value={qty} readOnly className="w-14 h-11 text-center font-semibold border-x border-neutral-200" />
                  <button onClick={() => setQty(Math.min(99, qty + 1))} className="w-11 h-11 flex items-center justify-center hover:bg-neutral-50 transition-colors text-lg font-medium">+</button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-14 h-14 border-2 border-neutral-200 rounded-xl flex items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Why Choose CreateShape3D</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">Engineered for Excellence</h2>
            <p className="text-neutral-500 max-w-xl mx-auto text-lg">Every bottle of CreateShape3D Casting Resin is formulated to deliver consistent, high-quality prints.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-neutral-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-5">
                  <Check className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE 1 ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white aspect-[4/3]">
              <img src="/products/print-sample-3.jpg" alt="Applications" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Applications</span>
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-4">From Miniatures to Industrial Parts</h3>
              <p className="text-neutral-500 leading-relaxed mb-6">Whether you're crafting detailed board game miniatures or functional industrial prototypes, CreateShape3D Casting Resin delivers the precision and durability your projects demand.</p>
              <ul className="space-y-3">
                {['Tabletop gaming miniatures with fine detail', 'Jewelry casting patterns and molds', 'Functional mechanical components', 'Architectural and design prototypes'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-700">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE 2 ===== */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="lg:order-2 rounded-3xl overflow-hidden shadow-xl bg-white aspect-[4/3]">
              <img src="/products/print-sample-1.jpg" alt="Compatibility" className="w-full h-full object-cover" />
            </div>
            <div className="lg:order-1">
              <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Compatibility</span>
              <h3 className="text-2xl lg:text-3xl font-extrabold mb-4">Works with Your Printer</h3>
              <p className="text-neutral-500 leading-relaxed mb-6">Designed for universal compatibility with all major LCD, MSLA, and DLP 3D printers. The 405nm wavelength ensures reliable curing across a wide range of devices.</p>
              <ul className="space-y-3">
                {['All LCD/MSLA 405nm 3D printers', 'Optimized for 4K/8K/12K monochrome screens', 'Compatible with DLP projectors', 'Works with Anycubic, Phrozen, and more'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-neutral-700">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Details</span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">Technical Specifications</h2>
            <p className="text-neutral-500">Everything you need to know about CreateShape3D Casting Resin.</p>
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

      {/* ===== COMPATIBILITY ===== */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">Versatility</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">Print Anything You Imagine</h2>
            <p className="text-neutral-500 max-w-xl mx-auto text-lg">From artistic creations to engineering prototypes, the possibilities are endless.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Miniatures & Figures', desc: 'Capture every detail for tabletop gaming, collectibles, and artistic sculptures.' },
              { title: 'Prototyping', desc: 'Rapidly iterate CAD designs into physical models for testing and validation.' },
              { title: 'Industrial Parts', desc: 'Produce functional components, jigs, fixtures, and end-use parts with precision.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border-2 border-neutral-100 rounded-2xl p-8 text-center hover:border-blue-600 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-neutral-700" />
                </div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#1a1a2e] text-white py-20 lg:py-24 text-center">
        <div className="max-w-2xl mx-auto px-4 lg:px-6">
          <h2 className="text-3xl lg:text-[2.625rem] font-extrabold mb-4 tracking-tight">Ready to Start Printing?</h2>
          <p className="text-white/60 mb-8 text-lg">Get premium Casting Resin and bring your ideas to life with stunning detail and reliability.</p>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <p className="mt-5 text-white/40 text-sm">
            Special Offer <strong className="text-white text-xl ml-2">$129.99</strong>
            <span className="line-through ml-2 opacity-50">$264.00</span>
          </p>
        </div>
      </section>
    </div>
  );
}
