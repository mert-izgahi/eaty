import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (credentials: { email: string; password: string }) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),

        transformResponse: (response: { data: { token: string } }) =>
          response.data,

        transformErrorResponse: (error: FetchBaseQueryError) => {
          if ("state" in error) {
            console.log(error);
          } else {
            console.log(error);

            const { message } = error.data as { message: string };
            return { message };
          }
        },
      }),

      getCurrentUser: builder.query<IUser, string>({
        query: (token: string) => {
          return {
            url: "/auth/current-user",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        },
        transformResponse: (response: { data: IUser }) => response.data,

        transformErrorResponse: (error: FetchBaseQueryError) => {
          if ("state" in error) {
            console.log(error);
          } else {
            const { message } = error.data as { message: string };
            return { message };
          }
        }
      }),
    };
  },
});

export const { useLoginMutation, useGetCurrentUserQuery } = authApi;

export default authApi;
