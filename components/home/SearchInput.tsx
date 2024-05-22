'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
import { baseAPI } from '@/lib/API';
import Link from 'next/link';
import { SearchTypes } from '@/lib/types/Search.type';
import { useMediaQuery } from 'usehooks-ts';

export const inputRadio = [
  { name: 'Везде', id: 'all' },
  { name: 'В событиях', id: 'events' },
  { name: 'В новостях', id: 'news' },
];

export const SearchInput = ({ mob = false }: { mob?: boolean }) => {
  const localization = useAppSelector((state) => state.headerSlice.activeLang.localization);
  const wrapper = document.querySelector('.wrapper');

  const tab = useMediaQuery('(min-width: 980px)');

  console.log(tab);

  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchData, setSearchData] = useState<SearchTypes>();
  const [isSearching, setIsSearching] = useState(false);
  const [searchIsError, setSearchIsError] = useState(false);

  const { showInput } = useAppSelector(selectHeader);

  useEffect(() => {
    wrapper?.classList.remove('overflow-hidden');
    wrapper?.classList.add('overflow-hidden');

    return () => {
      wrapper?.classList.remove('overflow-hidden');
    };
  }, []);

  const fetchSearchData = async () => {
    setIsSearching(true);
    setSearchValue(value);
    try {
      const res = await fetch(
        `${baseAPI}search?search=${value}${inputStatus !== 'all' ? '&filter=' + inputStatus : ''}`,
        {
          headers: {
            'Accept-Language': localization,
            'Content-Type': 'application/json',
          },
        },
      );

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
      className={clsx('left-0 w-full h-screen overflow-auto z-20 bg-blueBg', {
        'fixed top-[74px] bottom-0': !tab,
        'absolute bottom-0 top-0 z-[9999]': tab,
        hidden: burgerOpen,
      })}>
      <div className="container section-mb">
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
              maxLength={30}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
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
                key={v4()}>
                <Radio fill={inputStatus === item.id} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <button
            disabled={isSearching || value.length < 3}
            className="mb-6"
            onClick={fetchSearchData}>
            {isSearching ? (
              <div className="bg-green w-[180px] h-[48px] py-[17px] rounded-sm">
                <span className="loader"></span>
              </div>
            ) : (
              <div className="bg-green py-[17px] px-[70px] rounded-sm">Найти</div>
            )}
          </button>

          {searchData ? (
            searchData.data.expo_events.length && searchData.data.posts.length ? (
              <>
                <div className="mb-12 font-light">
                  По запросу « <span className="font-bold">{searchValue}</span> » нашлось{' '}
                  {searchData.data.expo_events.length + searchData.data.posts.length} результатов
                </div>
                <div className="flex flex-col gap-9">
                  {searchData.data.expo_events.map((item) => (
                    <div>
                      <h3 className="font-bold mb-[18px] text-[16px] leading-[125%]">
                        {item.title}
                      </h3>
                      <Link href={`/calendar/${item.id}`}>Перейти на страницу</Link>
                      <hr className="mt-9 border-navyBlue4" />
                    </div>
                  ))}
                  {searchData.data.posts.map((item) => (
                    <div>
                      <h3 className="font-bold mb-[18px] text-[16px] leading-[125%]">
                        {item.title}
                      </h3>
                      <Link href={`/news/${item.id}`}>Перейти на страницу</Link>
                      <hr className="mt-9 border-navyBlue4" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h1>По вашему запросу ничего не найдено</h1>
            )
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};
