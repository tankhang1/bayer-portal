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
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from "@material-tailwind/react";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ChevronUpDownIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
type Props = {};
type TDATA = {
  seri: string;
  iqr: string;
  product_name: string;
  chance_1: string;
  chance_2: string;
  phone: string;
  status: number;
  name: string;
  province: string;
  source: string;
  isConfirm: number;
};
const DATA: TDATA[] = [
  {
    seri: "BI00000",
    iqr: "XKS0001",
    product_name: "Nativo",
    chance_1: "Chuc ban may man lan sau",
    chance_2: "Xe may AirBlead 125CC",
    phone: "8412322xxxx",
    status: 1,
    name: "LX Bien",
    province: "Hồ Chí Minh",
    source: "Zalo Mini App",
    isConfirm: 1,
  },
  {
    seri: "BI00000",
    iqr: "XKS0001",
    product_name: "Nativo",
    chance_1: "Chuc ban may man lan sau",
    chance_2: "Xe may AirBlead 125CC",
    phone: "845654222xxxx",
    status: 1,
    name: "LX Bien",
    province: "Hồ Chí Minh",
    isConfirm: 1,
    source: "Zalo Mini App",
  },
  {
    seri: "BI00000",
    iqr: "XKS0001",
    product_name: "Nativo",
    chance_1: "Chuc ban may man lan sau",
    chance_2: "Xe may AirBlead 125CC",
    phone: "84224562xxxx",
    status: 1,
    name: "LX Bien",
    province: "Hồ Chí Minh",
    isConfirm: 1,
    source: "Zalo Mini App",
  },
  {
    seri: "BI00000",
    iqr: "XKS0001",
    product_name: "Nativo",
    chance_1: "Chuc ban may man lan sau",
    chance_2: "Xe may AirBlead 125CC",
    phone: "84221112xxxx",
    isConfirm: 0,
    status: 0,
    name: "LX Bien",
    province: "Hồ Chí Minh",
    source: "Zalo Mini App",
  },
];
export default function IQrTable({}: Props) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [data] = useState(() => [...DATA]);
  const [openDialog, setOpenDialog] = useState(false);
  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TDATA>();

  // Define columns with type safety
  const columns: ColumnDef<TDATA, any>[] = [
    columnHelper.accessor("seri", {
      header: "Số seri",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("iqr", {
      header: "Mã iQr",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("product_name", {
      header: "Tên sản phẩm",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("chance_1", {
      header: "Cơ hội 1",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("chance_2", {
      header: "Cơ hội 2",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phone", {
      header: "Số điện thoại đăng ký",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Trạng thái",
      cell: (info) =>
        info.getValue() === 1 ? (
          <Chip
            color="green"
            value="Đã xác thực"
            className="tw-justify-center"
          ></Chip>
        ) : (
          <Chip color="amber" value="Chờ xác thực"></Chip>
        ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("isConfirm", {
      header: "Duyệt",
      cell: (info) =>
        info.getValue() === 1 ? (
          <IconButton
            variant="outlined"
            className="tw-border-blue-700"
            disabled
          >
            <ShieldCheckIcon className="tw-w-8 tw-h-8 tw-text-blue-700" />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleOpenDialog}
            variant="outlined"
            className="tw-border-red-700"
          >
            <ShieldExclamationIcon className="tw-w-8 tw-h-8 tw-text-red-700" />
          </IconButton>
        ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("province", {
      header: "Tỉnh đăng ký",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("source", {
      header: "Nguồn tham gia",
      cell: (info) => info.getValue(),
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
  const handleOpenDialog = () => setOpenDialog(!openDialog);
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
      <Dialog open={openDialog} handler={handleOpenDialog} size="sm">
        <DialogHeader className="tw-text-green-500 tw-justify-center tw-items-center tw-flex-col tw-relative">
          <Typography variant="h3">Thông tin trúng giải</Typography>
          <Typography variant="h3">Chạy xuân 2024</Typography>
          <IconButton
            variant="text"
            className="!tw-absolute tw-top-5 tw-right-5"
            onClick={() => setOpenDialog(false)}
          >
            <XMarkIcon color="red" width={24} height={24} />
          </IconButton>
        </DialogHeader>

        <DialogBody className="tw-flex tw-gap-4 tw-flex-col">
          <div className="tw-flex tw-gap-5">
            <Image
              src={"/img/nativo.jpg"}
              alt="Product"
              width={200}
              height={300}
            />
            <div>
              <Typography variant="paragraph" color="black">
                {new Date().toLocaleString()}
              </Typography>
              <Typography variant="h5" color="gray">
                Nativo WG75 10gr
              </Typography>

              <Typography variant="paragraph" color="black">
                Lê Biên
              </Typography>
              <Typography variant="paragraph" color="black">
                84907090068
              </Typography>
              <Typography variant="paragraph" color="black">
                XKXSSDD
              </Typography>
              <Typography variant="paragraph" color="black">
                Hồ Chí Minh
              </Typography>
            </div>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-3">
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-4">
              <Typography
                variant="h5"
                color="black"
                className="tw-text-nowrap tw-w-2/3"
              >
                Họ và tên:
              </Typography>
              <div className="tw-flex tw-w-full tw-bg-gray-200 tw-justify-center tw-items-center tw-py-2 tw-text-black tw-rounded-sm">
                xxxxxxxx
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-4">
              <Typography
                variant="h5"
                color="black"
                className="tw-text-nowrap tw-w-2/3"
              >
                Địa chỉ:
              </Typography>
              <div className="tw-flex tw-w-full tw-bg-gray-200 tw-justify-center tw-items-center tw-py-2 tw-text-black tw-rounded-sm">
                xxxxxxxx
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-4">
              <Typography
                variant="h5"
                color="black"
                className="tw-text-nowrap tw-w-2/3"
              >
                Ghi chú:
              </Typography>
              <div className="tw-flex tw-w-full tw-bg-gray-200 tw-justify-center tw-items-center tw-py-2 tw-text-black tw-rounded-sm">
                xxxxxxxx
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="tw-gap-3">
          <Button variant="gradient" color="green" onClick={handleOpenDialog}>
            <span>Duyệt</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDialog}
            className="mr-1"
          >
            <span>Từ chối</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
