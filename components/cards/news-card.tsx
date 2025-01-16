import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  img: string;
  date: string;
  id: number;
  title: string;
  mobile?: boolean;
}

export const NewsCard = ({ img, title, date, id, mobile = false }: Props) => {
  return (
    <div className="bg-white rounded-[4px] mx-auto w-full transition-all h-[415px]">
      {/* Aspect ration 1.8:1 */}
      <Image
        src={img}
        width={290}
        height={221}
        alt="photo"
        className="mob:h-[221px] h-[160px] w-full object-cover rounded-t-[4px]"
      />
      <Link href={`/news/${id}`} className="h-full">
        <div className="p-[25px] h-[160px] sm:h-[140px]">
          <p className="text-extraSm leading-[125%] text-[#787878] mb-[10px]">{date}</p>
          <p className="font-medium leading-[135%] sm:text-[22px] text-[21px] line-clamp-4">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};
