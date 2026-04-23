import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalCount, totalPrice } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 mb-4">Your cart is empty</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white border border-neutral-200 rounded-xl p-4">
                <img src={item.productImage} alt={item.productName} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{item.productName}</h3>
                  {item.variantLabel && <p className="text-xs text-neutral-500 mb-2">{item.variantLabel}</p>}
                  <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border border-neutral-300 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-neutral-100"><Minus className="w-3 h-3" /></button>
                    <span className="px-2 text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-neutral-100"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-neutral-50 rounded-xl p-6 sticky top-24">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-neutral-500">Subtotal ({totalCount} items)</span><span className="font-medium">${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span className="text-green-600">Calculated at checkout</span></div>
              </div>
              <div className="border-t border-neutral-200 pt-4 mb-6">
                <div className="flex justify-between font-bold"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
              </div>
              <button onClick={() => alert('Checkout coming soon!')} className="w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center text-sm text-neutral-500 mt-3 hover:text-neutral-900">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
