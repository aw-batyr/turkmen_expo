"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { SliderTypes } from "@/lib/types/SliderData.type";

import "swiper/css/pagination";
import { baseAPI } from "@/lib/API";

export default () => {
  const [bannersData, setBannersData] = React.useState<SliderTypes>();
  const [smallBannersData, setSmallBannersData] = React.useState<SliderTypes>();
  const [mediumBannersData, setMediumBannersData] =
    React.useState<SliderTypes>();
  const { activeLang } = useAppSelector(selectHeader);
  const progressCircle = React.useRef<SVGSVGElement>(null);

  const [bannersTotal, setBannersTotal] = useState<number>();

  const onAutoplayTimeLeft = (
    s: SwiperCore,
    time: number,
    progress: number
  ) => {
    if (progressCircle.current && progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
    }
  };
  const fetchMainBanners = async () => {
    try {
      const response = await fetch(
        `${baseAPI}banners/main-banner?X-Localization=${activeLang.localization}`
      );

      const data = await response.json();
      setBannersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMediumBanners = async () => {
    try {
      const res = await fetch(
        `${baseAPI}banners/medium-banner?X-Localization=${activeLang.localization}`
      );

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();

      setMediumBannersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSmallBanners = async () => {
    try {
      const res = await fetch(
        `${baseAPI}banners/small-banner?X-Localization=${activeLang.localization}`
      );

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();

      setSmallBannersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchMainBanners();
    fetchMediumBanners();
    fetchSmallBanners();
  }, []);

  return (
    <>
      <div className="hidden min-[1250px]:block">
        <div className="relative z-10 h-fit pb-5 md:pb-0">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            slidesPerView={1}
            pagination={{ type: "fraction" }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            // loop
            speed={1500}
            autoplay={{ delay: 10000 }}
          >
            {bannersData
              ? bannersData.data.banner_items.map((item) => (
                  <SwiperSlide key={v4()}>
                    <Link href={""}>
                      <div className="">
                        <Image
                          src={item.image}
                          alt="Баннер"
                          width={1920}
                          height={490}
                          className="h-[490px] object-cover object-center w-[1920px]"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : null}

            <div className="container absolute right-0 bottom-[25px] swiper-pagination swiper-pagination-horizontal">
              <div className="swiper-pagination-fraction items-center justify-end gap-4">
                <div className="autoplay-progress w-[200px] flex items-center gap-5 bg-bgWhite rounded-full">
                  <svg ref={progressCircle}>
                    <line viewBox="0 0 63 5" x1={0} x2={63} />
                  </svg>
                </div>
              </div>
            </div>
          </Swiper>
        </div>
      </div>

      <div className="hidden md:block min-[1250px]:hidden">
        <div className="relative z-10 h-fit pb-5 md:pb-0">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            slidesPerView={1}
            pagination={{ type: "fraction" }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            // loop
            speed={1500}
            autoplay={{ delay: 10000 }}
          >
            {mediumBannersData
              ? mediumBannersData.data.banner_items.map((item) => (
                  <SwiperSlide key={v4()}>
                    <Link href={""}>
                      <div className="">
                        <Image
                          src={item.image}
                          alt="Баннер"
                          width={1920}
                          height={490}
                          className="h-[490px] object-cover object-center w-[1920px]"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : null}

            <div className="container absolute right-0 bottom-[25px] swiper-pagination swiper-pagination-horizontal swiper-pagination-fraction">
              <div className="absolute right-0 bottom-0 autoplay-progress bg-bgWhite rounded-full">
                <svg ref={progressCircle}>
                  <line viewBox="0 0 63 5" x1={0} x2={63} />
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="relative z-10 h-fit pb-5 md:pb-0">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            slidesPerView={1}
            pagination={{ type: "fraction" }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            // loop
            speed={1500}
            autoplay={{ delay: 10000 }}
          >
            {smallBannersData
              ? smallBannersData.data.banner_items.map((item) => (
                  <SwiperSlide key={v4()}>
                    <Link href={""}>
                      <div className="">
                        <Image
                          src={item.image}
                          alt="Баннер"
                          width={1920}
                          height={490}
                          className="h-[490px] object-cover object-center w-[1920px]"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              : null}

            <div className="container absolute right-0 bottom-[25px] swiper-pagination swiper-pagination-horizontal swiper-pagination-fraction">
              <div className="absolute right-0 bottom-0 autoplay-progress bg-bgWhite rounded-full">
                <svg ref={progressCircle}>
                  <line viewBox="0 0 63 5" x1={0} x2={63} />
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};
