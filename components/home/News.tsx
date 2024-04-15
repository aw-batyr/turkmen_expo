"use client";

import React from "react";
import { v4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { NewsCard } from "../cards/NewsCard";
import { NavBtn } from "./ui/NavBtn";
import { GreenBtn, GreenBtnMob } from "../ui/Buttons";
import { Title } from "./Title";

import { newsCardData } from "@/lib/database/newsData";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { NewsData } from "@/lib/types/NewsData.type";

import "swiper/css/bundle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

export const News = () => {
  const [newsData, setNewsData] = React.useState<NewsData>();

  const { activeLang } = useAppSelector(selectHeader);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://turkmenexpo.com/app/api/v1/news?X-Localization=${activeLang.localization}`
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div className="container w-full">
        <header className="flex items-center mb-5 sm:mb-[43px] justify-between">
          <Title text="Новости" />
          <div className="hidden sm:flex items-center gap-x-[20px]">
            <NavBtn left />
            <NavBtn />
          </div>
        </header>

        <div className="mb-[35px] hidden lg:block">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {newsData?.data.map((item) => (
              <SwiperSlide key={v4()}>
                <NewsCard
                  key={v4()}
                  id={item.id}
                  title={item.title}
                  date={item.published_at}
                  img={
                    item.featured_images.length > 0
                      ? item.featured_images[0].path
                      : newsData.data[0].featured_images[0].path
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mb-[35px] hidden lg:hidden px850:block">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3.5}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {newsData?.data.map((item) => (
              <SwiperSlide key={v4()}>
                <NewsCard
                  key={v4()}
                  id={item.id}
                  title={item.title}
                  date={item.published_at}
                  img={
                    item.featured_images.length > 0
                      ? item.featured_images[0].path
                      : newsData.data[0].featured_images[0].path
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mb-[35px] hidden px850:hidden md:block">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2.5}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {newsData?.data.map((item) => (
              <SwiperSlide key={v4()}>
                <NewsCard
                  key={v4()}
                  id={item.id}
                  title={item.title}
                  date={item.published_at}
                  img={
                    item.featured_images.length > 0
                      ? item.featured_images[0].path
                      : newsData.data[0].featured_images[0].path
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mb-[35px] hidden md:hidden sm:block">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {newsData?.data.map((item) => (
              <SwiperSlide key={v4()}>
                <NewsCard
                  key={v4()}
                  id={item.id}
                  title={item.title}
                  date={item.published_at}
                  img={
                    item.featured_images.length > 0
                      ? item.featured_images[0].path
                      : newsData.data[0].featured_images[0].path
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden mb-[35px] mob:block sm:hidden">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.5}
            spaceBetween={20}
            pagination={{ type: "bullets", el: ".swiper-pagination" }}
            className="h-auto"
          >
            {newsData?.data.map((item) => (
              <SwiperSlide key={v4()}>
                <NewsCard
                  mobile
                  key={v4()}
                  id={item.id}
                  title={item.title}
                  date={item.published_at}
                  img={
                    item.featured_images.length > 0
                      ? item.featured_images[0].path
                      : newsData.data[0].featured_images[0].path
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mb-[35px] mob:hidden">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ type: "bullets", el: ".swiper-pagination" }}
            className="h-auto"
          >
            {newsData
              ? newsData?.data.map((item) => (
                  <SwiperSlide key={v4()}>
                    <NewsCard
                      mobile
                      key={v4()}
                      id={item.id}
                      title={item.title}
                      date={item.published_at}
                      img={
                        item.featured_images.length > 0
                          ? item.featured_images[0].path
                          : newsData.data[0].featured_images[0].path
                      }
                    />
                  </SwiperSlide>
                ))
              : null}
            <div className="sm:hidden block swiper-pagination swiper-pagination-horizontal mb-[65px]"></div>
            <footer className="flex justify-center mt-[72px]">
              <Link href={"/news"}>
                <GreenBtnMob text="Все новости" />
              </Link>
            </footer>
          </Swiper>
        </div>

        <footer className="hidden sm:flex justify-center">
          <Link href={"/news"}>
            <GreenBtn text="Все новости" />
          </Link>
        </footer>
      </div>
    </>
  );
};
