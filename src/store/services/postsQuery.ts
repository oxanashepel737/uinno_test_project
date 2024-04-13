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
      providesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: build.mutation<IPost, { id: number; post: IPostPayload }>({
      query({ id, post }) {
        return {
          url: `/posts/${id}`,
          method: "PATCH",
          credentials: "same-origin",
          body: post,
        };
      },
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: "Posts", id },
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    deletePost: build.mutation<void, number>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
} = postsApiService;
