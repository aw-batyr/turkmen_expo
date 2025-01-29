import { FC, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";

interface Props {
  className?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Имя необходимо"),
  email: z.string().email("Email необходим"),
  phone: z.string().min(8, "Номер телефона необходим"),
  company_name: z.string().min(2, "Название компании необходимо"),
  message: z.string().min(5, "Сообщение необходимо"),
});

export type FormType = z.infer<typeof formSchema>;

export const ContactsForm: FC<Props> = ({ className }) => {
  const [status, setStatus] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company_name: "",
      message: "",
    },
  });

  async function onSubmit(data: FormType) {
    try {
      setStatus(status);

      console.log(data);
    } catch (error) {
      console.error("POST contact", error);
    }
  }

  console.log(status);

  return (
    <div className={clsx("bg-PRIMARY rounded-[8px] py-8 px-6", className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="h2 !text-white text-3xl font-medium lg:mb-8 mb-6">
          Связаться с нами
        </h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <label htmlFor="name" className="label">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className="input"
              {...register("name")}
            />
            <span className="error">{formState.errors.name?.message}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex flex-col relative">
              <label htmlFor="email" className="label">
                Имя
              </label>
              <input
                type="text"
                id="email"
                className="input"
                {...register("email")}
              />
              <span className="error">{formState.errors.email?.message}</span>
            </div>

            <div className="flex flex-col relative">
              <label htmlFor="phone" className="label">
                Имя
              </label>
              <input
                type="text"
                id="phone"
                className="input"
                {...register("phone")}
              />
              <span className="error">{formState.errors.phone?.message}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="label">
              Название компании
            </label>
            <input
              type="text"
              id="company_name"
              className="input"
              {...register("company_name")}
            />
            <span className="error">
              {formState.errors.company_name?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="label">
              Сообщение
            </label>
            <textarea
              rows={3}
              id="message"
              className="input !h-20 resize-none"
              {...register("phone")}
            />
            <span className="error">{formState.errors.message?.message}</span>
          </div>
          <button className="bg-[#A4FFF3] text-ON_PRIMARY_CONTAINER h-10 rounded-[2px]">
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};
