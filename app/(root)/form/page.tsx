"use client";

import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";

interface FormFields {
  name: string;
  age: number;
}

const Form = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container my-20 flex flex-col gap-5"
    >
      <input
        {...register("name", {
          required: "Name is Required!",
        })}
        className="bid-input w-[300px]"
      />
      <input
        {...register("age", {
          required: "Age is Required!",
        })}
        className="bid-input w-[300px]"
        type="number"
      />
      <button className="border-white border-[1px] rounded-lg w-fit px-10 py-3">
        Send
      </button>
    </form>
  );
};

export default Form;
