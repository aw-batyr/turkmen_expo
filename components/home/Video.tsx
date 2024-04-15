"use client";

import React, { useEffect, useState } from "react";

export const Video = () => {
  const [video, setVideo] = useState();

  const fetchVideo = async () => {
    try {
      const res = await fetch(
        `https://turkmenexpo.com/app/storage/app/media/video/video.mp4`
      );

      const data = await res.json();
      console.log(data);
      setVideo(data);
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     fetchVideo();
  //   }, []);

  return (
    <video
      className="w-full mx-auto"
      autoPlay
      src="https://turkmenexpo.com/app/storage/app/media/video/video.mp4"
      typeof="video/mp4"
    >
      Video
    </video>
  );
};
