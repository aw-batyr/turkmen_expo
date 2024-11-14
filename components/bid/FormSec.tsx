'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PostParticipantFormTypes } from '@/lib/types/PostParticipantForm.type';
import { SuccessBlur } from './SuccessBlur';
import clsx from 'clsx';
import { useLang } from '@/utils/useLang';
import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';

export interface IMethods {
  value: string;
}

export const formRadio = [
  { name: 'Оборудованная', id: 'equipped' },
  { name: 'Необорудованная', id: 'unequipped' },
];

// const activeresponseMethod = useParticipantsForm((state) => state.activeMethod.id);

export const FormSec = () => {
  const [modal, setModal] = useState('none');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const phoneNumberRegex = /^\+\d{11}$/;

  const formSchema = z.object({
    company_name: z
      .string({ required_error: 'Заполните поле!' })
      .min(2, 'Минимальная длина 2 символа'),
    web_site: z.string().optional(),
    what_demonstrated: z.string().optional(),
    // area: z.string().refine((value) => (value === '' ? true : /^-?\d+(\.\d+)?$/.test(value)), {
    //   message: 'Площадь должна быть указана в цифрах',
    // }),
    phone: z.string().refine((value) => phoneNumberRegex.test(value), {
      message: 'Неверный формат номера телефона',
    }),
    email: z.string().email('Недействительный адрес электронной почты'),
    contact_person: z.string().min(5, 'Минимальная длина 5 символов'),
    // equipment: z.enum(['not-equipment', 'equipment'], {
    //   message: 'Выберите один из параметров',
    // }),
    agree: z.boolean().refine((value) => value === true, {
      message: 'Вы должны принять условия использования',
    }),
  });

  type FormFields = z.infer<typeof formSchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const postParticipantForm = async ({
    company_name,
    phone,
    email,
    area,
    // response_method,
    contact_person,
    // area_is_equipped,
    what_demonstrated,
    web_site,
  }: PostParticipantFormTypes) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`https://turkmenexpo.com/app/api/v1/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: 3,
          company_name,
          phone,
          email,
          area,
          response_method: 1,
          contact_person,
          area_is_equipped: true,
          what_demonstrated,
          web_site,
        }),
      });

      if (!response.ok) {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setModal('success');
      reset();
    }
  };

  const { activeLang } = useAppSelector(selectHeader);

  const onSubmit = (data: FormFields) => {
    postParticipantForm({
      company_name: data.company_name,
      phone: data.phone,
      email: data.email,
      area: 0,
      // response_method: activeresponseMethod,
      contact_person: data.contact_person,
      // area_is_equipped: data.equipment === 'equipment' ? true : false,
      what_demonstrated: data.what_demonstrated ? data.what_demonstrated : '',
      web_site: data.web_site ? data.web_site : '',
    });
  };

  return (
    <>
      {modal === 'success' && <SuccessBlur setModal={setModal} />}
      <form className="w-full max-w-[538px] tab:mx-0 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="company_name" className="form-label">
              {useLang('Company name', 'Название компании:', activeLang.localization)}
              <span className="text-lightRed">*</span>
            </label>
            <input
              {...register('company_name')}
              name="company_name"
              id="company_name"
              type="text"
              className="bid-input"
            />
            {errors.company_name && (
              <span className="text-lightRed">{errors.company_name.message}</span>
            )}
          </div>

          <label htmlFor="contact_person" className="form-label">
            {useLang(
              'Contact person (full name)',
              'Контактное лицо (Ф.И.О.):',
              activeLang.localization,
            )}
            <span className="text-lightRed">*</span>
          </label>
          <input
            {...register('contact_person')}
            name="contact_person"
            type="text"
            id="contact_person"
            className="bid-input"
          />
          {errors.contact_person && (
            <span className="text-lightRed">{errors.contact_person.message}</span>
          )}

          <div className="flex flex-col gap-4">
            <label htmlFor="web_site" className="form-label">
              {useLang('Website', 'Веб-сайт:', activeLang.localization)}
            </label>
            <input
              {...register('web_site')}
              name="web_site"
              id="web_site"
              type="text"
              className="bid-input"
            />
            {errors.web_site && <span className="text-lightRed">{errors.web_site.message}</span>}
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="phone" className="form-label">
              {useLang('Phone', 'Телефон', activeLang.localization)}
              <span className="text-lightRed">*</span>
            </label>
            <input
              {...register('phone')}
              name="phone"
              id="phone"
              type="text"
              className="bid-input"
            />
            {errors.phone && <span className="text-lightRed">{errors.phone.message}</span>}
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="form-label">
              E-mail:<span className="text-lightRed">*</span>
            </label>
            <input
              {...register('email')}
              name="email"
              id="email"
              type="text"
              className="bid-input"
            />
            {errors.email && <span className="text-lightRed">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="what_demonstrated" className="form-label leading-[150%]">
              {useLang(
                'Demonstrated products / equipment / services',
                'Демонстрируемая продукция / оборудование / услуги:',
                activeLang.localization,
              )}
            </label>
            <textarea
              {...register('what_demonstrated')}
              rows={7}
              name="what_demonstrated"
              id="what_demonstrated"
              className="bid-input"
            />
            {errors.what_demonstrated && (
              <span className="text-lightRed">{errors.what_demonstrated.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-10">
          <div className="flex cursor-pointer w-fit items-center gap-[10px]">
            <input
              {...register('agree')}
              name="agree"
              id="agree"
              type="checkbox"
              className="real-checkbox"
            />
            <span className="fake-checkbox" />
            <label htmlFor="agree" className="text-[13px] cursor-pointer">
              {useLang(
                'I agree to processing of my personal data',
                'Даю согласие на обработку своих данных',
                activeLang.localization,
              )}
            </label>
          </div>
          {errors.agree && <p className="text-lightRed">{errors.agree.message}</p>}

          <button
            disabled={isLoading}
            className={clsx(
              'w-full py-[17px] bg-green hover:bg-lightGreen text-[14px] font-medium transition-all text-white',
            )}>
            {isLoading
              ? useLang('Sending', 'Идет отправка', activeLang.localization)
              : useLang('Send', 'Отправить', activeLang.localization)}
          </button>
        </div>
      </form>
    </>
  );
};
