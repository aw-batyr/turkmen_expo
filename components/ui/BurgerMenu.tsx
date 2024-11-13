"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBurgerOpen } from "@/redux/slices/burgerSlice";
import { setActiveLang } from "@/redux/slices/headerSlice";
import clsx from "clsx";
import { burgerMenu, burgerMenu2 } from "@/lib/database/header";

interface flagTypes {
  title: "Ру" | "En";
  localization: "ru" | "en";
}

const burgerLangs: flagTypes[] = [
  // {
  //   title: 'Tm',
  //   localization: 'tm',
  // },
  {
    title: "Ру",
    localization: "ru",
  },
  {
    title: "En",
    localization: "en",
  },
];

export const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const wrapper = document.querySelector(".wrapper");

  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  const [activeMenu, setActiveMenu] = useState<string>("");
  const [activeMenu2, setActiveMenu2] = useState<string>("");

  const setActiveTitle = () => {
    if (activeMenu.includes("/mem"))
      return (
        (localization === "ru" && "Участникам") ||
        (localization === "en" && "Participants")
      );
  };

  const setActiveTitle2 = () => {
    if (activeMenu2.includes("/company"))
      return (
        (localization === "ru" && "О компании") ||
        (localization === "en" && "About company")
      );
  };

  useEffect(() => {
    wrapper?.classList.remove("overflow-hidden");
    wrapper?.classList.add("overflow-hidden");

    return () => {
      wrapper?.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{
        x: "100%",
        opacity: 0,
      }}
      transition={{ duration: 0.5, ease: [0.55, 0, 0.1, 1] }}
      className="bg-green overflow-auto text-blueBg fixed w-full z-[900] top-[74px] bottom-0 left-0 min-h-[100vh] h-full px-4 py-10 flex flex-col overflow-y-auto"
    >
      {activeMenu && (
        <div>
          <div
            onClick={() => setActiveMenu("")}
            className="flex cursor-pointer"
          >
            <img src="" className="rotate-180 text-blueBg" />
            <h2 className="text-[18px] ml-[10px] leading-[135%]">
              {setActiveTitle()}
            </h2>
          </div>

          <div className="mt-[10px] opacity-50 mb-5 h-[1px] w-full bg-[#F2F9FF]" />
        </div>
      )}

      {/* {activeMenu && (
        <div className="flex flex-col gap-5 leading-[150%]">
          {activeMenu.includes('/mem') &&
            burgerMenu
              .filter((item) => item.partic)
              .map((item, i) =>
                item.dropDown?.map((obj) => (
                  <Link key={i} onClick={() => dispatch(setBurgerOpen(false))} href={obj.link}>
                    {localization === 'en' ? obj.titleEn : obj.title}
                  </Link>
                )),
              )}
        </div>
      )} */}

      {activeMenu && (
        <div className="flex flex-col gap-5 leading-[150%]">
          {activeMenu.includes("/services") &&
            burgerMenu
              .filter((item) => item.services)
              .map((item, i) =>
                item.dropDown?.map((obj) => (
                  <Link
                    key={i}
                    onClick={() => dispatch(setBurgerOpen(false))}
                    href={obj.link}
                  >
                    {localization === "en" ? obj.titleEn : obj.title}
                  </Link>
                ))
              )}
        </div>
      )}

      <div className="leading-[135%] text-[18px] mb-10 flex flex-col gap-5">
        {!activeMenu &&
          burgerMenu.map((item, i) =>
            !item.drop ? (
              <Link
                key={i}
                onClick={() => {
                  dispatch(setBurgerOpen(false));
                }}
                href={item.link}
              >
                {(localization === "en" && item.titleEn) ||
                  (localization === "ru" && item.title)}
              </Link>
            ) : (
              <div
                key={i}
                className="cursor-pointer flex items-center justify-between"
                onClick={() => {
                  setActiveMenu(item.link);
                  setActiveMenu2("");
                }}
              >
                {(localization === "en" && item.titleEn) ||
                  (localization === "ru" && item.title)}
                {item.drop && (
                  <img
                    src="/assets/icons/header/burger-arrow.svg"
                    alt="arrow"
                  />
                )}
              </div>
            )
          )}
      </div>

      <div className="h-[1px] w-full opacity-50 bg-[#F2F9FF]" />

      {activeMenu2 && (
        <div>
          <div
            onClick={() => setActiveMenu2("")}
            className="flex cursor-pointer pt-4"
          >
            <img
              src="/assets/icons/header/burger-arrow.svg"
              alt="arrow"
              className="rotate-180"
            />
            <h2 className="text-[18px] ml-[10px] leading-[135%]">
              {setActiveTitle2()}
            </h2>
          </div>

          <div className="mt-[10px] opacity-50 mb-5 h-[1px] w-full bg-[#F2F9FF]" />
        </div>
      )}

      <div
        className={clsx("leading-[135%] text-[14px] flex flex-col gap-5", {
          "mt-10": !activeMenu2,
        })}
      >
        {!activeMenu2 &&
          burgerMenu2.map((item, i) =>
            !item.drop ? (
              <Link
                key={i}
                onClick={() => dispatch(setBurgerOpen(false))}
                href={item.link}
              >
                {(localization === "en" && item.titleEn) ||
                  (localization === "ru" && item.title)}
              </Link>
            ) : (
              <div
                key={i}
                className="cursor-pointer flex items-center justify-between"
                onClick={() => {
                  item.drop && setActiveMenu2(item.link);
                  setActiveMenu("");
                }}
              >
                <div>
                  {(localization === "en" && item.titleEn) ||
                    (localization === "ru" && item.title)}
                </div>
                {item.drop && (
                  <img
                    src="/assets/icons/header/burger-arrow.svg"
                    alt="arrow"
                  />
                )}
              </div>
            )
          )}

        {activeMenu2.includes("/company") &&
          burgerMenu2
            .filter((item) => item.company)
            .map((obj) =>
              obj.dropDown?.map((item) => (
                <Link
                  key={v4()}
                  href={item.link}
                  onClick={() => {
                    dispatch(setBurgerOpen(false));
                  }}
                >
                  {(localization === "en" && item.titleEn) ||
                    (localization === "ru" && item.title)}
                </Link>
              ))
            )}
      </div>

      <div className="flex items-center mx-auto gap-10 mt-10">
        {burgerLangs.map((item) => (
          <div
            key={v4()}
            onClick={() => {
              dispatch(setActiveLang(item));
              dispatch(setBurgerOpen(false));
            }}
            className="flex cursor-pointer items-center gap-[10px]"
          >
            <img
              src={`/assets/icons/header/${item.localization}.svg`}
              alt="flag"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
