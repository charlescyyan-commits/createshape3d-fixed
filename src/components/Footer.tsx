import { Link } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">CS</span>
              </div>
              <span className="text-lg font-bold tracking-tight">CreateShape3D</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-xs">
              Professional LCD 3D printers and premium resins for dental, jewelry, and industrial applications. 10+ years of manufacturing excellence.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>+86 400-888-3D88</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>sales@createshape3d.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Shenzhen, China</span>
              </div>
            </div>
          </div>

          {/* Get To Know Us */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] mb-5 text-neutral-300">Get To Know Us</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#' },
                { label: 'FAQs', href: '/support' },
                { label: 'Work With Us', href: '/inquiry' },
                { label: 'Contact Us', href: '/inquiry' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-neutral-500 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] mb-5 text-neutral-300">Shop</h3>
            <ul className="space-y-3">
              {[
                { label: 'Featured Products', href: '/products' },
                { label: '3D Printers', href: '/category/3d-printer' },
                { label: 'Resins', href: '/category/resin' },
                { label: 'Accessories', href: '/category/accessories' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-neutral-500 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] mb-5 text-neutral-300">Useful Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Track Order', href: '/support' },
                { label: 'Latest News', href: '/blog' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-neutral-500 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} CreateShape3D. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <Link to="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-neutral-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
