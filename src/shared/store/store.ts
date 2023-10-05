import { configureStore } from "@reduxjs/toolkit";
import authRducer from "./slice/auth";
import { userApi } from "./api/api";
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from "./api/loginApi";
import { memberApi } from "./api/member";

export const store = configureStore({
  reducer: {
    auth: authRducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, authApi.middleware, memberApi.middleware]),
});

setupListeners(store.dispatch)


