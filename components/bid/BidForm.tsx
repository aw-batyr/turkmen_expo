import React, { useEffect } from 'react';
import { ChangeHandler, useFormContext } from 'react-hook-form';

interface IProps {
  label: string;
  name: // | "event_id"
  | 'company_name'
    | 'web_site'
    | 'contact_person'
    | 'phone'
    | 'email'
    | 'what_demonstrated'
    | 'area'
    | 'required_area';
  require?: boolean;
  type?: string;
  textArea?: boolean;
  onChange?: ChangeHandler;
}

export const BidForm = ({ textArea = false, require = false, ...props }: IProps) => {
  const { register } = useFormContext();

  return (
    <div>
      {textArea ? (
        <div className="flex w-full flex-col gap-[15px] items-start">
          <label htmlFor={props.name}>{props.label}</label>
          <textarea rows={7} cols={30} {...register(props.name, {})} className="bid-input w-full" />
        </div>
      ) : (
        <div className="flex w-full gap-[15px] flex-col items-start">
          <label htmlFor={props.name}>
            {props.label}
            {require && <span className="text-lightRed">*</span>}
          </label>
          <input {...register(props.name)} className="bid-input w-full" />
        </div>
      )}
    </div>
  );
};
