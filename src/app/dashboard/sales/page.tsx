"use client";
import dynamic from "next/dynamic";
import Topup from "@/assets/image/topup.png";
import Driver from "@/assets/image/driver.png";
import Speaker from "@/assets/image/speaker.png";
import Fridge from "@/assets/image/fridge.png";

const SalesByAge = dynamic(() => import("./components/sales-by-age"), {
  ssr: false,
});

const Channels = dynamic(() => import("./components/channels"), {
  ssr: false,
});

const IQrTable = dynamic(() => import("./components/iqr-table"), {
  ssr: false,
});
import AwardItem from "./components/AwardItem";
import { useGetDashboardStatisticQuery } from "@/redux/api/dashboard/dashboard.api";
import { TDashboardRES } from "@/redux/api/dashboard/dashboard.response";
import { useCallback, useMemo } from "react";
type MappedData = {
  [key: string]: TDashboardRES[];
};

export default function SalesPage() {
  const { data } = useGetDashboardStatisticQuery({});
  const extractCategory = (award: string): string => {
    const parts = award.split("_");
    return parts.length > 1 ? parts.slice(0, -1).join("_") : award;
  };
  const mapByCategory = useCallback((data: TDashboardRES[]): MappedData => {
    return data.reduce<MappedData>((acc, item) => {
      const category = extractCategory(item.award);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, []);

  const mapValue = useMemo(
    () => mapByCategory(data || []),
    [data, mapByCategory]
  );
  return (
    <div className="tw-mt-8 tw-mb-4">
      {/* <SalesCard /> */}
      <h2 className="tw-text-[#40aea3] tw-text-3xl tw-font-bold tw-mb-2">
        Thống kê
      </h2>
      <div className="tw-grid tw-grid-cols-1 tw-gap-y-6 md:tw-grid-cols-2 lg:tw-grid-cols-3 lg:tw-gap-x-6">
        {/** Pie Chart */}
        <Channels data={mapValue} />

        {/** Revenue Chart */}
        <div className="tw-col-span-2">
          <SalesByAge data={mapValue} />
        </div>
      </div>
      <h2 className="tw-text-[#40aea3] tw-text-3xl tw-font-bold tw-mt-7 tw-mb-2">
        SỐ GIẢI ĐÃ TRÚNG THƯỞNG
      </h2>

      {/** Horizontal Bar Chart */}
      <div className="tw-flex tw-items-start tw-justify-between tw-gap-5 tw-mb-7">
        <AwardItem
          image={Driver}
          title="Giải nhất"
          value={mapValue["xemay"]?.[0]?.total}
          imageStyle="tw-max-h-64 tw-mb-2"
        />
        <AwardItem
          image={Fridge}
          title="Giải nhì"
          value={mapValue["tulanh"]?.[0]?.total}
          imageStyle="tw-max-h-44"
        />
        <AwardItem
          image={Speaker}
          title="Giải ba"
          value={mapValue["loaJBL"]?.[0]?.total}
          imageStyle="tw-max-h-40"
        />
        <AwardItem
          image={Topup}
          title="Giải khuyển khích"
          value={mapValue["Topup"]?.[0]?.total}
        />
      </div>
      <h2 className="tw-text-[#40aea3] tw-text-3xl tw-font-bold tw-mt-7 tw-mb-2">
        IQR TRONG NGÀY
      </h2>
      <IQrTable />
    </div>
  );
}
