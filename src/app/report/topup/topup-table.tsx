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
  Spinner,
} from "@material-tailwind/react";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ChevronUpDownIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/solid";
import {
  useTopupCounterQuery,
  useTopupRangeDateQuery,
  useTopupTodayQuery,
} from "@/redux/api/topup/topup.api";
import { TTopupRES } from "@/redux/api/topup/topup.response";
import { TTopupRangeTimeREQ } from "@/redux/api/topup/topup.request";

type Props = {
  query: TTopupRangeTimeREQ;
  setQuery: (query: TTopupRangeTimeREQ) => void;
};
export default function TopupTable({ query, setQuery }: Props) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const { data, isFetching } = useTopupRangeDateQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: topupCounter } = useTopupCounterQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TTopupRES>();

  // Define columns with type safety
  const columns: ColumnDef<TTopupRES, any>[] = [
    // columnHelper.accessor("programName", {
    //   header: "Tên chương trình",
    //   cell: (info) => info.getValue(),
    //   footer: (info) => info.column.id,
    // }),
    columnHelper.accessor("code", {
      header: "Mã iQr",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("customerName", {
      header: "Tên khách hàng",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("phone", {
      header: "Số điện thoại",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),

    // columnHelper.accessor("provinceName", {
    //   header: "Tên tỉnh",
    //   cell: (info) => info.getValue(),
    //   footer: (info) => info.column.id,
    // }),
    // columnHelper.accessor("area", {
    //   header: "Khu vực",
    //   cell: (info) => info.getValue(),
    //   footer: (info) => info.column.id,
    // }),
    columnHelper.accessor("price", {
      header: "Giá",
      cell: (info) =>
        info.getValue() !== null ? info.getValue().toLocaleString() : "N/A",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("id", {
      header: "Mã giao dịch",
      cell: (info) =>
        info.getValue() !== null ? info.getValue().toLocaleString() : "N/A",
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("time", {
      header: "Thời gian giao dịch",
      cell: (info) => new Date(info.getValue()).toLocaleString(), // Format the date for display
      footer: (info) => info.column.id,
    }),
    // columnHelper.accessor("status", {
    //   header: "Trạng thái",
    //   cell: (info) => (info.getValue() === 0 ? "Thành công" : "Thất bại"), // Map status codes to labels
    //   footer: (info) => info.column.id,
    // }),
  ];
  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting: sorting,
      pagination: {
        pageIndex: 0,
        pageSize: query.sz || 6,
      },
    },
    pageCount: Math.ceil((topupCounter || 1) / (query?.sz || 1)),

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
            value={query?.sz || 6}
            onChange={(e) => {
              setQuery({ ...query, nu: 0, sz: Number(e.target.value) });
            }}
            className="tw-border tw-p-2 tw-border-blue-gray-100 tw-rounded-lg tw-max-w-[70px] tw-w-full"
          >
            {[6, 12, 18].map((pageSize) => (
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
            defaultValue={query.k}
            onChange={(e) => {
              setQuery({ ...query, nu: 0, k: e.target.value });
            }}
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
                      color="black"
                      className="tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-gap-2 tw-text-xs !tw-font-bold tw-leading-none"
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
            {isFetching ? (
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
            {(query?.nu || 0) + 1} / {table.getPageCount()}
          </strong>
        </span>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              setQuery({ ...query, nu: (query?.nu || 0) - 1 });
            }}
            disabled={(query?.nu || 0) - 1 < 0}
            className="disabled:tw-opacity-30"
          >
            <ChevronLeftIcon className="tw-w-4 tw-h-4 tw-stroke-blue-gray-900 tw-stroke-2" />
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              setQuery({ ...query, nu: (query?.nu || 0) + 1 });
            }}
            disabled={(query?.nu || 0) + 1 >= table.getPageCount()}
            className="disabled:tw-opacity-30"
          >
            <ChevronRightIcon className="tw-w-4 tw-h-4 tw-stroke-blue-gray-900 tw-stroke-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
