import React from "react";
import Image from "next/image";
type TAwardItem = {
  image: any;
  title: string;
  value: number;
};
const AwardItem = ({ image, title, value }: TAwardItem) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1 tw-w-full">
      <div className="tw-justify-center tw-items-center tw-flex tw-bg-[#40aea3] tw-py-4 tw-text-white tw-font-bold tw-text-xl tw-rounded-t-lg">
        {title}
      </div>
      <div className="tw-flex tw-justify-center tw-items-center tw-py-4 tw-bg-[#40aea3]">
        <Image src={image} className="!tw-w-64" alt="" />
      </div>
      <div className="tw-justify-center tw-items-center tw-flex tw-bg-[#40aea3] tw-py-4 tw-text-white tw-font-bold tw-rounded-b-lg">
        {value}
      </div>
    </div>
  );
};

export default AwardItem;
