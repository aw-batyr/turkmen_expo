import { baseAPI } from '@/lib/API';
import { CalendarType } from '@/lib/types/Calendar.type';
import { EventPageType } from '@/lib/types/EventPag.type';

export const getCalendar = async (lang: string) => {
  const res = await fetch(`${baseAPI}expoevents?per_page=100`, {
    headers: {
      'Accept-Language': lang,
    },
    next: {
      revalidate: 1800,
    },
  });

  if (!res.ok) throw new Error('Calendar error');

  const data: CalendarType = await res.json();

  return data;
};

export const getEventPage = async (id: string, lang: string) => {
  const res = await fetch(`${baseAPI}expoevents/${id}`, {
    headers: {
      'Accept-Language': lang,
    },
    next: {
      revalidate: 1800,
    },
  });

  if (!res.ok) throw new Error('Event page error');

  const data: EventPageType = await res.json();

  return data.data;
};
