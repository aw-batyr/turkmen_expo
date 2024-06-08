'use client';

import clsx from 'clsx';
import { useState, useRef } from 'react';

export const Video = () => {
  const vidRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative">
      <video
        className={clsx(
          'w-full opacity-100 lg:h-[565px] sm:h-[375px] h-[250px] object-cover mx-auto',
          {},
        )}
        id="vid"
        ref={vidRef}
        autoPlay
        typeof="video/mp4"
        loop
        muted
        src="https://turkmenexpo.com/app/storage/app/media/video/video.mp4"
      />
      <div
        id="spinner"
        className="hidden border-[8px] border-solid border-l-red h-[60px] w-[60px] rounded-full z-[100] absolute top-[100px] left-[100px] "></div>
    </div>
  );
};
