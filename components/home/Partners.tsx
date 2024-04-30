"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";

import { partnersData } from "@/lib/database/homeInfoData";

import { Title } from "./Title";
import { Autoplay, Pagination } from "swiper/modules";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { PartnersType } from "@/lib/types/PartnersData.type";
import { baseAPI } from "@/lib/API";

export const Partners = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const [partnersData, setPartnersData] = useState<PartnersType>();

  const fetchPartners = async () => {
    try {
      const res = await fetch(
        `${baseAPI}partners?X-Localization=${activeLang.localization}`
      );

      const data = await res.json();

      setPartnersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  return (
    <div className="container">
      <div className="mb-[40px]">
        <Title text="Партнёры" />
      </div>

      <div className="hidden lg:flex items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          slidesPerView={5}
          autoplay={{ delay: 0 }}
          spaceBetween={30}
          speed={7500}
          pagination={{ type: "bullets", el: ".swiper-pagination" }}
        >
          {partnersData
            ? partnersData.data.map((logo) => (
                <SwiperSlide key={v4()} className="h-[63px] overflow-hidden">
                  <Image
                    height={200}
                    width={200}
                    src={logo.images[0].path}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>

      <div className="hidden lg:hidden md:flex items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          slidesPerView={4.5}
          autoplay={{ delay: 0 }}
          spaceBetween={30}
          speed={7500}
          pagination={{ type: "bullets", el: ".swiper-pagination" }}
        >
          {partnersData
            ? partnersData.data.map((logo) => (
                <SwiperSlide key={v4()}>
                  <Image
                    height={200}
                    width={200}
                    src={logo.images[0].path}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>

      <div className="hidden md:hidden sm:flex items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          slidesPerView={3.5}
          autoplay={{ delay: 0 }}
          spaceBetween={30}
          speed={7500}
          pagination={{ type: "bullets", el: ".swiper-pagination" }}
        >
          {partnersData
            ? partnersData.data.map((logo) => (
                <SwiperSlide key={v4()}>
                  <Image
                    height={200}
                    width={200}
                    src={logo.images[0].path}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>

      <div className="sm:hidden flex items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          slidesPerView={2.5}
          autoplay={{ delay: 0 }}
          spaceBetween={30}
          speed={7500}
          pagination={{ type: "bullets", el: ".swiper-pagination" }}
        >
          {partnersData
            ? partnersData.data.map((logo) => (
                <SwiperSlide key={v4()}>
                  <Image
                    height={200}
                    width={200}
                    src={logo.images[0].path}
                    alt="logo"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
};
