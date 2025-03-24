"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { useLang } from "@/utils/useLang";
import Link from "next/link";

export const BreadCrumbs = ({
  second,
  third,
  path,
  path2,
  cursor = false,
}: {
  second: string;
  third?: string;
  path?: string;
  path2?: string;
  cursor?: boolean;
}) => {
  const { activeLang } = useAppSelector(selectHeader);

  return (
    <div className="text-[12px] text-[#6B7674] flex items-center mob:mb-6 mb-5">
      <Link href={"/"}>
        {useLang("Home", "Главная", activeLang.localization)}
      </Link>

      <p className="px-1">/</p>

      {third ? <Link href={path ? path : ""}>{second}</Link> : <p>{second}</p>}

      {third && <p className="px-1">/</p>}

      {third && <p>{third}</p>}
    </div>
  );
};
