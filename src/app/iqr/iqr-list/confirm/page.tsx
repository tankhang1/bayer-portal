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
const IQrTable = dynamic(() => import("./iqr-confirm-table"), {
  ssr: false,
});
type TQueryIqr = {
  st: Date;
  ed: Date;
};

export default function IqrConfirmPage() {
  // const [openModal, setOpenModal] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useForm<TQueryIqr>();
  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 20,
    gateway: 2,
    s: 2,
    k: "",
    // st: +(format(new Date(), "yyyyMMdd") + "0000"),
    // ed: +(format(new Date(), "yyyyMMdd") + "2359"),
  });

  // const onSubmit = (params: TQueryIqr) => {
  //   setQuery({
  //     ...query,
  //     st: +(format(params.st, "yyyyMMdd") + "0000"),
  //     ed: +(format(params.ed, "yyyyMMdd") + "2359"),
  //   });
  // };
  // const onReset = () => {
  //   setQuery({
  //     nu: 0,
  //     sz: 20,
  //     gateway: 2,
  //     s: 2,
  //     st: +(format(new Date(), "yyyyMMdd") + "0000"),
  //     ed: +(format(new Date(), "yyyyMMdd") + "2359"),
  //   });
  //   setValue("st", new Date());
  //   setValue("ed", new Date());
  // };
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

        {/* <div className="tw-flex tw-shrink-0 tw-gap-2">
          <Button
            className="tw-flex tw-items-center tw-gap-3"
            variant="outlined"
            color="gray"
            onClick={() => setOpenModal(true)}
          >
            <AdjustmentsHorizontalIcon
              strokeWidth={2}
              className="tw-h-4 tw-w-4"
            />{" "}
            Lọc dữ liệu
          </Button>
        </div> */}
      </div>
      <IQrTable query={query} setQuery={setQuery} />
      {/* <Dialog open={openModal} handler={setOpenModal}>
        <DialogHeader>Lọc thông tin</DialogHeader>

        <DialogBody className="tw-gap-5 tw-flex tw-flex-col">
          <Input
            key={"start-time"}
            type="date"
            label="Ngày bắt đầu"
            {...register("st")}
          />
          <Input
            key={"end-time"}
            type="date"
            label="Ngày kết thúc"
            {...register("ed")}
          />
        </DialogBody>
        <DialogFooter>
          <div className="tw-flex tw-flex-row tw-gap-3">
            <Button
              variant="gradient"
              color="green"
              onClick={handleSubmit(onSubmit)}
            >
              <span>Lọc </span>
            </Button>
            <Button variant="outlined" color="green" onClick={onReset}>
              <span>Thu hồi</span>
            </Button>
            <Button
              variant="text"
              color="red"
              className="mr-1"
              onClick={() => setOpenModal(false)}
            >
              <span>Huỷ</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog> */}
    </section>
  );
}
