import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// @material-tailwind/react
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
  Drawer,
  Button,
} from "@material-tailwind/react";

// @heroicons/react

import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
  HomeIcon,
  Bars3CenterLeftIcon,
  EnvelopeIcon,
  MicrophoneIcon,
  ShoppingCartIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

// @context
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

const MAP_HEADER = new Map([
  ["/dashboard/sales", "Thống kê"],
  ["/iqr/iqr-list", "Quản lý iQr"],
  ["/topup/topup-list", "Quản lý topup"],
  ["/report", "Báo cáo"],
  ["/sms/sms-list", "Quản lý SMS"],
]);
export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const pathname = usePathname();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [openedDrawer, setOpenedDrawer] = React.useState(false);

  const openDrawer = () => setOpenedDrawer(true);
  const closeDrawer = () => setOpenedDrawer(false);
  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`tw-rounded-xl !tw-transition-all !tw-max-w-full ${
        fixedNavbar
          ? "!tw-sticky tw-top-4 tw-z-40 !tw-py-3 tw-shadow-md tw-shadow-blue-gray-500/5"
          : "!tw-px-0 !tw-py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="!tw-flex tw-flex-col !tw-justify-between tw-gap-2 md:!tw-flex-row md:tw-items-center">
        <div className="tw-capitalize">
          <div className="tw-flex tw-items-center tw-justify-between ">
            <Breadcrumbs
              className={`tw-bg-transparent !tw-p-0 tw-transition-all ${
                fixedNavbar ? "tw-mt-1" : ""
              }`}
            >
              <Link href="/iqr/iqr-list">
                <IconButton size="sm" variant="text">
                  <HomeIcon className="tw-h-4 tw-w-4 tw-text-gray-900" />
                </IconButton>
              </Link>
              <Typography
                variant="small"
                color="blue-gray"
                className="!tw-font-normal tw-opacity-50 tw-transition-all hover:!tw-text-blue-gray-700 hover:tw-opacity-100"
              >
                {layout}
              </Typography>
              {/* <Typography
              variant="small"
              color="blue-gray"
              className="!tw-font-normal"
            >
              {page?.split("-").join(" ")}
            </Typography> */}
            </Breadcrumbs>
          </div>
          <Typography variant="h6" color="blue-gray">
            {MAP_HEADER.get(pathname)}
          </Typography>
        </div>
        {/* <div className="!tw-flex tw-items-center">
          <div className="tw-mr-auto md:tw-mr-4 md:tw-w-56">
            <Input label="Search" />
          </div>
          <Link href="/auth/signin/basic">
            <IconButton variant="text">
              <UserCircleIcon className="tw-h-5 tw-w-5 tw-text-blue-gray-900" />
            </IconButton>
          </Link>
          <IconButton
            variant="text"
            color="blue-gray"
            className="tw-grid xl:tw-hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            {openSidenav ? (
              <Bars3Icon
                strokeWidth={3}
                className="tw-h-6 tw-w-6 tw-text-gray-900"
              />
            ) : (
              <Bars3CenterLeftIcon
                strokeWidth={3}
                className="tw-h-6 tw-w-6 tw-text-gray-900"
              />
            )}
          </IconButton>
          <IconButton
            variant="text"
            color="gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="tw-h-5 tw-w-5 tw-text-gray-900" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <span>
                <Badge>
                  <IconButton variant="text">
                    <BellIcon className="tw-h-5 tw-w-5 tw-text-gray-900" />
                  </IconButton>
                </Badge>
              </span>
            </MenuHandler>
            <MenuList className="!tw-w-max tw-border tw-border-blue-gray-100">
              <MenuItem className="tw-flex tw-items-center tw-gap-2">
                <EnvelopeIcon className="tw-h-5 tw-w-5 tw-text-gray-900" />
                <Typography variant="small" className="!tw-font-normal">
                  Check new messages
                </Typography>
              </MenuItem>
              <MenuItem className="tw-flex tw-items-center tw-gap-2">
                <MicrophoneIcon className="tw-h-5 tw-w-5 tw-text-gray-900" />
                <Typography variant="small" className="!tw-font-normal">
                  Manage Podcast sessions
                </Typography>
              </MenuItem>
              <MenuItem className="tw-flex tw-items-center tw-gap-2">
                <ShoppingCartIcon className="tw-h-5 tw-w-5 tw-text-gray-900" />
                <Typography variant="small" className="!tw-font-normal">
                  Payment successfully completed
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div> */}
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
