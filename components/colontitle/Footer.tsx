'use client';

import React from 'react';
import Link from 'next/link';

import vk from '@/public/assets/icons/footer/vk.svg';
import rss from '@/public/assets/icons/footer/rss.svg';
import telegram from '@/public/assets/icons/footer/telegram.svg';

import { footerInfo, headerMenu2 } from '@/lib/database/pathnames';
import { useAppSelector } from '@/redux/hooks';
import { useLang } from '@/utils/useLang';

export const icons = [
  { title: telegram, link: '' },
  { title: vk, link: '' },
  { title: rss, link: '' },
];

export const Footer = () => {
  const localization = useAppSelector((state) => state.headerSlice.activeLang.localization);

  return (
    <footer className="bg-[#059784] text-white pt-6 pb-5 mob:py-[40px]">
      <div className="container">
        <div className="">
          <div className="flex lg:flex-row flex-col w-full justify-between mb-12">
            <img className="h-12" src="/assets/icons/white-logo.svg" />

            <div className="flex flex-col mt-8 lg:flex-row items-center font-medium gap-12">
              {headerMenu2
                .filter((item) => (localization === 'en' ? item.en : !item.en))
                .map((item, i) => (
                  <Link key={i} href={item.link} className="cursor-pointer">
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between justify-center text-center lg:text-left lg:items-end items-center gap-6">
            <div className="flex flex-col justify-end w-full">
              {localization === 'ru' ? (
                <div className="flex flex-col md:gap-y-[10px] gap-0">
                  {footerInfo.slice(0, 3).map((item, i) => (
                    <p className="text-[12px] leading-[130%]" key={i}>
                      {item}
                    </p>
                  ))}
                </div>
              ) : localization === 'en' ? (
                <div className="flex flex-col md:gap-y-[10px] gap-0">
                  {footerInfo.slice(3, 7).map((item, i) => (
                    <p className="text-[12px] leading-[130%]" key={i}>
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center lg:justify-end justify-center gap-2.5 w-full">
              <h5>{useLang('Social Media:', 'Социальные сети:', localization)}</h5>
              <div className="flex items-center gap-4">
                <a href="">
                  <img src="/assets/icons/instagram.svg" alt="social" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-[#435654] flex mob:flex-row flex-col items-center justify-between pt-[17px] border-t-[1px] border-gray3">
          <p className="mob:text-[12px] mx-auto text-[12px] leading-[130%] md:leading-[150%] md:mb-0 mb-5">
            {useLang('@2024 IE TurkmenExpo', '@2024 ИП ТуркменЭкспо', localization)}
          </p>
        </div> */}
      </div>
    </footer>
  );
};
