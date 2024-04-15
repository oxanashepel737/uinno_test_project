import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser, IUserPayload } from "../../types";
import { BaseQuery } from "./baseQuery.ts";

export const usersApiService = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: BaseQuery,
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query() {
        return {
          url: `/users`,
          method: "GET",
        };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Users", id }) as const),
        { type: "Users" as const, id: "LIST" },
      ],
    }),
    createUser: build.mutation<IUser, IUserPayload>({
      query(user) {
        return {
          url: "/users",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getUser: build.query<IUser, number>({
      query(id) {
        return {
          url: `/users/${id}`,
        };
      },
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: build.mutation<IUser, { id: number; user: IUserPayload }>({
      query({ id, user }) {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: user,
        };
      },
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: "Users", id },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    deleteUser: build.mutation<void, number>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiService;
