import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export const SecondaryButton: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <button
      className={clsx(
        'bg-SECONDARY_CONTAINER rounded-[4px] text-ON_SECONDARY_CONTAINER text-[14px] font-medium h-12',
        className,
      )}>
      {children}
    </button>
  );
};
