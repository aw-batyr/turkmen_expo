"use client";

import React, { Suspense, useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import logo from "@/public/assets/icons/logo.svg";
import search from "@/public/assets/icons/header/search.svg";
import searchMob from "@/public/assets/icons/header/mob-search.svg";

import { LangMenu } from "../ui/lang-menu";
import { SearchInput } from "./search-input";
import { headerMenu2 } from "@/lib/database/pathnames";
import { BurgerMenu } from "../ui/burger-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectHeader, setShowInput } from "@/redux/slices/headerSlice";
import { selectBurger, setBurgerOpen } from "@/redux/slices/burgerSlice";
import { useStorage } from "@/hooks/useStorage";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { showInput } = useAppSelector(selectHeader);
  const { burgerOpen } = useAppSelector(selectBurger);
  const { activeLang } = useAppSelector(selectHeader);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  const toggleMenu = () => {
    dispatch(setBurgerOpen(!burgerOpen));
    dispatch(setShowInput(false));
  };

  const onSearch = () => {
    dispatch(setShowInput(!showInput));
    dispatch(setBurgerOpen(false));
  };

  const { setItem } = useStorage("language");

  useEffect(() => {
    setItem(activeLang);
  }, [activeLang]);

  return (
    <>
      <AnimatePresence>
        {showInput && (
          <div className="absolute w-full top-0 left-0">
            <SearchInput />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile */}

      <header
        className={clsx(
          "bg-[#EEF1F0] border-b border-[#DFE2E1] tab:hidden relative z-[50] flex items-center justify-between px-4 py-6",
          {
            // 'fixed w-full top-0': burgerOpen,
          }
        )}
      >
        <Image
          src={searchMob}
          height={32}
          width={32}
          alt="поиск"
          className="cursor-pointer"
          onClick={onSearch}
        />

        <Link
          onClick={() => {
            dispatch(setBurgerOpen(false));
            dispatch(setShowInput(false));
          }}
          href={"/"}
        >
          <Image
            src={logo}
            height={24}
            width={160}
            alt="лого"
            className="cursor-pointer"
          />
        </Link>

        <div
          onClick={toggleMenu}
          className="cursor-pointer h-8 w-8 flex flex-col p-1 justify-between items-center"
        >
          <span
            className={clsx(
              "block transition-all rounded-full bg-PRIMARY w-6 h-[2px]",
              {
                "rotate-[45deg] translate-y-[9px]": burgerOpen,
              }
            )}
          />
          <span
            className={clsx(
              "block transition-all rounded-full bg-PRIMARY w-6 h-[2px]",
              {
                "opacity-0 hidden": burgerOpen,
              }
            )}
          />
          <span
            className={clsx(
              "block transition-all duration-300 rounded-full bg-PRIMARY w-6 h-[2px]",
              {
                "rotate-[-45deg] translate-y-[-10px]": burgerOpen,
              }
            )}
          />
        </div>

        <AnimatePresence>{burgerOpen && <BurgerMenu />}</AnimatePresence>
      </header>

      {/* Desktop */}

      <header className="hidden border-b border-[#DFE2E1] relative z-[3000] tab:flex flex-col">
        <div className="bg-[#EEF1F0] text-black">
          <div className="container py-[17px] flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image src={logo} alt="logo" height={38} width={235} />
              </Link>
              <div className="flex gap-[10px]">
                <Suspense>
                  <LangMenu />
                </Suspense>
                <Image
                  src={search}
                  alt="поиск"
                  onClick={() => dispatch(setShowInput(true))}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <nav className="flex items-center gap-x-5 font-medium">
              {headerMenu2
                .filter((item) =>
                  activeLang.localization === "en" ? item.en : !item.en
                )
                .map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    onClick={() => setActiveLink(item.link)}
                  >
                    {item.title}
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
