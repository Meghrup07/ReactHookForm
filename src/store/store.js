import { configureStore } from "@reduxjs/toolkit";
import authRducer from "./auth";

const store = configureStore({
  reducer: { auth: authRducer },
});

export default store;
