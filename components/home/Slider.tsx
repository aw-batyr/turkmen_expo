'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { v4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { useMediaQuery } from 'usehooks-ts';

import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { SliderTypes } from '@/lib/types/SliderData.type';

import 'swiper/css/pagination';
import { baseAPI } from '@/lib/API';
import Loader from '../ui/Loader';

export const Slider = () => {
  const tab = useMediaQuery('(min-width: 1250px)');
  const md = useMediaQuery('(min-width: 768px)');

  const [loading, setLoading] = useState(true);

  const chooseBanner = () => {
    if (tab) {
      return 'main-surat';
    } else if (md) {
      return 'medium-surat';
    } else {
      return 'small-surat';
    }
  };

  const [bannersData, setBannersData] = React.useState<SliderTypes>();
  const { activeLang } = useAppSelector(selectHeader);
  const progressCircle = React.useRef<SVGSVGElement>(null);

  const onAutoplayTimeLeft = (s: SwiperCore, time: number, progress: number) => {
    if (progressCircle.current && progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
  };
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseAPI}banners/${chooseBanner()}`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      const data = await response.json();
      setBannersData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchBanners();
  }, [activeLang.localization]);

  return (
    <div className="relative z-10 h-fit pb-5 md:pb-0">
      {loading ? (
        <Loader className="h-[490px]" />
      ) : (
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          slidesPerView={1}
          pagination={{ type: 'fraction' }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          // loop
          speed={1500}
          autoplay={{ delay: 10000 }}>
          {bannersData
            ? bannersData.data.banner_items.map((item) => (
                <SwiperSlide key={v4()}>
                  <Link href={''}>
                    <div className="">
                      <Image
                        src={item.image}
                        alt="Баннер"
                        width={1920}
                        height={490}
                        className="h-[490px] object-cover object-center w-[1920px]"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            : null}

          {/* <div className="container absolute right-0 bottom-[25px] swiper-pagination swiper-pagination-horizontal">
              <div className="swiper-pagination-fraction items-center justify-end gap-4">
                <div className="autoplay-progress w-[200px] flex items-center gap-5 bg-bgWhite rounded-full">
                  <svg ref={progressCircle}>
                    <line viewBox="0 0 63 5" x1={0} x2={63} />
                  </svg>
                </div>
              </div> */}
          {/* </div> */}
        </Swiper>
      )}
    </div>
  );
};
