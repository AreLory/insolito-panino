import { Star, Plus } from 'lucide-react';

interface Props {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
}

export default function DailySpecial({
  name,
  description,
  price,
  originalPrice,
  imageUrl,
  rating
}: Props) {
  return (
    <div className="mx-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-gray-800">🔥 Speciale del Giorno</h2>
      </div>

      <div className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-3xl overflow-hidden shadow-xl border-2 border-orange-200">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            -20%
          </div>
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-800">{rating}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 mb-4 text-sm">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-orange-600">€{price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-lg text-gray-400 line-through">€{originalPrice.toFixed(2)}</span>
              )}
            </div>

            <button className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg">
              <Plus size={20} />
              Aggiungi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
