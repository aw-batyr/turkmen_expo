"use client";

import { useMediaQuery } from "usehooks-ts";

export const useSliderBanner = (): string => {
  const isTab = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 700px)");

  if (isTab) {
    return "main-surat";
  } else if (isMd) {
    return "medium-surat";
  } else {
    return "small-surat";
  }
};
