import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { hideToast } from "../store/features/toastSlice.ts";

export const ErrorToast = ({ message }: { message: string }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4 absolute top-3"
    >
      <div className="flex items-center gap-2 text-red-800">
        <img src="/assets/error_icon.svg" alt="Error" />
        <strong className="block font-medium">{message}</strong>
      </div>
    </div>
  );
};

export const SuccessToast = ({ message }: { message: string }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-green-500 bg-green-50 p-4 absolute top-3"
    >
      <div className="flex items-center gap-2 text-green-800">
        <img src="/assets/success_icon.svg" alt="Success" />
        <strong className="block font-medium">{message}</strong>
      </div>
    </div>
  );
};
export const Toast = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toastState.toast);

  useEffect(() => {
    const i = setTimeout(() => {
      dispatch(hideToast());
    }, 5000);
    return () => {
      clearTimeout(i);
    };
  }, [dispatch, toast]);

  if (!toast) return null;
  return (
    <>
      {toast.type === "error" ? (
        <ErrorToast message={toast.text} />
      ) : (
        <SuccessToast message={toast.text} />
      )}
    </>
  );
};

export const ToastWrapper = () => {
  return <>{createPortal(<Toast />, document.body)}</>;
};
