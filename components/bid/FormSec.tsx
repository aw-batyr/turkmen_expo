'use client';

import React from 'react';
import { z } from 'zod';
import { v4 } from 'uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, SubmitHandler, FormProvider } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import { BidDrop } from '../ui/Dropdown';
import { selectBid, setBidStatus, setRadioStatus } from '@/redux/slices/bidSlice';
import { BidRadio } from './BidRadio';
import { BidForm } from './BidForm';

export interface IMethods {
  value: string;
}

export const formRadio = [
  { name: 'Оборудованная', id: 'equipped' },
  { name: 'Необорудованная', id: 'unequipped' },
];

export const phoneMail: IMethods[] = [{ value: 'телефон' }, { value: 'E-mail' }];

const schema = z.object({
  // event_id: z.number(),
  company_name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  area: z.number().optional(),
  // response_method: z.number().optional(),
  contact_person: z.string(),
  area_is_equipped: z.boolean(),
  what_demonstrated: z.string().optional(),
  required_area: z.string().optional(),
  web_site: z.string().optional(),
});

export type FormFields = z.infer<typeof schema>;

export const FormSec = () => {
  const dispatch = useAppDispatch();
  const { radioStatus, bidStatus } = useAppSelector(selectBid);

  const setStatus = (name: string) => {
    dispatch(setRadioStatus(name));
  };

  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  const changeRadio = (name: string) => {
    dispatch(setRadioStatus(name));
  };

  const getValue = (value: string) => (value ? phoneMail.find((item) => item.value === value) : '');

  return (
    <FormProvider {...methods}>
      <form
        className="w-full max-w-[538px] tab:mx-0 mx-auto"
        onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 w-full">
          <BidDrop event name="Название выставки" required value="Выберите мероприятие из списка" />

          <BidForm label={'Название компании'} name={'company_name'} require />

          <BidForm label={'Название сайта'} name={'web_site'} />

          <BidForm label={'Телефон'} name={'phone'} type="tel" require />

          <BidForm label={'E-mail'} name={'email'} require />

          <BidForm
            label={'Демонстрируемая продукция / оборудование / услуги'}
            name={'what_demonstrated'}
            textArea
          />

          <BidForm label={'Контактное лицо (Ф.И.О)'} name={'contact_person'} require />

          <BidForm label={'Требуемая площадь 2м'} name={'required_area'} />

          {/* <BidDrop name="Предпочтительный способ ответа" dropInfo={phoneMail} /> */}

          <div className="flex flex-col items-start md:gap-6 gap-5">
            <div className="flex flex-col gap-4 md:mb-0 mb-5">
              <div className="flex flex-col mb-0 md:mb-[24px] gap-5">
                <h4 className="leading-[130%]">
                  Экспозиционная площадь<span className="text-lightRed">*</span>
                </h4>
              </div>
              <div className="flex flex-col gap-4 mb-4 md:gap-5">
                {/* {formRadio.map((item) => (
                <BidRadio
                  key={v4()}
                  text={item.name}
                  id={item.id}
                  onRadio={changeRadio}
                />
              ))} */}
              </div>
            </div>

            {/* <div
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
                <motion.span className="span-check" />
                Даю согласие на обработку своих данных
              </label>
            </div>
          </div>
 */}
            <button
              type="submit"
              className="py-[17px] w-full bg-green hover:bg-lightGreen transition-all rounded-[2px]">
              Отправить
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
