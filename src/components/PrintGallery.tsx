import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const galleryItems = [
  { id: 1, name: 'Dental Aligner', image: '/products/print-sample-1.jpg', category: 'Dental' },
  { id: 2, name: 'Miniature Figure', image: '/products/print-sample-2.jpg', category: 'Miniatures' },
  { id: 3, name: 'Jewelry Casting', image: '/products/print-sample-3.jpg', category: 'Jewelry' },
  { id: 4, name: 'Engineering Part', image: '/products/print-sample-4.jpg', category: 'Prototypes' },
  { id: 5, name: 'Dental Model', image: '/products/dental-resin.jpg', category: 'Dental' },
  { id: 6, name: 'Resin Art Print', image: '/products/resin-washable-1kg.jpg', category: 'Art' },
  { id: 7, name: 'Industrial Mold', image: '/products/industrial-printer.jpg', category: 'Industrial' },
  { id: 8, name: 'Shoe Prototype', image: '/products/shoe-printer.jpg', category: 'Footwear' },
];

export default function PrintGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % galleryItems.length);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Print Gallery</h2>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow text-left cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white/70 uppercase tracking-wider">{item.category}</span>
                <p className="text-sm font-semibold text-white">{item.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main image - enlarged */}
          <div
            className="max-w-[85vw] max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[lightboxIndex].image}
              alt={galleryItems[lightboxIndex].name}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="text-[11px] text-white/60 uppercase tracking-wider">{galleryItems[lightboxIndex].category}</span>
              <p className="text-lg font-semibold text-white">{galleryItems[lightboxIndex].name}</p>
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full px-4 pb-2">
              {galleryItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${i === lightboxIndex ? 'border-white' : 'border-white/30 hover:border-white/60'}`}
                >
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
