"use client";

// component
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const IQrTable = dynamic(() => import("./iqr-confirm-table"), {
  ssr: false,
});

export default function IqrConfirmPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/auth/signin/basic");
    }
  }, []);
  return (
    <section className="tw-mb-4">
      <div className="tw-mt-8 tw-flex tw-items-center tw-justify-between">
        <h1 className="tw-text-3xl">Tìm kiếm thông tin</h1>
      </div>
      <IQrTable />
    </section>
  );
}
