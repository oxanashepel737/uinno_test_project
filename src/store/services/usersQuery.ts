import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../../configuration";
import { IUser, IUserPayload } from "../../types";
import { getToken } from "../localStorage.ts";

export const usersApiService = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiURL}/api`,
    prepareHeaders(headers) {
      const apiToken = getToken();
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
          credentials: "include",
          body: user,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getUser: build.query<IUser, number>({
      query(id) {
        return {
          url: `/users/${id}`,
          credentials: "include",
        };
      },
      providesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: build.mutation<IUser, { id: number; user: IUserPayload }>({
      query({ id, user }) {
        return {
          url: `/users/${id}`,
          method: "PATCH",
          credentials: "same-origin",
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
          credentials: "include",
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
