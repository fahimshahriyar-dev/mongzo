"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the load user
const initializeApp = async () => {
  // refresh token
  await store.dispatch(apiSlice.endpoints.refreshToken.initiate(undefined, { forceRefetch: true }));
  // load user (after refresh)
  await store.dispatch(apiSlice.endpoints.loadUser.initiate(undefined, { forceRefetch: true }));
};

// only run in the browser (skip during server prerender)
if (typeof window !== "undefined") {
  initializeApp();
}
