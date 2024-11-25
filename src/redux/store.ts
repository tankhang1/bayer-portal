import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/auth.api";
import appReducer from "./slices/appSlices";
import { iqrApi } from "./api/iqr/iqr.api";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [iqrApi.reducerPath]: iqrApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(iqrApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
