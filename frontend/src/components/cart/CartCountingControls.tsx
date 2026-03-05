import { Minus, Plus } from "lucide-react";

interface Props {
  onRemoveFromCart: () => void;
  onAddToCart: () => void;
  quantity: number;
}
export default function CartCountingControls({
  quantity,
  onRemoveFromCart,
  onAddToCart,
}: Props) {
  return (

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onRemoveFromCart}
          disabled={quantity <= 1}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            quantity <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-orange-100 text-orange-600 hover:bg-orange-200"
          }`}
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="text-2xl font-bold text-gray-900 w-6 text-center">
          {quantity}
        </span>
        <button
          onClick={onAddToCart}
          className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 flex items-center justify-center transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
    </div>
  );
}
