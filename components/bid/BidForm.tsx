import React, { useEffect } from "react";

interface IProps {
  label: string;
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
  htmlfor:
    | "event_id"
    | "company_name"
    | "web_site"
    | "contact_person"
    | "phone"
    | "email"
    | "what_demonstrated"
    | "required_area";
}

export const BidForm = ({
  required = false,
  textArea = false,
  label,
  ...props
}: IProps) => {
  return (
    <div>
      {textArea ? (
        <div className="flex w-full flex-col gap-[15px] items-start">
          <label htmlFor={props.htmlfor}>{label}</label>
          <textarea
            className="bid-input w-full"
            {...props}
            cols={30}
            rows={5}
          />
        </div>
      ) : (
        <div className="flex w-full gap-[15px] flex-col items-start">
          <label {...props}>
            {label}
            {required && <span className="text-lightRed">*</span>}
          </label>
          <input {...props} className="bid-input w-full" />
        </div>
      )}
    </div>
  );
};
