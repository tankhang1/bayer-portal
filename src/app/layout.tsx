"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Roboto } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import theme from "@/theme";
import { MaterialTailwindControllerProvider } from "@/context";
import InnerContent from "./content";
import { Provider } from "react-redux";
import "react-calendar/dist/Calendar.css";
import "./globals.css";
import { store } from "@/redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if we're running on the client-side
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Don't render anything server-side

  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        />
        <link rel="icon" type="image/svg+xml" href="/img/yis.png" />
        <title>Yis Martech</title>
      </head>
      <body className={roboto.className}>
        <Provider store={store}>
          <ThemeProvider value={theme}>
            <MaterialTailwindControllerProvider>
              <InnerContent>{children}</InnerContent>
              <ToastContainer />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
