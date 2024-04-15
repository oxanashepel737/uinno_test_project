import { createApi } from "@reduxjs/toolkit/query/react";
import { ISignIn, ITokenStructure, IUser } from "../../types";
import { setToken } from "../localStorage.ts";
import { BaseQuery } from "./baseQuery.ts";

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery: BaseQuery,
  endpoints: (build) => ({
    LogIn: build.mutation<ITokenStructure, ISignIn>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.value);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    AuthMe: build.query<IUser, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLogInMutation, useAuthMeQuery } = authApiService;
