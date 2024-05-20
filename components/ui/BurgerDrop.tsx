"use client";

import { burgerMenuData } from "@/lib/database/pathnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { v4 } from "uuid";

import arrow from "@/public/assets/icons/header/burger-arrow.svg";
import {
  setBurgerDrop,
  setBurgerOpen,
  setFooterDrop,
} from "@/redux/slices/burgerSlice";

export const BurgerDrop = ({
  filter,
  setDrop,
}: {
  filter: string;
  setDrop: (name: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  return burgerMenuData
    .filter((obj) => !obj.only)
    .map(
      (item) =>
        item.pathname === filter && (
          <div key={v4()} className="flex flex-col">
            <div
              onClick={() => {
                setDrop(false);
                dispatch(setBurgerDrop(""));
                dispatch(setFooterDrop(""));
              }}
              className="cursor-pointer flex items-center gap-[10px] mb-[10px]"
            >
              <Image src={arrow} alt="стрелка" className="rotate-180" />
              <h3 className="leading-[135%] text-[18px]">{item.title}</h3>
            </div>
            <hr className="border-bgWhite mb-5" />

            <div className="flex flex-col leading-[150%] gap-5">
              {item.info?.map((subj) => (
                <Link
                  key={v4()}
                  href={subj.link}
                  className="cursor-pointer text-white"
                  onClick={() => {
                    dispatch(setBurgerOpen(false));
                    setDrop(false);
                  }}
                >
                  {subj.title}
                </Link>
              ))}
            </div>
          </div>
        )
    );
};
