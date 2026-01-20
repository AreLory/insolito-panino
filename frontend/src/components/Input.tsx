import React from "react";

export default function Input({
  label,
  value,
  onChange,
  required,
  type
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
  type: string
}) {
  return (
    <div>
      <label className="block mb-2.5 text-sm font-medium text-heading">
        {label}
      </label>
      <input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        type={type}
        id={label}
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder={label}
        required={required}
      />
    </div>
  );
}
