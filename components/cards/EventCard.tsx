import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { CalendarImage, Organizer, Timing } from '@/lib/types/Calendar.type';
import { useAppSelector } from '@/redux/hooks';
import { useLang } from '@/utils/useLang';

interface Props {
  id: number;
  description: string;
  starts_at: string;
  ends_at: string;
  title: string;
  web_site: string | null;
  location: string | null;
  timing: Timing[];
  event_topic: string | null;
  organizers: Organizer[];
  category: string;
  images: CalendarImage[];
  dark?: boolean;
}

export const EventCard = ({
  id,
  description,
  starts_at,
  ends_at,
  title,
  organizers,
  category,
  images,
  dark = false,
}: Props) => {
  const formatDate = (dateString: string) => {
    const dateParts = dateString?.split(' ');
    const date = dateParts?.[0];
    const parts = date?.split('-');
    const formattedDate = `${parts?.[2]}.${parts?.[1]}.${parts?.[0]}`;

    return formattedDate;
  };

  const lang = useAppSelector((state) => state.headerSlice.activeLang.localization);

  return (
    // <Link className="w-full cursor-default" href={`/calendar/${id}`}>
    <div
      className={clsx(
        ' cursor-pointer p-6 min-[850px]:p-[40px] lg:p-[60px] rounded-[2px] transition-all w-full greenBtnShadow hover:hover-shadow',
        {
          'bg-[#455A6E]': dark,
          // 'bg-bgWhite text-[#ECF0F3]': !dark,
        },
      )}>
      <div
        className={clsx(
          'md:hidden flex flex-col gap-[10px] border-b-[1px] mb-5 pb-5 md:gap-y-[20px] min-w-[200px]',
          {
            'border-gray3': dark,
            'border-lightCyan': !dark,
          },
        )}>
        <div
          className={clsx('text-[16px] flex leading-[150%] md:text-[18px] font-semibold', {
            'text-red': !dark,
            'text-lightYellow': dark,
          })}>
          <p className="mr-5">{formatDate(starts_at)}</p> <p>{formatDate(ends_at)}</p>
        </div>
      </div>

      <div className="flex md:flex-nowrap flex-wrap items-start lg:gap-x-[33px] gap-[10px]">
        <Image
          src={images?.[0].path || ''}
          width={150}
          height={150}
          alt="Event Image"
          className="w-[150px] h-[150px] object-cover"
        />
        <div className="flex flex-col gap-[10px] md:gap-[25px] max-w-[683px] w-full">
          <p className="text-[12px] text-[#C7D2DC] uppercase font-normal leading-none">
            {category}
          </p>
          <div className="flex flex-col gap-[10px] md:gap-[15px]">
            <h3
              className={clsx(
                'text-[21px] font-bold line-clamp-2 leading-[115%] uppercase md:leading-[100%]',
                {
                  'text-bgWhite': dark,
                  'text-green': dark,
                },
              )}>
              {title}
            </h3>
            <p
              className={clsx('text-[16px] event-text leading-[130%] md:leading-[150%]', {
                'text-gray2 md:text-black': !dark,
                'text-[#ECF0F3]': dark,
              })}>
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-[#C7D2DC] uppercase font-normal leading-none text-[10px]">
              {useLang('Organiser', 'Организатор', lang)}
            </p>
            <p className="text-[#C7D2DC] font-normal text-[13px] leading-[125%]">
              {organizers ? organizers[0]?.name : null}
            </p>
          </div>
        </div>
        {/* <div className="flex justify-between "></div> */}

        <div className="hidden md:flex flex-col  gap-[10px] md:gap-y-[20px]">
          <p
            className={clsx('text-[16px] leading-[150%] w-fit md:text-[18px] font-semibold', {
              'text-red': !dark,
              'text-lightYellow': dark,
            })}>
            {formatDate(starts_at)}–{formatDate(ends_at)}
          </p>
        </div>
      </div>
    </div>
  );
  {
    /* </Link> */
  }
};
