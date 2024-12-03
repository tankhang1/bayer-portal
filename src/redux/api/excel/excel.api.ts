import baseQuery from "@/redux/middlewares/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TAGS } from "@/constants";
import { TExcelRES } from "./excel.response";
import { TExcelDetailREQ, TExcelREQ } from "./excel.request";

export const excelApi = createApi({
  reducerPath: "excelApi",
  baseQuery: baseQuery,
  tagTypes: [TAGS.EXCEL],

  endpoints: (builder) => ({
    getListHistoryFile: builder.query<TExcelRES[], TExcelREQ>({
      query: (params) => ({
        url: "/api/report/history/file",
        method: "GET",
        params,
      }),
    }),
    exportIqrExcel: builder.mutation<{ status: number }, TExcelDetailREQ>({
      query: (body) => ({
        url: "/api/report/iqr/excel",
        method: "POST",
        body,
      }),
    }),
    exportBrandnameExcel: builder.mutation<{ status: number }, TExcelDetailREQ>(
      {
        query: (body) => ({
          url: "/api/report/brandname/excel",
          method: "POST",
          body,
        }),
      }
    ),
    exportTopupExcel: builder.mutation<{ status: number }, TExcelDetailREQ>({
      query: (body) => ({
        url: "/api/report/topup/excel",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useGetListHistoryFileQuery,
  useExportBrandnameExcelMutation,
  useExportIqrExcelMutation,
  useExportTopupExcelMutation,
} = excelApi;
