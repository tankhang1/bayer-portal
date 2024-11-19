import React from "react";
import "@/app/globals.css";

export const metadata = {
  title: "Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tw-relative !tw-min-h-screen tw-w-full tw-bg-white">
      {children}
    </div>
  );
}
