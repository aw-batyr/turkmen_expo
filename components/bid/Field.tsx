import React, { forwardRef } from 'react';

interface IProps {
  name: string;
  type: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Field = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const { name, type } = props;

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={name} className="text-[20px]">
        {name}
      </label>
      <input type={type} name={name} className="bid-input w-[300px]" ref={ref} {...props} />
    </div>
  );
});
