"use client";

import React from "react";
import Image from "next/image";

import { contactCardData, roadCardData } from "@/lib/database/homeInfoData";
import { useLang } from "@/utils/useLang";
import { useAppSelector } from "@/redux/hooks";

export const Services = () => {
  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  return (
    <div
      className={`container flex flex-col md:flex-row md:w-full gap-5 lg:gap-x-[40px] items-center`}
    >
      <div className="flex flex-col items-start gap-x-5 w-full">
        <h3 className="text-[21px] leading-[100%] font-bold text-bgWhite md:text-[#B0E6A1] uppercase md:mb-10 mb-5">
          {useLang("Routes", "как добраться", localization)}
        </h3>
        <div className="flex flex-col gap-y-5 w-full">
          {roadCardData.map((item, i) => (
            <div
              className="bg-white w-full transition-all hover:hover-shadow cursor-pointer service-shadow px-[40px] py-5 text-black greenBtnShadow rounded-[2px] custom-shadow"
              key={i}
            >
              <div className="flex items-center gap-10 md:gap-5">
                <Image className="img-auto" src={item.icon} alt="icon" />
                <p className="text-[16px] leading-[120%] md:leading-[100%]">
                  {localization === "ru" ? item.text : item.enText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start md:mt-0 mt-10 gap-x-5 w-full">
        <h3 className="text-[21px] leading-[100%] text-bgWhite md:text-[#FFD288] uppercase font-bold md:mb-10 mb-5">
          {useLang("Contacts", "контакты", localization)}
        </h3>
        <div className="flex flex-col gap-y-5 w-full">
          {contactCardData.map((item, i) => (
            <div
              className="bg-white w-full transition-all hover:hover-shadow cursor-pointer service-shadow px-[40px] py-5 text-black greenBtnShadow rounded-[2px]"
              key={i}
            >
              <div className="flex items-center md:gap-5 gap-10">
                <Image src={item.icon} alt="icon" />
                <p className="text-[16px] leading-[120%] md:leading-[100%]">
                  {localization === "ru" ? item.text : item.enText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
