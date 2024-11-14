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
    <div className="bg-[#455A6E] rounded-sm mx-auto sm:max-w-[290px] w-full transition-all hover:hover-shadow h-full">
      {/* Aspect ration 1.8:1 */}
      <Image
        src={img}
        width={mobile ? 600 : 290}
        height={mobile ? 400 : 160}
        alt="photo"
        className="mob:h-[160px] h-[200px] w-full object-cover"
      />
      <Link href={`/news/${id}`} className="h-full">
        <div className="p-[25px] h-[160px] sm:h-[140px]">
          <p className="text-extraSm leading-[125%] text-[#C7D2DC] mb-[10px]">{date}</p>
          <p className="text-green font-bold leading-[125%] sm:text-[16px] text-[21px] news-text">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};
