import { useParams, Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

const categoryData: Record<string, { title: string; desc: string; image: string; subCategories: { name: string; slug: string; image: string; desc: string }[] }> = {
  '3d-printer': {
    title: '3D Printer',
    desc: 'Professional LCD/DLP 3D printers designed for dental, industrial, jewelry, and footwear applications. Engineered for precision, speed, and reliability.',
    image: '/products/printer-main.jpg',
    subCategories: [
      { name: 'Dental 3d Printer', slug: 'dental-3d-printer', image: '/products/dental-printer.jpg', desc: 'High-precision printers for dental labs and clinics' },
      { name: 'Industrial 3d Printer', slug: 'industrial-3d-printer', image: '/products/industrial-printer.jpg', desc: 'Large-format printers for manufacturing and prototyping' },
      { name: 'Jewelry 3d Printer', slug: 'jewelry-3d-printer', image: '/products/jewelry-printer.jpg', desc: 'Ultra-detailed printers for jewelry casting and design' },
      { name: 'Shoe 3d Printer', slug: 'shoe-3d-printer', image: '/products/shoe-printer.jpg', desc: 'Specialized printers for footwear prototypes and molds' },
      { name: 'Wash & Cure Machine', slug: 'wash-cure-machine', image: '/products/wash-cure.jpg', desc: 'Post-processing equipment for resin prints' },
    ],
  },
  'resin': {
    title: 'Resin',
    desc: 'Premium photopolymer resins formulated for 405nm LCD/DLP 3D printers. Available in casting, dental, engineering, rigid, and specialty formulations.',
    image: '/products/resin-washable-1kg.jpg',
    subCategories: [
      { name: 'Casting Resin Series', slug: 'casting-resin-series', image: '/products/casting-resin.jpg', desc: 'Low-ash content resin for jewelry and metal casting' },
      { name: 'Dental Resin Series', slug: 'dental-resin-series', image: '/products/dental-resin.jpg', desc: 'Biocompatible resin for dental models and aligners' },
      { name: 'Engineering Resin Series', slug: 'engineering-resin-series', image: '/products/resin-washable-1kg.jpg', desc: 'High-strength resin for functional prototypes' },
      { name: 'Rigid Resin Series', slug: 'rigid-resin-series', image: '/products/rigid-resin.jpg', desc: 'Stiff, durable resin for engineering applications' },
      { name: 'Other Resin Series', slug: 'other-resin-series', image: '/products/casting-resin.jpg', desc: 'Specialty resins for unique applications' },
    ],
  },
  'accessories': {
    title: 'Accessories',
    desc: 'Essential parts and consumables for your 3D printing workflow. LCD screens, release films, resin vats, and maintenance tools.',
    image: '/products/lcd-screen.jpg',
    subCategories: [
      { name: '3d Printer Mono LCD', slug: '3d-printer-mono-lcd', image: '/products/lcd-screen.jpg', desc: 'Replacement monochrome LCD screens' },
      { name: 'ACF/PFA Films', slug: 'acf-pfa-films', image: '/products/fep-film.jpg', desc: 'High-quality release films for resin printing' },
    ],
  },
};

// Fallback products for each category
const subCategoryProducts: Record<string, { name: string; image: string; slug: string; price: string }[]> = {
  'dental-3d-printer': [
    { name: 'Dental Stellar D100', image: '/products/dental-printer.jpg', slug: 'dental-printer', price: '$1,299.99' },
  ],
  'industrial-3d-printer': [
    { name: 'CS3D ProLite M4K', image: '/products/printer-main.jpg', slug: 'prolite-m4k', price: '$299.99' },
    { name: 'Industrial Nova X1', image: '/products/industrial-printer.jpg', slug: 'industrial-nova-x1', price: '$2,499.99' },
  ],
  'jewelry-3d-printer': [
    { name: 'Jewelry Craft G2', image: '/products/jewelry-printer.jpg', slug: 'jewelry-craft-g2', price: '$599.99' },
  ],
  'shoe-3d-printer': [
    { name: 'Shoe Sole Printer S3', image: '/products/shoe-printer.jpg', slug: 'shoe-sole-printer', price: '$899.99' },
  ],
  'wash-cure-machine': [
    { name: 'Wash & Cure Station', image: '/products/wash-cure.jpg', slug: 'wash-cure-station', price: '$149.99' },
  ],
  'casting-resin-series': [
    { name: 'Casting Resin Gold', image: '/products/casting-resin.jpg', slug: 'casting-resin-gold', price: '$32.99' },
  ],
  'dental-resin-series': [
    { name: 'Dental Resin Clear', image: '/products/dental-resin.jpg', slug: 'dental-resin-clear', price: '$45.99' },
  ],
  'engineering-resin-series': [
    { name: 'Washable Resin Premium', image: '/products/resin-washable-1kg.jpg', slug: 'washable-resin-premium', price: '$25.99' },
  ],
  'rigid-resin-series': [
    { name: 'Rigid Resin Black', image: '/products/rigid-resin.jpg', slug: 'rigid-resin-black', price: '$28.99' },
  ],
  'other-resin-series': [
    { name: 'Casting Resin Gold', image: '/products/casting-resin.jpg', slug: 'casting-resin-gold', price: '$32.99' },
  ],
  '3d-printer-mono-lcd': [
    { name: 'Mono LCD Screen 6"', image: '/products/lcd-screen.jpg', slug: 'mono-lcd-screen-6inch', price: '$89.99' },
  ],
  'acf-pfa-films': [
    { name: 'ACF/PFA Film Pack', image: '/products/fep-film.jpg', slug: 'acf-film-pack', price: '$19.99' },
  ],
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = categoryData[slug || ''];

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Link to="/" className="text-red-500 hover:underline">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-500 mb-6">
        <Link to="/" className="hover:text-neutral-900">Home</Link>
        <ChevronRight className="w-3 h-3 inline mx-1" />
        <span className="text-neutral-900 font-medium">{data.title}</span>
      </nav>

      {/* Category Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-12 aspect-[21/9]">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="p-8 lg:p-12 max-w-xl">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3">{data.title}</h1>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed">{data.desc}</p>
          </div>
        </div>
      </div>

      {/* Sub-categories Grid */}
      <h2 className="text-2xl font-bold mb-6">Browse by Sub-category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
        {data.subCategories.map((sub) => (
          <Link
            key={sub.slug}
            to={`/products?category=${sub.slug}`}
            className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square bg-neutral-50 overflow-hidden">
              <img src={sub.image} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-red-500 transition-colors">{sub.name}</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">{sub.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Products by Sub-category */}
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      {data.subCategories.map((sub) => {
        const products = subCategoryProducts[sub.slug] || [];
        if (products.length === 0) return null;
        return (
          <div key={sub.slug} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{sub.name}</h3>
              <Link to={`/products?category=${sub.slug}`} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  to={`/product/${product.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-neutral-50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-neutral-900">{product.name}</h4>
                    <p className="text-sm font-semibold text-red-500 mt-1">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
