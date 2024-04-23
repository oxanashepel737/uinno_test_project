import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenStructure } from "../../types";
import { getToken } from "../localStorage.ts";

type AuthState = {
  accessToken: string | null;
  tokenStructure: TokenStructure | null;
};

const accessToken = getToken();

const initialState: AuthState = {
  accessToken,
  tokenStructure: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.tokenStructure = action.payload.tokenStructure;
    },
    clearSession: (state) => {
      state.accessToken = null;
      state.tokenStructure = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
