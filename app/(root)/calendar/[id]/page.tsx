"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { BorderBtn } from "@/components/ui/Buttons";
import { baseAPI } from "@/lib/API";
import { selectHeader, setShowInput } from "@/redux/slices/headerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { EventPageType } from "@/lib/types/EventPag.type";
import { BreadCrumbs } from "@/components/ui/BreadCrumbs";
import Link from "next/link";

const Event = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();

  const [btnIsHover, setBtnIsHover] = useState(false);

  const { activeLang } = useAppSelector(selectHeader);
  const [eventsData, setEventsData] = useState<EventPageType>();
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseAPI}expoevents/${params.id}`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setEventsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
    dispatch(setShowInput(false));
  }, [activeLang.localization]);

  const formatDate = (dateString: string) => {
    const dateParts = dateString.split(" ");
    const date = dateParts[0];
    const parts = date.split("-");
    const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

    return formattedDate;
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          <BreadCrumbs
            second="Календарь мероприятий"
            path="/calendar"
            third="Мероприятие"
          />
        </div>
      </div>
      <Image
        src={eventsData ? eventsData.data.background_images[0].path : ""}
        alt="выставка"
        width={1920}
        height={490}
        className="h-[490px] w-full object-cover"
      />
      <div>
        <div className="container section-mb">
          <div className="flex flex-col sm:flex-row gap-5 my-[60px]">
            <a
              href="https://kids.turkmenexpo.com/"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <BorderBtn text={"Сайт выставки"} full />
            </a>
            <Link href={"/members/bid"} className="w-full sm:w-auto">
              <BorderBtn text={"Забронировать стенд"} full />
            </Link>
            <a
              href="https://reg.turkmenexpo.com/login.php?idExh=1"
              target="_blank"
              onMouseEnter={() => setBtnIsHover(true)}
              onMouseLeave={() => setBtnIsHover(false)}
              className={`border-btn px-[17px] w-full sm:w-auto flex items-center h-[53px] gap-4 justify-center`}
            >
              <div>Получить билет</div>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 16L16.5 4M16.5 4H5.5M16.5 4V15"
                  stroke={btnIsHover ? "#303F4D" : "#F2F9FF"}
                  stroke-width="2"
                />
              </svg>
            </a>
          </div>
          <div className="flex flex-col gap-10 md:gap-[60px]">
            {eventsData && (
              <div>
                <p className="mb-[40px] md:mt-0 mt-10 leading-[115%] sm:leading-[100%] text-[21px] font-semibold">
                  Сроки проведения
                </p>
                <div className="flex flex-col sm:flex-row gap-[20px]">
                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">
                      Даты проведения
                    </h3>
                    <div className="leading-[130%] flex flex-col text-[14px] gap-[2px]">
                      {eventsData.data.timing.map((item) => (
                        <>
                          <div className="text-gray4">{item.date}</div>
                          <div className="text-gray">{item.time}</div>
                        </>
                      ))}
                    </div>
                  </div>

                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">
                      Монтаж
                    </h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">
                        {eventsData.data.installation_date}
                      </p>
                    </div>
                  </div>

                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">
                      Демонтаж
                    </h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">
                        {eventsData.data.dismantling_date}
                      </p>
                    </div>
                  </div>

                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">
                      Место проведения
                    </h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">{eventsData.data.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {eventsData ? (
              <>
                <hr className="border-navyBlue hidden sm:block" />
                <div className="">
                  <h2 className="text-[21px] font-semibold leading-[100%] mb-8">
                    Тематика мероприятия
                  </h2>
                  <div
                    className="event-topic flex flex-col leading-[130%] gap-1"
                    dangerouslySetInnerHTML={{
                      __html: eventsData.data.event_topic,
                    }}
                  />
                </div>
              </>
            ) : null}

            <hr className="border-navyBlue hidden sm:block" />

            <div className="flex flex-col gap-10">
              {eventsData?.data.organizers
                ? eventsData.data.organizers.map((item, i) => (
                    <div className="flex flex-col gap-[10px]" key={i}>
                      <h3 className="text-21 mb-[10px]">Организатор</h3>
                      <h4 className="text-gray leading-[130%]">{item.name}</h4>
                      <div className="leading-[150%] flex flex-col gap-0.5 sm:leading-[130%]">
                        <p>{item.address}</p>
                        <div className="leading-[140%] flex flex-col gap-0.5">
                          {item.phones.map((obj, i) => (
                            <p key={i}>{obj.phone}</p>
                          ))}
                        </div>
                        <p>Факс {item.fax}</p>
                        <p>Email: {item.email}</p>
                        <p>{item.web_site}</p>
                      </div>
                    </div>
                  ))
                : null}

              {eventsData?.data.coorganizers
                ? eventsData.data.coorganizers.map((item, i) => (
                    <div key={i} className="flex flex-col gap-[10px]">
                      <h3 className="text-21 mb-[10px]">Соорганизатор</h3>
                      <h4 className="text-gray leading-[130%]">{item.name}</h4>
                      <div className="leading-[150%] flex flex-col gap-0.5 sm:leading-[130%]">
                        <p>{item.address}</p>
                        <div className="leading-[140%] flex flex-col gap-0.5">
                          {item.phones.map((obj, ix) => (
                            <p key={ix}>{obj.phone}</p>
                          ))}
                        </div>
                        <p>Факс {item.fax}</p>
                        <p>Email: {item.email}</p>
                        <p>{item.web_site}</p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
