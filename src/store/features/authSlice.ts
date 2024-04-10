import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenStructure } from "../../types";
import { getToken } from "../localStorage.ts";

interface IAuthState {
  accessToken: string | null;
  tokenStructure: ITokenStructure | null;
}

const accessToken = getToken();

const initialState: IAuthState = {
  accessToken,
  tokenStructure: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<IAuthState>) => {
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
