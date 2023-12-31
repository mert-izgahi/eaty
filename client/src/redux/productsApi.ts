import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IProduct } from "../types";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => {
    return {
      getProducts: builder.query<IProduct[], void>({
        query: () => "/products",
        keepUnusedDataFor: 5,
        transformResponse: (response: { data: IProduct[] }) => response.data,
        transformErrorResponse: (error: FetchBaseQueryError) => {
          if ("state" in error) {
            console.log(error);

            return { message: error.data };
          } else {
            return { message: "An error occurred." };
          }
        },
      }),

      getProduct: builder.query<IProduct, string>({
        query: (id) => ({
          url: `/products/${id}`,
        }),
        transformResponse: (response: { data: IProduct }) => response.data,
        transformErrorResponse: (error: FetchBaseQueryError ) => {
          console.log(error);

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

export const { useGetProductsQuery, useGetProductQuery } = productsApi;

export default productsApi;
