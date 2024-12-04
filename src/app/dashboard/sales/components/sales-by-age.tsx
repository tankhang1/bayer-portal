"use client";
import React from "react";

// @material-tailwind/react
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

// widgets
import { HorizontalBarChart } from "@/widgets/charts";
import { TDashboardRES } from "@/redux/api/dashboard/dashboard.response";
type TData = {
  name?: string;
  total: number;
  activated: number;
  used: number;
};
const MapLabel = new Map([
  [86784777, "NATIVO WG75 10G"],
  [86708957, "NATIVO WG75 60G"],
  [91123732, "NATIVO WG75 120G"],
  [85760823, "VAYEGO SC200 50ML"],
  [88657705, "VAYEGO SC200 75ML"],
]);
const data: TData[] = [
  { name: "Nativo 10gr", total: 1000, activated: 200, used: 30 },
  { name: "Nativo 60gr", total: 3000, activated: 400, used: 10 },
  { name: "Nativo 120gr", total: 5000, activated: 500, used: 40 },
  { name: "Vayago 50ml", total: 7000, activated: 800, used: 90 },
  { name: "Vayago 75ml", total: 9000, activated: 1000, used: 70 },
];
type MappedData = {
  [key: string]: TDashboardRES[];
};
type Props = {
  data: MappedData;
};

export default function SalesByAge({ data }: Props) {
  return (
    <Card className="tw-border tw-border-blue-gray-100 tw-shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        className="tw-flex tw-justify-between tw-gap-8 tw-overflow-visible"
      >
        <Typography variant="h6" color="blue-gray">
          Hiện trạng mã iQr
        </Typography>
      </CardHeader>
      <CardBody className="!tw-p-0">
        <HorizontalBarChart
          height={295}
          colors={["#D81B60", "#FFC107", "#43A047"]}
          options={{
            chart: {
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: "70%",
              },
            },
            xaxis: {
              categories: data["iqr_total"]?.map((item) =>
                MapLabel.get(+item.award.split("_")[2])
              ),
              labels: {
                style: {
                  colors: "black", // Set the label text color
                  fontSize: "12px", // Optional: Customize font size
                  fontWeight: "bold", // Optional: Customize font weight
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: "black", // Set the label text color for the y-axis
                  fontSize: "12px", // Optional: Customize font size
                  fontWeight: "bold", // Optional: Customize font weight
                },
              },
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: {
                formatter: function (value: number) {
                  return `${value.toLocaleString("vi")} mã`;
                },
              },
            },
            legend: {
              show: true,
              position: "top",
              fontSize: "14px",
            },
          }}
          //@ts-expect-error no check
          series={[
            {
              name: "Tổng mã",
              data: data["iqr_total"]?.map((item) => item.total),
            },
            {
              name: "Mã kích hoạt",
              data: data["iqr_active"]?.map((item) => item.total),
            },
            {
              name: "Mã sử dụng",
              data: data["iqr_used"]?.map((item) => item.total),
            },
          ]}
        />
      </CardBody>
    </Card>
  );
}
