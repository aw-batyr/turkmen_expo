'use client';
import React from 'react';
import Image from 'next/image';

import { Title } from '@/components/home/Title';
import { BorderBtn } from '@/components/ui/Buttons';

import message from '@/public/assets/icons/news/message.svg';
import img from '@/public/assets/images/news/1.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectHeader, setShowInput } from '@/redux/slices/headerSlice';
import { baseAPI } from '@/lib/API';
import { NewsPageType } from '@/lib/types/NewsPage.type';
import Link from 'next/link';
import { BreadCrumbs } from '@/components/ui/BreadCrumbs';

const page = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();

  const { activeLang } = useAppSelector(selectHeader);
  const [newsItemData, setNewsItemData] = React.useState<NewsPageType>();

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseAPI}news/${params.id}`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      if (!response.ok) {
        throw new Error('error');
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
      ) : null}

      <div className="flex items-center justify-between mb-[44px] md:mb-8">
        <p className="text-[#919599]">06.02.2024</p>
        {/* <div className="hidden sm:flex items-center cursor-pointer justify-center gap-[10px]">
          {newsItemData && <Image src={message} alt="Письмо" />}
          <p className="leading-[125%] text-extraSm">подписаться на новости</p>
        </div> */}
      </div>

      {newsItemData?.data.featured_images[0].path && (
        <Image
          height={480}
          width={833}
          src={newsItemData?.data.featured_images[0].path}
          alt="картинка"
          className="mb-6 h-[480px] object-cover w-full"
        />
      )}
      <div className="mb-[50px]">
        {newsItemData ? (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: newsItemData.data.content_html,
              }}
              className="text-[16px] leading-[150%]"
            />
            <br />
          </>
        ) : null}
      </div>

      <div className="flex justify-center">
        <Link href="/news">
          <BorderBtn text="Все новости" px />
        </Link>
      </div>
    </div>
  );
};

export default page;
