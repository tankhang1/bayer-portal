import baseQuery from "@/redux/middlewares/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TAGS } from "@/constants";
import { TTopupRES } from "./topup.response";
import { TTopupREQ } from "./topup.request";

export const topupApi = createApi({
  reducerPath: "topupApi",
  baseQuery: baseQuery,
  tagTypes: [TAGS.TOPUP],
  endpoints: (builder) => ({
    topupToday: builder.query<TTopupRES[], void>({
      query: () => ({
        url: `/api/report/brandname/today`,
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.TOPUP,
                id,
              })),
              TAGS.TOPUP,
            ]
          : [TAGS.TOPUP],
    }),
  }),
});
export const { useTopupTodayQuery } = topupApi;
