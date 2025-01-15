'use client';

import { FC } from 'react';

interface Props {
  className?: string;
}

export const EventPageButtons: FC<Props> = () => {
  return (
    <div className="flex items-center gap-6">
      <button className="full-btn bg-PRIMARY py-2.5 text-white">Зарегистрироваться</button>
      <button className="full-btn bg-SECONDARY_CONTAINER py-2.5 text-ON_SECONDARY_CONTAINER">
        Посетить сайт
      </button>
    </div>
  );
};
