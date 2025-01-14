'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { sidebarData } from '@/lib/database/pathnames';
import { useAppSelector } from '@/redux/hooks';

export const Sidebar = () => {
  const pathname = usePathname();

  const lang = useAppSelector((state) => state.headerSlice.activeLang.localization);

  return (
    <div className="flex flex-col bg-white rounded-lg px-6 py-4 items-start gap-y-[12px] pb-5 mt-12 sticky top-0 left-0 overflow-hidden">
      {sidebarData
        .filter(
          (obj) =>
            (pathname === '/company/aboutus' && obj.company) ||
            (pathname.includes('/members') && obj.members) ||
            (pathname.includes('/news') && obj.news) ||
            (pathname.includes('/visitors') && obj.visitors) ||
            (pathname.includes('/services') && obj.services),
        )
        .map((item, i) => (
          <div key={i}>
            <p className={clsx('mb-[16px] text-[16px] font-bold leading-[1.5]')}>
              {lang === 'ru' ? item.pathname : item.pathnameEn}
            </p>
            <div className="flex flex-col items-start gap-y-[8px]">
              <div className="flex flex-col gap-[10px] pl-4 pr-10">
                {item.info.map((obj, i) => (
                  <Link
                    href={obj.link}
                    className={clsx(
                      'cursor-pointer py-1 leading-[130%] transition-all hover:opacity-80',
                      {
                        'hover:text-[#059784] text-[#059784] hover:cursor-default':
                          obj.link === pathname,
                      },
                    )}
                    key={i}>
                    {lang === 'ru' ? obj.title : obj.titleEn}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
