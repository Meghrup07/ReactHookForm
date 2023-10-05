import { createSlice } from "@reduxjs/toolkit";

type TAuth = {
  token: string | null;
}

const initialState: TAuth = {
  token: localStorage.getItem("token")
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
