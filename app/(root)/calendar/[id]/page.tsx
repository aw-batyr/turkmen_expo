'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { BorderBtn } from '@/components/ui/Buttons';
import { v4 } from 'uuid';
import { baseAPI } from '@/lib/API';
import { selectHeader, setShowInput } from '@/redux/slices/headerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { EventPageType } from '@/lib/types/EventPag.type';
import { BreadCrumbs } from '@/components/ui/BreadCrumbs';
import Link from 'next/link';

const Event = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();

  const { activeLang } = useAppSelector(selectHeader);
  const [eventsData, setEventsData] = useState<EventPageType>();
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseAPI}expoevents/${params.id}`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

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
    dispatch(setShowInput(false));
  }, [activeLang.localization]);

  const formatDate = (dateString: string) => {
    const dateParts = dateString.split(' ');
    const date = dateParts[0];
    const parts = date.split('-');
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
          <BreadCrumbs second="Календарь мероприятий" path="/calendar" third="Мероприятие" />
        </div>
      </div>
      <Image
        src={eventsData ? eventsData.data.background_images[0].path : ''}
        alt="выставка"
        width={1920}
        height={490}
        className="h-[490px] w-full object-cover"
      />
      <div>
        <div className="container section-mb">
          <div className="hidden md:flex gap-5 my-[60px]">
            <a href="https://kids.turkmenexpo.com/" target="_blank">
              <BorderBtn text={'Сайт выставки'} />
            </a>
            <Link href={'/members/bid'}>
              <BorderBtn text={'Забронировать стенд'} />
            </Link>
          </div>

          <div className="flex flex-col gap-10 md:gap-[60px]">
            {eventsData && (
              <div>
                <p className="mb-[40px] md:mt-0 mt-10 leading-[115%] sm:leading-[100%] text-[21px] font-semibold">
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
