// @material-tailwind/react
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@/components/MaterialTailwind";

// @heroicons/react
import { ChevronDownIcon, DocumentIcon } from "@heroicons/react/24/outline";

// component
import dynamic from "next/dynamic";
const IQrTable = dynamic(() => import("./iqr-table"), {
  ssr: false,
});

export default function IqrPage() {
  return (
    <section className="tw-mb-4">
      <div className="tw-mt-8 tw-flex tw-items-center tw-justify-between">
        <h1 className="tw-text-3xl">Tìm kiếm thông tin</h1>

        <div className="tw-flex tw-shrink-0 tw-gap-2">
          <Menu>
            <MenuHandler>
              <Button
                variant="outlined"
                color="gray"
                className="tw-flex tw-items-center tw-gap-3"
              >
                Lọc trạng thái
                <ChevronDownIcon className="tw-h-3 tw-w-3 tw-stroke-3 tw-text-gray-900" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Đã duyệt</MenuItem>
              <MenuItem>Chờ duyệt</MenuItem>
              <MenuItem>Từ chối</MenuItem>
              <hr className="tw-w-32 tw-mt-2 tw-mb-1 tw-mx-auto" />
              <MenuItem className="tw-text-red-500">Xóa lọc</MenuItem>
            </MenuList>
          </Menu>
          <Button
            className="tw-flex tw-items-center tw-gap-3"
            variant="outlined"
            color="gray"
          >
            <DocumentIcon strokeWidth={2} className="tw-h-4 tw-w-4" /> Xuất file
          </Button>
        </div>
      </div>
      <IQrTable />
    </section>
  );
}
