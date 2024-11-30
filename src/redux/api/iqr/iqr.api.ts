import baseQuery from "@/redux/middlewares/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TIqrExportRES, TIqrRES } from "./iqr.response";
import { TIqrExportREQ, TIqrRangeTimeREQ, TIqrTodayREQ } from "./iqr.request";
import { TAGS } from "@/constants";

export const iqrApi = createApi({
  reducerPath: "iqrApi",
  baseQuery: baseQuery,
  tagTypes: [TAGS.IQR],
  endpoints: (builder) => ({
    iqrToday: builder.query<TIqrRES[], Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/today`,
        method: "GET",
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.IQR,
                id,
              })),
              TAGS.IQR,
            ]
          : [TAGS.IQR],
    }),
    iqrCounterToday: builder.query<number, Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/today/counter`,
        method: "GET",
        params,
      }),
    }),
    iqrRangeDate: builder.query<TIqrRES[], Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr`,
        method: "GET",
        params,
      }),

      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.IQR,
                id,
              })),
              TAGS.IQR,
            ]
          : [TAGS.IQR],
    }),
    iqrCounter: builder.query<number, Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/counter`,
        method: "GET",
        params: {
          ...params,
          gateway: 2,
        },
      }),
    }),
    exportIqrData: builder.mutation<TIqrExportRES, TIqrExportREQ>({
      query: (body) => ({
        url: `/api/report/iqr/excel`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useIqrCounterTodayQuery,
  useIqrTodayQuery,
  useIqrRangeDateQuery,
  useExportIqrDataMutation,
  useIqrCounterQuery,
} = iqrApi;
