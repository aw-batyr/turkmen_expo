"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { NewsCard } from "../cards/NewsCard";
import { NavBtn } from "./ui/NavBtn";
import { GreenBtn } from "../ui/Buttons";
import { Title } from "./Title";

import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { NewsData } from "@/lib/types/NewsData.type";

import "swiper/css/bundle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { useLang } from "@/utils/useLang";
import Loader from "../ui/Loader";

export const News = () => {
  const [newsData, setNewsData] = React.useState<NewsData>();
  const [loading, setLoading] = useState(true);

  const { activeLang } = useAppSelector(selectHeader);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://turkmenexpo.com/app/api/v1/news`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, [activeLang.localization]);

  if (loading) {
    <Loader className="h-[300px] w-full mx-auto" />;
  }

  return (
    <>
      <div className="container w-full">
        <header className="flex items-center mb-5 sm:mb-[43px] justify-between">
          <Title text={useLang("News", "Новости", activeLang.localization)} />
          <div className="hidden sm:flex items-center gap-5">
            <NavBtn left />
            <NavBtn />
          </div>
        </header>

        <div className="mb-[35px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              1024: { slidesPerView: 4 },
              850: { slidesPerView: 3.5 },
              768: { slidesPerView: 2.5 },
              640: { slidesPerView: 2 },
              440: { slidesPerView: 1.5 },
            }}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {loading ? (
              <Loader className="h-[300px]" />
            ) : (
              newsData?.data.map((item, i) => (
                <SwiperSlide key={i}>
                  <NewsCard
                    id={item.id}
                    title={item.title}
                    date={item.published_at}
                    img={item.featured_images[0].path}
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        <footer className="hidden sm:flex justify-center">
          <Link href={"/news"}>
            <GreenBtn
              text={useLang("All news", "Все новости", activeLang.localization)}
            />
          </Link>
        </footer>
      </div>
    </>
  );
};
