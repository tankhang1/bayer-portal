import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { BASE_URL } from "@/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export default baseQuery;
