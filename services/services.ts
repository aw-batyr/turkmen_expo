import { baseAPI } from "@/lib/API";
import { ServicesType } from "@/lib/types/Services.data";
import { cookies } from "next/headers";

export const getServices = async () => {
  const lang = cookies().get("lang")?.value || "en";

  const res = await fetch(`${baseAPI}services`, {
    headers: {
      "Accept-Language": lang, // Передаём язык в заголовке
    },
    next: {
      revalidate: 1000,
      tags: [`services-${lang}`], // Кешируем отдельно для каждого языка
    },
  });

  if (!res.ok) throw new Error("Ошибка при загрузке данных");

  return (await res.json()) as ServicesType;
};
