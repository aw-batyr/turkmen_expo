"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderType } from "@/lib/types/SliderData.type";
import { useSliderBanner } from "@/hooks/use-slider";
import { useMediaQuery } from "usehooks-ts";
import { Autoplay, Pagination } from "swiper/modules";
import Loader from "../ui/Loader";
import { baseAPI } from "@/lib/API";
import Link from "next/link";

export const Slider = ({ lang }: { lang: string }) => {
  const isTab = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 700px)");

  const [sliderData, setData] = useState<SliderType>();
  const [loading, setLoading] = useState(true);
  const size = useSliderBanner(isTab, isMd);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseAPI}banners/${size}`, {
        headers: {
          "Accept-Language": lang,
        },
      });

      if (!res.ok) {
        throw new Error("Ошибка при загрузке данных");
      }

      const data: SliderType = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [size, lang]);

  console.log(sliderData);

  if (loading) return <Loader />;

  console.log(sliderData);

  return (
    <section className="max-h-[600px] min-h-[320px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 3000 }}
        speed={5000}
        slidesPerView={1}
        slidesPerGroup={1}
        className="size-full"
      >
        {sliderData &&
          sliderData?.data.banner_items.map((item, i) => (
            <SwiperSlide key={i} className="size-full cursor-pointer">
              <Link href={item.link ? item.link : ""} target="_blank">
                <Image
                  height={320}
                  width={1920}
                  src={item.image}
                  alt="Баннер"
                  className="object-cover size-full"
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
