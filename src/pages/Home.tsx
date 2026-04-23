import { Link } from 'react-router';
import { ArrowRight, Shield, Zap, Truck, Headphones } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function Home() {
  const { data: products } = trpc.product.list.useQuery({});
  const featured = products?.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Professional 3D Printing</span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Precision 3D Printers<br />& Premium Resins
              </h1>
              <p className="text-neutral-600 mb-8 max-w-md leading-relaxed">
                From high-resolution LCD printers to water-washable resins with 12+ colors. Create with confidence.
              </p>
              <div className="flex gap-3">
                <Link to="/products" className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors inline-flex items-center gap-2">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/product/washable-resin-premium" className="px-6 py-3 border border-neutral-300 text-sm font-medium rounded-lg hover:border-neutral-900 transition-colors">
                  View Resin
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="/products/printer-main.jpg" alt="3D Printer" className="w-full rounded-xl shadow-lg object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-10 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'Orders over $99' },
              { icon: Shield, label: '2-Year Warranty', desc: 'On all printers' },
              { icon: Zap, label: 'Fast Printing', desc: 'Up to 50mm/h speed' },
              { icon: Headphones, label: 'Expert Support', desc: '7-day response' },
            ].map(vp => (
              <div key={vp.label} className="flex items-center gap-3">
                <vp.icon className="w-5 h-5 text-neutral-700 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{vp.label}</p>
                  <p className="text-xs text-neutral-500">{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featured?.map(product => (
              <Link key={product.id} to={`/product/${product.slug}`} className="group">
                <div className="bg-neutral-50 rounded-xl overflow-hidden mb-3">
                  <img
                    src={product.mainImage || '/products/resin-washable-1kg.jpg'}
                    alt={product.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-1">
                  <p className="text-xs text-neutral-500 mb-1">{product.brand}</p>
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-neutral-600 transition-colors">{product.name}</h3>
                  <p className="text-sm font-bold">${product.basePrice}</p>
                  {product.compareAtPrice && (
                    <p className="text-xs text-neutral-400 line-through">${product.compareAtPrice}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Print Samples */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Print Gallery</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['/products/print-sample-1.jpg', '/products/print-sample-2.jpg', '/products/print-sample-3.jpg', '/products/print-sample-4.jpg'].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <img src={src} alt={`Print sample ${i + 1}`} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
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
