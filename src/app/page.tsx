"use client";

import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { store } from "@/redux/store";

export default function Home() {
  const isAuth = store.getState().app.token ? true : false;

  useEffect(() => {
    if (isAuth) {
      redirect("/iqr/iqr-list"); // Redirect to iqr-list if authenticated
    } else {
      redirect("/auth/signin/basic"); // Redirect to signin page if not authenticated
    }
  }, [isAuth]);
}
