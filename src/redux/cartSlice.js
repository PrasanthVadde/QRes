import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existedItem = state.cart.find(item => item.id === action.payload.id);
      if (!existedItem) {
        state.cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        alert("Item already in cart!");
      }
    },
    incrementItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decrementItem: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
