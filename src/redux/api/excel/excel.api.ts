import baseQuery from "@/redux/middlewares/baseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TAGS } from "@/constants";
import { TExcelRES } from "./excel.response";
import { TExcelREQ } from "./excel.request";

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
  }),
});
export const { useGetListHistoryFileQuery } = excelApi;
