// @material-tailwind/react

// @heroicons/react
import {
  RectangleGroupIcon,
  QrCodeIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassCircleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  SignalSlashIcon
} from "@heroicons/react/24/solid";
import { FolderIcon } from "@heroicons/react/24/outline";

const icon = {
  className: "tw-w-5 tw-h-5 tw-text-inherit",
};

const text = {
  color: "inherit",
  className: "tw-w-5 tw-grid place-items-center !tw-font-medium",
};

export const routes = [
  {
    name: "dashboard",
    icon: <RectangleGroupIcon {...icon} />,
    path: "/dashboard/sales",
  },
  {
    name: "Danh sách trong ngày",
    pages: [
      // {
      //   icon: <QrCodeIcon {...icon} />,
      //   name: "Iqr trong ngày",
      //   path: "/iqr/iqr-list",
      // },
      {
        name: "Chưa xử lý",
        icon: <InformationCircleIcon {...icon} />,
        path: "/iqr/iqr-list/today/unknown",
      },
      {
        icon: <CheckIcon {...icon} />,
        name: "Đã duyệt",
        path: "/iqr/iqr-list/today/confirm",
      },
      {
        icon: <XMarkIcon {...icon} />,
        name: "Từ chối",
        path: "/iqr/iqr-list/today/reject",
      },
    ],
  },
  {
    name: "Danh sách iQr",
    pages: [
      {
        icon: <MagnifyingGlassCircleIcon {...icon} />,
        name: "Tra cứu",
        path: "/iqr/search",
      },
      {
        icon: <CheckIcon {...icon} />,
        name: "Danh sách đã duyệt",
        path: "/iqr/iqr-list/confirm",
      },
      {
        icon: <XMarkIcon {...icon} />,
        name: "Danh sách từ chối",
        path: "/iqr/iqr-list/reject",
      },
      {
        name: "Danh sách thiếu thông tin",
        icon: <SignalSlashIcon {...icon} />,
        path: "/iqr/iqr-list/missing-params",
      },
      {
        name: "Danh sách chưa xử lý",
        icon: <InformationCircleIcon {...icon} />,
        path: "/iqr/iqr-list/unknown",
      },
     
    ],
  },
  // {
  //   name: "Topup",
  //   icon: <GiftIcon {...icon} />,
  //   path: "/topup/topup-list",
  // },
  // {
  //   name: "SMS",
  //   icon: <ChatBubbleOvalLeftIcon {...icon} />,
  //   path: "/sms/sms-list",
  // },
  {
    name: "Báo cáo",
    icon: <ChartBarIcon {...icon} />,

    pages: [
      // {
      //   icon: <MagnifyingGlassCircleIcon {...icon} />,
      //   name: "Tra cứu",
      //   path: "/iqr/search",
      // },
      {
        icon: <QrCodeIcon {...icon} />,
        name: "iQr",
        path: "/report/iqr",
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Topup",
        path: "/report/topup",
      },
      {
        name: "SMS Brandname",
        icon: <ChatBubbleOvalLeftIcon {...icon} />,
        path: "/report/sms",
      },
    ],
  },
  {
    name: "Lịch sử xuất excel",
    icon: <FolderIcon {...icon} />,
    path: "/excel/history",
  },
];
export const routesBayer = [
  {
    name: "dashboard",
    icon: <RectangleGroupIcon {...icon} />,
    path: "/dashboard/sales",
  },
  {
    name: "Báo cáo",
    icon: <ChartBarIcon {...icon} />,

    pages: [
      // {
      //   icon: <MagnifyingGlassCircleIcon {...icon} />,
      //   name: "Tra cứu",
      //   path: "/iqr/search",
      // },
      {
        icon: <QrCodeIcon {...icon} />,
        name: "iQr",
        path: "/report/iqr",
      },
      {
        icon: <CurrencyDollarIcon {...icon} />,
        name: "Topup",
        path: "/report/topup",
      },
      {
        name: "SMS Brandname",
        icon: <ChatBubbleOvalLeftIcon {...icon} />,
        path: "/report/sms",
      },
    ],
  },
  {
    name: "Lịch sử xuất excel",
    icon: <FolderIcon {...icon} />,
    path: "/excel/history",
  },
];
export default routes;
