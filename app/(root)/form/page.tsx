"use client";

import * as React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { Field } from "@/components/bid/Field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {
  const formSchema = z.object({
    name: z.string(),
    age: z.number(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

  type FormFields = z.infer<typeof formSchema>;

  const onSubmit = (data: FormFields) => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container my-20 flex flex-col gap-5"
    >
      <Field
        {...register("name", {
          required: "Name is Required!",
        })}
        type="text"
      />
      {errors.name && <span className="text-red">{errors.name.message}</span>}

      <Field
        {...register("age", {
          required: "Age is Required!",
        })}
        type="number"
      />
      {errors.age && <span className="text-red">{errors.age.message}</span>}

      <button
        type="submit"
        className="border-white border-[1px] rounded-lg w-fit px-10 py-3"
      >
        Send
      </button>
    </form>
  );
};

export default Form;
