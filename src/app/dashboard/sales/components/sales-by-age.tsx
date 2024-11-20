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
type Props = {};
type TData = {
  name?: string;
  total: number;
  activated: number;
  used: number;
};
const data: TData[] = [
  { name: "Nativo 10gr", total: 1000, activated: 200, used: 30 },
  { name: "Nativo 60gr", total: 3000, activated: 400, used: 10 },
  { name: "Nativo 120gr", total: 5000, activated: 500, used: 40 },
  { name: "Vayago 50ml", total: 7000, activated: 800, used: 90 },
  { name: "Vayago 75ml", total: 9000, activated: 1000, used: 70 },
];
export default function SalesByAge({}: Props) {
  return (
    <Card className="tw-border tw-border-blue-gray-100 tw-shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        className="tw-flex tw-justify-between tw-gap-8 tw-overflow-visible"
      >
        <Typography variant="h6" color="blue-gray">
          Mức độ tiêu thụ
        </Typography>
      </CardHeader>
      <CardBody className="!tw-p-0">
        <HorizontalBarChart
          height={295}
          colors={["#E57373", "#9575CD", "#64B5F6"]}
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
              categories: data.map((item) => item.name),
            },
            tooltip: {
              shared: true,
              intersect: false,
            },
            legend: {
              show: true,
              position: "top",
            },
          }}
          //@ts-expect-error no check
          series={[
            {
              name: "Tổng mã",
              data: data.map((item) => item.total),
            },
            {
              name: "Mã kích hoạt",
              data: data.map((item) => item.activated),
            },
            {
              name: "Mã sử dụng",
              data: data.map((item) => item.used),
            },
          ]}
        />
      </CardBody>
    </Card>
  );
}
