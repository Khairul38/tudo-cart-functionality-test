import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  totalItem: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action) => {
      const { id, title, price, totalQuantity } = action.payload;
      const sameProduct = state.cartProducts.find(
        (product) => product.id === id
      );
      if (!sameProduct) {
        state.cartProducts.push({
          id,
          title,
          price,
          totalQuantity: totalQuantity - 1,
          quantity: 1,
        });

        state.totalItem = state.totalItem + 1;
        state.totalPrice = state.totalPrice + price;
      } else {
        const updatedProducts = state.cartProducts.map((product) => {
          if (product.id === id) {
            return {
              id,
              title,
              price,
              totalQuantity: totalQuantity - 1,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        });

        state.cartProducts = [...updatedProducts];
        state.totalItem = state.totalItem + 1;
        state.totalPrice = state.totalPrice + price;
      }
    },
    decrement: (state, action) => {
      const { id, title, price } = action.payload;
      const updatedProducts = state.cartProducts.map((product) => {
        if (product.id === id) {
          return {
            id,
            title,
            price,
            totalQuantity: product.totalQuantity + 1,
            quantity: product.quantity - 1,
          };
        } else {
          return product;
        }
      });

      state.cartProducts = [...updatedProducts];
      state.totalItem = state.totalItem - 1;
      state.totalPrice = state.totalPrice - price;
    },
    remove: (state, action) => {
      const { id, price, quantity } = action.payload;
      const filteredProducts = state.cartProducts.filter(
        (product) => product.id !== id
      );

      state.cartProducts = [...filteredProducts];
      state.totalItem = state.totalItem - quantity;
      state.totalPrice = state.totalPrice - price * quantity;
    },
  },
});

export const { increment, decrement, remove } = cartSlice.actions;
export default cartSlice.reducer;
