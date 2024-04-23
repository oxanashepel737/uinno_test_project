import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Toast = {
  type: "error" | "success";
  text: string;
};

type ToastState = {
  toast: Toast | null;
};

const initialState: ToastState = {
  toast: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      state.toast = action.payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
