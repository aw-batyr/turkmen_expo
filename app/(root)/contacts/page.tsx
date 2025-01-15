"use client";

import React, { useEffect, useState } from "react";

import { Title } from "@/components/home/Title";
import { BreadCrumbs } from "@/components/ui/BreadCrumbs";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { baseAPI } from "@/lib/API";
import { v4 } from "uuid";
import { ContactsDataType } from "@/lib/types/Contacts.type";
import { useLang } from "@/utils/useLang";
import Loader from "@/components/ui/Loader";

const Contacts = () => {
  const [contactsData, setContactsData] = useState<ContactsDataType>();
  const { activeLang } = useAppSelector(selectHeader);
  const [loading, setLoading] = useState(true);

  const fecthContactsData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${baseAPI}contacts`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();

      setContactsData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthContactsData();
  }, [activeLang.localization]);

  return (
    <div className="bg-blueBg h-full">
      <div className="container flex flex-col items-start">
        <div className="mt-5">
          <BreadCrumbs
            second={useLang("Contacts", "Контакты", activeLang.localization)}
          />
        </div>
        <div className="mb-4">
          <Title
            text={useLang("Contacts", "Контакты", activeLang.localization)}
          />
        </div>
        {contactsData ? (
          contactsData.data.map((item, i) => (
            <div
              className="py-10 sm:py-[30px] border-b-[1px] border-navyBlue5 w-full"
              key={v4()}
            >
              {/* <h4 className="leading-[120%] sm:leading-[100%] text-[16px] sm:text-[21px] mb-6">
                {item.header}
              </h4> */}
              <div className="flex flex-col items-start leading-[150%] text-[14px] sm:text-[16px]">
                {item.services.map((service, i) => (
                  <div key={i}>
                    <p>{service.phone}</p>
                    <p>{service.email}</p>
                    <p>{service.web_site}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <Loader className="h-[300px] w-full" />
        )}
      </div>

      <div className="relative w-full h-[728px] mb-12 google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.67827952586!2d58.29659607507902!3d37.8912058554459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f7003944259cb1d%3A0xafc893357e4b0d2!2z0KLQvtGA0LPQvtCy0L4t0L_RgNC-0LzRi9GI0LvQtdC90L3QsNGPINC_0LDQu9Cw0YLQsCDQotGD0YDQutC80LXQvdC40YHRgtCw0L3QsA!5e0!3m2!1sru!2s!4v1713164734635!5m2!1sru!2s"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="container section-mb">{/* <ContactsSec /> */}</div>
    </div>
  );
};

export default Contacts;
