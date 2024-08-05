import clsx from "clsx";
import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  error: FieldError | undefined;
  label: string;
  id: string;
}

export default function InputField({
  register,
  label,
  error,
  id,
  ...rest
}: InputProps) {
  return (
    <div className="w-full text-left">
      <label htmlFor="title" className="mb-2 text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        <input
          {...register(id)}
          {...rest}
          className={clsx(
            rest.type == "date" ? "py-[8.8px]" : "py-2",
            error != undefined
              ? "border-red-500 outline-none focus:border-2"
              : "focus:outline-blue-500",
            "peer block w-full rounded-md border border-gray-200  py-2.5 px-3 text-sm outline-2 placeholder:text-gray-500"
          )}
        />
      </div>
      {error && (
        <span role="alert" className="text-sm text-red-500 pl-2">
          {error.message}
        </span>
      )}
    </div>
  );
}
