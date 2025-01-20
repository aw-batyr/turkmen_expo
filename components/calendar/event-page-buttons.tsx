'use client';

import Link from 'next/link';
import { FC } from 'react';

interface Props {
  className?: string;
  once?: boolean;
  register?: string;
  visit?: string;
  details?: string;
}

export const EventPageButtons: FC<Props> = ({ once = false, register, visit, details }) => {
  return (
    <div className="flex items-center gap-6">
      {once ? (
        <>
          <Link href={register || ''} className="w-full" target="_blank">
            <button className="full-btn bg-PRIMARY py-2.5 text-white">Зарегистрироваться</button>
          </Link>
          <Link href={visit || ''} className="w-full" target="_blank">
            <button className="full-btn bg-SECONDARY_CONTAINER py-2.5 text-ON_SECONDARY_CONTAINER">
              Посетить сайт
            </button>
          </Link>
        </>
      ) : (
        <Link href={details || ''} className="w-full" target="_blank">
          <button className="full-btn w-full bg-PRIMARY py-2.5 text-white">Подробнее</button>
        </Link>
      )}
    </div>
  );
};
