import React from "react";

interface InputProps {
  label: string;
  value: string | undefined;
  onChange: (val: any) => void;
  required?: boolean;
  type: string;
  readonly?: boolean;
}
export default function Input({
  label,
  value,
  onChange,
  required,
  type,
  readonly,
}: InputProps) {
  return (
    <div className="mb-1 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        value={value ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        type={type}
        id={label}
        className=" w-full px-4 py-2.5
            bg-white border rounded-lg
            text-gray-900 placeholder-gray-400
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder={value || label}
        required={required}
        disabled={readonly}
      />
    </div>
  );
}
