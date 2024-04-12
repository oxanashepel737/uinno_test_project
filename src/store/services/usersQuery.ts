import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { IUser } from "../../types";
import { getToken } from "../localStorage.ts";

const apiToken = getToken();
export const usersApiService = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiURL}/api`,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${apiToken}`);
    },
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query() {
        return {
          url: `/users`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApiService;
