import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { IPost, IPostPayload } from "../../types";
import { getToken } from "../localStorage.ts";

export const postsApiService = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiURL}/api`,
    prepareHeaders(headers) {
      const apiToken = getToken();
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${apiToken}`);
    },
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<IPost[], void>({
      query() {
        return {
          url: `/posts`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Posts", id }) as const),
        { type: "Posts" as const, id: "LIST" },
      ],
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
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<IPost, number>({
      query(id) {
        return {
          url: `/posts/${id}`,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation, useGetPostQuery } =
  postsApiService;
