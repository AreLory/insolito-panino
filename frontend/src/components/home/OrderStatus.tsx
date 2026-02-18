import { Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface OrderStatusProps {
  hasActiveOrder: boolean;
  orderStatus?: string;
  estimatedTime?: number;
}

export default function OrderStatus({ hasActiveOrder, orderStatus, estimatedTime }: OrderStatusProps) {
  if (!hasActiveOrder) return null;

  return (
    <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-5 shadow-lg mx-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm opacity-90">Il tuo ordine</p>
            <p className="font-bold text-lg">{orderStatus}</p>
            {estimatedTime && (
              <p className="text-sm opacity-90">Pronto tra {estimatedTime} min</p>
            )}
          </div>
        </div>
        <Link to={'/order'} className="bg-white text-green-600 p-3 rounded-full hover:scale-105 transition">
          <ChevronRight size={24} />
        </Link>
      </div>
    </div>
  );
}