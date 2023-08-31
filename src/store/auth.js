import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenicated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenicated = true;
    },
    logout(state) {
      state.isAuthenicated = false;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
