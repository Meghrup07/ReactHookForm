import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token")

const initialAuthState = { isAuthenicated: token ? true : false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenicated = true;
    },
    logout(state) {
      state.isAuthenicated = false;
      localStorage.removeItem("token");
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
