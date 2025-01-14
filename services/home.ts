import { baseAPI } from '@/lib/API';
import { CalendarType } from '@/lib/types/Calendar.type';
import { NewsData } from '@/lib/types/NewsData.type';
import { SliderType } from '@/lib/types/SliderData.type';

export const getSlider = async (bannerType: string): Promise<SliderType> => {
  const res = await fetch(`${baseAPI}banners/${bannerType}`, {
    next: { revalidate: 1800 },
    headers: {
      'Accept-Language': 'ru',
    },
  });

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных');
  }

  const data: SliderType = await res.json();

  return data;
};

export const getEvents = async (lang: string) => {
  const res = await fetch(`${baseAPI}expoevents?per_page=2`, {
    next: { revalidate: 1800 },
    headers: {
      'Accept-Language': lang,
    },
  });

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных');
  }

  const data: CalendarType = await res.json();

  return data;
};

export const getNews = async (lang: string) => {
  const res = await fetch(`${baseAPI}news`, {
    next: { revalidate: 1800 },
    headers: {
      'Accept-Language': lang,
    },
  });

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных');
  }

  const data: NewsData = await res.json();

  return data;
};
