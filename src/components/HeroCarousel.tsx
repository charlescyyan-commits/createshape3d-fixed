import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function HeroCarousel() {
  const { data: slides } = trpc.banner.list.useQuery();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (!slides?.length) return;
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides]);

  const prev = useCallback(() => {
    if (!slides?.length) return;
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides]);

  useEffect(() => {
    if (!slides?.length || slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [slides, next]);

  if (!slides?.length) return null;

  return (
    <section className="relative bg-neutral-100 overflow-hidden">
      <div className="relative h-[400px] sm:h-[480px] lg:h-[540px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
              <div className="max-w-lg text-white">
                {slide.subtitle && (
                  <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/80 mb-3">{slide.subtitle}</p>
                )}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">{slide.title}</h2>
                {slide.description && <p className="text-sm sm:text-base text-white/80 mb-6 leading-relaxed">{slide.description}</p>}
                {slide.buttonText && slide.buttonLink && (
                  <Link to={slide.buttonLink} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 text-sm font-semibold rounded-lg hover:bg-neutral-100 transition-colors">
                    {slide.buttonText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
