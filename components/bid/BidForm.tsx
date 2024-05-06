import React, { useEffect } from "react";

interface IProps {
  label: string;
  register: any;
  name:
    | "event_id"
    | "company_name"
    | "web_site"
    | "contact_person"
    | "phone"
    | "email"
    | "what_demonstrated"
    | "area"
    | "required_area";
  required?: boolean;
  type?: string;
  textArea?: boolean;
}

export const BidForm = ({
  required = false,
  textArea = false,
  label,
  register,
  ...props
}: IProps) => {
  return (
    <div>
      {textArea ? (
        <div className="flex w-full flex-col gap-[15px] items-start">
          <label htmlFor={props.name}>{label}</label>
          <textarea
            rows={5}
            cols={30}
            {...props}
            className="bid-input w-full"
          />
        </div>
      ) : (
        <div className="flex w-full gap-[15px] flex-col items-start">
          <label htmlFor={props.name}>
            {label}
            {required && <span className="text-lightRed">*</span>}
          </label>
          <input {...props} className="bid-input w-full" />
        </div>
      )}
    </div>
  );
};
