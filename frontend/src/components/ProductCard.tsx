import React, { useState } from "react";
import type { IProducts, ISize, IIngredient } from "../types/IProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

interface Props {
  item: IProducts;
}

export default function ProductCard({ item }: Props) {
  const dispatch = useDispatch();

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
    <div className="border p-4 rounded shadow">
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
              className={`px-2 py-1 border rounded ${
                selectedSize?.label === size.label
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {size.label} ( €{size.price.toFixed(2)} )<br/> 
              {size.meatWeight}gr
            </button>
          ))}
        </div>
      )}

      {item.ingredients.map((ing) =>
        ing.removable ? (
          <label key={ing.name} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ing.name)}
              onChange={() => toggleIngredient(ing.name)}
            />
            {ing.name}
          </label>
        ) : (
          <p key={ing.name} className="">
            {ing.name}
          </p>
        ),
      )}

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-green-500 text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
