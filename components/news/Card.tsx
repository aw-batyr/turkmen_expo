import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  img: string;
  date: string;
  grid: boolean;
  id: number;
  title: string;
}

export const Card = ({ img, date, grid, id, title }: Props) => {
  const small = useMediaQuery('(min-width: 630px)');

  return grid || !small ? (
    <Link href={`/news/${id}`} className="border-[1px] border-navyBlue cursor-pointer">
      <Image
        width={430}
        height={210}
        src={img}
        alt="событие"
        className="h-[210px] w-full object-cover"
      />
      <div className="px-[16px] py-[25px] sm:p-[25px]">
        <p className="text-extraSm text-gray4 mb-[10px]">{date}</p>
        <p className="font-bold text-[16px] leading-[125%] w-full max-w-[355px]">{title}</p>
      </div>
    </Link>
  ) : (
    <>
      <Link href={`/news/${id}`} className="flex">
        <Image src={img} alt="" width={300} height={160} className="object-cover" />
        <div className="p-6 w-full border-y-[1px] border-r-[1px] border-y-navyBlue border-r-navyBlue">
          <div className="text-gray4 mb-[10px]">{date}</div>
          <div className="font-bold leading-[125%] text-[16px]">{title}</div>
        </div>
      </Link>
    </>
  );
};
