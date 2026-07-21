import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  try {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    return [];
  }
};

const getInitialShipping = () => {
  try {
    const address = localStorage.getItem('shippingAddress');
    return address ? JSON.parse(address) : { fullName: '', address: '', city: '', postalCode: '', country: '', phone: '' };
  } catch (error) {
    return { fullName: '', address: '', city: '', postalCode: '', country: '', phone: '' };
  }
};

const initialState = {
  cartItems: getInitialCart(),
  shippingAddress: getInitialShipping(),
};

// Math rounding helper
const addDecimals = (num) => {
  return Math.round(num * 100) / 100;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // { product: id, name, price, image, qty, size, color, currentStock }
      
      // Match on product ID AND size/color parameters to distinguish item variants
      const existItem = state.cartItems.find(
        (x) => x.product === item.product && x.size === item.size && x.color === item.color
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === item.product && x.size === item.size && x.color === item.color
            ? { ...x, qty: Math.min(x.qty + item.qty, item.currentStock || 99) }
            : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const item = action.payload; // { product, size, color }
      state.cartItems = state.cartItems.filter(
        (x) => !(x.product === item.product && x.size === item.size && x.color === item.color)
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCartQty: (state, action) => {
      const { product, size, color, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        x.product === product && x.size === size && x.color === color
          ? { ...x, qty }
          : x
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQty,
  saveShippingAddress,
  clearCart,
} = cartSlice.actions;

// Selector functions for convenient pricing calculations
export const selectCartSubtotal = (state) => {
  return addDecimals(state.cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
};

export const selectCartTax = (state) => {
  return addDecimals(selectCartSubtotal(state) * 0.08); // 8% tax
};

export const selectCartShipping = (state) => {
  // Free shipping over $150
  return selectCartSubtotal(state) > 150 ? 0 : 15;
};

export const selectCartTotal = (state) => {
  return addDecimals(
    selectCartSubtotal(state) + selectCartTax(state) + selectCartShipping(state)
  );
};

export default cartSlice.reducer;
