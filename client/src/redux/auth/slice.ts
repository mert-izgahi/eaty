import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface IAuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: IUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: { payload: string }) {
      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload!;
        console.log(action.payload!);
        localStorage.setItem("token", action.payload!);
      }
    },

    setUser(state, action: { payload: IUser | null }) {
      if (action.payload) {
        state.isAdmin = action.payload.role === "admin";
        state.user = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    setIsAuthenticated(state, action: { payload: boolean }) {
      state.isAuthenticated = action.payload;
    },

    setIsAdmin(state, action: { payload: boolean }) {
      state.isAdmin = action.payload;
    }
  },
});

export const { setToken, setUser, setIsAuthenticated, setIsAdmin } = authSlice.actions;
export default authSlice.reducer;
