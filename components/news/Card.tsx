import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  img: string;
  date: string;
  id: number;
  title: string;
}

export const Card = ({ img, date, id, title }: Props) => {
  return (
    <div className="border border-OUTLINE/20">
      <Image
        width={430}
        height={210}
        src={img}
        alt="событие"
        className="h-[210px] w-full object-cover"
      />
      <Link href={`/news/${id}`} className="cursor-pointer">
        <div className="px-[16px] py-[25px] sm:p-[25px]">
          <p className="text-extraSm text-gray4 mb-[10px]">{date}</p>
          <p className="font-bold text-[16px] leading-[125%] w-full max-w-[355px]">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};
