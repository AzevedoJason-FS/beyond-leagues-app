import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concact(apiSlice.middleware),
    devTools: true
})
