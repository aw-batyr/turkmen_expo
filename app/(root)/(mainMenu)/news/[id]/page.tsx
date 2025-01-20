"use client";

import React from "react";
import Image from "next/image";

import { GreenBtn } from "@/components/ui/Buttons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectHeader, setShowInput } from "@/redux/slices/headerSlice";
import { baseAPI } from "@/lib/API";
import { NewsPageType } from "@/lib/types/NewsPage.type";
import Link from "next/link";
import { BreadCrumbs } from "@/components/ui/bread-crumbs";
import { Title } from "@/components/ui/title";
import Loader from "@/components/ui/Loader";

export default function SingleNewsPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();

  const { activeLang } = useAppSelector(selectHeader);
  const [newsItemData, setNewsItemData] = React.useState<NewsPageType>();

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseAPI}news/${params.id}`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      if (!response.ok) {
        throw new Error("error");
      }

      const data = await response.json();

      setNewsItemData(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchData();
    dispatch(setShowInput(false));
  }, [activeLang.localization]);

  return (
    <div className="section-mb w-full">
      <BreadCrumbs second="Новости" path="/news" third="Статья" />
      {newsItemData ? (
        <div className="mb-5">
          <Title text={newsItemData.data.title} />
        </div>
      ) : (
        <Loader />
      )}

      <div className="flex items-center justify-between mb-[44px] md:mb-8">
        <p className="text-[#919599]">{newsItemData?.data.published_at}</p>
      </div>

      {newsItemData?.data?.featured_images?.[0]?.path && (
        <Image
          height={480}
          width={833}
          src={newsItemData?.data.featured_images[0]?.path || ""}
          alt="картинка"
          className="mb-6 max-h-[480px] object-cover w-full"
        />
      )}
      <div className="mb-[50px]">
        {newsItemData && (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: newsItemData.data.content_html,
              }}
              className="text-[16px] flex flex-col gap-6 leading-[150%] seperate-news-html"
            />
            <br />
          </>
        )}
      </div>

      <Link href="/news" className="flex justify-center">
        <GreenBtn text="Все новости" px />
      </Link>
    </div>
  );
}
