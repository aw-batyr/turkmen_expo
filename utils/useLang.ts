"use client";

export const useLang = (en: string, ru: string, localization: string) => {
  if (localization === "en") {
    return en;
  } else {
    return ru;
  }
};
