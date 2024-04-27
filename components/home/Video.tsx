"use client";

import { baseAPI } from "@/lib/API";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export const Video = () => {
  const [loading, setLoading] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState();

  // const fetchVideo = async () => {
  //   try {
  //     const res = await fetch(`${baseAPI}media/video/video.mp4`);

  //     if (!res.ok) {
  //       throw new Error("Error");
  //     }

  //     const data = await res.json();

  //     setVideoData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // console.log(videoData)

  return (
    <div className="relative">
      <video
        className={clsx(
          "w-full opacity-100 lg:h-[565px] sm:h-[375px] h-[250px] object-cover mx-auto",
          {}
        )}
        id="vid"
        ref={vidRef}
        onWaiting={() => alert("sadsda")}
        onLoad={() => alert("sdfdsf")}
        autoPlay
        typeof="video/mp4"
        loop
        muted
        // disablepictureinpicture
        // disablePictureInPicture
        src="/assets/video.mp4"
      />
      <div
        id="spinner"
        className="hidden border-[8px] border-solid border-l-red h-[60px] w-[60px] rounded-full z-[100] absolute top-[100px] left-[100px] "
      ></div>
    </div>
  );
};
