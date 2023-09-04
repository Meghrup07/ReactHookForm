import { configureStore } from "@reduxjs/toolkit";
import authRducer from "./auth";
import { userApi } from "./api/api";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: { auth: authRducer, [userApi.reducerPath]: userApi.reducer },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch)


