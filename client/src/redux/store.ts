import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import cartSlice from "./cartSlice";
import authSlice from "./auth/slice";
import productsApi from "./productsApi";
import ordersApi from "./ordersApi";
import authApi from "./auth/api";
const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : [];

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")!
  : null;

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  preloadedState: {
    cart: cart ? { ...cart } : {},
    auth: {
      token: token || null,
      isAuthenticated: !!token,
      isAdmin: user?.role === "admin",
      user: user,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      authApi.middleware,
      ordersApi.middleware
    ),
  devTools: true,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
