'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Roboto_Slab } from 'next/font/google';

import glassImg from '@/public/assets/images/events/CardFullImg.png';

import { BorderBtn } from '@/components/ui/Buttons';
import { fullEventData } from '@/lib/database/eventsData';
import { v4 } from 'uuid';
import { baseAPI } from '@/lib/API';
import { selectHeader } from '@/redux/slices/headerSlice';
import { useAppSelector } from '@/redux/hooks';
import { EventPageType } from '@/lib/types/Events.type';
import { BreadCrumbs } from '@/components/ui/BreadCrumbs';

const roboto_slab = Roboto_Slab({
  weight: ['600'],
  subsets: ['latin', 'cyrillic'],
});

const Event = ({ params }: { params: { id: string } }) => {
  const { activeLang } = useAppSelector(selectHeader);
  const [eventsData, setEventsData] = useState<EventPageType>();
  const fetchEvents = async () => {
    try {
      const res = await fetch(
        `${baseAPI}expoevents/${params.id}?X-Localization=${activeLang.localization}`,
      );

      if (!res.ok) {
        throw new Error('error');
      }

      const data = await res.json();
      setEventsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const dateParts = dateString.split(' ');
    const date = dateParts[0];
    const parts = date.split('-');
    const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

    return formattedDate;
  };

  console.log(eventsData);

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          <BreadCrumbs second="Календарь мероприятий" path="/calendar" third="Мероприятие" />
        </div>
      </div>
      <div>
        <div className="relative z-10 h-fit pb-5 md:pb-0">
          <Image
            src={glassImg}
            alt="выставка"
            width={1920}
            height={350}
            className="mx-auto absolute top-0 left-0 -z-10 w-full h-full object-cover"
          />

          {eventsData ? (
            <div className="w-full h-full z-20">
              <div className="container h-full">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center">
                    <div className="flex flex-col md:flex-row w-full gap-0 md:gap-[30px] px850:gap-[45px]">
                      <div className="flex flex-col md:flex-row gap-0 md:gap-[15px]">
                        <div className="mx-auto w-[170px] h-[150px] tab:w-[220px] tab:h-[180px] bg-gray4 py-[10px] px-[33px] flex justify-center items-center">
                          <Image
                            src={eventsData.data.images[0].path}
                            width={154}
                            height={160}
                            alt="Иконка"
                            className="w-[154px] h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-[9px] max-w-[580px] w-full mt-[50px] md:mt-[20px] tab:mt-[40px]">
                          <h3
                            className={`${roboto_slab.className} font-semibold text-[26px] sm:text-[28px] md:text-[34px] leading-[100%]`}>
                            {eventsData.data.title}
                          </h3>
                          <h4 className="text-[14px] md:text-[16px] leading-[130%] md:leading-[150%]">
                            {eventsData.data.description}
                          </h4>

                          <div className="text-[10px] text-gray sm:text-bgWhite flex flex-col gap-[5px]">
                            <p>Организатор</p>
                            <p>{eventsData.data.organizer.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full max-w-[238px] md:mt-[40px] mt-[70px]">
                        <h3 className="text-[16px] md:text-[21px] font-semibold mb-5 leading-[130%] md:leading-[100%]">
                          {formatDate(eventsData.data.starts_at)}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex gap-5 py-[20px]">
                    <BorderBtn text={'Сайт выставки'} />
                    <BorderBtn text={'Забронировать стенд'} />
                    <BorderBtn text={'Получить электронный билет'} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="container mt-[60px] section-mb">
          <div className="flex flex-col gap-10 md:gap-[60px]">
            {eventsData && (
              <div>
                <p className="mb-[40px] leading-[115%] sm:leading-[100%] text-[21px] font-semibold">
                  Сроки проведения
                </p>
                <div className="flex flex-col sm:flex-row gap-[20px]">
                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">Даты проведения</h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">{formatDate(eventsData.data.starts_at)}</p>
                    </div>
                    <div className="leading-[130%]">
                      <p className="text-gray4">{formatDate(eventsData.data.ends_at)}</p>
                    </div>
                  </div>

                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">Монтаж</h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">{formatDate(eventsData.data.starts_at)}</p>
                    </div>
                  </div>

                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">Демонтаж</h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">{formatDate(eventsData.data.ends_at)}</p>
                    </div>
                  </div>

                  <div className="w-full max-w-[290px] flex flex-col gap-[20px]">
                    <h3 className="leading-[120%] text-[18px] font-semibold">Место проведения</h3>
                    <div className="leading-[130%]">
                      <p className="text-gray4">{eventsData.data.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="flex flex-col gap-[33px]">
              {fullEventData
                .filter((item) => item.theme)
                .map((obj) => (
                  <div key={v4()}>
                    <h3 className="text-[21px] mb-10 leading-[100%] font-semibold">
                      {obj.title}
                    </h3>
                    {obj.info?.map((text) => (
                      <div
                        key={v4()}
                        className=" last:mt-6 flex flex-col gap-[20px]"
                      >
                        <h4 className="text-[18px] font-semibold leading-[120%]">
                          {text.title}
                        </h4>

                        <div className="pl-[9px] leading-[130%] list-disc">
                          <div className="text-gray4 relative">
                            <div className="w-[4px] h-[4px] rounded-full bg-lightGreen absolute top-[7px] left-[-10px]"></div>
                            {text.list}
                          </div>
                          <div className="text-gray4 relative">
                            <div className="w-[4px] h-[4px] rounded-full bg-lightGreen absolute top-[7px] left-[-10px]"></div>
                            {text.list2}
                          </div>
                          <div className="text-gray4 relative">
                            <div className="w-[4px] h-[4px] rounded-full bg-lightGreen absolute top-[7px] left-[-10px]"></div>
                            {text.list3}
                          </div>
                          <div className="text-gray4 relative">
                            <div className="w-[4px] h-[4px] rounded-full bg-lightGreen absolute top-[7px] left-[-10px]"></div>
                            {text.list4}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div> */}

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
            {eventsData ? (
              <div>
                <div className="flex flex-col gap-[10px]" key={v4()}>
                  <h3 className="text-21 mb-[10px]">Организатор</h3>
                  <h4 className="text-gray leading-[130%]">{eventsData.data.organizer.name}</h4>
                  <div className="leading-[150%] sm:leading-[130%]">
                    <p>{eventsData.data.organizer.address}</p>
                    <p>{eventsData.data.organizer.phones[0].phone}</p>
                    <p>Факс {eventsData.data.organizer.fax}</p>
                    <p>Email: {eventsData.data.organizer.email}</p>
                    <p>{eventsData.data.organizer.web_site}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
