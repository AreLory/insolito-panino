import type { ISize } from "../types/products";

interface Props {
  sizes: ISize[];
  selectedSize?: ISize | null;
  onSelectSize: (size: ISize) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: Props) {
  return (
    <div className=" h-20 p-2">
      <div className="flex w-full justify-around">
        {sizes.map((size) => (
          <div
            className={`rounded-lg w-full flex flex-col items-center cursor-pointer ${
              selectedSize?.label === size.label ? "scale-90 shadow-inner"
                : "shadow-xl border-b-4 border border-primary"
            }`}
            onClick={() => onSelectSize(size)}
            key={size.label}
          >
            <h1 className="font-semibold">{size.label}</h1>
            <h2 className="text-xs">({size.meatWeight}gr)</h2>
            <h3>€ {size.price.toFixed(2)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
