"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { store } from "@/redux/store";

export default function Home() {
  useEffect(() => {
    const isAuth = Boolean(store.getState().app.token);
    if (isAuth) {
      redirect("/iqr/iqr-list");
    } else {
      redirect("/auth/signin/basic");
    }
  }, []);

  return null; // No content needed since redirect happens immediately
}
