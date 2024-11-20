"use client";

import React from "react";

// @material-tailwind/react
import {
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

// @heroicons/react
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// widgets
import { LineChart } from "@/widgets/charts";

type Props = {};

export default function RevenueChart({}: Props) {
  return (
    <div className="tw-col-span-2">
      <Card className="tw-border tw-border-blue-gray-100 tw-shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          className="tw-flex tw-justify-between tw-gap-8 tw-overflow-visible"
        >
          <div>
            <Typography variant="h6" color="blue-gray">
              Thống kế sự biến động
            </Typography>
            <div className="tw-mt-2 tw-flex tw-items-center tw-gap-8">
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-[#1E88E5]" />
                <Typography className="tw-text-xs !tw-font-normal !tw-text-blue-gray-500">
                  Hồ Chí Minh
                </Typography>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-[#D81B60]" />
                <Typography className="tw-text-xs !tw-font-normal !tw-text-blue-gray-500">
                  Hà Nội
                </Typography>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-[#FFC107]" />
                <Typography className="tw-text-xs !tw-font-normal !tw-text-blue-gray-500">
                  Đà Nẵng
                </Typography>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-[#43A047]" />
                <Typography className="tw-text-xs !tw-font-normal !tw-text-blue-gray-500">
                  Cần Thơ
                </Typography>
              </div>
              <div className="tw-flex tw-items-center tw-gap-2">
                <span className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-[#6A1B9A]" />
                <Typography className="tw-text-xs !tw-font-normal !tw-text-blue-gray-500">
                  Hải Phòng
                </Typography>
              </div>
            </div>
          </div>
          <Tooltip content="See which ads perform better" placement="left">
            <ExclamationCircleIcon
              strokeWidth={1}
              className="tw-w-8 tw-h-8 !tw-text-blue-gray-600"
            />
          </Tooltip>
        </CardHeader>
        <CardBody className="tw-p-0">
          {/** Line Chart */}
          <LineChart
            colors={[
              "#1E88E5", // Hồ Chí Minh
              "#D81B60", // Hà Nội
              "#FFC107", // Đà Nẵng
              "#43A047", // Cần Thơ
              "#6A1B9A", // Hải Phòng
            ]}
            options={{
              xaxis: {
                categories: [
                  "Thứ Hai",
                  "Thứ Ba",
                  "Thứ Tư",
                  "Thứ Năm",
                  "Thứ Sáu",
                  "Thứ Bảy",
                  "Chủ Nhật",
                ],
              },
            }}
            series={[
              {
                name: "Hồ Chí Minh",
                data: [150, 170, 160, 180, 200, 220, 240],
              },
              {
                name: "Hà Nội",
                data: [120, 140, 130, 150, 160, 180, 200],
              },
              {
                name: "Đà Nẵng",
                data: [80, 90, 85, 95, 100, 110, 120],
              },
              {
                name: "Cần Thơ",
                data: [60, 70, 65, 75, 80, 85, 90],
              },
              {
                name: "Hải Phòng",
                data: [70, 75, 72, 78, 85, 90, 95],
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
