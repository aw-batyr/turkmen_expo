"use client";

import Image from "next/image";
import { useState } from "react";

import clsx from "clsx";
import vid from "@/public/assets/images/video.png";

export const Video = () => {
  const [loading, setLoading] = useState(true);

  console.log(loading);

  return (
    <div className="relative">
      <video
        className={clsx(
          "w-full lg:h-[565px] sm:h-[375px] h-[250px] object-cover mx-auto",
          {}
        )}
        autoPlay
        loop
        muted
        poster={"/assets/images/video.png"}
        src="/assets/video.mp4"
      ></video>
    </div>
  );
};
