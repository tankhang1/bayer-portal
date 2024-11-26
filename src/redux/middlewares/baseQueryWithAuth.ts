import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BASE_URL_WITH_AUTH } from "@/constants";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL_WITH_AUTH,
  credentials: "omit",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQueryWithAuth;
