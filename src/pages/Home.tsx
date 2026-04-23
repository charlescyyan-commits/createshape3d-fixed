import { Link } from 'react-router';
import { ArrowRight, Truck, Shield, Zap, Headphones } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import CardCarousel from '@/components/CardCarousel';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function Home() {
  return (
    <div>
      {/* Hero Carousel - 3 slides */}
      <HeroCarousel />

      {/* 3-Column Card Carousel */}
      <CardCarousel />

      {/* Value Props Bar */}
      <section className="border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'Orders over $99' },
              { icon: Shield, label: '2-Year Warranty', desc: 'On all printers' },
              { icon: Zap, label: 'Fast Printing', desc: 'Up to 50mm/h speed' },
              { icon: Headphones, label: 'Expert Support', desc: '7-day response' },
            ].map((vp) => (
              <div key={vp.label} className="flex items-center gap-3">
                <vp.icon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{vp.label}</p>
                  <p className="text-xs text-neutral-500">{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - 5 products with tabs + Add to Cart */}
      <FeaturedProducts />

      {/* Print Gallery */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Print Gallery</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['/products/print-sample-1.jpg', '/products/print-sample-2.jpg', '/products/print-sample-3.jpg', '/products/print-sample-4.jpg'].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square">
                <img src={src} alt={`Print sample ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
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
