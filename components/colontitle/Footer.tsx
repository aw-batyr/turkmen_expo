"use client";

import React from "react";
import Link from "next/link";

import { footerInfo, headerMenu2 } from "@/lib/database/pathnames";
import { useAppSelector } from "@/redux/hooks";

export const socials = [
  { href: "https://www.linkedin.com/company/turkmen-expo", icon: "linkedin" },
  {
    href: "https://www.facebook.com/profile.php?id=61567254728028",
    icon: "facebook",
  },
  {
    href: "https://www.instagram.com/turkmenexpo_tm?igsh=bnhkOWpmNWcwcHBq",
    icon: "instagram",
  },
  {
    href: "https://x.com/turkmenexpo?t=D-XSa8d0AC8GAv5peAzteA&s=09",
    icon: "x",
  },
];

export const Footer = () => {
  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  return (
    <footer className="bg-[#059784] text-white pt-6 pb-5 mob:py-[40px]">
      <div className="container">
        <div className="">
          <div className="flex lg:flex-row flex-col w-full justify-between mb-12">
            <img className="h-12" src="/assets/icons/white-logo.svg" />

            <div className="flex flex-col mt-8 lg:flex-row items-center font-medium gap-12">
              {headerMenu2
                .filter((item) => (localization === "en" ? item.en : !item.en))
                .map((item, i) => (
                  <Link key={i} href={item.link} className="cursor-pointer">
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between justify-center text-center lg:text-left lg:items-end items-center gap-6">
            <div className="flex flex-col justify-end w-full">
              {localization === "ru" ? (
                <div className="flex flex-col md:gap-y-[10px] gap-0">
                  {footerInfo.slice(0, 3).map((item, i) => (
                    <p className="text-[12px] leading-[130%]" key={i}>
                      {item}
                    </p>
                  ))}
                </div>
              ) : localization === "en" ? (
                <div className="flex flex-col md:gap-y-[10px] gap-0">
                  {footerInfo.slice(3, 7).map((item, i) => (
                    <p className="text-[12px] leading-[130%]" key={i}>
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-6">
              {socials.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="size-8 p-1"
                >
                  <img
                    src={`/assets/icons/${item.icon}.svg`}
                    alt="social"
                    className="size-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
