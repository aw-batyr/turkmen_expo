'use client';

import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { EventCard } from '../cards/EventCard';
import { BorderBtn } from '../ui/Buttons';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { Title } from '../home/Title';
import { setBurgerOpen } from '@/redux/slices/burgerSlice';
import { baseAPI } from '@/lib/API';
import { CalendarType } from '@/lib/types/Calendar.type';
import { BreadCrumbs } from '../ui/BreadCrumbs';
import { useLang } from '@/utils/useLang';
import Loader from '../ui/Loader';

export const CalendarSec = ({}: {}) => {
  const [showCards, setShowCards] = useState(false);
  const { activeLang } = useAppSelector(selectHeader);
  const [eventsData, setEventsData] = useState<CalendarType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBurgerOpen(false));
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${baseAPI}expoevents`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('error');
      }

      setEventsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [activeLang.localization]);

  return (
    <div className="section-mb">
      <div className="container flex flex-col items-start pt-[20px] gap-10 md:gap-12">
        <div>
          <div className="mb-[24px]">
            <BreadCrumbs
              second={useLang(
                'Calendar of events',
                'Календарь мероприятий',
                activeLang.localization,
              )}
            />
          </div>
          <Title
            text={useLang('Calendar of events', 'Календарь мероприятий', activeLang.localization)}
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          {eventsData ? (
            eventsData.data.map((item, i) => <EventCard dark={true} key={i} {...item} />)
          ) : (
            <Loader className="h-[500px]" />
          )}
        </div>
        <div className="w-full flex flex-col gap-6 items-center justify-center">
          {eventsData && eventsData.data.length > 3 && (
            <BorderBtn text={showCards ? 'Скрыть' : 'Показать ещё'} mt="24" px />
          )}
          <div className="flex items-center gap-5">
            {/* <Pagination
              current={current}
              setCurrent={setCurrent}
              totalPage={eventsData?.meta.total}
              lastPage={eventsData?.meta.last_page}
              currentPage={eventsData?.meta.current_page}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
