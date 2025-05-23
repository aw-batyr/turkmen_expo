"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBurgerOpen } from "@/redux/slices/burgerSlice";
import { activeLangType, setActiveLang } from "@/redux/slices/headerSlice";
import clsx from "clsx";
import { burgerMenu, burgerMenu2 } from "@/lib/database/header";
import { useRouter } from "next/navigation";
import { lang } from "./lang-menu";

interface flagTypes {
  // title: 'Ру' | 'En' | 'Tm';
  title: "Ру" | "En";
  localization: "ru" | "en";
  // localization: 'ru' | 'en' | 'tm';
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
  const { refresh } = useRouter();

  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );

  const [activeMenu, setActiveMenu] = useState<string>("");
  const [activeMenu2, setActiveMenu2] = useState<string>("");

  const setActiveTitle = () => {
    if (activeMenu.includes("/ser"))
      return (
        (localization === "ru" && "Услуги") ||
        (localization === "en" && "Services")
      );
  };

  const setActiveTitle2 = () => {
    if (activeMenu2.includes("/company"))
      return (
        (localization === "ru" && "О компании") ||
        (localization === "en" && "About company")
      );
  };

  const setLang = (lang: activeLangType) => {
    // Устанавливаем cookie через document.cookie
    document.cookie = `lang=${lang.localization}; path=/; max-age=31536000`;
    dispatch(setActiveLang(lang));
    refresh();
  };

  useEffect(() => {
    const cookieLang = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="))
      ?.split("=")[1];

    if (cookieLang) {
      const foundLang = lang.find((l) => l.localization === cookieLang);
      if (foundLang) dispatch(setActiveLang(foundLang));
    }
  }, [dispatch]);

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
      transition={{
        duration: 0.5,
        ease: [0.55, 0, 0.1, 1],
      }}
      exit={{
        x: "100%",
        opacity: 0,
      }}
      className="bg-green overflow-auto fixed w-full z-[900] top-[74px] bottom-0 left-0 min-h-[100vh] h-full px-4 py-10 flex flex-col overflow-y-auto"
    >
      {activeMenu && (
        <div>
          <div
            onClick={() => setActiveMenu("")}
            className="flex cursor-pointer"
          >
            <svg
              className="rotate-180"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
                fill="#303F4D"
              />
            </svg>
            <h2 className="text-[18px] ml-[10px] leading-[135%]">
              {setActiveTitle()}
            </h2>
          </div>

          <div className="mt-[10px] opacity-50 mb-5 h-[1px] w-full bg-blueBg" />
        </div>
      )}

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
                }}
              >
                {(localization === "en" && item.titleEn) ||
                  (localization === "ru" && item.title)}
                {item.drop && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
                      fill="#303F4D"
                    />
                  </svg>
                )}
              </div>
            )
          )}
      </div>

      <div className="h-[1px] w-full opacity-50 bg-blueBg" />

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
        {burgerLangs.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              dispatch(setActiveLang(item));
              dispatch(setBurgerOpen(false));
              setLang(item);
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
