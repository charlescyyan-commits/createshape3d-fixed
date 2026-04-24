import { Link } from 'react-router';
import { ArrowRight, Globe, Award, Users, Zap } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import ExploreProducts from '@/components/ExploreProducts';
import PrintGallery from '@/components/PrintGallery';

const stats = [
  { value: '10+', label: 'Years of Expertise', icon: Award },
  { value: '50+', label: 'Countries Served', icon: Globe },
  { value: '10000+', label: 'Happy Clients', icon: Users },
  { value: '99.7%', label: 'Product Precision', icon: Zap },
];

const categories = [
  { name: '3D Printers', desc: 'Professional LCD/DLP printers', image: '/products/printer-main.jpg', link: '/category/3d-printer' },
  { name: 'Dental Printers', desc: 'Chairside precision printing', image: '/products/dental-printer.jpg', link: '/products?category=dental-3d-printer' },
  { name: 'Resins', desc: 'Premium photopolymer materials', image: '/products/resin-washable-1kg.jpg', link: '/category/resin' },
  { name: 'Accessories', desc: 'Screens, films & spare parts', image: '/products/lcd-screen.jpg', link: '/category/accessories' },
];

export default function Home() {
  return (
    <div>
      {/* 1. Hero - Fullscreen dark blue */}
      <HeroCarousel />

      {/* 2. Stats Bar */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 lg:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-[#0a1628] tracking-tight">{stat.value}</p>
                <p className="text-sm text-neutral-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Explore Our Products */}
      <ExploreProducts />

      {/* 4. Browse by Category */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Categories</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a1628]">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0a1628] group-hover:text-blue-600 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-neutral-500 mt-0.5">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600 mb-3">Why Choose Us</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0a1628] mb-3">Built for Professionals</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Every product is engineered with precision, tested for reliability, and backed by our dedicated support team.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Precision Engineering', desc: '0.03mm XY resolution with 16K LCD technology for micron-level accuracy in every print.' },
              { title: 'Industrial Quality', desc: 'COB vertical point light source with 20,000-hour lifespan. Built for continuous production environments.' },
              { title: 'Universal Compatibility', desc: 'Works seamlessly with all 405nm LCD/MSLA/DLP 3D printers. One resin, endless possibilities.' },
              { title: 'Global Support', desc: 'Technical support team available across time zones. From setup to maintenance, we are here.' },
              { title: 'OEM & Wholesale', desc: 'Private labeling, custom formulations, and bulk pricing for distributors and resellers worldwide.' },
              { title: 'Fast Shipping', desc: 'Free shipping on orders over $99. Express delivery available to 50+ countries worldwide.' },
            ].map((item) => (
              <div key={item.title} className="bg-neutral-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-neutral-100">
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Print Gallery */}
      <PrintGallery />

      {/* 7. CTA Banner */}
      <section className="bg-[#0a1628] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Elevate Your<br />3D Printing Workflow?
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            Get in touch with our team for a personalized consultation, product demo, or bulk pricing quote.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/25"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
