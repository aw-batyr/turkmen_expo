import clsx from 'clsx';
import React from 'react';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(className, 'flex h-[500px] justify-center items-center nav')}>
      <div className="animate-spin border-4 border-t-transparent size-20 rounded-full border-[#059784]" />
    </div>
  );
};

export default Loader;
