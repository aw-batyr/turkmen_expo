"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import { EventCard } from "../cards/EventCard";
import { GreenBtn, GreenBtnMob } from "../ui/Buttons";

import "swiper/css";
import "swiper/css/pagination";
import "./styles/events.css";

import { Title } from "./Title";
import { Pagination } from "swiper/modules";
import { baseAPI } from "@/lib/API";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { CalendarType } from "@/lib/types/Calendar.type";
import { useLang } from "@/utils/useLang";

export const Events = () => {
  const [eventsData, setEventsData] = useState<CalendarType>();
  const { activeLang } = useAppSelector(selectHeader);
  const [openCards, setOpenCards] = React.useState<boolean>(true);

  const onEventBtn = () => {
    setOpenCards(false);
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseAPI}expoevents`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      const data = await res.json();

      setEventsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [activeLang.localization]);

  return (
    <>
      <div className="container hidden md:block">
        <div className="mb-10">
          <Title
            text={useLang(
              "Upcoming exhibitions and events",
              "Ближайшие выставки и мероприятия"
            )}
          />
        </div>
        <div className="mb-[158px] w-full flex flex-col items-center gap-y-[10px]">
          {openCards
            ? eventsData?.data.map((item) => (
                <EventCard
                  key={v4()}
                  title={item.title}
                  description={item.description}
                  organizers={item.organizers}
                  starts={item.starts_at}
                  ends={item.ends_at}
                  category={item.category}
                  id={item.id}
                  web={item.web_site ? item.web_site : ""}
                  location={item.location ? item.location : ""}
                  timing={item.timing}
                  topic={item.event_topic ? item.event_topic : ""}
                  images={
                    item.images.length > 0
                      ? item.images[0].path
                      : eventsData.data[0].images[0]
                  }
                />
              ))
            : eventsData?.data.map((item) => (
                <EventCard
                  key={v4()}
                  title={item.title}
                  description={item.description}
                  organizers={item.organizers}
                  starts={item.starts_at}
                  ends={item.ends_at}
                  category={item.category}
                  id={item.id}
                  web={item.web_site ? item.web_site : ""}
                  location={item.location ? item.location : ""}
                  timing={item.timing}
                  topic={item.event_topic ? item.event_topic : ""}
                  images={
                    item.images.length > 0
                      ? item.images[0].path
                      : eventsData.data[0].images[0]
                  }
                />
              ))}
          {eventsData && eventsData.data.length > 3 ? (
            <GreenBtn
              onEventBtn={onEventBtn}
              text={useLang("Show more", "Показать ещё")}
              mt="mt-[25px]"
            />
          ) : null}
        </div>
      </div>

      {/* //Mobile */}

      <div className="md:hidden container">
        <h2 className="text-[26px] mb-5 sm:mb-10 font-semibold leading-[115%]">
          {useLang(
            "Upcoming exhibitions and events",
            "Ближайшие выставки и мероприятия"
          )}
        </h2>
        <div className="flex flex-col">
          <div className="flex items-center gap-y-[10px]">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ type: "bullets", el: ".swiper-pagination" }}
            >
              {openCards &&
                eventsData?.data.map((item) => (
                  <SwiperSlide key={v4()} className="mb-[72px]">
                    <EventCard
                      key={v4()}
                      title={item.title}
                      description={item.description}
                      organizers={item.organizers}
                      starts={item.starts_at}
                      ends={item.ends_at}
                      category={item.category}
                      id={item.id}
                      web={item.web_site ? item.web_site : ""}
                      location={item.location ? item.location : ""}
                      timing={item.timing}
                      topic={item.event_topic ? item.event_topic : ""}
                      images={
                        item.images.length > 0
                          ? item.images[0].path
                          : eventsData.data[0].images[0]
                      }
                    />
                  </SwiperSlide>
                ))}
              <div className="swiper-pagination swiper-pagination-horizontal mb-[30px]"></div>
            </Swiper>
          </div>
          {/* <GreenBtnMob text={'Все мероприятия'} /> */}
        </div>
      </div>
    </>
  );
};
