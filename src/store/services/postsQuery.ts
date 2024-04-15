import { createApi } from "@reduxjs/toolkit/query/react";
import { IPost, IPostPayload } from "../../types";
import { BaseQuery } from "./baseQuery.ts";

export const postsApiService = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
  baseQuery: BaseQuery,
  endpoints: (build) => ({
    getAllPosts: build.query<IPost[], void>({
      query() {
        return {
          url: `/posts`,
          method: "GET",
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
          body: post,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<IPost, number>({
      query(id) {
        return {
          url: `/posts/${id}`,
        };
      },
      providesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: build.mutation<IPost, { id: number; post: IPostPayload }>({
      query({ id, post }) {
        return {
          url: `/posts/${id}`,
          method: "PATCH",
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
