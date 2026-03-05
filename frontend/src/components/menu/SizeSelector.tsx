import type { Size } from "../../types/products";

interface Props {
  sizes: Size[];
  selectedSize?: Size | null;
  onSelectSize: (size: Size) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: Props) {
  return (
          <div className="bg-white mt-2 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Choose size
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => onSelectSize(size)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedSize === size
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="font-semibold text-gray-900">{size.label}</div>
                  {size.meatWeight && (
                    <div className="text-xs text-gray-500 mt-1">
                      {size.meatWeight}g
                    </div>
                  )}
                  {size.price > 0 && (
                    <div className="text-sm font-semibold text-orange-600 mt-1">
                      +€{size.price.toFixed(2)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
}
