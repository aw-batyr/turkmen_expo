'use client';

import Link from 'next/link';
import { FC } from 'react';
import { PrimaryButton } from '../ui/primary-button';
import { SecondaryButton } from '../ui/secondary-button';

interface Props {
  className?: string;
  once?: boolean;
  register?: string;
  web?: string;

  details?: string;
}

export const EventPageButtons: FC<Props> = ({ once = false, web, register, details }) => {
  return (
    <div className="flex items-center gap-6">
      {!once ? (
        <>
          <Link href={register || ''} className="w-full">
            <PrimaryButton className="w-full">Зарегистрироваться</PrimaryButton>
          </Link>
          <Link href={web || ''} className="w-full">
            <SecondaryButton className="w-full">Посетить сайт</SecondaryButton>
          </Link>
        </>
      ) : (
        <Link href={details || ''} className="w-full">
          <PrimaryButton className="w-full">Подробнее</PrimaryButton>
        </Link>
      )}
    </div>
  );
};
