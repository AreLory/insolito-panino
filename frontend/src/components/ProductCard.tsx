import type { IProducts, } from "../types/products";

import { Link } from "react-router";
interface Props {
  item: IProducts;
}

export default function ProductCard({ item }: Props) {

  return (
    <Link
      to={`/product/${item._id}`}
      className={` rounded shadow flex flex-col cursor-pointer p-2 max-w-38 w-full max-h-60 `}
    >
      <div className="flex justify-center h-34">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="object-cover rounded size-34"
        />
      </div>
      <div className="flex flex-col items-center h-26 p-1">
        <h3 className="text-sm md:text-xl font-bold w-full text-center h-14">
          {item.name}
        </h3>

        <div className="flex justify-center w-full  items-center">
          <h2 className="text-lg font-bold text-center">
            €{item.basePrice.toFixed(2)}
          </h2>
        </div>
      </div>
    </Link>
  );
}
