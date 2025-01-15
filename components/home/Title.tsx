import React from 'react';

export const Title = ({ text }: { text: string | boolean }) => {
  return <h1 className={`text-[26px] sm:text-[34px] leading-[115%] font-normal`}>{text}</h1>;
};
