import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../types";

interface ICartState {
  items: ICartItem[];
  itemsQty: number;
  total: 0;
}

const initialState: ICartState = {
  items: [],
  itemsQty: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: { payload: { item: ICartItem; quantity: number } }) {
      const existItem = state.items.find(
        (item) => item.product === action.payload.item.product
      );
      if (existItem) {
        existItem.qty += action.payload.item.qty;
      } else {
        state.items.push(action.payload.item);
      }

      state.itemsQty += action.payload.item.qty;
      state.total += action.payload.item.price * action.payload.item.qty;

      localStorage.setItem("cart", JSON.stringify({ ...state }));
    },

    removeItem(state, action: { payload: string }) {
      const item = state.items.find((item) => item.product === action.payload);
      state.items = state.items.filter(
        (item) => item.product !== action.payload
      );
      state.itemsQty -= item!.qty;
      state.total -= item!.price;

      localStorage.setItem("cart", JSON.stringify({ ...state }));
    },

    clearCart(state) {
      state.items = [];
      state.itemsQty = 0;
      state.total = 0;

      localStorage.setItem("cart", JSON.stringify({ ...state }));
    },

    incrementQuantity(state, action: { payload: string }) {
      const item = state.items.find((item) => item.product === action.payload);
      item!.qty++;
      state.itemsQty++;
      state.total += item!.price;

      localStorage.setItem("cart", JSON.stringify({ ...state }));
    },

    decrementQuantity(state, action: { payload: string }) {
      const item = state.items.find((item) => item.product === action.payload);
      if (item!.qty > 1) {
        item!.qty--;
      } else {
        state.items = state.items.filter(
          (item) => item.product !== action.payload
        );
      }
      state.itemsQty--;
      state.total -= item!.price;

      localStorage.setItem("cart", JSON.stringify({ ...state }));
    },
  },
});
export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
