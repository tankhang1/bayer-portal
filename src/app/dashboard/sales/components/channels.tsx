"use client";
import React, { useMemo } from "react";

// @material-tailwind/react
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

// widgets
import { PieChart } from "@/widgets/charts";
import { TDashboardRES } from "@/redux/api/dashboard/dashboard.response";
type MappedData = {
  [key: string]: TDashboardRES[];
};
type Props = {
  data: MappedData;
};

export default function Channels({ data }: Props) {
  const mapValue = useMemo(() => {
    const total = data["iqr_total"]?.reduce(
      (preValue, curValue) => preValue + curValue.total,
      0
    );
    const active = data["iqr_active"]?.reduce(
      (preValue, curValue) => preValue + curValue.total,
      0
    );
    const used = data["iqr_used"]?.reduce(
      (preValue, curValue) => preValue + curValue.total,
      0
    );
    return {
      total: total,
      active,
      used,
      block: total - active,
    };
  }, [data]);
  return (
    <div className="tw-col-span-1 tw-overflow-y-auto">
      <Card className="tw-border tw-border-blue-gray-100 tw-shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          className="tw-mb-6 tw-flex tw-justify-between tw-gap-8 tw-overflow-visible"
        >
          <Typography variant="h6" color="blue-gray">
            iQr (Tổng cộng: {mapValue?.total?.toLocaleString("vi")} mã)
          </Typography>
        </CardHeader>
        <CardBody className="tw-flex">
          <PieChart
            height={270}
            series={[
              mapValue?.block,
              // mapValue?.total,
              mapValue?.active,
              mapValue?.used,
            ]}
            labels={[
              "Chưa kích hoạt",
              // "Tổng iQr",
              "Đã kích hoạt",
              "Đã sử dụng",
            ]}
            colors={["#D81B60", "#FFC107", "#43A047"]}
            options={{
              legend: {
                show: true,
                position: "bottom", // Moved legend to the bottom
                horizontalAlign: "center",
                offsetX: 0,
                offsetY: 0, // Adjust this if you need more space
                markers: {
                  width: 8,
                  height: 8,
                  radius: 8,
                },
                itemMargin: {
                  vertical: 4,
                },
                fontSize: "16px",
              },
              dataLabels: {
                enabled: true,
              },
              // responsive: [
              //   {
              //     breakpoint: 1580,
              //     options: {
              //       legend: {
              //         show: false,
              //       },
              //     },
              //   },
              // ],
              tooltip: {
                enabled: true,
                y: {
                  formatter: function (value: number) {
                    return `${value.toLocaleString("vi")} mã`;
                  },
                },
              },
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
