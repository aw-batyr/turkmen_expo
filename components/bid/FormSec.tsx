"use client";

import React from "react";
import { z } from "zod";
import { v4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { BidDrop } from "../ui/Dropdown";
import {
  selectBid,
  setBidStatus,
  setRadioStatus,
} from "@/redux/slices/bidSlice";
import { BidRadio } from "./BidRadio";
import { BidForm } from "./BidForm";

export interface IMethods {
  value: string;
}

export const formRadio = [
  { name: "Оборудованная", id: "equipped" },
  { name: "Необорудованная", id: "unequipped" },
];

export const phoneMail: IMethods[] = [
  { value: "телефон" },
  { value: "E-mail" },
];

const schema = z.object({
  event_id: z.number(),
  company_name: z.string(),
  phone: z.string(),
  web_site: z.string().optional(),
  email: z.string().email(),
  space: z.string().optional(),
  required_area: z.string().optional(),
  contact_person: z.string(),
  area_is_equipped: z.boolean(),
  what_demonstrated: z.string(),
  response_method: z.number(),
  checkbox: z.boolean(),
});

export type FormFields = z.infer<typeof schema>;

export const FormSec = () => {
  const dispatch = useAppDispatch();
  const { radioStatus, bidStatus } = useAppSelector(selectBid);

  const setStatus = (name: string) => {
    dispatch(setRadioStatus(name));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  const changeRadio = (name: string) => {
    dispatch(setRadioStatus(name));
  };

  const getValue = (value: string) =>
    value ? phoneMail.find((item) => item.value === value) : "";

  return (
    <form
      className="w-full max-w-[538px] tab:mx-0 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 w-full">
        <BidDrop
          event
          register={register}
          name="Название выставки"
          required
          value="Выберите мероприятие из списка"
        />

        <BidForm
          register={register}
          label={"Название компании"}
          name={"company_name"}
          required
        />

        <BidForm
          {...register("company_name")}
          label={"Название сайта"}
          name={"web_site"}
        />

        <BidForm
          {...register("phone")}
          label={"Телефон"}
          name={"phone"}
          type="tel"
          required
        />

        <BidForm
          {...register("email")}
          label={"E-mail"}
          name={"email"}
          required
        />

        <BidForm
          {...register("what_demonstrated")}
          label={"Демонстрируемая продукция / оборудование / услуги"}
          name={"what_demonstrated"}
          textArea
        />

        <BidForm
          {...register("contact_person")}
          label={"Контактное лицо (Ф.И.О)"}
          name={"contact_person"}
          required
        />

        <BidForm
          {...register("required_area")}
          label={"Требуемая площадь 2м"}
          name={"required_area"}
        />

        <Controller
          control={control}
          name="response_method"
          render={({ field: { onChange, onBlur } }) => (
            <BidDrop
              {...field}
              name="Предпочтительный способ ответа"
              dropInfo={phoneMail}
            />
          )}
        />

        <div className="flex flex-col items-start md:gap-6 gap-5">
          <div className="flex flex-col gap-4 md:mb-0 mb-5">
            <div className="flex flex-col mb-0 md:mb-[24px] gap-5">
              <h4 className="leading-[130%]">
                Экспозиционная площадь<span className="text-lightRed">*</span>
              </h4>
            </div>
            <div className="flex flex-col gap-4 mb-4 md:gap-5">
              {formRadio.map((item) => (
                <BidRadio
                  key={v4()}
                  text={item.name}
                  id={item.id}
                  onRadio={changeRadio}
                />
              ))}
            </div>
          </div>

          <div>
            <div
              onClick={() => dispatch(setBidStatus(!bidStatus))}
              className="flex items-center gap-[10px]"
            >
              <label className="cursor-pointer flex gap-[10px] leading-[125%] text-extraSm">
                <input
                  {...register("checkbox")}
                  type="checkbox"
                  name="agree"
                  className="input-check"
                />
                <motion.span className="span-check"></motion.span>
                Даю согласие на обработку своих данных
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="py-[17px] w-full bg-green hover:bg-lightGreen transition-all rounded-[2px]"
          >
            Отправить
          </button>
        </div>
      </div>
    </form>
  );
};

{
  /* <div className="flex flex-col w-full mb-5">
          <label htmlFor="company_name" className="mb-[15px] leading-[130%]">
            Название компании
            <span className="text-lightRed">*</span>
          </label>
          <input
            {...methods.register("company_name")}
            name="company_name"
            type="text"
            id="name"
            className="bid-input"
          />
        </div> */
}

{
  /* <div className="flex flex-col w-full">
              <label htmlFor="web_site" className="mb-[15px] leading-[130%]">
                Сайт
              </label>
              <input
                {...methods.register("web_site")}
                name="web_site"
                type="text"
                id="web_site"
                className="bid-input"
              />
            </div> */
}

{
  /* <div className="flex flex-col w-full">
              <label htmlFor="phone" className="mb-[15px] leading-[130%]">
                Телефон
                <span className="text-lightRed">*</span>
              </label>
              <input
                {...methods.register("phone")}
                name="phone"
                type="tel"
                id="phone"
                className="bid-input"
              />
            </div> */
}

{
  /* <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-[15px] leading-[130%]">
                E-mail
                <span className="text-lightRed">*</span>
              </label>
              <input
                {...methods.register("email")}
                name="email"
                type="text"
                id="email"
                className="bid-input"
              />
            </div> */
}

{
  /* <div className="flex flex-col w-full">
              <label htmlFor="space" className="mb-[15px] leading-[130%]">
                Требуемая площадь, м2
              </label>
              <input
                {...methods.register("space")}
                name="space"
                type="text"
                id="space"
                className="bid-input"
              />
            </div>
 */
}
{
  /* <div className="flex flex-col w-full">
              <label htmlFor="area" className="mb-[15px] leading-[130%]">
                Демонстрируемая продукция / оборудование / услуги
              </label>
              <textarea
                {...methods.register("area")}
                className="bid-input"
                name="area"
                id="area"
                cols={30}
                rows={5}
              />
            </div> */
}

{
  /* <div className="flex flex-col w-full mb-10 md:mb-0">
              <label
                htmlFor="contact_person"
                className="mb-[15px] leading-[130%]"
              >
                Контактное лицо (Ф.И.О)
                <span className="text-lightRed">*</span>
              </label>
              <input
                {...methods.register("contact_person")}
                name="contact_person"
                type="text"
                id="person"
                className="bid-input"
              />
            </div> */
}
