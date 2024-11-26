import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/auth.api";
import appReducer from "./slices/appSlices";
import { iqrApi } from "./api/iqr/iqr.api";
import { brandnameApi } from "./api/brandname/brandname.api";
import { topupApi } from "./api/topup/topup.api";
import { rtkQueryErrorLogger } from "./middlewares/errorMiddleware";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [iqrApi.reducerPath]: iqrApi.reducer,
    [topupApi.reducerPath]: topupApi.reducer,
    [brandnameApi.reducerPath]: brandnameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(iqrApi.middleware)
      .concat(brandnameApi.middleware)
      .concat(topupApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
