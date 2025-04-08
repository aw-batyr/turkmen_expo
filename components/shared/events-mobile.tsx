"use client";

import "swiper/css";
import "swiper/css/pagination";
// import "./styles/events.css";

import { useLang } from "@/utils/useLang";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventCard } from "./event-card";
import { CalendarType } from "@/lib/types/Calendar.type";
import { useAppSelector } from "@/redux/hooks";

interface Props {
  data: CalendarType["data"];
  className?: string;
}

export const EventsMobile: FC<Props> = ({ data }) => {
  const lang = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );
  return (
    <div className="md:hidden container">
      <h2 className="text-[26px] mb-5 sm:mb-10 font-semibold leading-[115%]">
        {useLang(
          "Upcoming exhibitions and events",
          "Ближайшие выставки и мероприятия",
          lang
        )}
      </h2>
      <div className="flex flex-col">
        <div className="flex items-center gap-y-[10px]">
          <Swiper slidesPerView={1} spaceBetween={20}>
            {data &&
              data.map((item, i) => (
                <SwiperSlide key={i} className="mb-[72px]">
                  <EventCard dark {...item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
