'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

interface Props {
  href: string;
  className?: string;
}

export const LinkButton: FC<PropsWithChildren<Props>> = ({
  className,
  href,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Link href={href} className={className}>
      <button
        className={clsx(
          'px-12 py-[17px] text-[14px] rounded-[4px] bg-green text-[#346560] hover:bg-opacity-90 font-medium transition-all',
          className,
        )}>
        {children}
      </button>
    </Link>
  );
};
