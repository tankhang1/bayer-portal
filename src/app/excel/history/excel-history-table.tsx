"use client";
import React, { useState } from "react";

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
  Typography,
  Button,
  CardBody,
  CardFooter,
  Chip,
  Spinner,
  IconButton,
  Input,
} from "@material-tailwind/react";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ChevronUpDownIcon,
  FolderArrowDownIcon,
} from "@heroicons/react/24/solid";

import { useGetListHistoryFileQuery } from "@/redux/api/excel/excel.api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TExcelRES } from "@/redux/api/excel/excel.response";

export default function ExcelHistoryTable() {
  const { username } = useSelector((state: RootState) => state.app);

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  // Use the column helper for type safety
  const columnHelper = createColumnHelper<TExcelRES>();

  const { data, isLoading: isFetchingHistory } = useGetListHistoryFileQuery(
    {
      u: username,
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  // Define columns with type safety
  const columns: ColumnDef<TExcelRES, any>[] = [
    columnHelper.accessor("feature_code", {
      header: "Chức năng",
      cell: (info) => info.getValue() || "",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Trạng thái",
      cell: (info) =>
        info.getValue() === 1 ? (
          <Chip
            color="green"
            className="tw-justify-center"
            value="Hoàn thành"
          />
        ) : (
          <Chip
            color="yellow"
            className="tw-justify-center"
            value="Đang xử lý"
          />
        ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("status", {
      header: "Chức năng",
      cell: (info) =>
        info.getValue() === 1 && (
          <IconButton
            color="white"
            className="tw-mx-auto"
            onClick={() => {
              window.open(info.row.original.file_url, "_blank");
            }}
          >
            <FolderArrowDownIcon className="tw-w-6 tw-h-6 tw-text-green-600" />
          </IconButton>
        ),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("description", {
      header: "Mô tả",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("time_request", {
      header: "Thời gian yêu cầu",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("time_done", {
      header: "Thời gian hoàn thành",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: (data || []) as TExcelRES[],
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
        <div className="tw-w-2/4">
          <Input
            variant="outlined"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            label="Nhập thông tin"
          />
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
            {isFetchingHistory ? (
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
    </Card>
  );
}
