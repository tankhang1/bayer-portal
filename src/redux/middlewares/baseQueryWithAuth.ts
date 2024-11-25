import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { BASE_URL_WITH_AUTH } from "@/constants";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL_WITH_AUTH,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.app.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQueryWithAuth;
