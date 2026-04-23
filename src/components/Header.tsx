import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Search, ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: '3D Printer',
    children: [
      { label: 'Dental 3d Printer', href: '/products?category=dental-3d-printer' },
      { label: 'Industrial 3d Printer', href: '/products?category=industrial-3d-printer' },
      { label: 'Jewelry 3d Printer', href: '/products?category=jewelry-3d-printer' },
      { label: 'Shoe 3d Printer', href: '/products?category=shoe-3d-printer' },
      { label: 'Wash & Cure Machine', href: '/products?category=wash-cure-machine' },
    ],
  },
  {
    label: 'Resin',
    children: [
      { label: 'Casting Resin Series', href: '/products?category=casting-resin-series' },
      { label: 'Dental Resin Series', href: '/products?category=dental-resin-series' },
      { label: 'Engineering Resin Series', href: '/products?category=engineering-resin-series' },
      { label: 'Rigid Resin Series', href: '/products?category=rigid-resin-series' },
      { label: 'Other Resin Series', href: '/products?category=other-resin-series' },
    ],
  },
  {
    label: 'Accessories',
    children: [
      { label: '3d Printer Mono LCD', href: '/products?category=3d-printer-mono-lcd' },
      { label: 'ACF/PFA Films', href: '/products?category=acf-pfa-films' },
    ],
  },
  {
    label: 'Support',
    children: [
      { label: 'FAQs', href: '/inquiry' },
      { label: 'Track Your Order', href: '/inquiry' },
    ],
  },
  { label: 'Contact Us', href: '/inquiry' },
  { label: 'Blog', href: '#' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount } = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-neutral-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-white text-[11px] text-center py-1.5 tracking-wider">
        Free shipping on orders over $99 | Premium 3D Printing Solutions
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-neutral-900 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:block">CreateShape3D</span>
          </Link>

          {/* Desktop Nav with Dropdown */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className="px-4 py-2 text-[13px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="px-4 py-2 text-[13px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors flex items-center gap-1 cursor-pointer">
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3" />}
                  </button>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href || '#'}
                        className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Search className="w-[18px] h-[18px] text-neutral-600" />
            </button>
            <Link to="/login" className="p-2 hover:bg-neutral-100 rounded-full transition-colors hidden sm:flex">
              <User className="w-[18px] h-[18px] text-neutral-600" />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-[18px] h-[18px] text-neutral-600" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalCount}</span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-3">
            <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`; }} className="flex gap-2">
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..." className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900" autoFocus />
              <button type="submit" className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">Search</button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 max-h-[70vh] overflow-auto">
          {menuItems.map((item) => (
            <div key={item.label} className="mb-2">
              {item.href && !item.children ? (
                <Link to={item.href} onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-neutral-700">{item.label}</Link>
              ) : (
                <>
                  <span className="block py-2 text-sm font-medium text-neutral-900">{item.label}</span>
                  {item.children && (
                    <div className="pl-4 border-l border-neutral-200 ml-2">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href || '#'} onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-neutral-500 hover:text-neutral-900">{child.label}</Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
