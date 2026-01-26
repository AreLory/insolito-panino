import React, { useState } from "react";
import type { IProducts, ISize, IIngredient } from "../types/IProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCartItemKey,
  removeFromCart,
} from "../features/cart/cartSlice";
import { selectCartItems } from "../features/cart/cartSelector";
import type { ICartItem } from "../types/ICartState";
interface Props {
  item: IProducts;
}

export default function ProductCard({ item }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [selectedSize, setSelectedSize] = useState<ISize | null>(
    item.sizes?.[0] || null,
  );

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    item.ingredients.map((ing) => ing.name),
  );

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...item,
        selectedSize: selectedSize || undefined,
        selectedIngredients,
        quantity: 1,
      }),
    );
  };

  return (
    <div className="border p-4 rounded shadow flex flex-col items-center max-w-[380px]">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>

      {item.sizes && (
        <div className="flex gap-2 mt-2">
          {item.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 border rounded cursor-pointer ${
                selectedSize?.label === size.label ? "bg-accent text-white" : ""
              }`}
            >
              {size.label} ({size.meatWeight}gr)
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mt-1">Ingredienti</h3>
        {item.ingredients.map((ing) =>
          ing.removable ? (
            <label key={ing.name} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ing.name)}
                onChange={() => toggleIngredient(ing.name)}
                className="cursor-pointer"
              />
              {ing.name}
            </label>
          ) : (
            <p key={ing.name} className="">
              {ing.name}
            </p>
          ),
        )}
      </div>
      <h2 className="text-2xl">€{selectedSize?.price.toFixed(2)}</h2>
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-shade text-white py-2 rounded transition hover:scale-105 cursor-pointer"
      >
        Add to Cart
      </button>
      {cartItems?.map((i:ICartItem) => ((i.id==item.id)?
      <div className="flex items-center justify-around">
        <button
          onClick={() => {
            const key = getCartItemKey(i);
            dispatch(removeFromCart({ key, quantity: 1 }));
          }}
          className="bg-secondary rounded-full size-10"
        >
          -
        </button>
        <h3>x {i.quantity}</h3>
        <button
          onClick={() =>
            dispatch(
              addToCart({
                id: i.id,
                name: i.name,
                basePrice: i.basePrice,
                selectedSize: i.selectedSize,
                selectedIngredients: i.selectedIngredients,
              }),
            )
          }
          className="bg-secondary rounded-full size-10"
        >
          +
        </button>
      </div> : <></>
      ))}
    </div>
  );
}
