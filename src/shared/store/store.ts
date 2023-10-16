import { configureStore } from "@reduxjs/toolkit";
import authRducer from "./slice/auth";
import { userApi } from "./api/api";
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from "./api/loginApi";
import { memberApi } from "./api/member";
import { galleryApi } from "./api/gallery";

export const store = configureStore({
  reducer: {
    auth: authRducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, authApi.middleware, memberApi.middleware, galleryApi.middleware]),
});

setupListeners(store.dispatch)


