"use client";
import { useEffect, useState } from "react";

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
  PencilSquareIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  useIqrCounterQuery,
  useIqrRangeDateQuery,
  useIqrSearchCounterQuery,
  useIqrSearchQuery,
  useIqrTodayQuery,
} from "@/redux/api/iqr/iqr.api";
import { TIqrRES } from "@/redux/api/iqr/iqr.response";
import {
  useConfirmIqrMutation,
  useRejectIqrMutation,
  useUpdateIqrMutation,
} from "@/redux/api/auth/auth.api";
import { toast } from "react-toastify";
import { TIqrRangeTimeREQ, TIqrUpdateREQ } from "@/redux/api/iqr/iqr.request";
import { useForm } from "react-hook-form";
import { uploadBase64Image } from "@/hooks/uploadFile";
type Props = {
  keyword: string;
};
const statusMap = new Map<number, string>([
  [-99, "Hệ thống bị gián đoạn"],
  [-1, "Thiết bị không hoạt động"],
  [-2, "Người khác quét mã"],
  [-3, "Mã không có trong lịch sử"],
  [-4, "Không tồn tại"],
  [-5, "Không có giải thưởng 1 và giải thưởng 2"],
  [-6, "Trạng thái sai"],
  [-7, "Đã thành công"],
  [-8, "Cập nhật trước khi xác nhận"],
  [0, "Quá trình mã thành công"],
  [1, "Chờ tải lên hình ảnh"],
  [2, "Xác nhận bởi đại lý"],
  [3, "Tải lên lại"],
  [4, "Đã xác nhận (hình ảnh đã tải lên)"],
]);

const MapLabel = new Map([
  ["xemay", "Xe máy Air Blade 125cc"],
  ["topup", "Nạp tiền 10.000VND"],
  ["tulanh", "Tủ lạnh Sharp 362L"],
  ["loaJBL", "Loa JBL Partybox110"],
  ["", "Không trúng thưởng"],
]);
export default function SearchTable({ keyword }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<TIqrUpdateREQ>();
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);
  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TIqrRES>();
  const [query, setQuery] = useState<Partial<TIqrRangeTimeREQ>>({
    nu: 0,
    sz: 20,
    gateway: 2,
    k: "",
  });
  const { data, isFetching: isFetchingIqr } = useIqrSearchQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: iqrCounter } = useIqrSearchCounterQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [rejectIqr, { isLoading: isLoadingReject }] = useRejectIqrMutation();
  const [confirmIqr, { isLoading: isLoadingConfirm }] = useConfirmIqrMutation();
  const [updateIqr, { isLoading: isLoadingUpdate }] = useUpdateIqrMutation();

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
      cell: (info) => MapLabel.get(info.getValue()),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("award2", {
      header: "Cơ hội 2",
      cell: (info) => MapLabel.get(info.getValue()),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phone", {
      header: "Số điện thoại",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("fullname", {
      header: "Tên khách hàng",
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
    columnHelper.accessor("status", {
      header: "Chỉnh sửa",
      cell: (info) => (
        <IconButton
          variant="outlined"
          className="tw-border-green-700"
          onClick={() => {
            setOpenEditForm(true);
            setValue("address", data?.[info.row.index]?.province_name || "");
            setValue("name", data?.[info.row.index]?.fullname || "");
            setValue(
              "image_confirm",
              data?.[info.row.index]?.image_confirm || ""
            );
            setValue("code", data?.[info.row.index]?.code || "");
          }}
        >
          <PencilSquareIcon className="tw-w-6 tw-h-6 tw-text-green-700" />
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
    pageCount: Math.ceil((iqrCounter ?? 0) / (query.sz || 1)),
    //@ts-ignore
    onPaginationChange: ({
      pageIndex,
      pageSize,
    }: {
      pageIndex: number;
      pageSize: number;
    }) => {
      setQuery({
        ...query,
        nu: pageIndex,
        sz: pageSize,
      });
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result.toString();
          console.log(base64String); // Log the Base64 string
          setValue("image_confirm", base64String); // Update the form value with the Base64 string
        }
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };
  const onReject = async (code: string) => {
    await rejectIqr({ code })
      .unwrap()
      .then((value) => {
        toast.success(statusMap.get(value.status));
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
      .then((value) => {
        toast.success(statusMap.get(value.status));
        setOpenDialog(false);
        setIqrDetail(undefined);
      })
      .catch(() => {
        toast.error("Xác nhận thông tin thất bại");
        setOpenDialog(false);
        setIqrDetail(undefined);
      });
  };
  const onUpdate = async (values: TIqrUpdateREQ) => {
    if (values.image_confirm.includes("https://")) {
      await updateIqr(values)
        .unwrap()
        .then((value) => {
          toast.success(statusMap.get(value.status));
          setOpenEditForm(false);
        })
        .catch(() => {
          toast.error("Cập nhật thông tin thất bại");
          setOpenEditForm(false);
        });
    } else {
      setIsLoadingUploadImage(true);
      await uploadBase64Image(values.image_confirm, values.code);
      await updateIqr({
        ...values,
        image_confirm: `https://reactive.yis.vn/upload-files/bayer/${values.code}.jpg`,
      })
        .unwrap()
        .then((value) => {
          toast.success(statusMap.get(value.status));
          setOpenEditForm(false);
          setIsLoadingUploadImage(false);
        })
        .catch(() => {
          toast.error("Cập nhật thông tin thất bại");
          setOpenEditForm(false);
          setIsLoadingUploadImage(false);
        });
    }
  };
  useEffect(() => {
    setQuery({ ...query, k: keyword });
  }, [keyword]);
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
            {[20, 30, 40].map((pageSize) => (
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
      </CardBody>
      <CardFooter className="tw-p-0 tw-overflow-scroll">
        <table className="tw-table-auto tw-text-left tw-w-full tw-min-w-max">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={Math.random()}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={Math.random()}
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
          <Typography variant="h5">Cào Nhanh Tay - Trúng Quà Ngay</Typography>
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
              onClick={() => setPreviewImage(iqrDetail?.image_confirm || "")}
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
      <Dialog open={previewImage !== ""} handler={() => setPreviewImage("")}>
        <DialogHeader className="tw-text-green-500 tw-justify-center tw-items-center tw-flex-col tw-relative">
          <Typography variant="h3">Hình ảnh xác thực</Typography>

          <IconButton
            variant="text"
            className="!tw-absolute tw-top-5 tw-right-5"
            onClick={() => setPreviewImage("")}
          >
            <XMarkIcon color="red" width={24} height={24} />
          </IconButton>
        </DialogHeader>

        <DialogBody className="tw-flex tw-justify-center tw-items-center">
          <Image
            src={previewImage || ""}
            width={300}
            height={300}
            alt="Product"
            className="tw-object-cover tw-w-[420px] tw-h-[420px]"
          />
        </DialogBody>
      </Dialog>
      <Dialog open={openEditForm} handler={setOpenEditForm}>
        <DialogHeader className="tw-text-green-500 tw-justify-center tw-items-center tw-flex-col tw-relative">
          <Typography variant="h3">Cập nhật thông tin</Typography>
        </DialogHeader>

        <DialogBody className="tw-flex tw-flex-col tw-gap-3">
          <div className="tw-flex tw-flex-col tw-gap-3 tw-justify-center tw-items-center">
            <Input
              placeholder="Hình ảnh giấy chứng nhận"
              label="Hình ảnh giấy chứng nhận"
              type="file"
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            <Image
              src={watch().image_confirm}
              width={300}
              height={300}
              alt="Image"
              className="tw-w-64 tw-h-64"
            />
          </div>

          <Input
            placeholder="Tên nông dân"
            label="Tên nông dân"
            {...register("name")}
          />
          <Input
            placeholder="Địa chỉ"
            label="Địa chỉ"
            {...register("address")}
          />
        </DialogBody>
        <DialogFooter className="tw-gap-3">
          <Button
            variant="gradient"
            color="green"
            className="!tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
            loading={isLoadingUpdate || isLoadingUploadImage}
            onClick={handleSubmit(onUpdate)}
          >
            <span>Cập nhật</span>
          </Button>
          <Button
            variant="text"
            color="red"
            className="!tw-flex tw-gap-2 !tw-justify-center !tw-items-center"
            loading={isLoadingReject}
            onClick={() => setOpenEditForm(false)}
          >
            <span>Huỷ</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
