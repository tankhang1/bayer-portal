import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/auth.api";
import appReducer from "./slices/appSlices";
import { iqrApi } from "./api/iqr/iqr.api";
import { brandnameApi } from "./api/brandname/brandname.api";
import { topupApi } from "./api/topup/topup.api";
import { rtkQueryErrorLogger } from "./middlewares/errorMiddleware";
import { setupListeners } from "@reduxjs/toolkit/query";
import { excelApi } from "./api/excel/excel.api";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [iqrApi.reducerPath]: iqrApi.reducer,
    [topupApi.reducerPath]: topupApi.reducer,
    [brandnameApi.reducerPath]: brandnameApi.reducer,
    [excelApi.reducerPath]: excelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(iqrApi.middleware)
      .concat(brandnameApi.middleware)
      .concat(topupApi.middleware)
      .concat(excelApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
