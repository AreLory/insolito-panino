
import type { OrderItem } from '../../types/order';
import { CircleMinus } from 'lucide-react';

interface OrderItemCardProps {
  item: OrderItem;
}

const OrderItemCard = ({ item }:OrderItemCardProps) => {
  const price = item.selectedSize?.price || item.unitPrice

  return (
    <div className="bg-[#F8FAFC]/50 border border-slate-100/60 rounded-[2rem] p-5 flex items-start gap-4 transition-all hover:border-slate-200">
      <div className="text-lg font-bold text-[#FF3B30] leading-tight">
        {item.quantity}x
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-[15px] font-bold text-slate-800 leading-tight">
            {item.name}
          </h4>
          <span className="text-[15px] font-bold text-slate-800">
            ${(price * item.quantity).toFixed(2)}
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
               
                <span
                  className={`text-[12px] font-semibold text-red-500`}
                >
                  {i}
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
