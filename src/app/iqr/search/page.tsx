"use client";
// @material-tailwind/react
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@/components/MaterialTailwind";
import { TIqrRangeTimeREQ } from "@/redux/api/iqr/iqr.request";

// @heroicons/react
import { DocumentIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

// component
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const SearchTable = dynamic(() => import("./search-table"), {
  ssr: false,
});
type TQueryIqr = {
  st: Date;
  ed: Date;
};

export default function IqrPage() {
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TQueryIqr>();

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

        <Input
          label="Tra cứu tên, số điện thoại"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <SearchTable keyword={keyword} />
    </section>
  );
}
