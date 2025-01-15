import { baseAPI } from "@/lib/API";

export const getAbout = async (lang: string) => {
  const res = await fetch(`${baseAPI}settings/about_us`, {
    headers: {
      "Accept-Language": lang,
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных о нас");
  }

  const data: string = await res.json();

  return data;
};
