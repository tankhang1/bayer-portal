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

// @heroicons/react
import { ChevronDownIcon, DocumentIcon } from "@heroicons/react/24/outline";

// component
import dynamic from "next/dynamic";
const ReportTable = dynamic(() => import("./report-table"), {
  ssr: false,
});

export default function ReportPage() {
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
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
              />

              <div className="tw-flex tw-flex-row tw-items-center tw-gap-3">
                <Button variant="filled" className="flex-shrink-0 tw-w-full">
                  Lọc
                </Button>
                <Button variant="outlined" className="flex-shrink-0 tw-w-full">
                  Thu hồi
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            className="tw-flex tw-items-center tw-gap-3"
            variant="outlined"
            color="gray"
          >
            <DocumentIcon strokeWidth={2} className="tw-h-4 tw-w-4" /> Xuất file
          </Button>
        </div>
      </div>
      <ReportTable />
    </section>
  );
}
