import { baseAPI } from '@/lib/API';
import { ServicesType } from '@/lib/types/Services.data';

export const getServices = async (lang: string) => {
  const res = await fetch(`${baseAPI}services`, {
    headers: {
      'Accept-Language': lang,
    },
  });

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных');
  }

  const data: ServicesType = await res.json();

  return data;
};
