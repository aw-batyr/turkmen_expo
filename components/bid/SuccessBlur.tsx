import React from 'react';
import { Title } from '../home/Title';

export const SuccessBlur = () => {
  return (
    <div className="w-full h-screen bg-darkBlue">
      <div className="w-full max-w-[630px] flex flex-col gap-6">
        <Title text="Ваша заявка принята" />

        <p className="">
          После отправки правильно заполненной формы с Вами свяжется менеджер, который будет
          курировать все вопросы по участию Вашей компании в выставке.
        </p>

        <button type="button"></button>
      </div>
    </div>
  );
};
