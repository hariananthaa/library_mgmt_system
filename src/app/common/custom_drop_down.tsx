import React, { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register: any;
  label: string;
  id: string;
  options: string[];
  prefixIcon: ReactNode;
}

export default function CustomDropDown({
  register,
  label,
  id,
  options,
  prefixIcon,
  ...rest
}: SelectProps) {
  return (
    <>
      <label htmlFor="genre" className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1">
        {prefixIcon}
        <select
          id={id}
          {...rest}
          {...register(id)}
          className="peer block w-full focus:outline-blue-500 rounded-md border border-gray-200 py-[11px] pl-8 text-sm outline-2 placeholder:text-gray-500"
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((item, index) => (
            <option key={item + index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
