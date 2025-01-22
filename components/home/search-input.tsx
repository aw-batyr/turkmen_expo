"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import close from "@/public/assets/icons/home/close-input.svg";

import { selectInput, setInputStatus } from "@/redux/slices/inputSlice";
import { v4 } from "uuid";
import { selectHeader, setShowInput } from "@/redux/slices/headerSlice";
import clsx from "clsx";
import { selectBurger } from "@/redux/slices/burgerSlice";
import { baseAPI } from "@/lib/API";
import Link from "next/link";
import { SearchTypes } from "@/lib/types/Search.type";
import { useMediaQuery } from "usehooks-ts";

export const inputRadio = [
  { name: "Везде", id: "all" },
  { name: "В событиях", id: "events" },
  { name: "В новостях", id: "news" },
];

export const SearchInput = ({ mob = false }: { mob?: boolean }) => {
  const localization = useAppSelector(
    (state) => state.headerSlice.activeLang.localization
  );
  const wrapper = document.querySelector(".wrapper");

  const tab = useMediaQuery("(min-width: 980px)");

  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<SearchTypes>();
  const [isSearching, setIsSearching] = useState(false);
  const [searchIsError, setSearchIsError] = useState(false);

  const { showInput } = useAppSelector(selectHeader);

  useEffect(() => {
    wrapper?.classList.remove("overflow-hidden");
    wrapper?.classList.add("overflow-hidden");

    setStatus(inputRadio[0].id);
    inputRadio;

    return () => {
      wrapper?.classList.remove("overflow-hidden");
    };
  }, [showInput]);

  const fetchSearchData = async () => {
    setIsSearching(true);
    setSearchValue(value);
    try {
      const res = await fetch(`${baseAPI}search?search=${value}`, {
        headers: {
          "Accept-Language": localization,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return console.error(res.status);
      }

      const data = await res.json();
      setSearchData(data);

      setIsSearching(false);
    } catch (error) {
      console.error(error);
      setSearchIsError(true);
    }
  };

  const dispatch = useAppDispatch();
  const { inputStatus } = useAppSelector(selectInput);
  const { burgerOpen } = useAppSelector(selectBurger);

  const setStatus = (name: string) => {
    dispatch(setInputStatus(name));
  };

  return (
    <motion.div
      initial={{
        y: "-100%",
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: "-100%",
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.55, 0, 0.1, 1],
      }}
      className={clsx("left-0 w-full h-screen overflow-auto z-20 bg-blueBg", {
        "fixed top-[74px] bottom-0": !tab,
        "absolute bottom-0 top-0 z-[9999]": tab,
        hidden: burgerOpen,
      })}
    >
      <div className="container section-mb">
        <div className="w-full flex justify-end mt-[40px]">
          <svg
            className="cursor-pointer"
            onClick={() => dispatch(setShowInput(false))}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
              fill="#0f0000"
            />
          </svg>
        </div>
        <div
          className={`flex flex-col mt-[10vw] items-center w-full mb-6 max-w-[566px] mx-auto`}
        >
          <div className="w-full mb-[24px]">
            <input
              maxLength={30}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              value={value}
              type="text"
              placeholder="Что найти?"
              className="p-3 w-full leading-[150%] placeholder:leading-[150%] placeholder:text-gray focus:outline-none rounded-sm bg-transparent border-[1px] border-[#BCC4CC]"
            />
          </div>
          <div className="flex items-center text-[12px] sm:text-[14px] gap-[40px] sm:gap-[48px] mb-5 sm:mb-10">
            {inputRadio.map((item) => (
              <div
                onClick={() => setStatus(item.id)}
                className="flex cursor-pointer items-center gap-[10px]"
                key={v4()}
              >
                <div
                  className={clsx(
                    "size-5 border border-primary relative after:absolute transition-all after:transition-all after:size-[9px] after:scale-0 flex items-center justify-center after:bg-primary after:rounded-full rounded-full",
                    inputStatus === item.id && "after:scale-100"
                  )}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <button
            disabled={isSearching || value.length < 3}
            className="mb-6"
            onClick={fetchSearchData}
          >
            {isSearching ? (
              <div className="bg-green w-[180px] h-[48px] py-[17px] rounded-sm">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="bg-green py-[17px] px-[70px] rounded-sm">
                Найти
              </div>
            )}
          </button>

          {searchData ? (
            searchData.data.expo_events.length &&
            searchData.data.posts.length ? (
              <>
                <div className="mb-12 font-light">
                  По запросу « <span className="font-bold">{searchValue}</span>{" "}
                  » нашлось
                  {searchData.data.expo_events.length +
                    searchData.data.posts.length}{" "}
                  результатов
                </div>
                <div className="flex flex-col gap-9 w-full tab:mb-0 mb-20">
                  {inputStatus === "all" || inputStatus === "events"
                    ? searchData.data.expo_events.map((item) => (
                        <div className="w-full">
                          <h3 className="font-bold mb-[18px] text-[16px] leading-[125%]">
                            {item.title}
                          </h3>
                          <Link href={`/calendar/${item.id}`}>
                            Перейти на страницу
                          </Link>
                          <hr className="mt-9 border-OUTLINE_VAR" />
                        </div>
                      ))
                    : null}
                  {inputStatus === "all" || inputStatus === "news"
                    ? searchData.data.posts.map((item) => (
                        <div className="w-full">
                          <h3 className="font-bold mb-[18px] text-[16px] leading-[125%]">
                            {item.title}
                          </h3>
                          <Link href={`/news/${item.id}`}>
                            Перейти на страницу
                          </Link>
                          <hr className="mt-9 border-OUTLINE_VAR" />
                        </div>
                      ))
                    : null}
                </div>
              </>
            ) : (
              <h3>По вашему запросу ничего не найдено</h3>
            )
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};
