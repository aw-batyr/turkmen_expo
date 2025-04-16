"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";

import {
  CalendarImage,
  Coorganizers,
  Organizer,
  Timing,
} from "@/lib/types/Calendar.type";
import { useAppSelector } from "@/redux/hooks";
import { useLang } from "@/utils/useLang";
import Link from "next/link";

interface Props {
  id: number;
  description: string;
  starts_at: string;
  ends_at: string;
  date: string;
  title: string;
  web_site: string | null;
  location: string | null;
  timing: Timing[];
  event_topic: string | null;
  organizers: Organizer[];
  category: string;
  images: CalendarImage[];
  dark?: boolean;
  coorganizers?: Coorganizers[];
}

export const EventCard = ({
  id,
  coorganizers,
  description,
  starts_at,
  ends_at,
  title,
  date,
  organizers,
  category,
  images,
  dark = false,
}: Props) => {
  const formatDate = (dateString: string) => {
    const dateParts = dateString?.split(" ");
    const date = dateParts?.[0];
    const parts = date?.split("-");
    const formattedDate = `${parts?.[2]}.${parts?.[1]}.${parts?.[0]}`;

    return formattedDate;
  };

  const lang = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  return (
    <Link className="w-full cursor-default" href={`/calendar/${id}`}>
      <div
        className={clsx(
          "cursor-pointer overflow-hidden transition-all w-full lg:h-[228px] lg:p-0 p-4 rounded-[4px]",
          {
            "bg-white": dark,
          }
        )}
      >
        <div
          className={clsx(
            "md:hidden flex flex-col gap-8 border-b-[1px] border-opacity-10 mb-5 pb-5 md:gap-y-5 min-w-[200px]",
            {
              "border-gray3": dark,
              "border-lightCyan": !dark,
            }
          )}
        >
          <div
            className={clsx(
              "text-[16px] flex leading-[150%] md:text-[18px] font-semibold",
              {}
            )}
          >
            <p className="mr-5">{formatDate(starts_at)}</p>{" "}
            <p>{formatDate(ends_at)}</p>
          </div>
        </div>

        <div className="flex md:flex-nowrap flex-wrap items-start lg:gap-x-[33px] gap-[10px]">
          <Image
            src={images?.[0]?.path || ""}
            width={228}
            height={228}
            alt="Event Image"
            className="lg:size-[228px] size-[100px] object-cover rounded-l-[4px]"
          />

          {/* CENTER */}
          <div className="flex flex-col gap-[10px] md:gap-4 max-w-[683px] py-6  w-full">
            <p className="text-[12px] text-[#6B7674]  font-normal leading-none">
              {category}
            </p>
            <div className="flex flex-col gap-[10px] md:gap-[15px]">
              <h3
                className={clsx(
                  "text-5 font-medium line leading-[115%] lg:leading-8 md:leading-[100%]"
                )}
              >
                {title}
              </h3>
              {/* <p className={clsx('text-base line-clamp-2 leading-[130%] md:leading-[150%]', {})}>
              {description}
            </p> */}
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="text-[#6B7674] uppercase font-normal leading-none text-[10px]">
                {useLang("Organiser:", "Организатор:", lang)}
              </p>
              <p className="text-[#6B7674] font-normal text-[13px] leading-[125%]">
                {organizers ? organizers[0]?.name : null}
              </p>
            </div>
            {coorganizers && coorganizers?.length > 0 && (
              <div className="flex flex-col gap-[10px]">
                <p className="text-[#6B7674] uppercase font-normal leading-none text-[10px]">
                  {useLang("Co-organiser:", "Со-организатор:", lang)}
                </p>
                <p className="text-[#6B7674] font-normal text-[13px] leading-[125%]">
                  {coorganizers ? coorganizers[0]?.name : null}
                </p>
              </div>
            )}
          </div>
          {/* CENTER */}

          <div className="hidden md:flex text-2xl flex-col text-white leading- none h-[228px] min-w-[245px] items-center justify-center bg-[#31A898] px-12 text-center">
            <p className="">{formatDate(starts_at)}</p>{" "}
            <p>{formatDate(ends_at)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
