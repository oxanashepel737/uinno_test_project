import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { IPost, IPostPayload } from "../../types";
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
    createPost: build.mutation<IPost, IPostPayload>({
      query(post) {
        return {
          url: "/posts",
          method: "POST",
          credentials: "include",
          body: post,
        };
      },
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation } = postsApiService;
