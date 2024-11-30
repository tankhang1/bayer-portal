"use client";
// @material-tailwind/react
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Input,
} from "@/components/MaterialTailwind";
import { TIqrRangeTimeREQ } from "@/redux/api/iqr/iqr.request";
import { TTopupRangeTimeREQ } from "@/redux/api/topup/topup.request";

// @heroicons/react
import { ChevronDownIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

// component
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
const SMSTable = dynamic(() => import("./components/sms-table"), {
  ssr: false,
});
const IQRTable = dynamic(() => import("./components/iqr-table"), {
  ssr: false,
});
const TopupTable = dynamic(() => import("./components/topup-table"), {
  ssr: false,
});
type TQuery = {
  st: Date;
  ed: Date;
};

export default function ReportPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TQuery>();
  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 20,
    k: "",
    gateway: 2,
    st: +(format(new Date(), "yyyyMMdd") + "0000"),
    ed: +(format(new Date(), "yyyyMMdd") + "2359"),
  });
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
      sz: 20,
      k: "",
      gateway: 2,
      st: +(format(new Date(), "yyyyMMdd") + "0000"),
      ed: +(format(new Date(), "yyyyMMdd") + "2359"),
    });
  };
  return (
    <section className="tw-mb-4">
      <div className="tw-mt-8 tw-flex tw-items-center tw-justify-between">
        <h1 className="tw-text-3xl">Tìm kiếm thông tin</h1>

        <div className="tw-flex tw-shrink-0 tw-gap-2">
          <Popover placement="bottom">
            <PopoverHandler>
              <Button>Lọc dữ liệu</Button>
            </PopoverHandler>
            <PopoverContent className="tw-w-[300px] tw-flex tw-flex-col tw-gap-2">
              <Typography variant="h6" color="blue-gray" className="mb-6">
                Nhập thông tin
              </Typography>

              <Input
                size="lg"
                type="date"
                label="Ngày bắt đầu"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("st")}
              />
              <Input
                size="lg"
                type="date"
                label="Ngày kết thúc"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("ed")}
              />

              <div className="tw-flex tw-flex-row tw-items-center tw-gap-3">
                <Button
                  variant="filled"
                  className="flex-shrink-0 tw-w-full"
                  onClick={handleSubmit(onSubmit)}
                >
                  Lọc
                </Button>
                <Button
                  variant="outlined"
                  className="flex-shrink-0 tw-w-full"
                  onClick={onReset}
                >
                  Thu hồi
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <SMSTable query={query} setQuery={setQuery} />
      <IQRTable query={query} setQuery={setQuery} />
      <TopupTable query={query} setQuery={setQuery} />
    </section>
  );
}
