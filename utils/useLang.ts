"use client";

import { useAppSelector } from "@/redux/hooks";

export const useLang = (en: string, ru: string) => {
  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  return (
    (localization === "en" && en) || ((localization === "ru" && ru) as string)
  );
};
