'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import { useAppSelector } from '@/redux/hooks';
import { useSliderBanner } from '@/hooks/use-slider';
import Loader from '../ui/Loader';

export const SliderClient = () => {
  const isTab = useMediaQuery('(min-width: 1024px)');
  const isMd = useMediaQuery('(min-width: 700px)');

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const bannerType = useSliderBanner(isTab, isMd);
  const lang = useAppSelector((state) => state.headerSlice.activeLang.localization);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/banners?bannerType=${bannerType}`, {
        headers: {
          'Accept-Language': lang,
        },
      });
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bannerType, lang]);

  if (loading) return <Loader className="h-[600px] min-h-[320px]" />;

  return (
    <Image
      src={data.data.banner_items?.[0]?.image || ''}
      alt="Баннер"
      width={1920}
      height={600}
      className="object-cover max-h-[600px] min-h-[320px] size-full object-center"
    />
  );
};
