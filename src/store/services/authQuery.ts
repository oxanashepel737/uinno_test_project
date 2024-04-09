import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { ISignIn, ITokenStructure } from "../../types";
import { setSession } from "../features/authSlice.ts";
import { setToken } from "../localStorage.ts";

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiURL}/api`,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
    },
  }),
  endpoints: (build) => ({
    LogIn: build.mutation<ITokenStructure, ISignIn>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.value);
          dispatch(
            setSession({
              accessToken: data.value,
              tokenStructure: data,
            }),
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLogInMutation } = authApiService;
