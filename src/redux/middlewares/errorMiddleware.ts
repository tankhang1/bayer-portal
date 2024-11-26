// import { Alert } from 'react-native';
import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

import { redirect } from "next/navigation";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.status === 403) {
        redirect("/auth/signin/basic");
      }
    }

    return next(action);
  };
