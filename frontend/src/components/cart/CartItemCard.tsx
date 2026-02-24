import { useProductCart } from "../../hooks/useProductCart";

import CartCountingControls from "../cart/CartCountingControls";

import type { CartItem } from "../../types/cart";
import type { Products } from "../../types/products";

import { MinusCircle, PlusCircle, X } from "lucide-react";

export default function CartItemCard({ item }: { item: CartItem }) {
  const productForHook: Products = {
    _id: item._id,
    imageUrl: item.imageUrl,
    name: item.name,
    basePrice: item.unitPrice,
    category: "burger",
    sizes: item.selectedSize
      ? [{ label: item.selectedSize.label, price: item.selectedSize.price }]
      : undefined,
    ingredients: item.removedIngredients
      ? item.removedIngredients.map((i) => ({ name: i }))
      : [],
    availableExtras: item.selectedExtras || [],
    quantity: item.quantity,
  };

  const { cartItem, quantity, addOne, removeOne, removeAll } = useProductCart(
    productForHook,
    item.selectedSize,
    item.removedIngredients,
    item.selectedExtras?.map((e) => e._id) || [],
  );

  if (!cartItem) return <p>loading...</p>;

  const showTotal = () => {
    if (!cartItem) return "0.00";

    const sizePrice = cartItem.selectedSize?.price ?? cartItem.unitPrice ?? 0;

    const extrasPrice =
      cartItem.selectedExtras?.reduce(
        (sum, e: any) => sum + (e?.price ?? 0),
        0,
      ) ?? 0;

    const total = (sizePrice + extrasPrice) * (cartItem.quantity ?? 0);
    return total.toFixed(2);
  };

  return (
    <div className="relative rounded-2xl p-4 mx-4 border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
      <button
        onClick={removeAll}
        className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-700"
      >
        <X size={18} />
      </button>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <div className="w-full sm:w-28 h-28 shrink-0 flex justify-center">
          <img
            alt="panino"
            className=" h-full object-cover rounded-xl bg-gray-100"
            src={cartItem?.imageUrl}
          />
        </div>

        <div className="flex flex-col flex-1 justify-between pr-0 sm:pr-6">
          <div className="space-y-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {cartItem?.name}
              </h3>
              {cartItem?.selectedSize && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {cartItem.selectedSize.label}
                </p>
              )}
            </div>

            {cartItem?.removedIngredients &&
              cartItem.removedIngredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cartItem.removedIngredients.map((i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-1 rounded-lg"
                    >
                      <MinusCircle size={14} />
                      No {i}
                    </span>
                  ))}
                </div>
              )}

            {cartItem?.selectedExtras && cartItem.selectedExtras.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {cartItem.selectedExtras.map((e) => (
                  <span
                    key={e._id}
                    className="flex items-center gap-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-lg"
                  >
                    <PlusCircle size={14} />
                    {e.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 w-full sm:w-60 gap-3 sm:gap-0">
            <div className="text-right">
              <p className="text-xs text-gray-400">Totale</p>
              <p className="text-xl font-bold text-gray-900">€ {showTotal()}</p>
            </div>

            <CartCountingControls
              quantity={quantity}
              onAddToCart={addOne}
              onRemoveFromCart={removeOne}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
