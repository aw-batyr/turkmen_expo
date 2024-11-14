'use client';

import React from 'react';

import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { NewsSec } from '@/components/news/NewsSec';
import { useLang } from '@/utils/useLang';
import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';

const News = () => {
  const { activeLang } = useAppSelector(selectHeader);

  return (
    <div>
      <LayoutWithSidebar
        title={useLang('News', 'Новости', activeLang.localization)}
        second={useLang('News', 'Новости', activeLang.localization)}
        cursor={false}>
        <div>
          <div className="flex flex-col">
            {/* <div className="relative">
              <input
                className="bid-input bg-[url('../public/assets/icons/news/search.svg')] bg-right bg-no-repeat w-full max-w-[461px] mb-10 sm:mb-6 md:mb-[50px] lg:mb-[60px]"
                type="text"
              />
            </div> */}

            <NewsSec />
          </div>
        </div>
      </LayoutWithSidebar>
    </div>
  );
};

export default News;
