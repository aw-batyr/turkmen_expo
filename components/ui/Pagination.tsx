"use client";

import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  lastPage?: number;
  currentPage?: number;
  totalPage?: number;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ current, setCurrent, lastPage = 3 }: IProps) => {
  const onNext = () => {
    setCurrent(current + 1);
  };

  const onPrev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="flex items-center gap-[5px] justify-center">
      <button onClick={onPrev} disabled={current === 1} type="button">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M18 22L12 16L18 10L19.4 11.4L14.8 16L19.4 20.6L18 22Z"
            fill="#059784"
          />
        </svg>
      </button>
      <div className="border-[1px] border-OUTLINE_VAR rounded-sm px-3 py-[9px]">
        {current}
      </div>
      <p>из {lastPage}</p>
      <button onClick={onNext} disabled={current >= lastPage} type="button">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-180 cursor-pointer"
        >
          <path
            d="M18 22L12 16L18 10L19.4 11.4L14.8 16L19.4 20.6L18 22Z"
            fill="#059784"
          />
        </svg>
      </button>
    </div>
  );
};
