import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { IPost } from "../../types";
import { getToken } from "../localStorage.ts";

const apiToken = getToken();
export const postsApiService = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiURL}/api`,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${apiToken}`);
    },
  }),
  endpoints: (build) => ({
    GetAllPosts: build.query<IPost[], void>({
      query() {
        return {
          url: `/posts`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApiService;
