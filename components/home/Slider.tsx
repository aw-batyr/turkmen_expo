'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderType } from '@/lib/types/SliderData.type';
import { useSliderBanner } from '@/hooks/use-slider';
import { useMediaQuery } from 'usehooks-ts';
import { useAppSelector } from '@/redux/hooks';
import { Autoplay, Pagination } from 'swiper/modules';

export const Slider = async () => {
  const isTab = useMediaQuery('(min-width: 1024px)');
  const isMd = useMediaQuery('(min-width: 700px)');

  const lang = useAppSelector((state) => state.headerSlice.activeLang.localization);

  const [sliderData, setData] = useState<SliderType>();
  const size = useSliderBanner(isTab, isMd);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/banners?bannerType=${size}`, {
        headers: {
          'Accept-Language': lang,
        },
      });

      if (!res.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      const data: SliderType = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [size, lang]);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop
      autoplay={{ delay: 5000 }}
      slidesPerView={1}
      slidesPerGroup={1}>
      {sliderData &&
        sliderData?.data?.[0]?.banner_items?.map((item, i) => (
          <SwiperSlide key={i} className="max-h-[600px] min-h-[320px]">
            <Image
              src={item.image}
              alt="Баннер"
              width={1920}
              height={600}
              className="object-contain size-full object-center"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
