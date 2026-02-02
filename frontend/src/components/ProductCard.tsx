import { useState } from "react";
import type { IProducts, ISize } from "../types/IProducts";
import img1 from "../config/data";
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
  const [customIng, setCustomIng] = useState(false);
  const handleCustomIng = () => {
    customIng ? setCustomIng(false) : setCustomIng(true);
  };

  const selectedItem = {
    id: item.id,
    name: item.name,
    basePrice: item.basePrice,
    selectedSize: selectedSize, 
    selectedIngredients: selectedIngredients, 
  };

  const cartItem = cartItems.find(
    (i:ICartItem) => getCartItemKey(i) === getCartItemKey(selectedItem),
  );

  return (
    <div className="border rounded shadow flex p-2">
      <div className="w-[30%] flex items-center">
        <img
          src={img1}
          // src={item.imageUrl}
          alt={item.name}
          className="object-cover rounded"
        />
      </div>
      {/* <p className="text-sm text-gray-600">{item.description}</p> */}
      <div className="w-[70%] flex flex-col items-center p-1">
        <h3 className="text-sm font-bold mt-2 w-full text-center">
          {item.name}
        </h3>
        {item.sizes && (
          <div className="flex gap-2 mt-2 w-full justify-around">
            {item.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 border rounded cursor-pointer  h-10 text-[10px] ${
                  selectedSize?.label === size.label
                    ? "bg-accent text-white"
                    : ""
                }`}
              >
                {size.label} ({size.meatWeight}gr)
              </button>
            ))}
          </div>
        )}
        <div className={`flex flex-col text-sm ${customIng ? "" : "collapse"}`}>
          <h3 className=" font-bold mt-1">Ingredienti</h3>
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
        <button
          className="text-accent rounded-lg border  w-25 mt-2"
          onClick={handleCustomIng}
        >
          ingredients
        </button>
        <div className="flex justify-between w-full items-center mt-1">
          <h2 className="text-lg font-bold text-center w-[50%]">
            €{selectedSize?.price.toFixed(2)}
          </h2>
          {cartItem ? (
            <div className="flex items-center justify-around w-[50%]">
              <button
                onClick={() => {
                  const key = getCartItemKey(cartItem);
                  dispatch(removeFromCart({ key, quantity: 1 }));
                }}
                className="bg-secondary rounded-full size-10"
              >
                -
              </button>
              <h3>x {cartItem.quantity}</h3>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: cartItem.id,
                      name: cartItem.name,
                      basePrice: cartItem.basePrice,
                      selectedSize: cartItem.selectedSize,
                      selectedIngredients: cartItem.selectedIngredients,
                    }),
                  )
                }
                className="bg-secondary rounded-full size-10"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-3 p-1 text-[10px] w-[50%] bg-shade text-white py-2 rounded transition hover:scale-105 cursor-pointer"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
