import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import ExploreProducts from '@/components/ExploreProducts';
import PrintGalleryCarousel from '@/components/PrintGalleryCarousel';

export default function Home() {
  return (
    <div>
      {/* 1. Hero Carousel - 3 slides */}
      <HeroCarousel />

      {/* 2. Explore Our Products - 3 square cards */}
      <ExploreProducts />

      {/* 3. Print Gallery - carousel with center zoom */}
      <PrintGalleryCarousel />

      {/* 4. CTA Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-neutral-900 rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Need Custom Formulations?</h2>
            <p className="text-neutral-400 mb-6 max-w-lg mx-auto">We support OEM, ODM, and bulk orders with custom colors and private labeling.</p>
            <Link to="/inquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 text-sm font-semibold rounded-lg hover:bg-neutral-100 transition-colors">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
