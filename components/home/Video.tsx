'use client';

import Image from 'next/image';
import { useState } from 'react';

import vid from '@/public/assets/images/video.png';
import clsx from 'clsx';

export const Video = () => {
  const [loading, setLoading] = useState(true);

  console.log(loading);

  return (
    <div className="relative">
      {loading && (
        <Image
          src={vid}
          alt="video"
          className="absolute top-0 bottom-0 w-full h-[565px] object-cover mx-auto"
          onLoad={() => setLoading(false)}
        />
      )}
      <video
        className={clsx('w-full h-[565px] object-cover mx-auto', {})}
        autoPlay
        src="/assets/video.mp4"
        onLoad={() => setLoading(false)}
        onLoadedData={() => setLoading(false)}></video>
    </div>
  );
};
