'use client';

import React from 'react';
import { z } from 'zod';
import { v4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { BidDrop } from '../ui/Dropdown';
import { selectBid, setBidStatus, setRadioStatus } from '@/redux/slices/bidSlice';
import { BidRadio } from './BidRadio';

export const formRadio = [
  { name: 'Оборудованная', id: 'equipped' },
  { name: 'Необорудованная', id: 'unequipped' },
];

export const phoneMail = ['телефон', 'E-mail'];

export const exhibitions = ['ВЫСТАВКА-ЯРМАРКА «ВСЕ ДЛЯ ДЕТЕЙ»', 'ВЫСТАВКА-ЯРМАРКА «ВСЕ ДЛЯ ДЕТЕЙ»'];

const schema = z.object({
  company: z.string().nonempty(),
  site: z.string().optional(),
  phone: z.number(),
  email: z.string().email(),
  space: z.string().optional(),
  area: z.string().optional(),
  bio: z.string().nonempty(),
  radio: z.boolean(),
  checkbox: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export const FormSec = () => {
  const dispatch = useAppDispatch();
  const { radioStatus, bidStatus } = useAppSelector(selectBid);

  const setStatus = (name: string) => {
    dispatch(setRadioStatus(name));
  };

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const submitData: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const changeRadio = (name: string) => {
    dispatch(setRadioStatus(name));
  };

  return (
    <FormProvider {...methods}>
      <form
        className="w-full max-w-[538px] tab:mx-0 mx-auto"
        onSubmit={methods.handleSubmit(submitData)}>
        <div className="flex flex-col w-full">
          <BidDrop
            name="Название выставки"
            required
            dropInfo={exhibitions}
            value="Выберите мероприятие из списка"
          />
        </div>
        <div className="flex flex-col w-full mb-3">
          <label htmlFor="name" className="mb-[15px] leading-[130%]">
            Название компании
            <span className="text-lightRed">*</span>
          </label>
          <input {...methods.register('company')} type="text" id="name" className="bid-input" />
        </div>
        <div className="flex flex-col items-start md:gap-6 gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="siteUrl" className="mb-[15px] leading-[130%]">
              Сайт
            </label>
            <input {...methods.register('site')} type="text" id="siteUrl" className="bid-input" />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="phone" className="mb-[15px] leading-[130%]">
              Телефон
              <span className="text-lightRed">*</span>
            </label>
            <input {...methods.register('phone')} type="text" id="phone" className="bid-input" />
          </div>

          <div className="flex flex-col w-full">
            <label
              {...methods.register('email')}
              htmlFor="email"
              className="mb-[15px] leading-[130%]">
              E-mail
              <span className="text-lightRed">*</span>
            </label>
            <input type="email" id="email" className="bid-input" />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="space" className="mb-[15px] leading-[130%]">
              Требуемая площадь, м2
            </label>
            <input {...methods.register('space')} type="text" id="space" className="bid-input" />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="area" className="mb-[15px] leading-[130%]">
              Демонстрируемая продукция / оборудование / услуги
            </label>
            <textarea
              {...methods.register('area')}
              className="bid-input"
              name="area"
              id="area"
              cols={30}
              rows={5}
            />
          </div>

          <div className="flex flex-col w-full mb-10 md:mb-0">
            <label htmlFor="person" className="mb-[15px] leading-[130%]">
              Контактное лицо (Ф.И.О)
              <span className="text-lightRed">*</span>
            </label>
            <input {...methods.register('bio')} type="text" id="person" className="bid-input" />
          </div>

          <div className="w-full hidden md:block">
            <BidDrop name="Предпочтительный способ ответа" dropInfo={phoneMail} />
          </div>

          <div className="flex flex-col gap-4 md:mb-0 mb-5">
            <div className="flex flex-col mb-0 md:mb-[24px] gap-5">
              <h4 className="leading-[130%]">
                Экспозиционная площадь<span className="text-lightRed">*</span>
              </h4>
            </div>
            <div className="flex flex-col gap-4 mb-4 md:gap-5">
              {formRadio.map((item) => (
                <BidRadio key={v4()} text={item.name} id={item.id} onRadio={changeRadio} />
              ))}
            </div>
          </div>

          <div>
            <div
              onClick={() => dispatch(setBidStatus(!bidStatus))}
              className="flex items-center gap-[10px]">
              <label className="cursor-pointer flex gap-[10px] leading-[125%] text-extraSm">
                <motion.input
                  {...methods.register('checkbox')}
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
            className="py-[17px] w-full bg-green hover:bg-lightGreen transition-all rounded-[2px]">
            Отправить
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
