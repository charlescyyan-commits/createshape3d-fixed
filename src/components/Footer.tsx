import { Link } from 'react-router';
import { trpc } from '@/providers/trpc';

export default function Footer() {
  const { data: settings } = trpc.setting.list.useQuery();
  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || '';

  return (
    <footer className="bg-neutral-900 text-white mt-16">
      {/* Social + Links */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Get to Know Us */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Get to Know Us</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">About Us</span></li>
              <li><Link to="/inquiry" className="text-sm text-neutral-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/inquiry" className="text-sm text-neutral-400 hover:text-white transition-colors">Work With Us</Link></li>
              <li><Link to="/inquiry" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-2.5">
              <li><Link to="/products" className="text-sm text-neutral-400 hover:text-white transition-colors">Recently Viewed</Link></li>
              <li><Link to="/products" className="text-sm text-neutral-400 hover:text-white transition-colors">Featured Products</Link></li>
              <li><Link to="/products?category=3d-printer" className="text-sm text-neutral-400 hover:text-white transition-colors">3D Printers</Link></li>
              <li><Link to="/products?category=resin" className="text-sm text-neutral-400 hover:text-white transition-colors">Resins</Link></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Useful Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/inquiry" className="text-sm text-neutral-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><span className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">Latest News</span></li>
              <li><span className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-neutral-400 mb-6">
              <li>{getSetting('phone') || '+86 400-888-3D88'}</li>
              <li>{getSetting('email') || 'sales@createshape3d.com'}</li>
              <li>{getSetting('address') || 'Shenzhen, China'}</li>
            </ul>
            <div>
              <p className="text-sm font-bold tracking-wider uppercase mb-2">Subscribe</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-l-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500" />
                <button className="px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-r-lg hover:bg-neutral-100 transition-colors">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Icons + Copyright */}
        <div className="border-t border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500">Safe Payments:</span>
            <div className="flex gap-2">
              {['Mastercard', 'Visa', 'PayPal', 'Amex'].map((name) => (
                <div key={name} className="w-10 h-6 bg-neutral-800 rounded flex items-center justify-center text-[8px] text-neutral-500 font-medium">{name}</div>
              ))}
            </div>
          </div>
          <p className="text-xs text-neutral-500">© {new Date().getFullYear()} CreateShape3d. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
