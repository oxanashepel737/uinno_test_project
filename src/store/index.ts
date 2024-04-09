import { configureStore } from "@reduxjs/toolkit";
import { authApiService } from "./services/authQuery.ts";
import authSlice from "./features/authSlice.ts";

export const store = configureStore({
  reducer: {
    [authApiService.reducerPath]: authApiService.reducer,
    authState: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApiService.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
