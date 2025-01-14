"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

const useBannerType = () => {
  const isTab = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 700px)");

  if (isTab) return "main-surat";
  if (isMd) return "medium-surat";
  return "small-surat";
};

export const SliderClient = ({
  defaultBannerType,
}: {
  defaultBannerType: string;
}) => {
  const [data, setData] = useState<any>(null);
  const bannerType = useBannerType();

  useEffect(() => {
    if (bannerType === defaultBannerType) return; // Не обновляем, если тип баннера совпадает

    const fetchData = async () => {
      const res = await fetch(`/api/banners?bannerType=${bannerType}`, {
        headers: {
          "Accept-Language": "ru",
        },
      });
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, [bannerType, defaultBannerType]);

  if (!data) return null; // Пока данные не обновились, ничего не рендерим

  return (
    <Image
      src={data.data.banner_items?.[0]?.image || ""}
      alt="Баннер"
      width={1920}
      height={600}
      className="object-cover max-h-[600px] lg:hidden min-h-[320px] size-full object-center"
    />
  );
};
