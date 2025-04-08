"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import triangle from "@/public/assets/icons/drop-icon.svg";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { activeLangType, selectHeader } from "@/redux/slices/headerSlice";
import { setActiveLang } from "@/redux/slices/headerSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const lang: activeLangType[] = [
  {
    title: "Русский",
    localization: "ru",
  },
  // {
  //   title: 'Tm',
  //   localization: 'tm',
  // },
  {
    title: "English",
    localization: "en",
  },
];

export const LangMenu = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const { refresh } = useRouter();
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative w-[90px] cursor-pointer  flex items-center gap-x-[20px]"
      onClick={() => {
        setActive(!active);
      }}
    >
      <div className="flex items-center px-[12px]">
        <p>{activeLang.title}</p>
        <Image
          src={triangle}
          alt="arrow"
          className={clsx("transition-rotate duration-300 img-auto", {
            "rotate-180": active,
          })}
        />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute rounded-[4px] w-[112px] overflow-hidden custom-shadow z-10 flex flex-col top-[27px] bg-[#EEF1F0] transition-all duration-300"
          >
            {lang
              .filter((item) => item.title !== activeLang.title)
              .map((item, i) => (
                <div
                  key={i}
                  onClick={() => setLang(item)}
                  className={clsx(
                    "p-3 pr-[22px] py-4  text-extraSm  transition-all",
                    {
                      "hover:bg-ON_SECONDARY_CONTAINER/[8%]":
                        item.title === item.title,
                    }
                  )}
                >
                  {item.title}
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
