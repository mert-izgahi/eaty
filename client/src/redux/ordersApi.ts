import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IOrder } from "../types";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => {
    return {
      getOrders: builder.query<IOrder[], void>({
        query: () => "/orders",
        keepUnusedDataFor: 5,
        transformResponse: (response: { data: IOrder[] }) => response.data,
        transformErrorResponse: (error: FetchBaseQueryError) => {
          if ("state" in error) {
            console.log(error);

            return { message: error.data };
          } else {
            return { message: "An error occurred." };
          }
        },
      }),

      getOrder: builder.query<IOrder, string>({
        query: (id) => ({
          url: `/orders/${id}`,
        }),
        transformResponse: (response: { data: IOrder }) => response.data,
        transformErrorResponse: (error: FetchBaseQueryError) => {
          console.log(error);

          if ("state" in error) {
            console.log(error);
          } else {
            const { message } = error.data as { message: string };
            return { message };
          }
        },
      }),

      createOrder: builder.mutation({
        query: ({ data, token }) => ({
          url: "/orders",
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),

        transformResponse: (response: { data: { url: string } }) =>
          response.data,

        transformErrorResponse: (error: FetchBaseQueryError) => {
          if ("state" in error) {
            console.log(error);
          } else {
            const { message } = error.data as { message: string };
            return { message };
          }
        },
      }),
    };
  },
});

export const { useGetOrdersQuery, useGetOrderQuery, useCreateOrderMutation } =
  ordersApi;

export default ordersApi;
