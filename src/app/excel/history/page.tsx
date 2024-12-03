"use client";
// @material-tailwind/react

// component
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
const ExcelHistoryTable = dynamic(() => import("./excel-history-table"), {
  ssr: false,
});

export default function ExcelHistoryPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/signin/basic");
    }
  }, []);
  return (
    <section className="tw-mb-4">
      <div className="tw-mt-8 tw-flex tw-flex-col tw-gap-3">
        <h1 className="tw-text-3xl">Tìm kiếm thông tin</h1>
      </div>
      <ExcelHistoryTable />
    </section>
  );
}
