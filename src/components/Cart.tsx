import { X, ShoppingCart, Trash2, Minus, Plus, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, updateQuantity, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckoutWhatsApp = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const price = parseInt(item.product.price.replace(/[^0-9]/g, ""));
      return sum + (price * item.quantity);
    }, 0);
    const discount = subtotal > 2000 ? subtotal * 0.1 : 0;
    const total = subtotal - discount;
    
    let message = `*🛒 NEW ORDER - Calicut Store*\n\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   Qty: ${item.quantity} x ${item.product.price}\n`;
      message += `   Link: ${item.product.productUrl}\n\n`;
    });
    message += `*Subtotal:* \u20B9${subtotal.toFixed(2)}\n`;
    if (discount > 0) message += `*Discount (10%):* -\u20B9${discount.toFixed(2)}\n`;
    message += `*Total Amount:* \u20B9${total.toFixed(2)}\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full pb-24 md:pb-8 min-h-screen bg-gray-50 animate-fade-in pt-6 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[var(--color-primary)]">
             <ShoppingCart size={20} />
          </div>
          Your Cart
        </h2>
        {cartCount > 0 && <span className="bg-indigo-100 text-[var(--color-primary)] text-sm font-bold px-3 py-1 rounded-full">{cartCount} items</span>}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4 border border-[var(--color-outline)] shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Your cart is empty</h3>
              <p className="text-gray-500 max-w-[250px] mb-8">Looks like you haven't added any premium products yet.</p>
              <button 
                onClick={() => navigate('/store')}
                className="mt-4 px-8 py-3.5 bg-[var(--color-primary)] text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25 active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-4 md:p-6 border border-[var(--color-outline)] shadow-sm space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 border border-[var(--color-outline)] rounded-2xl bg-gray-50/50 hover:bg-white transition-colors group">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-white shrink-0 border border-[var(--color-outline)]">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 leading-tight">{item.product.name}</h4>
                      <button 
                        onClick={() => updateQuantity(item.product.id, -item.quantity)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow active:scale-95 border border-[var(--color-outline)] shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-4">
                      <span className="text-lg md:text-xl font-extrabold text-emerald-600">{item.product.price}</span>
                      <div className="flex items-center gap-4 bg-white rounded-xl p-1.5 border border-[var(--color-outline)] shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors active:scale-95"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-base font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-indigo-700 rounded-lg shadow-sm transition-colors active:scale-95"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full lg:w-96">
            <div className="bg-white border border-[var(--color-outline)] rounded-3xl p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4">
                {(() => {
                  const subtotal = cartItems.reduce((sum, item) => sum + (parseInt(item.product.price.replace(/[^0-9]/g, "")) * item.quantity), 0);
                  const discount = subtotal > 2000 ? subtotal * 0.1 : 0;
                  const total = subtotal - discount;
                  
                  return (
                    <>
                      <div className="flex justify-between text-base text-[var(--color-on-surface-variant)]">
                        <span>Subtotal</span>
                        <span className="font-bold text-gray-900">\u20B9{subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-base text-emerald-600 font-bold bg-emerald-50 p-3 rounded-xl items-center border border-emerald-100">
                          <div className="flex items-center gap-2"><Tag size={16}/> 10% Discount applied</div>
                          <span>-\u20B9{discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base text-[var(--color-on-surface-variant)]">
                        <span>Delivery Option</span>
                        <span className="text-emerald-600 font-bold">Free</span>
                      </div>
                      <div className="pt-5 border-t border-[var(--color-outline)] flex justify-between items-end">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <div className="text-right">
                          <span className="text-3xl font-extrabold text-gray-900 block">\u20B9{total.toFixed(2)}</span>
                          <span className="text-xs text-gray-500 font-medium">Including taxes</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              
              <button 
                onClick={handleCheckoutWhatsApp}
                className="w-full mt-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-lg active:scale-[0.98]"
              >
                Checkout Details
              </button>
              <p className="text-sm font-medium text-center text-gray-500 mt-4 flex items-center justify-center gap-1.5 bg-gray-50 py-2 rounded-lg">
                Proceeding transfers details to WhatsApp
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
