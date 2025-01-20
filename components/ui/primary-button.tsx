import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const PrimaryButton: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <button
      className={clsx(
        'bg-PRIMARY text-[14px] text-white rounded-[4px] font-medium h-12 hover:bg-PRIMARY/90 transition-all',
        className,
      )}>
      {children}
    </button>
  );
};
