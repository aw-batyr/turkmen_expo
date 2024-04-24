"use client";

export const Video = () => {
  return (
    <div className="relative">
      <video
        className={
          "w-full lg:h-[565px] sm:h-[375px] h-[250px] object-cover mx-auto"
        }
        autoPlay
        loop
        muted
        poster={"/assets/images/video.png"}
        src="/assets/video.mp4"
      ></video>
    </div>
  );
};
