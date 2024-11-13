'use client';

import React, { useEffect, useState } from 'react';

import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { baseAPI } from '@/lib/API';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { fetchAbout } from '@/redux/slices/aboutus';
import { useLang } from '@/utils/useLang';
import Loader from '@/components/ui/Loader';

const About = () => {
  const dispatch = useAppDispatch();
  const [aboutDatas, setAboutData] = useState<string>();
  const { activeLang } = useAppSelector(selectHeader);

  // const aboutData = useAppSelector((state) => state.aboutSlice.aboutData);
  const fecthAboutData = async () => {
    try {
      dispatch(fetchAbout({ activeLang }));
      const res = await fetch(`${baseAPI}settings/about_us`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      if (!res.ok) {
        throw new Error('Error');
      }

      const data = await res.json();

      setAboutData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthAboutData();

    // dispatch(fetchAbout({ activeLang }));
  }, [activeLang.localization]);

  return (
    <LayoutWithSidebar
      second={useLang('About us', 'Коротко о нас', activeLang.localization)}
      title={useLang('About us', 'Коротко о нас', activeLang.localization)}>
      <div className="aboutus flex flex-col items-start gap-y-[24px] text-p">
        {aboutDatas ? (
          <div
            dangerouslySetInnerHTML={{
              __html: aboutDatas,
            }}
            className="text-[16px] leading-[150%]"
          />
        ) : (
          <Loader className="w-full" />
        )}
      </div>
    </LayoutWithSidebar>
  );
};

export default About;
