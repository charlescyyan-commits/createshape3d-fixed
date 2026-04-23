import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PrintGalleryCarousel() {
  // For now use hardcoded sample images; in production this could come from a DB table
  const images = [
    '/products/print-sample-1.jpg',
    '/products/print-sample-2.jpg',
    '/products/print-sample-3.jpg',
    '/products/print-sample-4.jpg',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  if (!images.length) return null;

  const getIndex = (offset: number) => (activeIndex + offset + images.length) % images.length;

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Print Gallery</h2>

        <div className="relative flex items-center justify-center gap-4 lg:gap-6">
          {/* Prev arrow */}
          <button onClick={prev} className="hidden sm:flex w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-neutral-100 transition-colors border border-neutral-200 z-10 flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel container */}
          <div className="flex items-center justify-center gap-3 lg:gap-4 overflow-hidden w-full">
            {/* Small left image (-1) */}
            <div className="hidden md:block flex-shrink-0 w-[18%] aspect-square rounded-xl overflow-hidden opacity-60 scale-90 transition-all duration-500">
              <img src={images[getIndex(-1)]} alt="Print sample" className="w-full h-full object-cover" />
            </div>

            {/* Small left image (-2) - only on large screens */}
            <div className="hidden lg:block flex-shrink-0 w-[12%] aspect-square rounded-xl overflow-hidden opacity-40 scale-80 transition-all duration-500">
              <img src={images[getIndex(-2)]} alt="Print sample" className="w-full h-full object-cover" />
            </div>

            {/* Main active image */}
            <div className="flex-shrink-0 w-[55%] md:w-[45%] aspect-square rounded-2xl overflow-hidden shadow-xl transition-all duration-500">
              <img src={images[activeIndex]} alt="Print sample" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Small right image (+1) */}
            <div className="hidden md:block flex-shrink-0 w-[18%] aspect-square rounded-xl overflow-hidden opacity-60 scale-90 transition-all duration-500">
              <img src={images[getIndex(1)]} alt="Print sample" className="w-full h-full object-cover" />
            </div>

            {/* Small right image (+2) - only on large screens */}
            <div className="hidden lg:block flex-shrink-0 w-[12%] aspect-square rounded-xl overflow-hidden opacity-40 scale-80 transition-all duration-500">
              <img src={images[getIndex(2)]} alt="Print sample" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Next arrow */}
          <button onClick={next} className="hidden sm:flex w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center hover:bg-neutral-100 transition-colors border border-neutral-200 z-10 flex-shrink-0">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeIndex ? 'bg-neutral-900' : 'bg-neutral-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
