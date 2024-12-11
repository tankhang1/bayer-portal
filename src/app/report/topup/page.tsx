"use client";
// @material-tailwind/react
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
} from "@/components/MaterialTailwind";
import { useExportTopupExcelMutation } from "@/redux/api/excel/excel.api";
import { TTopupRangeTimeREQ } from "@/redux/api/topup/topup.request";

// @heroicons/react
import { ChevronDownIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

// component
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const TopupTable = dynamic(() => import("./topup-table"), {
  ssr: false,
});
type TQuery = {
  st: Date;
  ed: Date;
};
export default function TopupPage() {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TQuery>();
  const [query, setQuery] = useState<TTopupRangeTimeREQ>({
    nu: 0,
    sz: 6,
    k: "",
    st: +(format(new Date(), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2359"),
  });
  const [exportTopupExcel, { isLoading: isLoadingTopupExcel }] =
    useExportTopupExcelMutation();

  const onSubmit = (params: TQuery) => {
    setQuery({
      ...query,
      st: +(format(params.st, "yyyyMMdd") + "0000"),
      ed: +(format(params.ed, "yyyyMMdd") + "2359"),
    });
  };
  const onReset = () => {
    setQuery({
      nu: 0,
      sz: 6,
      k: "",
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2359"),
    });
  };
  const onExportExcel = async () => {
    await exportTopupExcel({
      ed: query.ed,
      st: query.st,
      k: query.k,
    })
      .unwrap()
      .then((value: { status: number }) => {
        if (value.status === 1) {
          toast.success("Xuất dữ liệu thành công, vui lòng đợi trong giây lát");
        } else {
          toast.error("Xuất dữ liệu thất bại, vui lòng kiểm tra");
        }
      })
      .catch(() => {
        toast.error("Xuất dữ liệu thất bại, vui lòng kiểm tra");
      });
  };
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

        <div className="tw-flex tw-shrink-0 tw-gap-2">
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
          <Button
            className="tw-flex tw-items-center tw-gap-3"
            variant="outlined"
            color="gray"
            loading={isLoadingTopupExcel}
            onClick={onExportExcel}
          >
            <DocumentIcon strokeWidth={2} className="tw-h-4 tw-w-4" /> Xuất file
          </Button>
        </div>
      </div>
      <TopupTable query={query} setQuery={setQuery} />
      <Dialog open={openModal} handler={setOpenModal}>
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
      </Dialog>
    </section>
  );
}
