import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWPPageBySlugWithAcfQuery } from '@/hooks/useWPQueries';

const defaultSlides = [
  {
    title: 'CS3D ProLite M4K',
    subtitle: '4K MONOCHROME LCD 3D PRINTER',
    description: '0.03mm XY resolution | 16K LCD technology | 220mm/h print speed',
    image: '/slides/hero-1.jpg',
    buttonText: 'Shop Now',
    buttonLink: '/product/prolite-m4k',
  },
  {
    title: 'Premium Dental Resin',
    subtitle: 'BIOCOMPATIBLE CASTING RESIN',
    description: 'Class IIa biocompatible | High precision | Smooth surface finish',
    image: '/slides/hero-2.jpg',
    buttonText: 'Shop Resins',
    buttonLink: '/category/resin',
  },
  {
    title: 'Industrial Nova X1',
    subtitle: 'LARGE FORMAT 3D PRINTER',
    description: '400×200mm build volume | 0.05mm precision | Industrial-grade reliability',
    image: '/slides/hero-3.jpg',
    buttonText: 'Learn More',
    buttonLink: '/product/industrial-nova-x1',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const { data: page, isLoading: loading } = useWPPageBySlugWithAcfQuery('home-banners');

  const banners = (page as any)?.acf?.banner;
  const fetchedSlides = Array.isArray(banners) && banners.length > 0
    ? banners.map((b: any) => ({
        title: b?.banner_title || b?.title || '',
        subtitle: b?.banner_subtitle || b?.subtitle || '',
        description: b?.banner_description || b?.description || '',
        image: b?.banner_image?.url || b?.banner_image || b?.image?.url || b?.image || '/slides/hero-1.jpg',
        buttonText: b?.banner_button_text || b?.buttonText || 'Shop Now',
        buttonLink: b?.banner_button_link || b?.buttonLink || '/products',
      }))
    : null;

  const slides = fetchedSlides && fetchedSlides.length > 0 ? fetchedSlides : defaultSlides;

  useEffect(() => {
    if (current >= slides.length) setCurrent(0);
  }, [current, slides.length]);

  const next = () => setCurrent(c => (c + 1) % slides.length);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) return <div className="h-[60vh] min-h-[500px] bg-[#0a1628] animate-pulse" />;

  const slide = slides[current];

  return (
    <div className="relative h-[60vh] min-h-[500px] bg-[#0a1628] overflow-hidden">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 h-full flex items-center">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-400 mb-3">{slide.subtitle}</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">{slide.title}</h1>
          <p className="text-white/60 text-lg mb-8">{slide.description}</p>
          <Link to={slide.buttonLink} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">
            {slide.buttonText}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"><ChevronLeft className="w-6 h-6" /></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"><ChevronRight className="w-6 h-6" /></button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
}
