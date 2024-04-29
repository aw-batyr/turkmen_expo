import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name:
    | "event_id"
    | "web_site"
    | "contact_person"
    | "phone"
    | "email"
    | "what_demonstrated"
    | "area";
  required?: boolean;
  type?: string;
  textArea?: boolean;
  htmlfor:
    | "event_id"
    | "web_site"
    | "contact_person"
    | "phone"
    | "email"
    | "what_demonstrated"
    | "required_area";
}

export const BidForm = ({
  label,
  required = false,
  type = "text",
  textArea = false,
  name,
  htmlfor,
}: IProps) => {
  const { setValue } = useFormContext();

  return (
    <div>
      {textArea ? (
        <div className="flex w-full flex-col gap-[15px] items-start">
          <label htmlFor={htmlfor}>{label}</label>
          <textarea
            className="bid-input w-full"
            name={name}
            cols={30}
            rows={5}
            onChange={(e) => {
              if (e.target.value) {
                setValue(name, e.target.value);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex w-full gap-[15px] flex-col items-start">
          <label htmlFor={htmlfor}>
            {label}
            {required && <span className="text-lightRed">*</span>}
          </label>
          <input
            onChange={(e) => {
              if (e.target.value) {
                setValue(name, e.target.value);
              }
            }}
            type={type}
            className="bid-input w-full"
          />
        </div>
      )}
    </div>
  );
};
