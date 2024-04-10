import {
  configureStore,
  isRejectedWithValue,
  MiddlewareAPI,
  Middleware,
} from "@reduxjs/toolkit";
import type {} from "@reduxjs/toolkit";
import { authApiService } from "./services/authQuery.ts";
import authSlice from "./features/authSlice.ts";
import toastSlice, { showToast } from "./features/toastSlice.ts";

interface IApiErrorPayload {
  data: {
    errors: { message: string }[];
  };
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
      api.dispatch(
        showToast({
          type: "error",
          text:
            "data" in (action.payload as IApiErrorPayload)
              ? (action.payload as IApiErrorPayload).data.errors
                  .map((e) => e.message)
                  .join("\n")
              : String(action.error.message),
        }),
      );
    }

    return next(action);
  };
export const store = configureStore({
  reducer: {
    [authApiService.reducerPath]: authApiService.reducer,
    authState: authSlice,
    toastState: toastSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApiService.middleware,
      rtkQueryErrorLogger,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
