'use client';

import React from 'react';
import { v4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { NewsCard } from '../cards/NewsCard';
import { NavBtn } from './ui/NavBtn';
import { GreenBtn } from '../ui/Buttons';
import { Title } from './Title';

import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { NewsData } from '@/lib/types/NewsData.type';

import 'swiper/css/bundle';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';
import { useLang } from '@/utils/useLang';

export const News = () => {
  const [newsData, setNewsData] = React.useState<NewsData>();

  const { activeLang } = useAppSelector(selectHeader);

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://turkmenexpo.com/app/api/v1/news`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, [activeLang.localization]);

  return (
    <>
      <div className="container w-full">
        <header className="flex items-center mb-5 sm:mb-[43px] justify-between">
          <Title text={useLang('News', 'Новости')} />
          <div className="hidden sm:flex items-center gap-x-[20px]">
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
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
            }}>
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

        <footer className="hidden sm:flex justify-center">
          <Link href={'/news'}>
            <GreenBtn text={useLang('All news', 'Все новости')} />
          </Link>
        </footer>
      </div>
    </>
  );
};
