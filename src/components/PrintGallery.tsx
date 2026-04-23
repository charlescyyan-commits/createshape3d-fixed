import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    title: 'Focusing on dentistry',
    image: '/products/print-sample-1.jpg',
    link: '/products?category=dental-3d-printer',
  },
  {
    id: 2,
    title: 'Industrial design',
    image: '/products/print-sample-2.jpg',
    link: '/products?category=industrial-3d-printer',
  },
  {
    id: 3,
    title: 'Carbon fiber seat cushion',
    image: '/products/print-sample-3.jpg',
    link: '/products?category=shoe-3d-printer',
  },
  {
    id: 4,
    title: 'Jewelry casting',
    image: '/products/print-sample-4.jpg',
    link: '/products?category=jewelry-3d-printer',
  },
  {
    id: 5,
    title: 'Engineering prototypes',
    image: '/products/industrial-printer.jpg',
    link: '/products?category=engineering-resin-series',
  },
  {
    id: 6,
    title: 'Dental clear aligners',
    image: '/products/dental-resin.jpg',
    link: '/products?category=dental-resin-series',
  },
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-3">Applications Across Multiple Sectors</h2>
        <p className="text-neutral-500 text-center mb-12 max-w-2xl mx-auto">
          Our products are widely applied across diverse sectors, including but not limited to
        </p>

        <div className="relative flex items-center justify-center gap-2 lg:gap-4 select-none">
          {/* Prev */}
          <button
            onClick={prev}
            className="hidden md:flex w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-neutral-50 transition-colors border border-neutral-200 z-10 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 3D Perspective Carousel */}
          <div className="flex items-center justify-center gap-2 lg:gap-4 w-full" style={{ perspective: '1200px' }}>
            {/* Far Left */}
            <div
              className="hidden lg:block flex-shrink-0 w-[12%] transition-all duration-700 cursor-pointer"
              style={{
                transform: 'translateZ(-200px) rotateY(25deg)',
                opacity: 0.4,
              }}
              onClick={() => setActiveIndex(getIndex(-2))}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={slides[getIndex(-2)].image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Near Left */}
            <div
              className="hidden md:block flex-shrink-0 w-[18%] transition-all duration-700 cursor-pointer"
              style={{
                transform: 'translateZ(-100px) rotateY(15deg)',
                opacity: 0.6,
              }}
              onClick={() => setActiveIndex(getIndex(-1))}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                <img src={slides[getIndex(-1)].image} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-sm text-neutral-600 mt-3 font-medium">{slides[getIndex(-1)].title}</p>
            </div>

            {/* Center - Active */}
            <Link
              to={slides[activeIndex].link}
              className="flex-shrink-0 w-[55%] md:w-[45%] lg:w-[35%] transition-all duration-700 relative group"
              style={{
                transform: 'translateZ(0px) rotateY(0deg)',
                opacity: 1,
              }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl relative">
                <img
                  src={slides[activeIndex].image}
                  alt={slides[activeIndex].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Bottom overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-24">
                  <p className="text-2xl lg:text-3xl font-bold text-white">{slides[activeIndex].title}</p>
                  <p className="text-sm text-white/80 mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                    More Application Solution <ChevronRight className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-2" />
                  </p>
                </div>
              </div>
            </Link>

            {/* Near Right */}
            <div
              className="hidden md:block flex-shrink-0 w-[18%] transition-all duration-700 cursor-pointer"
              style={{
                transform: 'translateZ(-100px) rotateY(-15deg)',
                opacity: 0.6,
              }}
              onClick={() => setActiveIndex(getIndex(1))}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                <img src={slides[getIndex(1)].image} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-sm text-neutral-600 mt-3 font-medium">{slides[getIndex(1)].title}</p>
            </div>

            {/* Far Right */}
            <div
              className="hidden lg:block flex-shrink-0 w-[12%] transition-all duration-700 cursor-pointer"
              style={{
                transform: 'translateZ(-200px) rotateY(-25deg)',
                opacity: 0.4,
              }}
              onClick={() => setActiveIndex(getIndex(2))}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={slides[getIndex(2)].image} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="hidden md:flex w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-neutral-50 transition-colors border border-neutral-200 z-10 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all ${i === activeIndex ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-300 hover:bg-neutral-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
