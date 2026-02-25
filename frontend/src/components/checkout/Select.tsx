import type { ReactNode } from "react";

interface Option {
  name: string;
  value: string;
  img: ReactNode;
}

interface Props {
  selectedOption: Option | undefined;
  optionList: Option[];
  onChooseOption: (option: Option) => void;
}

export default function Select({
  selectedOption,
  optionList,
  onChooseOption,
}: Props) {
  return (
    <div className="w-full h-20 p-4 ">
      <div className="flex w-full justify-around gap-4">
        {optionList.map((opt) => (
          <div
            className={`rounded-lg w-full flex flex-col items-center   ${
              selectedOption?.value === opt.value
                ? "scale-90 shadow-inner"
                : "shadow-xl border-b-4 border hover:bg-gray-50 cursor-pointer"
            }`}
            onClick={() => onChooseOption(opt)}
            key={opt.value}
          >
            <h1 className="font-semibold">{opt.name}</h1>
            {opt.img}
          </div>
        ))}
      </div>
    </div>
  );
}
