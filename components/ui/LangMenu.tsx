"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import triangle from "@/public/assets/icons/drop-icon.svg";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { activeLangType, selectHeader } from "@/redux/slices/headerSlice";
import { setActiveLang } from "@/redux/slices/headerSlice";
import { useRouter, useSearchParams } from "next/navigation";

export const lang: activeLangType[] = [
  {
    title: "Ру",
    localization: "ru",
  },
  {
    title: "Tm",
    localization: "tm",
  },
  {
    title: "En",
    localization: "en",
  },
];

export const LangMenu = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams as any);

  useEffect(() => {
    params.set("lang", activeLang.localization);

    replace(`?${params.toString()}`);
  }, [activeLang]);

  const dispatch = useAppDispatch();
  const [active, setActive] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const setLang = (obj: {
    localization: activeLangType["localization"];
    title: activeLangType["title"];
  }) => {
    setActive(false);
    dispatch(setActiveLang(obj));
  };

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
      className="relative cursor-pointer flex items-center gap-x-[20px]"
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
            className="absolute overflow-hidden z-10 flex flex-col top-[27px] bg-darkBlue transition-all duration-300"
          >
            {lang
              .filter((item) => item.title !== activeLang.title)
              .map((item, i) => (
                <div
                  key={i}
                  onClick={() => setLang(item)}
                  className={clsx(
                    "p-3 pr-[22px] text-extraSm text-bgWhite transition-all",
                    {
                      "hover:bg-navyBlue2": item.title === item.title,
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
