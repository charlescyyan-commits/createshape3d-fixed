import { Link } from 'react-router';
import { trpc } from '@/providers/trpc';

export default function Footer() {
  const { data: categories } = trpc.category.list.useQuery();
  const { data: settings } = trpc.setting.list.useQuery();

  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || '';

  return (
    <footer className="bg-neutral-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-neutral-900 text-xs font-bold">CS</span>
              </div>
              <span className="text-lg font-bold">CreateShape3D</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium 3D printing solutions. Professional-grade LCD printers and photopolymer resins for creators worldwide.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider uppercase">Products</h3>
            <ul className="space-y-2">
              {categories?.map(cat => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors">{cat.name}</Link>
                </li>
              ))}
              <li><Link to="/products" className="text-sm text-neutral-400 hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider uppercase">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/inquiry" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/inquiry" className="text-sm text-neutral-400 hover:text-white transition-colors">OEM / ODM</Link></li>
              <li><span className="text-sm text-neutral-400">Shipping Policy</span></li>
              <li><span className="text-sm text-neutral-400">Return Policy</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-wider uppercase">Contact</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>{getSetting('phone') || '+86 400-888-3D88'}</li>
              <li>{getSetting('email') || 'sales@createshape3d.com'}</li>
              <li>{getSetting('address') || 'Shenzhen, China'}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} CreateShape3D. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
