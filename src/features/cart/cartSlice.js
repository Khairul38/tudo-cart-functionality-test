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
    stateUpdate: (state, action) => {
      const { cartProducts, totalItem, totalPrice } = action.payload;
      state.cartProducts = cartProducts;
      state.totalItem = totalItem;
      state.totalPrice = totalPrice;
    },
    increment: (state, action) => {
      const { id, title, price, totalQuantity, moq } = action.payload;
      const sameProduct = state.cartProducts.find(
        (product) => product.id === id
      );
      if (!sameProduct) {
        state.cartProducts.push({
          id,
          title,
          price,
          totalQuantity: totalQuantity - moq,
          quantity: moq,
          moq,
        });

        state.totalItem = state.totalItem + moq;
        const moqPrice = price * moq;
        state.totalPrice = state.totalPrice + moqPrice;
        localStorage.setItem("stateData", JSON.stringify(state));
      } else {
        const updatedProducts = state.cartProducts.map((product) => {
          if (product.id === id) {
            return {
              id,
              title,
              price,
              totalQuantity: totalQuantity - 1,
              quantity: product.quantity + 1,
              moq,
            };
          } else {
            return product;
          }
        });

        state.cartProducts = [...updatedProducts];
        state.totalItem = state.totalItem + 1;
        state.totalPrice = state.totalPrice + price;
        localStorage.setItem("stateData", JSON.stringify(state));
      }
    },
    decrement: (state, action) => {
      const { id, title, price, moq } = action.payload;
      const updatedProducts = state.cartProducts.map((product) => {
        if (product.id === id) {
          return {
            id,
            title,
            price,
            totalQuantity: product.totalQuantity + 1,
            quantity: product.quantity - 1,
            moq,
          };
        } else {
          return product;
        }
      });

      state.cartProducts = [...updatedProducts];
      state.totalItem = state.totalItem - 1;
      state.totalPrice = state.totalPrice - price;
      localStorage.setItem("stateData", JSON.stringify(state));
    },
    remove: (state, action) => {
      const { id, price, quantity } = action.payload;
      const filteredProducts = state.cartProducts.filter(
        (product) => product.id !== id
      );

      state.cartProducts = [...filteredProducts];
      state.totalItem = state.totalItem - quantity;
      state.totalPrice = state.totalPrice - price * quantity;
      localStorage.setItem("stateData", JSON.stringify(state));
    },
  },
});

export const { stateUpdate, increment, decrement, remove } = cartSlice.actions;
export default cartSlice.reducer;
