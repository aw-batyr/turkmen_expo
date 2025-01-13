'use client';

import React from 'react';
import Image from 'next/image';

import navBtn from '@/public/assets/icons/home/nav-btn.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import clsx from 'clsx';

export const NavBtn = ({
  left = false,
  onNext,
  onPrev,
}: {
  left?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}) => {
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={btnRef}
      className={`${!left ? 'next-btn' : 'prev-btn'} `}
      onClick={!left ? onNext : onPrev}>
      <Image
        src={navBtn}
        alt="arrow"
        className={clsx('img-auto', {
          'rotate-180': left,
        })}
      />
    </button>
  );
};
