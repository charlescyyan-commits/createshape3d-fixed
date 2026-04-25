import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getWPPageBySlug } from '@/lib/wp-client';
import { Helmet } from 'react-helmet-async';

const defaultSlides = [
  { title: 'CS3D ProLite M4K', subtitle: '4K MONOCHROME LCD 3D PRINTER', description: '0.03mm XY resolution | 16K LCD technology | 220mm/h print speed', image: '/slides/hero-1.jpg', buttonText: 'Shop Now', buttonLink: '/products' },
  { title: 'Premium Dental Resin', subtitle: 'BIOCOMPATIBLE CASTING RESIN', description: 'Class IIa biocompatible | High precision | Smooth surface finish', image: '/slides/hero-2.jpg', buttonText: 'Shop Resins', buttonLink: '/products' },
  { title: 'Industrial Nova X1', subtitle: 'LARGE FORMAT 3D PRINTER', description: '400×200mm build volume | 0.05mm precision | Industrial-grade reliability', image: '/slides/hero-3.jpg', buttonText: 'Learn More', buttonLink: '/products' },
];

interface BannerSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const { data: bannerPage } = useQuery({
    queryKey: ['banner-page'],
    queryFn: () => getWPPageBySlug('home-banners'),
    staleTime: 5 * 60 * 1000,
  });

  const slides: BannerSlide[] = (() => {
    if (bannerPage?.acf?.banner_slides?.length) {
      return bannerPage.acf.banner_slides.map((b: any) => ({
        title: b.banner_title || '',
        subtitle: b.banner_subtitle || '',
        description: b.banner_description || '',
        image: b.banner_image?.url || b.banner_image || '/slides/hero-1.jpg',
        buttonText: b.banner_button_text || 'Shop Now',
        buttonLink: b.banner_button_link || '/products',
      }));
    }
    return defaultSlides;
  })();

  const next = () => setCurrent(c => (c + 1) % slides.length);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
          <Link to={slide.buttonLink} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all">{slide.buttonText}</Link>
        </div>
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"><ChevronLeft className="w-6 h-6" /></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"><ChevronRight className="w-6 h-6" /></button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/40'}`} />))}
      </div>
    </div>
  );
}
