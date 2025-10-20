"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useFetch } from "@/hooks/useFetch";
import { ReviewsType } from "@/lib/types/Reviews.type";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { Title } from "../ui/title";

export const Reviews = () => {
  const { data } = useFetch<ReviewsType>("reviews");

  const {
    activeLang: { localization },
  } = useAppSelector(selectHeader);

  const title = localization === "en" ? "Feedback" : "Обратная связь";

  return (
    <section className="container my-20">
      <Title text={title} className="!text-center mb-10" />

      <div className="max-w-[710px] mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          speed={1000}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass:
              "dot transition-all duration-300 bg-gray-300 rounded-full w-3 h-3 mx-1",
            bulletActiveClass: "dot-active !bg-PRIMARY scale-125",
          }}
          spaceBetween={50}
          slidesPerView={1}
          className="testimonials-swiper"
        >
          {data?.data?.map((item, i) => (
            <SwiperSlide key={item?.id ?? i}>
              <article className="relative flex flex-col text-center gap-3 justify-center items-center min-h-[300px]">
                {/* Левая кавычка */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059784"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-0 rotate-180 md:bottom-32 bottom-60"
                >
                  <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                </svg>

                {/* Правая кавычка */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059784"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute right-0 bottom-2"
                >
                  <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                </svg>

                <div className="size-[100px] bg-black/20">
                  {item?.image?.path && (
                    <img
                      src={item.image.path}
                      alt={item.name}
                      className="size-[100px] object-contain bg-white rounded-full border border-gray-200"
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base">{item.name}</h3>
                  <h4 className="text-base text-text-secondary">
                    {item.job_title}
                  </h4>
                </div>

                <p className="text-base text-text-secondary md:px-14">
                  {item.text}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомная пагинация */}
        <div className="custom-pagination flex justify-center items-center mt-10"></div>
      </div>
    </section>
  );
};
