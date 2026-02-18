interface Option {
  name: string;
  value: string;
  img:string;
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
    <div className="w-full h-20 p-4">
      <div className="flex w-full justify-around gap-4">
        {optionList.map((opt) => (
          <div
            className={`rounded-lg w-full flex flex-col items-center cursor-pointer ${
              selectedOption?.value === opt.value
                ? "scale-90 shadow-inner"
                : "shadow-xl border-b-4 border border-primary"
            }`}
            onClick={() => onChooseOption(opt)}
            key={opt.value}
          >
            <h1 className="font-semibold">{opt.name}</h1>
            <img src={opt.img} alt={opt.name} className="size-10"/>
          </div>
        ))}
      </div>
    </div>
  );
}
