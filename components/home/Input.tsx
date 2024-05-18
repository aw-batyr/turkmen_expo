'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDebounceCallback } from 'usehooks-ts';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import close from '@/public/assets/icons/home/close-input.svg';

import { Radio } from '../bid/InputTypes';
import { SimpleGreenBtn } from '../ui/Buttons';
import { selectInput, setInputStatus } from '@/redux/slices/inputSlice';
import { v4 } from 'uuid';
import { selectHeader, setShowInput } from '@/redux/slices/headerSlice';
import { easeOut } from 'framer-motion/dom';
import clsx from 'clsx';
import { selectBurger } from '@/redux/slices/burgerSlice';

export const inputRadio = [
  { name: 'Везде', id: 'all' },
  { name: 'В событиях', id: 'events' },
  { name: 'В новостях', id: 'news' },
];

export const Input = ({ mob = false }: { mob?: boolean }) => {
  const wrapper = document.querySelector('.wrapper');

  const [value, setValue] = useState('');

  const debounced = useDebounceCallback(setValue, 500);

  useEffect(() => {
    wrapper?.classList.add('overflow-hidden');

    return () => {
      wrapper?.classList.remove('overflow-hidden');
    };
  }, []);

  const dispatch = useAppDispatch();
  const { inputStatus } = useAppSelector(selectInput);
  const { burgerMenu } = useAppSelector(selectBurger);

  const setStatus = (name: string) => {
    dispatch(setInputStatus(name));
  };

  console.log(value);

  return (
    <motion.div
      initial={{
        y: '-100%',
      }}
      animate={{
        y: 0,
      }}
      exit={{
        y: '-100%',
      }}
      transition={{
        duration: 0.3,
        ease: easeOut,
      }}
      className={clsx('left-0 w-full min-h-svh z-20 overflow-y-auto bg-blueBg', {
        'fixed top-[74px] bottom-0': mob,
        'absolute bottom-0': !mob,
        hidden: burgerMenu,
      })}>
      <div className="container">
        <div className="w-full flex justify-end mt-[40px]">
          <Image
            alt="close"
            className="cursor-pointer"
            onClick={() => dispatch(setShowInput(false))}
            src={close}
          />
        </div>
        <div className={`flex flex-col mt-[10vw] items-center w-full mb-6 max-w-[566px] mx-auto`}>
          <div className="w-full mb-[24px]">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
              value={value}
              type="search"
              placeholder="Что найти?"
              className="p-3 w-full leading-[150%] placeholder:leading-[150%] placeholder:text-gray focus:outline-none rounded-sm bg-transparent border-[1px] border-[#BCC4CC]"
            />
          </div>
          <div className="flex items-center text-[12px] sm:text-[14px] gap-[40px] sm:gap-[48px] mb-5 sm:mb-10">
            {inputRadio.map((item) => (
              <div
                onClick={() => setStatus(item.id)}
                className="flex cursor-pointer items-center gap-[10px]"
                key={v4()}>
                <Radio fill={inputStatus === item.id} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <SimpleGreenBtn text={'Найти'} />
          </div>
          <div className="mb-12 font-light">
            По запросу « <span className="font-bold">{}</span> » нашлось {} результатов
          </div>

          <div className="flex flex-col gap-9"></div>
        </div>
      </div>
    </motion.div>
  );
};
