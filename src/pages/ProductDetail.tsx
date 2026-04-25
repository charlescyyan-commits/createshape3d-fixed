import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, FileText, Mail, ExternalLink } from 'lucide-react';
import { useProduct } from '@/hooks/useWPQueries';
import { formatWooPrice } from '@/lib/wp-client';
import { Helmet } from 'react-helmet-async';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useProduct(slug || '');

  if (isLoading) return <div className="text-center py-20 text-neutral-400">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-neutral-400">Product not found</div>;

  const images = product.images?.length ? product.images.map((img: any) => img.src) : ['/placeholder-product.jpg'];
  const priceInfo = formatWooPrice(product);
  const isInStock = product.stock_status === 'instock';
  const addToCartUrl = `${product.permalink}?add-to-cart=${product.id}&quantity=${quantity}`;

  const metaDesc = product.short_description?.replace(/<[^>]*>/g, '').slice(0, 160) || '';

  return (
    <>
      <Helmet>
        <title>{product.name} | CreateShape3D</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={product.permalink} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> All Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square bg-neutral-50 rounded-xl overflow-hidden mb-4">
              <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === i ? 'border-blue-500' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-neutral-400 mb-2">{product.categories?.map((c: any) => c.name).join(' / ') || 'Product'}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price: price_html first */}
            <div className="flex items-baseline gap-3 mb-6">
              {product.prices?.price_html ? (
                <span dangerouslySetInnerHTML={{ __html: product.prices.price_html }} />
              ) : (
                <>
                  <span className="text-3xl font-bold">{priceInfo.currencySymbol}{priceInfo.price}</span>
                  {priceInfo.regularPrice && (
                    <span className="text-lg text-neutral-400 line-through">{priceInfo.currencySymbol}{priceInfo.regularPrice}</span>
                  )}
                </>
              )}
            </div>

            {product.short_description && (
              <div className="text-sm text-neutral-600 mb-6" dangerouslySetInnerHTML={{ __html: product.short_description }} />
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center border border-neutral-200 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-50">-</button>
                <span className="px-3 py-2 text-sm w-10 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-50">+</button>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Actions — direct to WooCommerce */}
            <div className="flex gap-3 mb-8">
              <a href={addToCartUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                Add to Cart
              </a>
              <a href={product.permalink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                Buy Now <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {product.sku && <p className="text-sm text-neutral-400 mb-2">SKU: {product.sku}</p>}

            <div className="flex gap-3">
              <Link to={`/inquiry?product=${product.id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                <Mail className="w-4 h-4" /> Inquiry
              </Link>
              <Link to={`/inquiry?type=order&product=${product.id}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                <FileText className="w-4 h-4" /> Bulk Order
              </Link>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mb-16">
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <div className="prose max-w-none text-neutral-600" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
    </>
  );
}
