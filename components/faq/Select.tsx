"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";

import { useAppSelector } from "@/redux/hooks";

import openIcon from "@/public/assets/icons/contact-arrow.svg";

import { selectFaq } from "@/redux/slices/faqSlice";
import { PlusDrop } from "./PlusDrop";

interface IProps {
  // header: string;
  // faqItems: {
  //   question: string;
  //   answer: string;
  // }[];

  title: string;
  content: string;
}

// header, faqItems

export const Select = ({ title, content }: IProps) => {
  const { faqTitle } = useAppSelector(selectFaq);

  const [openTitles, setOpenTitles] = useState<string[]>([]);

  const onTitle = (name: string) => {
    if (openTitles.includes(name)) {
      setOpenTitles(openTitles.filter((item) => item !== name));
    } else {
      setOpenTitles((prev) => [...prev, name]);
    }
  };

  return (
    <motion.div className="w-full">
      <div className="w-full">
        <div
          onClick={() => onTitle(title)}
          className={clsx(
            "w-full flex items-center justify-between border-y-[1px] border-y-navyBlue cursor-pointer",
            {
              "border-t-navyBlue5": faqTitle === title,
            }
          )}
        >
          <h2 className="sm:text-[21px] text-[16px] sm:leading-[100%] leading-[120%] sm:font-semibold font-[400] py-4 sm:py-5">
            {title}
          </h2>
          <Image
            src={openIcon}
            alt="arrow"
            className={clsx("rotate-[180deg] transition-all gap-4", {
              "rotate-[360deg]": openTitles.includes(title || ""),
            })}
          />
        </div>
        <motion.div className="flex flex-col gap-y-[20px] w-full max-w-[1000px]">
          {openTitles.includes(title || "") && (
            <div
              className="select-inner py-6"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// initial={{ y: '-100%' }}
// animate={{ y: 0 }}
// exit={{ y: '-100%' }}

{
  /* <motion.div className="flex flex-col gap-y-[20px] w-full max-w-[1000px]">
          {openTitles.includes(title || "") &&
            faqItems.map((item) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={v4()}
                className="text-gray4 sm:px-[40px] px-0 first-of-type:pt-[30px] last-of-type:pb-[30px] flex flex-col items-start leading-[1.5]"
              >
                <AnimatePresence>
                  <PlusDrop answer={item.answer} question={item.question} />
                </AnimatePresence>
              </motion.div>
            ))}
        </motion.div> */
}
