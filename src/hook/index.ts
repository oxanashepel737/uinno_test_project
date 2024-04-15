import { useNavigate } from "react-router-dom";
import { useAuthMeQuery } from "../store/services/authQuery.ts";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const { data } = useAuthMeQuery();
  useEffect(() => {
    if (data && data.role !== "admin") {
      navigate("/posts");
    }
  }, [data, navigate]);
};

export const useProtectedParam = (id?: number) => {
  const navigate = useNavigate();
  const { data } = useAuthMeQuery();
  useEffect(() => {
    if (data && id && data.id !== id && data.role !== "admin") {
      navigate("/posts");
    }
  }, [data, id, navigate]);
};

export const useErrorRedirect = (
  error: FetchBaseQueryError | SerializedError | undefined,
  path: string,
) => {
  const navigate = useNavigate();
  const getErrorStatus = (error: unknown) => {
    if (error && typeof error === "object" && "status" in error) {
      return error.status as number;
    }
  };
  useEffect(() => {
    if (getErrorStatus(error) === 404) {
      navigate(path);
    }
  }, [error, navigate, path]);
};
