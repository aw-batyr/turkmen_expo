"use client";

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
  return (
    <div className="text-[12px] text-gray4 flex items-center mob:mb-6 mb-5">
      <Link href={"/"}>{useLang("Home", "Главная")}</Link>

      <p className="px-1">/</p>

      {third ? <Link href={path ? path : ""}>{second}</Link> : <p>{second}</p>}

      {third && <p className="px-1">/</p>}

      {third && <p>{third}</p>}
    </div>
  );
};
