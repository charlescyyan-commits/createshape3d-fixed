import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Precision 3D Printing\nfor Dental Excellence',
    subtitle: 'Professional LCD resin 3D printers delivering 16K resolution, 0.03mm accuracy, and reliable chairside production for modern dental practices.',
    image: '/products/dental-printer.jpg',
    btnPrimary: { text: 'Explore Printers', link: '/category/3d-printer' },
    btnSecondary: { text: 'Get a Quote', link: '/inquiry' },
  },
  {
    id: 2,
    title: 'Premium Resins\nfor Every Application',
    subtitle: 'From casting to dental models — low shrinkage, high precision, vivid color reproduction. Compatible with all 405nm LCD/DLP printers.',
    image: '/products/resin-washable-1kg.jpg',
    btnPrimary: { text: 'Shop Resins', link: '/category/resin' },
    btnSecondary: { text: 'View Applications', link: '/products' },
  },
  {
    id: 3,
    title: 'OEM & Bulk\nSolutions Worldwide',
    subtitle: 'Private labeling, custom formulations, and wholesale partnerships for distributors. 10+ years of manufacturing excellence serving 50+ countries.',
    image: '/products/industrial-printer.jpg',
    btnPrimary: { text: 'Contact Sales', link: '/inquiry' },
    btnSecondary: { text: 'Learn More', link: '/inquiry' },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative bg-[#0a1628] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover opacity-30" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/40" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 min-h-[580px] lg:min-h-[680px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-16">
          {/* Left: Text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-white/10">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              CreateShape3D — Professional 3D Printing Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6 whitespace-pre-line">
              {slide.title}
            </h1>

            <p className="text-base lg:text-lg text-white/60 leading-relaxed mb-8 max-w-md">
              {slide.subtitle}
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                to={slide.btnPrimary.link}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25"
              >
                {slide.btnPrimary.text}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={slide.btnSecondary.link}
                className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all"
              >
                {slide.btnSecondary.text}
              </Link>
            </div>
          </div>

          {/* Right: Featured product image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl scale-90" />
              <img
                src={slide.image}
                alt={slide.title}
                className="relative w-full max-w-[480px] rounded-2xl shadow-2xl shadow-black/30 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-10 bg-blue-500' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
