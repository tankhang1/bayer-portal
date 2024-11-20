"use client";
import { useState } from "react";

// @tanstack/react-table
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// data

// @material-tailwind/react
import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Badge,
  Chip,
  IconButton,
} from "@material-tailwind/react";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ChevronUpDownIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";

type Props = {};
type TDATA = {
  seri: string;
  sms_code: string;
  product_code: string;
  batch_number: string;
  content_prize: string;
  upload_date: Date;
  activated_date: Date;
  name_prize: string;
  zalo_nick_name: string;
  phone: string;
  customer_name: string;
  address: string;
  province_name: string;
  chanel_zalo_sm_center: string;
  image_link: string;
  status: number;
};
const DATA: TDATA[] = [
  {
    seri: "ABC123456789",
    sms_code: "SMS987654",
    product_code: "PROD001",
    batch_number: "BATCH2024",
    content_prize: "Congratulations! You have won a gift voucher.",
    upload_date: new Date("2024-11-20T10:30:00Z"),
    activated_date: new Date("2024-11-21T15:45:00Z"),
    name_prize: "Gift Voucher - $50",
    zalo_nick_name: "HappyCustomer",
    phone: "1234567890",
    customer_name: "John Doe",
    address: "123 Main Street, City Center, Example City",
    province_name: "Example Province",
    chanel_zalo_sm_center: "ZaloServiceCenter01",
    image_link: "https://example.com/images/prize.jpg",
    status: 1, // Active
  },
];
export default function ReportTable({}: Props) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [data] = useState(() => [...DATA]);

  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TDATA>();

  // Define columns with type safety
  const columns: ColumnDef<TDATA, any>[] = [
    columnHelper.accessor("seri", {
      header: "Số seri",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("sms_code", {
      header: "Mã SMS",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("product_code", {
      header: "Mã sản phẩm",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("batch_number", {
      header: "Số lô",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("content_prize", {
      header: "Nội dung giải thưởng",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("upload_date", {
      header: "Ngày tải lên",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("activated_date", {
      header: "Ngày kích hoạt",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("name_prize", {
      header: "Tên giải thưởng",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("zalo_nick_name", {
      header: "Tên Zalo",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phone", {
      header: "Số điện thoại",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("customer_name", {
      header: "Tên khách hàng",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("address", {
      header: "Địa chỉ",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("province_name", {
      header: "Tên tỉnh",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("chanel_zalo_sm_center", {
      header: "Kênh Zalo",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("image_link", {
      header: "Liên kết hình ảnh",
      cell: (info) => (
        <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
          Xem ảnh
        </a>
      ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Trạng thái",
      cell: (info) =>
        info.getValue() === 1 ? (
          <Chip
            color="green"
            value="Đang hoạt động"
            className="tw-justify-center"
          ></Chip>
        ) : (
          <Chip color="amber" value="Dừng hoạt động"></Chip>
        ),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    // @ts-ignore
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="tw-border tw-border-blue-gray-100 tw-shadow-sm tw-mt-4 tw-scroll-mt-4">
      <CardBody className="tw-flex tw-items-center tw-px-4 tw-justify-end">
        <div className="tw-flex tw-gap-4 tw-w-full tw-items-center">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="tw-border tw-p-2 tw-border-blue-gray-100 tw-rounded-lg tw-max-w-[70px] tw-w-full"
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <Typography
            variant="small"
            className="!tw-text-blue-gray-500 !tw-font-normal"
          >
            Số mục mỗi trang
          </Typography>
        </div>
        <div className="tw-w-52">
          <Input
            variant="outlined"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            label="Tìm kiếm"
          />
        </div>
      </CardBody>
      <CardFooter className="tw-p-0 tw-overflow-scroll">
        <table className="tw-table-auto tw-text-left tw-w-full tw-min-w-max">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="tw-px-5 tw-py-2 tw-uppercase"
                  >
                    <Typography
                      color="blue-gray"
                      className="tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-gap-2 tw-text-xs !tw-font-bold tw-leading-none tw-opacity-40"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <ChevronUpDownIcon className="tw-h-4 tw-w-4" />
                    </Typography>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="!tw-border-y !tw-border-x-0">
                    <Typography
                      variant="small"
                      className="!tw-font-medium !tw-text-blue-gray-500 tw-py-2 tw-px-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Typography>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardFooter>
      <div className="tw-flex tw-items-center tw-justify-end tw-gap-6 tw-px-10 tw-py-6">
        <span className="tw-flex tw-items-center tw-gap-1">
          <Typography className="!tw-font-bold">Trang</Typography>
          <strong>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </strong>
        </span>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className="disabled:tw-opacity-30"
          >
            <ChevronLeftIcon className="tw-w-4 tw-h-4 tw-stroke-blue-gray-900 tw-stroke-2" />
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="disabled:tw-opacity-30"
          >
            <ChevronRightIcon className="tw-w-4 tw-h-4 tw-stroke-blue-gray-900 tw-stroke-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
