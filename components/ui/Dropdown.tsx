"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { v4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

import drop from "@/public/assets/icons/form-drop-icon.svg";
import { exhibitions, FormFields, IMethods } from "../bid/FormSec";
import { baseAPI } from "@/lib/API";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { EventType } from "@/lib/types/EventsType";

interface Props {
  dropInfo?: IMethods[];
  value?: string;
  required?: boolean;
  event?: boolean;
  name: string;
}

export const BidDrop = ({
  value,
  name,
  dropInfo,
  required = false,
  event = false,
  ...field
}: Props) => {
  const { activeLang } = useAppSelector(selectHeader);
  const [title, setTitle] = React.useState(value);
  const [active, setActive] = React.useState(false);
  const dropRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  const [titles, setTitles] = useState<EventType>();

  const fetchTitles = async () => {
    try {
      const res = await fetch(
        `${baseAPI}expoevents?${activeLang.localization}`
      );

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();

      setTitles(data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchTitles();
  }, []);

  const onOption = (name: string) => {
    setActive(false);
    setTitle(name);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-[15px] leading-[130%]">
        {name}
        {required && <span className="text-lightRed">*</span>}
      </div>
      <div
        key={v4()}
        onClick={() => {
          setActive(!active);
        }}
        className="h-[43px] flex cursor-pointer items-center justify-between bid-drop py-[15px]"
      >
        <div>
          <div>{title}</div>
        </div>
        <Image
          src={drop}
          alt="arrow"
          className={clsx("transition-all", {
            "rotate-180": active,
          })}
        />
      </div>
      <div className="relative">
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
                duration: 0.25,
              }}
              className="bg-navyBlue3 rounded-sm flex flex-col absolute w-full shadow-sm"
            >
              {event
                ? titles
                  ? titles.data.map((item) => (
                      <div
                        key={v4()}
                        onClick={() => onOption(item.title)}
                        className={clsx(
                          "cursor-pointer py-[15px] px-[12px] text-[14px] font-regular leading-[125%] transition-all",
                          {
                            "hover:bg-green rounded-sm": item === item,
                          }
                        )}
                      >
                        {item.title}
                      </div>
                    ))
                  : null
                : dropInfo &&
                  dropInfo.map((item, id) => (
                    <div
                      key={v4()}
                      onClick={() => onOption(item.value)}
                      className={clsx(
                        "cursor-pointer py-[15px] px-[12px] text-[14px] font-regular leading-[125%] transition-all",
                        {
                          "hover:bg-green rounded-sm":
                            item.value === item.value,
                        }
                      )}
                    >
                      {item.value}
                    </div>
                  ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
