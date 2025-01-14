import React from "react";
import Image from "next/image";
import { getSlider } from "@/services/service";
import { json } from "stream/consumers";

export const Slider = async ({
  defaultBannerType,
}: {
  defaultBannerType: string;
}) => {
  const data = await getSlider(defaultBannerType);

  return (
    <Image
      src={data.data.banner_items?.[0]?.image || ""}
      alt="Баннер"
      width={1920}
      height={600}
      className="object-cover max-h-[600px] min-h-[320px] hidden lg:block size-full object-center"
    />
  );
};
