import React from "react";
import Image from "next/image";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import mapImg from "@/public/assets/images/map.png";
import { Title } from "@/components/home/Title";
import { BreadCrumbs } from "@/components/ui/BreadCrumbs";

const Contacts = () => {
  return (
    <div className="bg-blueBg h-full">
      <div className="container flex flex-col items-start">
        <div className="mt-5">
          <BreadCrumbs second="Контакты" />
        </div>
        <div className="sm:mb-[48px] mb-10">
          <Title text="Контакты" />
        </div>
        <div className="">
          <p className="text-[21px] mb-[24px] sm:leading-[100%] sm:font-normal font-semibold leading-[115%]">
            Адрес:
          </p>
          <div className="sm:leading-[1.7] sm:text-[16px] text-[14px] leading-[140%] sm:mb-[48px] mb-10">
            744000, г. Ашхабад, просп. Битарап Туркменистан, 183 <br />
            Тел.: <span className="text-green">+99362006200</span>,
            <span className="text-green"> +993 (12) 45-41-11</span>
            <br />
            E-mail: <span className="text-green">info@turkmenexpo.com</span>
          </div>
        </div>
      </div>
      <div className="relative w-full google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.67827952586!2d58.29659607507902!3d37.8912058554459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f7003944259cb1d%3A0xafc893357e4b0d2!2z0KLQvtGA0LPQvtCy0L4t0L_RgNC-0LzRi9GI0LvQtdC90L3QsNGPINC_0LDQu9Cw0YLQsCDQotGD0YDQutC80LXQvdC40YHRgtCw0L3QsA!5e0!3m2!1sru!2s!4v1713164734635!5m2!1sru!2s"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="container section-mb">{/* <ContactsSec /> */}</div>
    </div>
  );
};

export default Contacts;
