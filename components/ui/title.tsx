import clsx from "clsx";
import React from "react";

export const Title = ({
  text,
  className,
}: {
  text: string | boolean;
  className?: string;
}) => {
  return (
    <h2
      className={clsx(
        "text-[26px] sm:text-[34px] leading-[115%] font-normal",
        className
      )}
    >
      {text}
    </h2>
  );
};
