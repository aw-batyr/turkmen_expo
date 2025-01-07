'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EventCard } from '../cards/EventCard';
import { GreenBtn } from '../ui/Buttons';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles/events.css';

import { Title } from './Title';
import { Pagination } from 'swiper/modules';
import { baseAPI } from '@/lib/API';
import { useAppSelector } from '@/redux/hooks';
import { CalendarType } from '@/lib/types/Calendar.type';
import { useLang } from '@/utils/useLang';
import { selectHeader } from '@/redux/slices/headerSlice';
import Link from 'next/link';
import Loader from '../ui/Loader';

export const Events = () => {
  const [eventsData, setEventsData] = useState<CalendarType>();
  const { activeLang } = useAppSelector(selectHeader);
  const [openCards, setOpenCards] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const onEventBtn = () => {
    setOpenCards(false);
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [activeLang.localization]);

  if (loading) {
    return <Loader className="h-[350px]" />;
  }

  return (
    <section>
      <div className="container hidden md:block">
        <div className="mb-10">
          <Title
            text={useLang(
              'Upcoming exhibitions and events',
              'Ближайшие выставки и мероприятия',
              activeLang.localization,
            )}
          />
        </div>
        <div className="mb-[158px] w-full flex flex-col items-center gap-8">
          {eventsData?.data?.slice(0, 3).map((item, i) => (
            <EventCard dark key={i} {...item} />
          ))}
          {eventsData && eventsData?.data?.length > 3 && (
            <Link href={'/calendar'}>
              <GreenBtn
                onEventBtn={onEventBtn}
                text={useLang('Show more', 'Показать ещё', activeLang.localization)}
                mt="mt-[25px]"
              />
            </Link>
          )}
        </div>
      </div>

      {/* //Mobile */}

      <div className="md:hidden container">
        <h2 className="text-[26px] mb-5 sm:mb-10 font-semibold leading-[115%]">
          {useLang(
            'Upcoming exhibitions and events',
            'Ближайшие выставки и мероприятия',
            activeLang.localization,
          )}
        </h2>
        <div className="flex flex-col">
          <div className="flex items-center gap-y-[10px]">
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ type: 'bullets', el: '.swiper-pagination' }}>
              {openCards &&
                eventsData?.data?.map((item, i) => (
                  <SwiperSlide key={i} className="mb-[72px]">
                    <EventCard dark {...item} />
                  </SwiperSlide>
                ))}
              <div className="swiper-pagination swiper-pagination-horizontal mb-[30px]"></div>
            </Swiper>
          </div>
          {/* <GreenBtnMob text={'Все мероприятия'} /> */}
        </div>
      </div>
    </section>
  );
};
