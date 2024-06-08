'use client';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';
import ru from '@/public/assets/icons/header/ru.svg';
import en from '@/public/assets/icons/header/en.svg';
import tm from '@/public/assets/icons/header/tm.svg';

import { headerMenu2 } from '@/lib/database/pathnames';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectBurger,
  setBurgerDrop,
  setBurgerOpen,
  setFooterDrop,
} from '@/redux/slices/burgerSlice';
import { selectHeader, setActiveLang } from '@/redux/slices/headerSlice';
import clsx from 'clsx';
import { lang } from './LangMenu';
import { burgerMenu, burgerMenu2 } from '@/lib/database/header';

interface flagTypes {
  title: 'Ру' | 'En' | 'Tm';
  localization: 'ru' | 'en' | 'tm';
}

const burgerLangs: flagTypes[] = [
  {
    title: 'Tm',
    localization: 'tm',
  },
  {
    title: 'Ру',
    localization: 'ru',
  },
  {
    title: 'En',
    localization: 'en',
  },
];

export const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const wrapper = document.querySelector('.wrapper');

  const localization = useAppSelector((state) => state.headerSlice.activeLang.localization);

  const burgerOpen = useAppSelector((state) => state.burgerSlice.burgerOpen);

  const [activeMenu, setActiveMenu] = useState<string>('');
  const [activeMenu2, setActiveMenu2] = useState<string>('');

  const chooseDataLang = (en: string, ru: string) => (localization === 'en' ? en : ru);

  const setActiveTitle = () => {
    if (activeMenu.includes('/mem')) return 'Участникам';
  };

  const setActiveTitle2 = () => {
    if (activeMenu2.includes('/company')) return 'О компании';
  };

  useEffect(() => {
    wrapper?.classList.remove('overflow-hidden');
    wrapper?.classList.add('overflow-hidden');

    return () => {
      wrapper?.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      exit={{
        x: '100%',
      }}
      className="bg-green overflow-auto text-white fixed w-full z-[900] top-[74px] bottom-0 left-0 min-h-[100vh] h-full px-4 py-10 flex flex-col overflow-y-auto">
      {activeMenu && (
        <div>
          <div onClick={() => setActiveMenu('')} className="flex cursor-pointer">
            <img src="/assets/icons/header/burger-arrow.svg" alt="arrow" className="rotate-180" />
            <h2 className="text-[18px] ml-[10px] leading-[135%]">{setActiveTitle()}</h2>
          </div>

          <div className="mt-[10px] opacity-50 mb-5 h-[1px] w-full bg-[#F2F9FF]" />
        </div>
      )}

      {activeMenu && (
        <div className="flex flex-col gap-5 leading-[150%]">
          {activeMenu.includes('/mem') &&
            burgerMenu
              .filter((item) => item.partic)
              .map((item) =>
                item.dropDown?.map((obj) => (
                  <Link key={v4()} onClick={() => dispatch(setBurgerOpen(false))} href={obj.link}>
                    {localization === 'en' ? obj.titleEn : obj.title}
                  </Link>
                )),
              )}
        </div>
      )}

      <div className="leading-[135%] text-[18px] mb-10 flex flex-col gap-5">
        {!activeMenu &&
          burgerMenu.map((item) =>
            !item.drop ? (
              <Link
                key={v4()}
                onClick={() => {
                  dispatch(setBurgerOpen(false));
                }}
                href={item.link}>
                {item.title}
              </Link>
            ) : (
              <div
                key={v4()}
                className="cursor-pointer flex items-center justify-between"
                onClick={() => {
                  setActiveMenu(item.link);
                  setActiveMenu2('');
                }}>
                <div>{item.title}</div>
                {item.drop && <img src="/assets/icons/header/burger-arrow.svg" alt="arrow" />}
              </div>
            ),
          )}
      </div>

      <div className="h-[1px] w-full opacity-50 bg-[#F2F9FF]" />

      {activeMenu2 && (
        <div>
          <div onClick={() => setActiveMenu2('')} className="flex cursor-pointer pt-4">
            <img src="/assets/icons/header/burger-arrow.svg" alt="arrow" className="rotate-180" />
            <h2 className="text-[18px] ml-[10px] leading-[135%]">{setActiveTitle2()}</h2>
          </div>

          <div className="mt-[10px] opacity-50 mb-5 h-[1px] w-full bg-[#F2F9FF]" />
        </div>
      )}

      <div
        className={clsx('leading-[135%] text-[14px] flex flex-col gap-5', {
          'mt-10': !activeMenu2,
        })}>
        {!activeMenu2 &&
          burgerMenu2.map((item) =>
            !item.drop ? (
              <Link key={v4()} onClick={() => dispatch(setBurgerOpen(false))} href={item.link}>
                {item.title}
              </Link>
            ) : (
              <div
                key={v4()}
                className="cursor-pointer flex items-center justify-between"
                onClick={() => {
                  item.drop && setActiveMenu2(item.link);
                  setActiveMenu('');
                }}>
                <div>{item.title}</div>
                {item.drop && <img src="/assets/icons/header/burger-arrow.svg" alt="arrow" />}
              </div>
            ),
          )}

        {activeMenu2.includes('/company') &&
          burgerMenu2
            .filter((item) => item.company)
            .map((obj) =>
              obj.dropDown?.map((item) => (
                <Link
                  key={v4()}
                  href={item.link}
                  onClick={() => {
                    dispatch(setBurgerOpen(false));
                  }}>
                  {item.title}
                </Link>
              )),
            )}
      </div>

      <div className="flex items-center mx-auto gap-10 mt-10">
        {burgerLangs.map((item) => (
          <div
            key={v4()}
            onClick={() => {
              setActiveLang(item);
              dispatch(setBurgerOpen(false));
            }}
            className="flex cursor-pointer items-center gap-[10px]">
            <img src={`/assets/icons/header/${item.localization}.svg`} alt="flag" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

{
  /* <motion.div
ref={burgerRef}
initial={{ x: "100%" }}
animate={{ x: 0 }}
transition={{
  duration: 0.3,
}}
exit={{
  x: "100%",
}}
className={clsx(
  "bg-green overflow-auto fixed w-full z-[900] top-[74px] bottom-0 left-0 min-h-[100vh] h-full px-4 py-10 flex flex-col gap-10 overflow-y-auto",
  {
    hidden: showInput,
  }
)}
>
<div className="flex flex-col gap-5">
  {burgerMenuData
    .filter((obj) => obj.first)
    .map(
      (item) =>
        !headerDrop && (
          <motion.div key={v4()}>
            {item.only ? (
              <Link
                onClick={() => {
                  onBurgerDrop(item.pathname, true, true);
                }}
                href={item.pathname}
                className="cursor-pointer flex items-center justify-between"
              >
                <p className="text-[18px] leading-[135%]">{item.title}</p>
                {!item.only && (
                  <Image
                    src={arrow}
                    alt="стрелка"
                    width={20}
                    height={20}
                  />
                )}
              </Link>
            ) : (
              !burgerDrop.includes(item.title) && (
                <motion.div
                  onClick={() => {
                    dispatch(setBurgerDrop(item.pathname));
                    setHeaderDrop(true);
                  }}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <h3 className="text-[18px] leading-[135%]">
                    {item.title}
                  </h3>
                  {!item.only && (
                    <Image
                      src={arrow}
                      alt="стрелка"
                      width={20}
                      height={20}
                    />
                  )}
                </motion.div>
              )
            )}
          </motion.div>
        )
    )}
  {burgerDrop && (
    <BurgerDrop setDrop={setHeaderDrop} filter={burgerDrop} />
  )}
</div>

<hr className="border-bgWhite" />

<div className="flex flex-col gap-5">
  {burgerMenuData
    .filter((obj) => !obj.first)
    .map(
      (item) =>
        !bottom && (
          <div key={v4()}>
            {item.only ? (
              <Link
                onClick={() => onBurgerDrop(item.pathname, true, false)}
                key={v4()}
                className="cursor-pointer flex items-center justify-between"
                href={item.pathname}
              >
                <p className="leading-[140%]">{item.title}</p>
                {!item.only && (
                  <Image
                    src={arrow}
                    alt="стрелка"
                    width={20}
                    height={20}
                  />
                )}
              </Link>
            ) : (
              !footerDrop.includes(item.title) && (
                <div
                  onClick={() => {
                    dispatch(setFooterDrop(item.pathname));
                    setBottom(true);
                  }}
                  className="cursor-pointer flex items-center justify-between"
                >
                  <h3 className="text-[14px] leading-[140%]">
                    {item.title}
                  </h3>
                  {!item.only && (
                    <Image
                      src={arrow}
                      alt="стрелка"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              )
            )}
          </div>
        )
    )}
  {footerDrop && <BurgerDrop setDrop={setBottom} filter={footerDrop} />}
</div>

<div className="flex mx-auto items-center gap-10 mb-[60px]">
  {lang.map((item) => (
    <div
      onClick={() => dispatch(setActiveLang(item))}
      key={v4()}
      className="flex items-center gap-[10px] cursor-pointer"
    >
      <p className="leading-[140%]">{item.title}</p>
      <Image
        src={
          (item.localization === "ru" && ru) ||
          (item.localization === "en" && en) ||
          (item.localization === "tm" && tm)
        }
        alt="флаг"
      />
    </div>
  ))}
</div>
</motion.div> */
}
