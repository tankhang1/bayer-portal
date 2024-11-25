import baseQuery from "@/redux/middlewares/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TAuthRES, TIqrConfirmRES } from "./auth.response";
import { TAuthREQ, TIqrConfirREQ } from "./auth.request";
import baseQueryWithAuth from "@/redux/middlewares/baseQueryWithAuth";
import { TAGS } from "@/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [TAGS.IQR],

  endpoints: (builder) => ({
    login: builder.mutation<TAuthRES, TAuthREQ>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    confirmIqr: builder.mutation<TIqrConfirmRES, TIqrConfirREQ>({
      query: (body) => ({
        url: "/portal/transaction/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAGS.IQR],
    }),
    rejectIqr: builder.mutation<TIqrConfirmRES, TIqrConfirREQ>({
      query: (body) => ({
        url: "/portal/transaction/reject",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAGS.IQR],
    }),
  }),
});
export const { useLoginMutation, useConfirmIqrMutation, useRejectIqrMutation } =
  authApi;
