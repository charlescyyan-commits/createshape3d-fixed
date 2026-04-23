import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const cards: CardItem[] = [
  { id: 1, title: 'Next Level Adventure', subtitle: 'Explore professional 3D printers designed for precision and reliability in every print.', image: '/products/printer-main.jpg', link: '/product/prolite-m4k' },
  { id: 2, title: 'Premium Resin Collection', subtitle: '12+ colors available. From water-washable to engineering grade resins.', image: '/products/resin-washable-1kg.jpg', link: '/product/washable-resin-premium' },
  { id: 3, title: 'Precision Dental Solutions', subtitle: 'Biocompatible materials for crowns, bridges and orthodontic applications.', image: '/products/dental-resin.jpg', link: '/product/dental-model-resin' },
];

export default function CardCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 350, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card) => (
              <div key={card.id} className="min-w-[320px] sm:min-w-[360px] flex-1 group">
                <div className="relative bg-neutral-50 rounded-2xl overflow-hidden h-[280px] sm:h-[320px]">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                    <p className="text-sm text-white/80 mb-4 line-clamp-2">{card.subtitle}</p>
                    <Link to={card.link} className="inline-flex items-center gap-1 px-5 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll arrows */}
          {canScrollLeft && (
            <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-neutral-50 z-10 border border-neutral-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-neutral-50 z-10 border border-neutral-200">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
