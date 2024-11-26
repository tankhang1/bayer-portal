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
    iqrToday: builder.query<TIqrRES[], void>({
      query: () => ({
        url: `/api/report/iqr/today`,
        method: "GET",
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
    iqrRangeDate: builder.query<TIqrRES[], TIqrRangeTimeREQ>({
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
  useIqrTodayQuery,
  useIqrRangeDateQuery,
  useExportIqrDataMutation,
} = iqrApi;
