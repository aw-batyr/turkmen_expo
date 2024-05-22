"use client";

import React, { useEffect } from "react";
import { Title } from "../home/Title";

export const SuccessBlur = ({
  setModal,
}: {
  setModal: (str: string) => void;
}) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[3000] px-5 backdrop-blur-sm w-full h-screen bg-darkBlue/50">
      <div className="w-full max-w-[630px] top-[50%] relative translate-y-[-50%] mx-auto my-auto flex flex-col gap-6 text-center">
        <Title text="Ваша заявка принята" />

        <p className="leading-[150%] text-[13px] sm:text-[16px]">
          После отправки правильно заполненной формы с Вами свяжется менеджер,
          который будет курировать все вопросы по участию Вашей компании в
          выставке.
        </p>

        <button
          onClick={() => setModal("error")}
          type="button"
          className="bg-green hover:bg-lightGreen transition-all rounded-sm p-4 font-medium text-[14px] w-fit mx-auto shadow-[0_3px_4px_0_rgba(0,0,0,0.2)]"
        >
          Закрыть окно
        </button>
      </div>
    </div>
  );
};
