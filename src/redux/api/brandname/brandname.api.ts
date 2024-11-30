import baseQuery from "@/redux/middlewares/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TAGS } from "@/constants";
import { TBrandnameRES } from "./brandname.response";
import { TBrandnameRangeTimeREQ } from "./brandname.request";

export const brandnameApi = createApi({
  reducerPath: "brandnameApi",
  baseQuery: baseQuery,
  tagTypes: [TAGS.BRAND_NAME],
  endpoints: (builder) => ({
    brandnameToday: builder.query<TBrandnameRES[], void>({
      query: () => ({
        url: `/api/report/brandname/today`,
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.BRAND_NAME,
                id,
              })),
              TAGS.BRAND_NAME,
            ]
          : [TAGS.BRAND_NAME],
    }),
    brandnameRangeDate: builder.query<
      TBrandnameRES[],
      Partial<TBrandnameRangeTimeREQ>
    >({
      query: (params) => ({
        url: `/api/report/brandname`,
        method: "GET",
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.BRAND_NAME,
                id,
              })),
              TAGS.BRAND_NAME,
            ]
          : [TAGS.BRAND_NAME],
    }),
    brandnameCounter: builder.query<number, Partial<TBrandnameRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/brandname/counter`,
        method: "GET",
        params,
      }),
    }),
  }),
});
export const {
  useBrandnameTodayQuery,
  useBrandnameCounterQuery,
  useBrandnameRangeDateQuery,
} = brandnameApi;
