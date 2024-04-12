import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IToast {
  type: "error" | "success";
  text: string;
}

interface IToastState {
  toast: IToast | null;
}

const initialState: IToastState = {
  toast: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<IToast>) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
