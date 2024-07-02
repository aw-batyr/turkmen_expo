"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

interface IProps {
  title: string;
  content: string;
}

// header, faqItems

export const SelectRules = ({ ...props }: IProps) => {
  const { title, content } = props;

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
      <motion.div
        onClick={() => onTitle(title)}
        className={clsx(
          "w-full flex items-center justify-between border-t-[1px] border-y-navyBlue cursor-pointer",
          {
            "border-b-[1px]": openTitles.includes(title || ""),
          }
        )}
      >
        <h2 className="sm:text-[21px] text-[16px] sm:leading-[100%] leading-[120%] sm:font-semibold font-[400] py-4 sm:py-5">
          {title}
        </h2>
        <Image
          src={"/assets/icons/contact-arrow.svg"}
          width={30}
          height={30}
          alt="arrow"
          className={clsx("rotate-[180deg] transition-all gap-4", {
            "rotate-[360deg]": openTitles.includes(title || ""),
          })}
        />
      </motion.div>

      <motion.div
        initial={{
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        animate={
          openTitles.includes(title || "")
            ? { height: "100%", paddingTop: 32, paddingBottom: 32 }
            : {}
        }
        transition={{ duration: 0.3 }}
        className={clsx(
          "flex flex-col gap-6 last:border-b-[1px] last:border-b-navyBlue overflow-hidden"
        )}
      >
        {openTitles.includes(title || "") ? (
          <div
            className="select-inner"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : null}
      </motion.div>
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
