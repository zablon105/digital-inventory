import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import {
  removeFromCart,
  updateCartQty,
  selectCartSubtotal,
} from '../../redux/cartSlice';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotal = useSelector(selectCartSubtotal);

  if (!isOpen) return null;

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

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-display selection:bg-gold selection:text-dark-bg">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white text-dark-bg shadow-xl flex flex-col h-full animate-slide-in">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              Shopping Bag
              <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, x) => acc + x.qty, 0)}
              </span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-dark-bg transition-colors p-1 rounded-full hover:bg-gray-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Your shopping bag is empty</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-sm font-semibold text-gold hover:underline"
                >
                  Browse our collection
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={`${item.product}-${item.size}-${item.color}-${idx}`}
                  className="flex gap-4 border-b border-gray-50 pb-5"
                >
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] tracking-widest text-gray-400 font-bold uppercase block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-dark-bg truncate mt-0.5">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.size ? `Size: ${item.size}` : ''} {item.color ? `| Color: ${item.color}` : ''}
                    </p>
                    
                    {/* Qty controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => handleQtyChange(item, item.qty - 1)}
                          className="px-2.5 py-1 text-gray-500 hover:text-dark-bg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => handleQtyChange(item, item.qty + 1)}
                          className="px-2.5 py-1 text-gray-500 hover:text-dark-bg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-gray-400 hover:text-brand-red transition-colors cursor-pointer ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold">${(item.price * item.qty).toFixed(2)}</span>
                    {item.qty > 1 && (
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        ${item.price.toFixed(2)} each
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500 font-medium">Subtotal</span>
                <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-semibold py-3.5 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-xs font-medium text-gray-500 hover:text-dark-bg transition-colors mt-4 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
