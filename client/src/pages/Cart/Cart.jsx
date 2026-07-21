import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';
import {
  removeFromCart,
  updateCartQty,
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartTotal,
} from '../../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleQtyChange = (item, newQty) => {
    if (newQty <= 0) {
      dispatch(removeFromCart({ product: item.product, size: item.size, color: item.color }));
    } else {
      dispatch(updateCartQty({
        product: item.product,
        size: item.size,
        color: item.color,
        qty: Math.min(newQty, item.currentStock || 99)
      }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ product: item.product, size: item.size, color: item.color }));
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'LUXURY') {
      setPromoApplied(true);
    }
  };

  const discountedTotal = promoApplied ? total * 0.9 : total; // 10% off

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-display">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-dark-bg">Your shopping cart is empty</h2>
        <p className="text-gray-500 mt-2 text-sm">Add bespoke pieces to make it Yours.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 bg-gold hover:bg-gold-hover text-dark-bg font-semibold px-6 py-3 rounded-lg shadow-md transition-colors text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-dark-bg selection:bg-gold selection:text-dark-bg font-display py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-serif mb-8 text-dark-bg">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Column */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, idx) => (
              <div
                key={`${item.product}-${item.size}-${item.color}-${idx}`}
                className="flex flex-col sm:flex-row gap-5 border border-gray-100 p-5 rounded-xl bg-white hover:shadow-xs transition-shadow relative"
              >
                {/* Product image */}
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
                  alt={item.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-100"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest text-brand-red font-bold uppercase block">
                      {item.category === 'Shoes' ? 'PERFORMANCE FOOTWEAR' : 'PREMIUM LINENS'}
                    </span>
                    <h3 className="text-base font-bold text-dark-bg mt-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 font-medium">
                      {item.size ? `Size: ${item.size}` : ''} {item.color ? `| Color: ${item.color}` : ''}
                    </p>
                  </div>

                  {/* Quantity selector controls */}
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => handleQtyChange(item, item.qty - 1)}
                        className="px-3 py-1.5 text-gray-500 hover:text-dark-bg cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold select-none">{item.qty}</span>
                      <button
                        onClick={() => handleQtyChange(item, item.qty + 1)}
                        className="px-3 py-1.5 text-gray-500 hover:text-dark-bg cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-400 hover:text-brand-red font-semibold text-xs flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price block */}
                <div className="text-right shrink-0 flex sm:flex-col justify-between sm:justify-start items-center sm:items-end mt-4 sm:mt-0">
                  <span className="text-base font-bold text-dark-bg">
                    Ksh {(item.price * item.qty * (item.price < 1000 ? 100 : 1)).toLocaleString()}
                  </span>
                  {item.qty > 1 && (
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      Ksh {(item.price * (item.price < 1000 ? 100 : 1)).toLocaleString()} each
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Promo Code section */}
            <form onSubmit={applyPromo} className="flex gap-3 pt-4">
              <input
                type="text"
                placeholder="Promo Code (e.g. LUXURY)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-gold w-64 uppercase"
              />
              <button
                type="submit"
                className="border border-dark-bg hover:bg-dark-bg hover:text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Apply Code
              </button>
            </form>
            {promoApplied && (
              <p className="text-xs text-emerald-600 font-semibold mt-1.5">
                ✓ 10% LUXURY discount applied successfully!
              </p>
            )}
          </div>

          {/* Summary Box */}
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl space-y-6 h-fit">
            <h3 className="font-bold text-lg border-b border-gray-200 pb-4">Order Summary</h3>

            <div className="space-y-3 text-xs font-semibold text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-dark-bg">Ksh {(subtotal * 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-dark-bg">
                  {shipping === 0 ? 'FREE' : `Ksh ${(shipping * 100).toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-dark-bg">Ksh {(tax * 100).toLocaleString()}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Promo Code (10% Off)</span>
                  <span>-Ksh {(total * 10).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-dark-bg pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>Ksh {(discountedTotal * 100).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Proceed to Checkout →
            </button>

            <div className="pt-4 border-t border-gray-200 space-y-3 text-[10px] text-gray-400">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gold" />
                <span>Secure Payments Secured by Stripe & M-Pesa</span>
              </div>
              <div>
                <span>Standard Delivery arrives in 3-5 business days.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
