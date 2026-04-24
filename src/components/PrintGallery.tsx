import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const slides = [
  { id: 1, title: 'Focusing on dentistry', image: '/products/print-sample-1.jpg', link: '/products?category=dental-3d-printer' },
  { id: 2, title: 'Industrial design', image: '/products/print-sample-2.jpg', link: '/products?category=industrial-3d-printer' },
  { id: 3, title: 'Carbon fiber seat cushion', image: '/products/print-sample-3.jpg', link: '/products?category=shoe-3d-printer' },
  { id: 4, title: 'Jewelry casting', image: '/products/print-sample-4.jpg', link: '/products?category=jewelry-3d-printer' },
  { id: 5, title: 'Engineering prototypes', image: '/products/industrial-printer.jpg', link: '/products?category=engineering-resin-series' },
  { id: 6, title: 'Dental clear aligners', image: '/products/dental-resin.jpg', link: '/products?category=dental-resin-series' },
];

export default function PrintGallery() {
  const [activeIndex, setActiveIndex] = useState(1);
  const total = slides.length;

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const getIndex = (offset: number) => (activeIndex + offset + total) % total;

  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Applications</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a1628] mb-3">Applications Across Multiple Sectors</h2>
          <p className="text-neutral-500 max-w-xl mx-auto">Our products are widely applied across diverse sectors, delivering precision and reliability.</p>
        </div>

        <div className="relative flex items-center justify-center gap-3 lg:gap-5 select-none">
          <button onClick={prev} className="hidden sm:flex w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-neutral-50 transition-colors border border-neutral-200 z-10 flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 lg:gap-4 overflow-hidden w-full" style={{ perspective: '1200px' }}>
            {/* Far Left */}
            <div
              className="hidden lg:block flex-shrink-0 w-[10%] aspect-[3/4] rounded-xl overflow-hidden opacity-30 scale-75 transition-all duration-700 cursor-pointer"
              onClick={() => setActiveIndex(getIndex(-2))}
            >
              <img src={slides[getIndex(-2)].image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Near Left */}
            <div
              className="hidden md:block flex-shrink-0 w-[16%] aspect-[3/4] rounded-xl overflow-hidden opacity-50 scale-90 transition-all duration-700 cursor-pointer shadow-lg"
              onClick={() => setActiveIndex(getIndex(-1))}
            >
              <img src={slides[getIndex(-1)].image} alt="" className="w-full h-full object-cover" />
              <p className="text-center text-xs text-neutral-500 mt-2 font-medium">{slides[getIndex(-1)].title}</p>
            </div>

            {/* Center - Active */}
            <Link
              to={slides[activeIndex].link}
              className="flex-shrink-0 w-[65%] sm:w-[50%] md:w-[40%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 relative group"
            >
              <img
                src={slides[activeIndex].image}
                alt={slides[activeIndex].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <p className="text-xl lg:text-2xl font-bold text-white">{slides[activeIndex].title}</p>
                <p className="text-sm text-white/70 mt-1 flex items-center gap-1 group-hover:gap-2 transition-all">
                  More Application Solution <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-2.5" />
                </p>
              </div>
            </Link>

            {/* Near Right */}
            <div
              className="hidden md:block flex-shrink-0 w-[16%] aspect-[3/4] rounded-xl overflow-hidden opacity-50 scale-90 transition-all duration-700 cursor-pointer shadow-lg"
              onClick={() => setActiveIndex(getIndex(1))}
            >
              <img src={slides[getIndex(1)].image} alt="" className="w-full h-full object-cover" />
              <p className="text-center text-xs text-neutral-500 mt-2 font-medium">{slides[getIndex(1)].title}</p>
            </div>

            {/* Far Right */}
            <div
              className="hidden lg:block flex-shrink-0 w-[10%] aspect-[3/4] rounded-xl overflow-hidden opacity-30 scale-75 transition-all duration-700 cursor-pointer"
              onClick={() => setActiveIndex(getIndex(2))}
            >
              <img src={slides[getIndex(2)].image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          <button onClick={next} className="hidden sm:flex w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-neutral-50 transition-colors border border-neutral-200 z-10 flex-shrink-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all ${i === activeIndex ? 'w-8 bg-blue-600' : 'w-2 bg-neutral-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
