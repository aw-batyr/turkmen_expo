'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import add from '@/public/assets/icons/faq/add.svg';
import minus from '@/public/assets/icons/faq/minus.svg';
import openIcon from '@/public/assets/icons/contact-arrow.svg';

import { faqData } from '@/lib/database/faqData';
import { selectFaq, setFaqInfo, setFaqTitle } from '@/redux/slices/faqSlice';
import { PlusDrop } from './PlusDrop';
import { baseAPI } from '@/lib/API';
import { FaqDataType } from '@/lib/types/FaqData.type';
import { selectHeader } from '@/redux/slices/headerSlice';

interface IProps {
  currentRadio: number;
}

export const Select = ({ currentRadio }: IProps) => {
  const [faqData, setFaqData] = useState<FaqDataType>();
  const { activeLang } = useAppSelector(selectHeader);

  const fetchFaq = async () => {
    try {
      const res = await fetch(
        `${baseAPI}faq-headers?X-Localization=${activeLang}${
          currentRadio !== 0 ? `&faq_user_group_id=${currentRadio}` : ''
        }`,
      );

      const data = await res.json();

      setFaqData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaq();
    setOpenTitles([]);
    setOpenItems([]);
  }, [currentRadio, activeLang]);

  const { faqTitle } = useAppSelector(selectFaq);

  const [openItems, setOpenItems] = useState<string[]>([]);
  const [openTitles, setOpenTitles] = useState<string[]>([]);

  const onTitle = (name: string) => {
    if (openTitles.includes(name)) {
      setOpenTitles(openTitles.filter((item) => item !== name));
    } else {
      setOpenTitles((prev) => [...prev, name]);
    }
  };

  const onText = (name: string) => {
    if (openItems.includes(name)) {
      setOpenItems(openItems.filter((item) => item !== name));
    } else {
      setOpenItems((prev) => [...prev, name]);
    }
  };

  console.log(faqData);

  return (
    <div className="w-full">
      {faqData?.data.map((item) => (
        <div key={v4()} className="w-full">
          <div
            onClick={() => onTitle(item.header)}
            className={clsx(
              'w-full flex items-center justify-between border-y-[1px] border-y-navyBlue cursor-pointer',
              {
                'border-t-navyBlue5': faqTitle === item.header,
              },
            )}>
            <h2 className="sm:text-[21px] text-[16px] sm:leading-[100%] leading-[120%] sm:font-semibold font-[400] py-4 sm:py-5">
              {item.header}
            </h2>
            <Image
              src={openIcon}
              alt="arrow"
              className={clsx('rotate-[180deg] transition-all gap-4', {
                'rotate-[360deg]': openTitles.includes(item.header || ''),
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
            className="flex flex-col gap-y-[20px] w-full max-w-[1000px]">
            {openTitles.includes(item.header || '') &&
              item.faq_items.map((obj) => (
                <motion.div
                  key={v4()}
                  className="text-gray4 sm:px-[40px] px-0 first-of-type:pt-[30px] last-of-type:pb-[30px] flex flex-col items-start gap-y-[16px] leading-[1.5]">
                  <div
                    onClick={() => setFaqInfo('')}
                    className="flex items-center gap-x-[10px] cursor-pointer">
                    <Image
                      src={openItems.includes(obj.question || '') ? minus : add}
                      width={20}
                      height={20}
                      alt="button"
                    />
                    <h4
                      onClick={() => {
                        obj.question && onText(obj.question);
                      }}
                      className="text-[16px] text-bgWhite">
                      {obj.question}
                    </h4>
                  </div>
                  {openItems.includes(obj.question || '') && <PlusDrop {...obj} />}
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
