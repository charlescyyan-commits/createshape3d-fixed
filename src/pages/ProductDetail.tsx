import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { Check, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';
import { useCart } from '@/contexts/CartContext';
import DentalPrinter from './DentalPrinter';

function parseJson<T>(str: string | null | undefined, fallback: T): T {
  try { return str ? JSON.parse(str) as T : fallback; } catch { return fallback; }
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  // Special route for dental printer detail page
  if (slug === 'dental-printer' || slug === 'dental-stellar-d100') {
    return <DentalPrinter />;
  }
  
  const { data: product, isLoading } = trpc.product.bySlug.useQuery(slug || '');
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSpecs, setShowSpecs] = useState(false);

  const images = product?.images || [];
  const highlights = parseJson<Array<{icon: string; text: string}>>(product?.highlightsJson, []);
  const features = parseJson<Array<{icon: string; title: string; desc: string}>>(product?.featuresJson, []);
  const stats = parseJson<Array<{value: string; label: string}>>(product?.statsJson, []);
  const specs = parseJson<Array<{title: string; rows: string[][]}>>(product?.specsJson, []);
  const applications = parseJson<Array<{title: string; desc: string; gradient: string}>>(product?.applicationsJson, []);
  const faqs = parseJson<Array<{q: string; a: string}>>(product?.faqsJson, []);
  const compatTags = parseJson<string[]>(product?.compatTagsJson, []);
  const oemPerks = parseJson<string[]>(product?.oemPerksJson, []);

  const sizeOptions = (product?.attributeOptions || []).filter((o: any) => o.attributeType === 'size');
  const colorOptions = (product?.attributeOptions || []).filter((o: any) => o.attributeType === 'color');

  const currentVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    const variants = product.variants as any[];
    if (sizeOptions.length > 1 && colorOptions.length > 0) {
      return variants.find((v: any) => v.sizeOptionId === selectedSize && v.colorOptionId === selectedColor) || variants[0];
    }
    if (sizeOptions.length > 1) return variants.find((v: any) => v.sizeOptionId === selectedSize) || variants[0];
    if (colorOptions.length > 0) return variants.find((v: any) => v.colorOptionId === selectedColor) || variants[0];
    return variants[0];
  }, [product, selectedSize, selectedColor, sizeOptions.length, colorOptions.length]);

  const variantPrice = currentVariant ? parseFloat(String(currentVariant.price)) : parseFloat(String(product?.basePrice || 0));
  const variantCompare = currentVariant?.compareAtPrice ? parseFloat(String(currentVariant.compareAtPrice)) : null;
  const isInStock = (currentVariant?.stockQuantity || 0) > 0;

  const getSizeLabel = (id: number) => sizeOptions.find((o: any) => o.id === id)?.displayName || '';
  const getColorLabel = (id: number) => colorOptions.find((o: any) => o.id === id)?.displayName || '';

  const handleAddToCart = () => {
    if (!product) return;
    if (!isInStock) { toast.error('Out of stock'); return; }
    addItem({ productId: product.id, productName: product.name, productImage: product.mainImage || '', variantId: currentVariant?.id || null, variantLabel: `${getSizeLabel(selectedSize || 0)} ${getColorLabel(selectedColor || 0)}`.trim(), price: variantPrice, quantity });
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-neutral-400">Loading...</div>;
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Product not found</div>;

  const allImages = images.length > 0 ? images : [{ url: product.mainImage || '', alt: product.name, isPrimary: true }];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-neutral-500 mb-6">
        <Link to="/" className="hover:text-neutral-900">Home</Link><span className="mx-2">/</span>
        {product.category && <><Link to={`/products?category=${product.category.slug}`} className="hover:text-neutral-900">{product.category.name}</Link><span className="mx-2">/</span></>}
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      {/* Main Product */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Gallery - Left vertical thumbnails + Right main image */}
        <div className="flex gap-3">
          {/* Vertical thumbnails on left */}
          <div className="flex flex-col gap-2 w-20 flex-shrink-0">
            {allImages.map((img: any, i: number) => (
              <button
                key={i}
                onMouseEnter={() => setActiveImage(i)}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === i ? 'border-neutral-900 ring-2 ring-neutral-900/20' : 'border-neutral-200 hover:border-neutral-400'}`}
              >
                <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main image on right */}
          <div className="flex-1 bg-neutral-50 rounded-xl overflow-hidden">
            <img
              src={allImages[activeImage]?.url || product.mainImage || ''}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          {product.tagline && <p className="text-xs font-semibold tracking-widest text-neutral-500 mb-2">{product.tagline}</p>}
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-neutral-500 mb-4">{product.subtitle}</p>

          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {highlights.map((h, i) => (<span key={i} className="inline-flex items-center gap-1 text-xs bg-neutral-100 px-3 py-1.5 rounded-full"><Check className="w-3 h-3" /> {h.text}</span>))}
            </div>
          )}

          {sizeOptions.length > 1 && (
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2 block">Size: {getSizeLabel(selectedSize || sizeOptions[0]?.id || 0)}</label>
              <div className="flex gap-2">
                {sizeOptions.map((opt: any) => (
                  <button key={opt.id} onClick={() => setSelectedSize(opt.id)} className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${selectedSize === opt.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-400'}`}>{opt.displayName}</button>
                ))}
              </div>
            </div>
          )}

          {colorOptions.length > 0 && (
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2 block">Color: {getColorLabel(selectedColor || colorOptions[0]?.id || 0)}</label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((opt: any) => (
                  <button key={opt.id} onClick={() => setSelectedColor(opt.id)} className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === opt.id ? 'border-neutral-900 scale-110 shadow-md' : 'border-neutral-300'}`} style={{ background: opt.hexCode || '#ccc' }} title={opt.displayName} />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold">${variantPrice.toFixed(2)}</span>
            {variantCompare && <span className="text-lg text-neutral-400 line-through">${variantCompare.toFixed(2)}</span>}
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex items-center border border-neutral-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-100"><Minus className="w-4 h-4" /></button>
              <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-100"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={handleAddToCart} disabled={!isInStock} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50">
              <ShoppingCart className="w-4 h-4" /> {isInStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <button onClick={() => setShowSpecs(!showSpecs)} className="w-full text-sm font-medium text-neutral-600 border border-neutral-300 rounded-lg py-3 hover:bg-neutral-50 transition-colors mb-4">
            {showSpecs ? 'Hide' : 'View'} Specifications
          </button>
          <p className="text-xs text-neutral-400">{product.shortDesc}</p>
        </div>
      </div>

      {showSpecs && specs.length > 0 && (
        <div className="mb-16 bg-neutral-50 rounded-xl p-6 lg:p-8">
          <h2 className="text-xl font-bold mb-6">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {specs.map((spec, i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm mb-3">{spec.title}</h3>
                <table className="w-full text-sm"><tbody>{spec.rows.map(([k, v]: string[], j: number) => (<tr key={j} className="border-b border-neutral-200"><td className="py-2 text-neutral-500 w-1/2">{k}</td><td className="py-2 font-medium">{v}</td></tr>))}</tbody></table>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (<div key={i} className="bg-neutral-50 rounded-xl p-6 text-center"><p className="text-2xl font-bold mb-1">{s.value}</p><p className="text-xs text-neutral-500">{s.label}</p></div>))}
          </div>
        </div>
      )}

      {features.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">Why Choose {product.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center mb-3"><Check className="w-5 h-5 text-neutral-700" /></div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {applications.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">Applications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {applications.map((a, i) => (<div key={i} className="rounded-xl p-6 text-white" style={{ background: a.gradient }}><h3 className="font-bold text-lg mb-2">{a.title}</h3><p className="text-sm text-white/80 leading-relaxed">{a.desc}</p></div>))}
          </div>
        </div>
      )}

      {compatTags.length > 0 && (
        <div className="mb-16 text-center">
          <h2 className="text-xl font-bold mb-6">Compatible With</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {compatTags.map((tag, i) => (<span key={i} className="text-xs bg-neutral-100 px-4 py-2 rounded-full">{tag}</span>))}
          </div>
        </div>
      )}

      {faqs.length > 0 && (
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-neutral-200 rounded-lg">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-medium">{faq.q}</span>
                  <Plus className={`w-4 h-4 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-4 text-sm text-neutral-500 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {product.oemTitle && (
        <div className="mb-16 bg-neutral-50 rounded-xl p-6 lg:p-8">
          <h2 className="text-xl font-bold mb-2">{product.oemTitle}</h2>
          <p className="text-sm text-neutral-500 mb-6">{product.oemDesc}</p>
          {oemPerks.length > 0 && <ul className="space-y-2 mb-6">{oemPerks.map((perk, i) => (<li key={i} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-green-600" />{perk}</li>))}</ul>}
          <Link to="/inquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">Request OEM/ODM Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      )}

      {product.ctaTitle && (
        <div className="bg-neutral-900 rounded-2xl p-8 lg:p-12 text-center text-white mb-16">
          <h2 className="text-2xl font-bold mb-3">{product.ctaTitle}</h2>
          <p className="text-neutral-400 mb-6 max-w-lg mx-auto">{product.ctaDesc}</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 text-sm font-semibold rounded-lg hover:bg-neutral-100 transition-colors">{product.ctaBtn || 'Shop Now'} <ArrowRight className="w-4 h-4" /></Link>
        </div>
      )}
    </div>
  );
}
