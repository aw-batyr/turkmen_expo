"use client";

import React from "react";

import Image from "next/image";
import { v4 } from "uuid";
import clsx from "clsx";

import message from "@/public/assets/icons/news/message.svg";
import col from "@/public/assets/icons/news/col.svg";
import gridIco from "@/public/assets/icons/news/grid.svg";

import { BorderBtn } from "@/components/ui/Buttons";
import { Pagination } from "@/components/ui/Pagination";
import { Card } from "@/components/news/Card";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { NewsData } from "@/lib/types/NewsData.type";
import { baseAPI } from "@/lib/API";

export const NewsSec = () => {
  const menu = ["Новости", "СМИ о нас"];
  const [current, setCurrent] = React.useState<number>(1);

  const [grid, setGrid] = React.useState(true);
  const [newsData, setNewsData] = React.useState<NewsData>();

  const { activeLang } = useAppSelector(selectHeader);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${baseAPI}news?X-Localization=${activeLang.localization}&page=${current}&per_page=7`
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
  }, [current]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-[24px] pb-[5px]">
        <div className="pointer-events-none opacity-0 flex items-center gap-5">
          {menu.map((item) => (
            <p key={v4()} className="cursor-pointer leading-[130%]">
              {item}
            </p>
          ))}
        </div>
        <Image
          onClick={() => setGrid(!grid)}
          className="hidden sm:block cursor-pointer"
          src={!grid ? gridIco : col}
          alt="сетка"
        />
      </div>

      {/* <div className="hidden sm:flex w-full max-w-[184px] items-center cursor-pointer justify-center mx-auto mb-10 md:mb-[24px] gap-[10px]">
        <Image src={message} alt="Письмо" />
        <p className="leading-[125%] text-extraSm">подписаться на новости</p>
      </div> */}

      <div
        className={clsx("mb-[48px] lg:mb-[108px]", {
          "flex flex-col gap-6": !grid,
          "grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 lg:gap-y-[85px]":
            grid,
        })}
      >
        {newsData
          ? newsData.data.map((item) => (
              <Card
                grid={grid}
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
            ))
          : "Loading"}
      </div>

      <div className="hidden sm:flex flex-col gap-6 w-full max-w-[180px] mx-auto justify-center">
        {newsData && newsData.data.length > 7 && (
          <BorderBtn text={"Показать ещё"} />
        )}
        {newsData?.meta ? (
          <Pagination
            current={current}
            setCurrent={setCurrent}
            totalPage={newsData?.meta.total}
            lastPage={newsData?.meta.last_page}
            currentPage={newsData?.meta.current_page}
          />
        ) : null}
      </div>
    </div>
  );
};
