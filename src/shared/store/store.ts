import { configureStore } from "@reduxjs/toolkit";
import authRducer from "./slice/auth";
import { userApi } from "./api/api";
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from "./api/loginApi";

export const store = configureStore({
  reducer: { auth: authRducer, [userApi.reducerPath]: userApi.reducer, [authApi.reducerPath]: authApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, authApi.middleware]),
});

setupListeners(store.dispatch)


