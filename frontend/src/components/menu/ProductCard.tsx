import type { Products } from "../../types/products";

import { Link } from "react-router";
interface Props {
  item: Products;
}

export default function ProductCard({ item }: Props) {
  return (
    <Link
      to={`/product/${item._id}`}
      className="
    group
    bg-white rounded-2xl
    overflow-hidden
    shadow-sm
    hover:shadow-xl
    transition-all duration-300
    hover:-translate-y-1
    flex flex-col
  "
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {item.name.toUpperCase()}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-primary">
            €{item.basePrice.toFixed(2)}
          </span>

          <span className="text-sm text-gray-400 group-hover:text-primary transition-colors">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}
