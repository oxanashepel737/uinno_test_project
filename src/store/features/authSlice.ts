import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    clearSession: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
