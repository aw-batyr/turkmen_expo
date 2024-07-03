'use client';

import React from 'react';

import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { NewsSec } from '@/components/news/NewsSec';
import { useLang } from '@/utils/useLang';

const News = () => {
  return (
    <div>
      <LayoutWithSidebar
        title={useLang('News', 'Новости')}
        second={useLang('News', 'Новости')}
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
