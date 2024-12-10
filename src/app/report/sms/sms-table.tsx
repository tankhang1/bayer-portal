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
  Spinner,
} from "@material-tailwind/react";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import {
  useBrandnameCounterQuery,
  useBrandnameRangeDateQuery,
  useBrandnameTodayQuery,
} from "@/redux/api/brandname/brandname.api";
import { TBrandnameRES } from "@/redux/api/brandname/brandname.response";
import { TBrandnameRangeTimeREQ } from "@/redux/api/brandname/brandname.request";

type Props = {
  query: TBrandnameRangeTimeREQ;
  setQuery: (query: TBrandnameRangeTimeREQ) => void;
};

export default function SMSTable({ query, setQuery }: Props) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  // const [data] = useState(() => [...DATA]);
  const { data, isFetching } = useBrandnameRangeDateQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const { data: brandnameCounter } = useBrandnameCounterQuery(query, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TBrandnameRES>();

  // Define columns with type safety
  const columns: ColumnDef<TBrandnameRES, any>[] = [
    columnHelper.accessor("code", {
      header: "Mã iQr",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("transactionId", {
      header: "Mã giao dịch",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("content", {
      header: "Nội dung",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("time", {
      header: "Thời gian topup",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      globalFilter: filtering,
      sorting: sorting,
      pagination: {
        pageIndex: query.nu || 0,
        pageSize: query.sz || 20,
      },
    },
    manualPagination: true,
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
        <div className="tw-w-52">
          <Input
            variant="outlined"
            onChange={(e) => setQuery({ ...query, k: e.target.value })}
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
                    <div className="tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-gap-2 tw-text-xs !tw-font-bold tw-leading-none">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <ChevronUpDownIcon className="tw-h-4 tw-w-4" />
                    </div>
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
                      <div className="!tw-font-medium !tw-text-blue-gray-500 tw-py-2 tw-px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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
    </Card>
  );
}
