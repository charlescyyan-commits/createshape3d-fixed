import { Link } from 'react-router';

const printProducts = [
  { id: 1, name: 'Precision Aligner', image: '/products/print-sample-1.jpg', category: 'Dental' },
  { id: 2, name: 'Miniature Figure', image: '/products/print-sample-2.jpg', category: 'Miniatures' },
  { id: 3, name: 'Jewelry Casting', image: '/products/print-sample-3.jpg', category: 'Jewelry' },
  { id: 4, name: 'Engineering Part', image: '/products/print-sample-4.jpg', category: 'Prototypes' },
  { id: 5, name: 'Dental Model', image: '/products/dental-resin.jpg', category: 'Dental' },
  { id: 6, name: 'Resin Art Print', image: '/products/resin-washable-1kg.jpg', category: 'Art' },
  { id: 7, name: 'Industrial Mold', image: '/products/industrial-printer.jpg', category: 'Industrial' },
  { id: 8, name: 'Shoe Prototype', image: '/products/shoe-printer.jpg', category: 'Footwear' },
];

export default function PrintGallery() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Print Gallery</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {printProducts.map((item) => (
            <Link
              key={item.id}
              to="/products"
              className="group relative bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Hover overlay with info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white/70 uppercase tracking-wider">{item.category}</span>
                <p className="text-sm font-semibold text-white mt-0.5">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
