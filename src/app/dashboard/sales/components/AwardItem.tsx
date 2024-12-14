import React from "react";
import Image from "next/image";
type TAwardItem = {
  image: any;
  title: string;
  value: number;
  imageStyle?: string;
};
const AwardItem = ({ image, title, value, imageStyle }: TAwardItem) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1 tw-w-full">
      <div className="tw-justify-center tw-items-center tw-flex tw-bg-white tw-border tw-py-4 tw-text-black tw-font-bold tw-text-xl tw-rounded-t-lg">
        <p>{title}</p>
      </div>
      <div className="tw-flex tw-justify-center tw-items-end tw-py-4 tw-bg-white tw-border tw-h-64">
        <Image
          src={image}
          className={`tw-h-52 tw-w-4/5 tw-object-contain ${imageStyle}`}
          alt=""
        />
      </div>
      <div className="tw-justify-center tw-items-center tw-flex tw-bg-white tw-py-4 tw-text-black tw-border tw-text-4xl tw-font-bold tw-rounded-b-lg">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default AwardItem;
