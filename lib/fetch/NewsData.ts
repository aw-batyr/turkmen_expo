"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { Dispatch, SetStateAction } from "react";
import { NewsData } from "../types/NewsData.type";
import { baseAPI } from "../API";

export const fetchNews = async () => {
  const { activeLang } = useAppSelector(selectHeader);
  try {
    const response = await fetch(`${baseAPI}news?X-Localization=${activeLang}`);

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
