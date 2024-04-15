'use client';

import React from 'react';
import Image from 'next/image';
import { v4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectContacts, setActiveMenu } from '@/redux/slices/contactsSlice';

import arrow from '@/public/assets/icons/contact-arrow.svg';
import { innerContactData } from '@/lib/database/contactsData';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  site?: string;
  openContacts: any;
}

export const ContactsDropDown = ({ title, subtitle, phone, email, site, openContacts }: Props) => {
  const [openTitles, setOpenTitles] = React.useState<string[]>([]);

  const onTitle = (name: string) => {
    setRotate(!rotate);
    if (openTitles.includes(name)) {
      setOpenTitles(openTitles.filter((item) => item !== name));
    } else {
      setOpenTitles((prev) => [...prev, name]);
    }
  };

  const [rotate, setRotate] = React.useState(false);

  return (
    <motion.div className="w-full">
      <div
        onClick={() => onTitle(title)}
        className="cursor-pointer flex items-center justify-between sm:py-5 py-4 border-t-navyBlue5 border-b-navyBlue border-y-[1px]">
        <h3 className="sm:text-[21px] text-[16px] sm:font-semibold font-normal sm:leading-[100%] leading-[120%]">
          {title}
        </h3>
        <Image
          src={arrow}
          alt="arrow"
          className={`${rotate && 'rotate-[360deg]'} transition-all duration-300 rotate-[180deg]`}
        />
      </div>
      {openTitles.includes(title || '') && ( // Only display content if the current menu matches the active menu
        <motion.div
          initial={{
            y: '-20px ',
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: '-20px ',
            opacity: 0,
          }}
          className="sm:mx-[40px] mx-4 sm:mb-[30px] mb-5">
          <h4 className="font-medium sm:text-[18px] mt-[30px] text-[16px] sm:mb-[30px] mb-[20px] sm:leading-[100%] leading-[150%]">
            {subtitle}
          </h4>
          <div className="flex text-gray4 sm:text-bgWhite flex-col items-start sm:text-[16px] text-[14px] leading-[150%]">
            <p>{phone}</p>
            <p>{email}</p>
            {site && <p>{site}</p>}
          </div>
          {title === 'Комплекс услуг для экспонентов' && (
            <div className="mt-[30px]">
              {innerContactData.map((item) => (
                <div
                  className="py-[30px] border-t-[1px] last:border-b-[1px] border-navyBlue5"
                  key={v4()}>
                  <h4 className="font-medium text-[18px] mb-[30px] leading-[150%]">
                    {item.subtitle}
                  </h4>
                  <div className="flex flex-col items-start text-[16px] leading-[150%]">
                    {item.phone && <p>{item.phone}</p>}
                    <p>{item.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
