import React from "react";

export const Title = ({ text }: { text: string }) => {
  return (
    <h2 className={`text-[26px] sm:text-[34px] leading-[115%] font-semibold`}>
      {text}
    </h2>
  );
};
