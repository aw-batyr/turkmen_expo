'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { v4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Title } from './Title';
import { Autoplay, Pagination } from 'swiper/modules';
import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { PartnersType } from '@/lib/types/PartnersData.type';
import { baseAPI } from '@/lib/API';
import { useLang } from '@/utils/useLang';

export const Partners = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const [partnersData, setPartnersData] = useState<PartnersType>();

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${baseAPI}partners`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      const data = await res.json();

      setPartnersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [activeLang.localization]);

  return (
    <div className="container">
      <div className="mb-[40px]">
        <Title text={useLang('Partners', 'Партнёры')} />
      </div>

      <div className="flex items-center">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop
          slidesPerView={5}
          slidesPerGroup={5}
          autoplay={{ delay: 0 }}
          spaceBetween={30}
          speed={7500}
          pagination={{ type: 'bullets', el: '.swiper-pagination' }}
          breakpoints={{
            1024: { slidesPerView: 5 },
            768: { slidesPerView: 4.5 },
            630: { slidesPerView: 3.5 },
            300: { slidesPerView: 2 },
          }}>
          {partnersData
            ? partnersData.data.map((logo) => (
                <SwiperSlide key={v4()} className="h-[63px] overflow-hidden">
                  {logo.link ? (
                    <a href={logo.link} target="_blank">
                      <Image
                        height={200}
                        width={200}
                        src={logo.images[0].path}
                        alt="logo"
                        className="h-full w-full object-cover"
                      />
                    </a>
                  ) : (
                    <Image
                      height={200}
                      width={200}
                      src={logo.images[0].path}
                      alt="logo"
                      className="h-full w-full object-cover"
                    />
                  )}
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  );
};
