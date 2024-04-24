import { createApi } from "@reduxjs/toolkit/query/react";
import { SignInStructure, TokenStructure, User } from "../../types";
import { setSession } from "../features/authSlice.ts";
import { BaseQuery } from "./baseQuery.ts";

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery: BaseQuery,
  endpoints: (build) => ({
    LogIn: build.mutation<TokenStructure, SignInStructure>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setSession({
              token: data.value,
              isAuthenticated: true,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    AuthMe: build.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLogInMutation, useAuthMeQuery } = authApiService;
