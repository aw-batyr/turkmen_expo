'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useLang } from '@/utils/useLang';

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
        <Loader className="!h-[490px]" />
      ) : (
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          slidesPerView={1}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          speed={1500}
          autoplay={{ delay: 10000 }}>
          {bannersData &&
            bannersData.data.banner_items.map((item, i) => (
              <SwiperSlide key={i} className="relative">
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

                <div className="absolute top-1/4 right-0 h-[490px] xl:left-20 lg:left-10 left-5 container z-20">
                  <div className="flex flex-col justify-center gap-2 z-50 absolute top-10 left-0 mx-auto max-w-[848px]">
                    <svg
                      width="143"
                      height="22"
                      viewBox="0 0 143 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.48 0.199999V1.784H7.32V17H5.64V1.784H0.48V0.199999H12.48ZM20.9271 5H22.5111V17H20.9271V15.128C20.0311 16.568 18.6871 17.288 16.8951 17.288C15.4391 17.288 14.2871 16.848 13.4391 15.968C12.6071 15.072 12.1911 13.872 12.1911 12.368V5H13.7751V12.368C13.7751 13.44 14.0551 14.272 14.6151 14.864C15.1911 15.456 15.9991 15.752 17.0391 15.752C18.1911 15.752 19.1271 15.392 19.8471 14.672C20.5671 13.936 20.9271 12.808 20.9271 11.288V5ZM27.2059 6.992C27.9419 5.536 29.2059 4.808 30.9979 4.808V6.344C29.9099 6.344 29.0059 6.664 28.2859 7.304C27.5659 7.944 27.2059 8.952 27.2059 10.328V17H25.6219V5H27.2059V6.992ZM42.6248 17H40.5128L34.5128 11.216V17H32.9288V0.199999H34.5128V10.304L40.2248 5H42.3848L36.1928 10.76L42.6248 17ZM57.3401 4.712C58.6841 4.712 59.7641 5.144 60.5801 6.008C61.4121 6.872 61.8281 8.04 61.8281 9.512V17H60.2441V9.512C60.2441 8.472 59.9721 7.672 59.4281 7.112C58.9001 6.536 58.1961 6.248 57.3161 6.248C56.3241 6.248 55.5161 6.584 54.8921 7.256C54.2841 7.912 53.9801 8.944 53.9801 10.352V17H52.3961V9.512C52.3961 8.456 52.1401 7.648 51.6281 7.088C51.1321 6.528 50.4521 6.248 49.5881 6.248C48.6281 6.248 47.8121 6.584 47.1401 7.256C46.4681 7.928 46.1321 8.96 46.1321 10.352V17H44.5481V5H46.1321V6.752C46.9961 5.392 48.2201 4.712 49.8041 4.712C51.5321 4.712 52.7481 5.44 53.4521 6.896C54.3161 5.44 55.6121 4.712 57.3401 4.712ZM70.1959 4.712C71.9719 4.712 73.4039 5.344 74.4919 6.608C75.5959 7.856 76.1479 9.336 76.1479 11.048C76.1479 11.224 76.1319 11.472 76.0999 11.792H65.5639C65.7239 13.008 66.2359 13.976 67.0999 14.696C67.9799 15.4 69.0599 15.752 70.3399 15.752C71.2519 15.752 72.0359 15.568 72.6919 15.2C73.3639 14.816 73.8679 14.32 74.2039 13.712L75.5959 14.528C75.0679 15.376 74.3479 16.048 73.4359 16.544C72.5239 17.04 71.4839 17.288 70.3159 17.288C68.4279 17.288 66.8919 16.696 65.7079 15.512C64.5239 14.328 63.9319 12.824 63.9319 11C63.9319 9.208 64.5159 7.712 65.6839 6.512C66.8519 5.312 68.3559 4.712 70.1959 4.712ZM70.1959 6.248C68.9479 6.248 67.8999 6.624 67.0519 7.376C66.2199 8.112 65.7239 9.072 65.5639 10.256H74.5159C74.3559 8.992 73.8679 8.008 73.0519 7.304C72.2359 6.6 71.2839 6.248 70.1959 6.248ZM84.0435 4.712C85.4995 4.712 86.6435 5.16 87.4755 6.056C88.3235 6.936 88.7475 8.128 88.7475 9.632V17H87.1635V9.632C87.1635 8.56 86.8755 7.728 86.2995 7.136C85.7395 6.544 84.9395 6.248 83.8995 6.248C82.7475 6.248 81.8115 6.616 81.0915 7.352C80.3715 8.072 80.0115 9.192 80.0115 10.712V17H78.4275V5H80.0115V6.872C80.9075 5.432 82.2515 4.712 84.0435 4.712ZM93.4903 15.416H101.65V17H91.8103V0.199999H101.53V1.784H93.4903V7.736H100.93V9.32H93.4903V15.416ZM114.137 17H112.241L108.497 12.056L104.753 17H102.857L107.561 10.784L103.169 5H105.065L108.497 9.536L111.929 5H113.825L109.457 10.784L114.137 17ZM122.483 4.712C124.195 4.712 125.651 5.32 126.851 6.536C128.067 7.752 128.675 9.24 128.675 11C128.675 12.76 128.067 14.248 126.851 15.464C125.651 16.68 124.195 17.288 122.483 17.288C120.355 17.288 118.739 16.408 117.635 14.648V21.8H116.051V5H117.635V7.352C118.739 5.592 120.355 4.712 122.483 4.712ZM119.003 14.384C119.915 15.296 121.035 15.752 122.363 15.752C123.691 15.752 124.811 15.296 125.723 14.384C126.635 13.456 127.091 12.328 127.091 11C127.091 9.672 126.635 8.552 125.723 7.64C124.811 6.712 123.691 6.248 122.363 6.248C121.035 6.248 119.915 6.712 119.003 7.64C118.091 8.552 117.635 9.672 117.635 11C117.635 12.328 118.091 13.456 119.003 14.384ZM141.125 15.488C139.909 16.688 138.421 17.288 136.661 17.288C134.901 17.288 133.405 16.688 132.173 15.488C130.957 14.272 130.349 12.776 130.349 11C130.349 9.224 130.957 7.736 132.173 6.536C133.405 5.32 134.901 4.712 136.661 4.712C138.421 4.712 139.909 5.32 141.125 6.536C142.357 7.736 142.973 9.224 142.973 11C142.973 12.776 142.357 14.272 141.125 15.488ZM133.301 14.384C134.213 15.296 135.333 15.752 136.661 15.752C137.989 15.752 139.109 15.296 140.021 14.384C140.933 13.456 141.389 12.328 141.389 11C141.389 9.672 140.933 8.552 140.021 7.64C139.109 6.712 137.989 6.248 136.661 6.248C135.333 6.248 134.213 6.712 133.301 7.64C132.389 8.552 131.933 9.672 131.933 11C131.933 12.328 132.389 13.456 133.301 14.384Z"
                        fill="white"
                      />
                    </svg>
                    <h2 className="text-[56px] leading-[120%] font-medium">
                      {useLang(
                        'Discover New Business Prospects',
                        'Расширьте горизонты вашего бизнеса',
                        activeLang.localization,
                      )}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};
