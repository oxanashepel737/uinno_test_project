import {
  configureStore,
  isRejectedWithValue,
  MiddlewareAPI,
  Middleware,
} from "@reduxjs/toolkit";
import { authApiService } from "./services/authQuery.ts";
import authSlice from "./features/authSlice.ts";
import toastSlice, { showToast } from "./features/toastSlice.ts";
import { postsApiService } from "./services/postsQuery.ts";
import { usersApiService } from "./services/usersQuery.ts";

type ApiErrorPayload = {
  data: {
    errors: { message: string }[];
  };
};

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
      api.dispatch(
        showToast({
          type: "error",
          text:
            "data" in (action.payload as ApiErrorPayload)
              ? (action.payload as ApiErrorPayload)?.data?.errors
                  ?.map((e) => e.message)
                  ?.join("\n") || "Unknown error"
              : String(action.error.message),
        }),
      );
    }

    return next(action);
  };
export const store = configureStore({
  reducer: {
    [authApiService.reducerPath]: authApiService.reducer,
    [postsApiService.reducerPath]: postsApiService.reducer,
    [usersApiService.reducerPath]: usersApiService.reducer,
    authState: authSlice,
    toastState: toastSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApiService.middleware,
      postsApiService.middleware,
      usersApiService.middleware,
      rtkQueryErrorLogger,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
