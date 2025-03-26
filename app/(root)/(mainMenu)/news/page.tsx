"use client";

import React, { useEffect, useState } from "react";

import { useLang } from "@/utils/useLang";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { NewsData } from "@/lib/types/NewsData.type";
import { baseAPI } from "@/lib/API";
import Loader from "@/components/ui/Loader";
import clsx from "clsx";
import { Card } from "@/components/news/Card";
import { BorderBtn } from "@/components/ui/Buttons";
import { Pagination } from "@/components/ui/Pagination";
import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";

const News = () => {
  const { activeLang } = useAppSelector(selectHeader);

  const menu = ["Новости", "СМИ о нас"];
  const [current, setCurrent] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(6);
  const [totalNews, setTotalNews] = React.useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [current]);

  const [newsData, setNewsData] = React.useState<NewsData>();

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseAPI}news?page=${current}&per_page=${perPage}`,
        {
          headers: {
            "Accept-Language": activeLang.localization,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data: NewsData = await response.json();
      setNewsData(data);
      setTotalNews(data.meta.total);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, [current, perPage, activeLang.localization]);

  const handleOnClickButton = () => {
    setPerPage((prev) => prev + 6);
  };

  if (loading) {
    return <Loader className="h-[500px] mx-auto w-full " />;
  }

  return (
    <div>
      <LayoutWithSidebar
        title={useLang("News", "Новости", activeLang.localization)}
        second={useLang("News", "Новости", activeLang.localization)}
        cursor={false}
      >
        <div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="hidden sm:flex justify-between items-center pb-[5px] ">
                <div className="pointer-events-none opacity-0 flex items-center gap-5">
                  {menu.map((item, i) => (
                    <p key={i} className="cursor-pointer leading-[130%]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div
                className={clsx(
                  "mb-[48px] lg:mb-[108px]",
                  "grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 lg:gap-y-10"
                )}
              >
                {newsData &&
                  newsData.data.map((item, i) => (
                    <Card
                      key={i}
                      id={item.id}
                      title={item.title}
                      date={item.published_at}
                      img={
                        item.featured_images.length > 0
                          ? item.featured_images[0].path
                          : newsData.data[0].featured_images[0].path
                      }
                    />
                  ))}
              </div>

              <div className="hidden sm:flex flex-col gap-6 w-full max-w-[180px] mx-auto justify-center items-center">
                {newsData && totalNews > perPage && perPage >= totalNews && (
                  <div onClick={handleOnClickButton}>
                    <BorderBtn px text={"Показать ещё"} />
                  </div>
                )}

                {newsData?.meta && (
                  <Pagination
                    current={current}
                    setCurrent={setCurrent}
                    totalPage={newsData?.meta.total}
                    lastPage={newsData?.meta.last_page}
                    currentPage={newsData?.meta.current_page}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutWithSidebar>
    </div>
  );
};

export default News;
