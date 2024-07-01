"use client";

import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import { useAppSelector } from "@/redux/hooks";

import { Radio } from "../ui/Radio";
import { Title } from "../home/Title";
import { baseAPI } from "@/lib/API";
import { selectHeader } from "@/redux/slices/headerSlice";
import { FaqDataType, RadioDataType } from "@/lib/types/FaqData.type";
import { Select } from "./Select";
import { BreadCrumbs } from "../ui/BreadCrumbs";
import { useLang } from "@/utils/useLang";

export const radio = [
  { nameEn: "All", name: "Все", id: 0 },
  { nameEn: "Visitors", name: "Посетителям", id: 1 },
  { nameEn: "Participants", name: "Участникам", id: 2 },
];

export const FaqSec = () => {
  const [faqData, setFaqData] = useState<FaqDataType>();

  const [currentRadio, setCurrentRadio] = useState(0);
  const [radioData, setRadioData] = useState<RadioDataType>();
  const { activeLang } = useAppSelector(selectHeader);

  const fetchFaqRadio = async () => {
    try {
      const res = await fetch(`${baseAPI}faq-user-groups?`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      const data = await res.json();

      setRadioData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFaq = async () => {
    try {
      const res = await fetch(
        `${baseAPI}faq-headers${
          currentRadio !== 0 ? "?faq_user_group_id=" + currentRadio : ""
        }`,
        {
          headers: {
            "Accept-Language": activeLang.localization,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error");
      }

      const data: FaqDataType = await res.json();

      setFaqData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaq();
    fetchFaqRadio();
  }, [currentRadio, activeLang.localization]);

  const changeRadio = (id: number) => {
    setCurrentRadio(id);
  };

  return (
    <div className="container flex flex-col items-start pt-[20px] section-mb">
      <BreadCrumbs second={useLang("FAQ", "«Вопросы-ответы»")} />
      <Title text={useLang("FAQ", "«Вопросы-ответы»")} />
      <div className="flex items-center sm:mt-6 mt-10 sm:gap-[20px] gap-10 mb-[48px]">
        {radio.map((item, i) => (
          <div key={i}>
            <Radio
              id={item.id}
              active={currentRadio === item.id}
              changeRadio={changeRadio}
              text={activeLang.localization === "ru" ? item.name : item.nameEn}
            />
          </div>
        ))}
      </div>
      {faqData
        ? faqData.data.map((obj) => <Select {...obj} key={v4()} />)
        : null}
    </div>
  );
};

// faqItems={obj.faq_items} header={obj.header}
