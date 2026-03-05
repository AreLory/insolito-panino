import { useMemo } from "react";

import type { OrderItem } from "../../types/order";

import { CircleMinus, CirclePlus } from "lucide-react";

interface OrderItemCardProps {
  item: OrderItem;
}

const OrderItemCard = ({ item }: OrderItemCardProps) => {
  const total = useMemo(() => {
    if (!item) return 0;

    const basePrice = item.unitPrice;
    const sizePrice = item.selectedSize?.price;

    const extrasPrice =
      item.selectedExtras?.reduce(
        (sum, extra) => sum + (extra.price ?? 0),
        0,
      ) ?? 0;

    return ((sizePrice || basePrice) + extrasPrice) * (item.quantity ?? 1);
  }, [item]);

  return (
    <div className="bg-[#F8FAFC]/50 border border-slate-100/60 rounded-4xl p-5 flex items-start gap-4 transition-all hover:border-slate-200">
      <div className="text-lg font-bold text-[#FF3B30] leading-tight">
        {item.quantity}x
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-[15px] font-bold text-slate-800 leading-tight">
            {item.name}
          </h4>
          <span className="text-[15px] font-bold text-slate-800">
            ${total.toFixed(2)}
          </span>
        </div>

        {item.selectedSize && (
          <p className="text-[12px] text-slate-400 font-medium mb-3">
            {item.selectedSize.label}
          </p>
        )}

        {item.removedIngredients && item.removedIngredients.length > 0 && (
          <div className="space-y-2.5">
            {item.removedIngredients.map((i) => (
              <div key={i} className="flex items-center gap-2">
                <CircleMinus size={14} className="text-red-400" />

                <span className={`text-[12px] font-semibold text-red-500`}>
                  {i}
                </span>
              </div>
            ))}
            {item.selectedExtras.map((e) => (
              <div
                key={`${e.extraId}-${item.product}`}
                className="flex items-center gap-2"
              >
                <CirclePlus size={14} className="text-green-400" />

                <span className={`text-[12px] font-semibold text-green-500`}>
                  {e.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemCard;
