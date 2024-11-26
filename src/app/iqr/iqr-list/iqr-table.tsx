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
  Spinner,
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
import { useIqrTodayQuery } from "@/redux/api/iqr/iqr.api";
import { TIqrRES } from "@/redux/api/iqr/iqr.response";
import {
  useConfirmIqrMutation,
  useRejectIqrMutation,
} from "@/redux/api/auth/auth.api";
import { toast } from "react-toastify";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TIqrRES>();
  const { data, isFetching: isFetchingIqr } = useIqrTodayQuery(
    {},
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const [rejectIqr, { isLoading: isLoadingReject }] = useRejectIqrMutation();
  const [confirmIqr, { isLoading: isLoadingConfirm }] = useConfirmIqrMutation();
  const [iqrDetail, setIqrDetail] = useState<TIqrRES>();
  // Define columns with type safety
  const columns: ColumnDef<TIqrRES, any>[] = [
    columnHelper.accessor("seri", {
      header: "Số seri",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("code", {
      header: "Mã iQr",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("product_name", {
      header: "Tên sản phẩm",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("award1", {
      header: "Cơ hội 1",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("award2", {
      header: "Cơ hội 2",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phone", {
      header: "Số điện thoại",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("fullname", {
      header: "Tên khách hang",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Trạng thái",
      cell: (info) =>
        info.getValue() == 2 ? (
          <Chip
            color="green"
            value="Đã xử lý xác nhận"
            className="tw-justify-center"
          ></Chip>
        ) : info.getValue() == 3 ? (
          <Chip
            color="red"
            className="tw-justify-center"
            value="Từ chối"
          ></Chip>
        ) : (
          <Chip
            color="amber"
            className="tw-justify-center"
            value="Chờ xác nhận"
          ></Chip>
        ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Duyệt",
      cell: (info) =>
        info.getValue() == 2 || info.getValue() == 3 ? (
          <IconButton
            variant="outlined"
            className="tw-border-blue-700"
            disabled
          >
            <ShieldCheckIcon className="tw-w-8 tw-h-8 tw-text-blue-700" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => handleOpenDialog(data?.[info.row.index])}
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
    columnHelper.accessor("time_active", {
      header: "Thời gian mã kích hoạt",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("time_finish", {
      header: "Thời gian hoàn thành",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: (data || []) as TIqrRES[],
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
  const handleOpenDialog = (info?: TIqrRES) => {
    setOpenDialog(!openDialog);
    setIqrDetail(info);
  };
  const onReject = async (code: string) => {
    await rejectIqr({ code })
      .unwrap()
      .then(() => {
        toast.success("Từ chối thông tin thành công");
        setOpenDialog(false);
        setIqrDetail(undefined);
      })
      .catch(() => {
        toast.error("Từ chối thông tin thất bại");
        setOpenDialog(false);
        setIqrDetail(undefined);
      });
  };
  const onConfirm = async (code: string) => {
    await confirmIqr({ code })
      .unwrap()
      .then(() => {
        toast.success("Xác nhận thông tin thành công");
        setOpenDialog(false);
        setIqrDetail(undefined);
      })
      .catch(() => {
        toast.error("Xác nhận thông tin thất bại");
        setOpenDialog(false);
        setIqrDetail(undefined);
      });
  };
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
            {isFetchingIqr ? (
              <tr>
                <td colSpan={table.getVisibleLeafColumns().length}>
                  <div className="tw-flex tw-justify-center tw-items-center tw-h-20">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
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
              ))
            )}
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
          <Typography variant="h5">
            Chắc Hạt Trúng To - Cào Ngay Trúng Lớn
          </Typography>
          <IconButton
            variant="text"
            className="!tw-absolute tw-top-5 tw-right-5"
            onClick={() => setOpenDialog(false)}
          >
            <XMarkIcon color="red" width={24} height={24} />
          </IconButton>
        </DialogHeader>

        <DialogBody className="tw-flex tw-gap-4 tw-flex-col">
          <div className="tw-flex tw-gap-6">
            <Image
              src={iqrDetail?.image_confirm || ""}
              width={192}
              height={192}
              alt="Product"
              className="tw-object-cover tw-w-48 tw-h-48"
            />
            <div>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.time_active}
              </Typography>
              <Typography variant="h5" color="gray">
                {iqrDetail?.product_name}
              </Typography>

              <Typography variant="paragraph" color="black">
                {iqrDetail?.fullname}
              </Typography>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.phone}
              </Typography>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.code}
              </Typography>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.province_name}
              </Typography>
              <Typography variant="h5" color="black">
                Giải thưởng:{" "}
                {iqrDetail?.award1 ||
                  iqrDetail?.award2 ||
                  "Chúc bạn may mắn lần sau"}
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="tw-gap-3">
          <Button
            variant="gradient"
            color="green"
            className="!tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
            loading={isLoadingConfirm}
            onClick={() => onConfirm(iqrDetail?.code || "")}
          >
            <span>Duyệt</span>
          </Button>
          <Button
            variant="text"
            color="red"
            className="!tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
            loading={isLoadingReject}
            onClick={() => onReject(iqrDetail?.code || "")}
          >
            <span>Từ chối</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* <Dialog
        open={previewImage !== ""}
        handler={() => setPreviewImage("")}
        size="lg"
      >
        <DialogHeader className="tw-text-green-500 tw-justify-center tw-items-center tw-flex-col tw-relative">
          <Typography variant="h3">Preview Hình Ảnh</Typography>

          <IconButton
            variant="text"
            className="!tw-absolute tw-top-5 tw-right-5"
            onClick={() => setPreviewImage("")}
          >
            <XMarkIcon color="red" width={24} height={24} />
          </IconButton>
        </DialogHeader>

        <DialogBody className="tw-flex tw-gap-4 tw-flex-col">
          <div className="tw-flex tw-gap-6">
            <Image
              src={iqrDetail?.image_confirm || ""}
              width={
              height={"100%"}
              alt="Product"
              className="tw-object-cover tw-w-48 tw-h-48"
            />
            <div>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.time_active}
              </Typography>
              <Typography variant="h5" color="gray">
                {iqrDetail?.product_name}
              </Typography>

              <Typography variant="paragraph" color="black">
                {iqrDetail?.fullname}
              </Typography>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.phone}
              </Typography>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.code}
              </Typography>
              <Typography variant="paragraph" color="black">
                {iqrDetail?.province_name}
              </Typography>
              <Typography variant="h5" color="black">
                Giải thưởng:{" "}
                {iqrDetail?.award1 ||
                  iqrDetail?.award2 ||
                  "Chúc bạn may mắn lần sau"}
              </Typography>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="tw-gap-3">
          <Button
            variant="gradient"
            color="green"
            className="!tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
            loading={isLoadingConfirm}
            onClick={() => onConfirm(iqrDetail?.code || "")}
          >
            <span>Duyệt</span>
          </Button>
          <Button
            variant="text"
            color="red"
            className="!tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
            loading={isLoadingReject}
            onClick={() => onReject(iqrDetail?.code || "")}
          >
            <span>Từ chối</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </Card>
  );
}
