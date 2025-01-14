import { baseAPI } from "@/lib/API";
import { SliderType } from "@/lib/types/SliderData.type";

export const getSlider = async (bannerType: string): Promise<SliderType> => {
  const res = await fetch(`${baseAPI}banners/${bannerType}`, {
    next: { revalidate: 1800 },
    headers: {
      "Accept-Language": "ru",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных баннера");
  }

  const data: SliderType = await res.json();
  return data;
};
