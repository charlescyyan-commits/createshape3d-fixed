import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { Search, ShoppingCart, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { trpc } from '@/providers/trpc';

interface MenuProduct {
  name: string;
  image: string;
  href: string;
  price: string;
  subCategory: string;
}

interface MenuItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
  products?: MenuProduct[];
}

const menuItems: MenuItem[] = [
  {
    label: '3D Printer',
    children: [
      { label: 'Dental 3d Printer', href: '/dental-printer' },
      { label: 'Industrial 3d Printer', href: '/products?category=industrial-3d-printer' },
      { label: 'Jewelry 3d Printer', href: '/products?category=jewelry-3d-printer' },
      { label: 'Shoe 3d Printer', href: '/products?category=shoe-3d-printer' },
      { label: 'Wash & Cure Machine', href: '/products?category=wash-cure-machine' },
    ],
    products: [
      { name: 'Dental Stellar D100', image: '/products/dental-printer.jpg', href: '/product/dental-stellar-d100', price: '$1,299.99', subCategory: 'dental-3d-printer' },
      { name: 'CS3D ProLite M4K', image: '/products/printer-main.jpg', href: '/product/prolite-m4k', price: '$299.99', subCategory: 'industrial-3d-printer' },
      { name: 'Industrial Nova X1', image: '/products/industrial-printer.jpg', href: '/product/industrial-nova-x1', price: '$2,499.99', subCategory: 'industrial-3d-printer' },
      { name: 'Jewelry Craft G2', image: '/products/jewelry-printer.jpg', href: '/product/jewelry-craft-g2', price: '$599.99', subCategory: 'jewelry-3d-printer' },
      { name: 'Shoe Sole Printer S3', image: '/products/shoe-printer.jpg', href: '/product/shoe-sole-printer', price: '$899.99', subCategory: 'shoe-3d-printer' },
      { name: 'Wash & Cure Station', image: '/products/wash-cure.jpg', href: '/product/wash-cure-station', price: '$149.99', subCategory: 'wash-cure-machine' },
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
    products: [
      { name: 'Casting Resin Gold', image: '/products/casting-resin.jpg', href: '/product/casting-resin-gold', price: '$32.99', subCategory: 'casting-resin-series' },
      { name: 'Dental Resin Clear', image: '/products/dental-resin.jpg', href: '/product/dental-resin-clear', price: '$45.99', subCategory: 'dental-resin-series' },
      { name: 'Washable Resin Premium', image: '/products/resin-washable-1kg.jpg', href: '/product/washable-resin-premium', price: '$25.99', subCategory: 'engineering-resin-series' },
      { name: 'Rigid Resin Black', image: '/products/rigid-resin.jpg', href: '/product/rigid-resin-black', price: '$28.99', subCategory: 'rigid-resin-series' },
    ],
  },
  {
    label: 'Accessories',
    children: [
      { label: '3d Printer Mono LCD', href: '/products?category=3d-printer-mono-lcd' },
      { label: 'ACF/PFA Films', href: '/products?category=acf-pfa-films' },
    ],
    products: [
      { name: 'Mono LCD Screen 6"', image: '/products/lcd-screen.jpg', href: '/product/mono-lcd-screen-6inch', price: '$89.99', subCategory: '3d-printer-mono-lcd' },
      { name: 'ACF/PFA Film Pack', image: '/products/fep-film.jpg', href: '/product/acf-film-pack', price: '$19.99', subCategory: 'acf-pfa-films' },
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
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount } = useCart();
  const { data: settings } = trpc.setting.list.useQuery();
  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value;
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Clear any pending close timer
  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Delayed close - gives user time to move mouse into dropdown
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubCategory(null);
    }, 150);
  }, [cancelClose]);

  const getSubSlugFromHref = (href: string) => {
    if (href.startsWith('/dental-printer')) return 'dental-3d-printer';
    const match = href.match(/category=([^&]+)/);
    return match ? match[1] : '';
  };

  const handleNavEnter = useCallback((item: MenuItem) => {
    cancelClose();
    if (item.children && item.products) {
      const firstChildSlug = getSubSlugFromHref(item.children[0].href);
      setActiveSubCategory(firstChildSlug);
    }
    setActiveDropdown(item.label);
  }, [cancelClose]);

  const handleSubEnter = useCallback((childHref: string) => {
    cancelClose();
    const slug = getSubSlugFromHref(childHref);
    setActiveSubCategory(slug);
  }, [cancelClose]);

  const getFilteredProducts = (item: MenuItem) => {
    if (!item.products || !activeSubCategory) return item.products || [];
    const filtered = item.products.filter(p => p.subCategory === activeSubCategory);
    return filtered.length > 0 ? filtered : item.products;
  };

  const getActiveSubLabel = (item: MenuItem) => {
    if (!activeSubCategory || !item.children) return '';
    const child = item.children.find(c => getSubSlugFromHref(c.href) === activeSubCategory);
    return child?.label || '';
  };

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-neutral-200 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-white text-[11px] text-center py-1.5 tracking-wider">
        Free shipping on orders over $99 | Premium 3D Printing Solutions
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 mr-6">
            {getSetting('site_logo') ? (
              <img src={getSetting('site_logo') || ''} alt="Logo" className="h-8 w-auto" />
            ) : (
              <>
                <div className="w-8 h-8 bg-neutral-900 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CS</span>
                </div>
                <span className="text-lg font-bold tracking-tight hidden sm:block">CreateShape3D</span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav ref={navRef} className="hidden sm:flex items-center gap-0.5 lg:gap-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleNavEnter(item)}
                onMouseLeave={scheduleClose}
              >
                {item.href ? (
                  <Link to={item.href} className="px-1.5 lg:px-3 py-2 text-[11px] lg:text-[13px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors flex items-center gap-0.5 lg:gap-1 whitespace-nowrap">
                    {item.label}
                  </Link>
                ) : (
                  <button className="px-1.5 lg:px-3 py-2 text-[11px] lg:text-[13px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors flex items-center gap-0.5 lg:gap-1 cursor-pointer whitespace-nowrap">
                    {item.label}{item.children && <ChevronDown className="w-3 h-3" />}
                  </button>
                )}

                {/* Mega Menu with subcategory switching */}
                {item.children && activeDropdown === item.label && item.products && (
                  <div
                    ref={megaMenuRef}
                    className="fixed left-0 right-0 top-[calc(4rem+1px)] bg-white border-b border-neutral-200 shadow-xl z-50"
                    onMouseEnter={cancelClose}
                    onMouseLeave={() => { scheduleClose(); }}
                  >
                    <div className="max-w-7xl mx-auto px-4 py-6">
                      <div className="flex gap-8">
                        {/* Left: Subcategory links */}
                        <div className="w-56 flex-shrink-0 border-r border-neutral-100 pr-6">
                          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">{item.label} Categories</h3>
                          <ul className="space-y-0.5">
                            {item.children.map((child) => {
                              const childSlug = getSubSlugFromHref(child.href);
                              const isActive = activeSubCategory === childSlug;
                              return (
                                <li key={child.label}>
                                  <Link
                                    to={child.href}
                                    className={`block py-1.5 px-3 rounded-lg text-sm transition-colors ${isActive ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'}`}
                                    onMouseEnter={() => handleSubEnter(child.href)}
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {/* Right: Products for active subcategory */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                              {getActiveSubLabel(item) || item.label}
                            </h3>
                            <span className="text-[11px] text-neutral-400">{getFilteredProducts(item).length} products</span>
                          </div>
                          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                            {getFilteredProducts(item).map((product) => (
                              <Link
                                key={product.name}
                                to={product.href}
                                className="group block"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="bg-neutral-50 rounded-lg overflow-hidden aspect-square mb-2 border border-neutral-100">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <p className="text-xs font-medium text-neutral-700 group-hover:text-neutral-900 line-clamp-2 leading-tight">{product.name}</p>
                                <p className="text-[11px] text-neutral-500 mt-0.5">{product.price}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Simple dropdown for Support */}
                {item.children && activeDropdown === item.label && !item.products && (
                  <div className="absolute top-full left-0 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.href} className="block px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors" onClick={() => setActiveDropdown(null)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1 min-w-0" />

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
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
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-3">
            <form onSubmit={e => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`; }} className="flex gap-2">
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products..." className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900" autoFocus />
              <button type="submit" className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">Search</button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-neutral-200 px-4 py-4 max-h-[70vh] overflow-auto">
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
                        <Link key={child.label} to={child.href} onClick={() => setMenuOpen(false)} className="block py-1.5 text-sm text-neutral-500 hover:text-neutral-900">{child.label}</Link>
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
