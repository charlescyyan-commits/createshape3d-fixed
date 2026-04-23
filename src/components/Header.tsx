import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { trpc } from '@/providers/trpc';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalCount } = useCart();
  const location = useLocation();
  const { data: categories } = trpc.category.list.useQuery();

  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      {/* Top bar */}
      <div className="bg-neutral-900 text-white text-xs text-center py-1.5">
        <span className="tracking-wider">Free shipping on orders over $99 | Premium 3D Printing Solutions</span>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-neutral-900 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
            <span className="text-lg font-bold tracking-tight">CreateShape3D</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/products" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">All Products</Link>
            {categories?.map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                {cat.name}
              </Link>
            ))}
            <Link to="/inquiry" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-neutral-600" />
            </button>
            <Link to="/login" className="p-2 hover:bg-neutral-100 rounded-full transition-colors hidden sm:flex">
              <User className="w-5 h-5 text-neutral-600" />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-neutral-600" />
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
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900"
                autoFocus
              />
              <button type="submit" className="px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors">Search</button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-3">
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">All Products</Link>
          {categories?.map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`} onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">{cat.name}</Link>
          ))}
          <Link to="/inquiry" onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">Contact Us</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">Login / Register</Link>
        </div>
      )}
    </header>
  );
}
