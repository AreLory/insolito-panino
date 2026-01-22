import React from "react";
import type IInputProps from "../types/IInputProps";

export default function Input({
  label,
  value,
  onChange,
  required,
  type, 
  readonly,
}: IInputProps) {
  return (
    <div className="mb-1 w-full">
      <label className="block mb-2.5 text-xs font-medium text-heading m-1">
        {label}
      </label>
      <input
        value={value ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        type={type}
        id={label}
        className="border border-primary text-sm rounded-md focus:ring-accent focus:border-accent block w-full px-3 py-2 shadow-xs shadow-shade placeholder:text-body h-8"
        placeholder={value || label}
        required={required}
        readOnly={readonly}
      />
    </div>
  );
}
