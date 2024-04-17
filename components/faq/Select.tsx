"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { v4 } from "uuid";
import { motion } from "framer-motion";

import { useAppSelector } from "@/redux/hooks";

import add from "@/public/assets/icons/faq/add.svg";
import minus from "@/public/assets/icons/faq/minus.svg";
import openIcon from "@/public/assets/icons/contact-arrow.svg";

import { selectFaq, setFaqInfo } from "@/redux/slices/faqSlice";
import { PlusDrop } from "./PlusDrop";

interface IProps {
  openTitles: string[];
  header: string;
  faqItems: {
    question: string;
    answer: string;
  };
  onTitle: (name: string) => void;
}

export const Select = ({ openTitles, header, onTitle, faqItems }: IProps) => {
  const { faqTitle } = useAppSelector(selectFaq);

  const [openItems, setOpenItems] = useState<string[]>([]);

  const onText = (name: string) => {
    if (openItems.includes(name)) {
      setOpenItems(openItems.filter((item) => item !== name));
    } else {
      setOpenItems((prev) => [...prev, name]);
    }
  };

  console.log(faqItems);

  return (
    <div className="w-full">
      <div className="w-full">
        <div
          onClick={() => onTitle(header)}
          className={clsx(
            "w-full flex items-center justify-between border-y-[1px] border-y-navyBlue cursor-pointer",
            {
              "border-t-navyBlue5": faqTitle === header,
            }
          )}
        >
          <h2 className="sm:text-[21px] text-[16px] sm:leading-[100%] leading-[120%] sm:font-semibold font-[400] py-4 sm:py-5">
            {header}
          </h2>
          <Image
            src={openIcon}
            alt="arrow"
            className={clsx("rotate-[180deg] transition-all gap-4", {
              "rotate-[360deg]": openTitles.includes(header || ""),
            })}
          />
        </div>
        <motion.div
          // initial={{
          //   y: '-30px',
          //   opacity: 0,
          // }}
          // animate={{
          //   opacity: 1,
          //   y: 0,
          // }}
          // exit={{
          //   opacity: 1,
          //   y: 0,
          // }}
          className="flex flex-col gap-y-[20px] w-full max-w-[1000px]"
        >
          {openTitles.includes(header || "") && (
            <motion.div
              key={v4()}
              className="text-gray4 sm:px-[40px] px-0 first-of-type:pt-[30px] last-of-type:pb-[30px] flex flex-col items-start gap-y-[16px] leading-[1.5]"
            >
              <div
                onClick={() => setFaqInfo("")}
                className="flex items-center gap-x-[10px] cursor-pointer"
              >
                <Image
                  src={
                    openItems.includes(faqItems.question || "") ? minus : add
                  }
                  width={20}
                  height={20}
                  alt="button"
                />
                <h4
                  onClick={() => {
                    faqItems.question && onText(faqItems.question);
                  }}
                  className="text-[16px] text-bgWhite"
                >
                  {faqItems.question}
                </h4>
              </div>
              {openItems.includes(faqItems.question || "") && (
                <PlusDrop
                  answer={faqItems.answer}
                  question={faqItems.question}
                />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
