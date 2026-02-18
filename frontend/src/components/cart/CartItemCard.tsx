//Hooks
import { useProductCart } from "../../hooks/useProductCart";

//interfaces
import type { CartItem } from "../../types/cart";
import type {Products } from "../../types/products";

//components
import CartCountingControls from "../cart/CartCountingControls";
//assets/img
import crossIcon from "../../assets/img/cross.png";
import { MinusCircle } from "lucide-react";

export default function CartItemCard({ item }: { item: CartItem }) {
  const productForHook: Products = {
    _id: item._id,
    name: item.name,
    basePrice: item.unitPrice, 
    category: "burger",
    sizes: item.selectedSize
      ? [{ label: item.selectedSize.label, price: item.selectedSize.price }]
      : undefined,
    ingredients: item.removedIngredients
      ? item.removedIngredients.map((i) => ({ name: i }))
      : [],
    extras: item.extras,
    quantity: item.quantity,
  };

  const { cartItem, quantity, addOne, removeOne, removeAll } = useProductCart(
    productForHook,
    item.selectedSize,
    item.removedIngredients,
  );
  const showTotal = () => {
    const total = (item.selectedSize?.price || item.unitPrice) * item.quantity;
    return total.toFixed(2);
  };
  return (
    <div className="bg-[#F8FAFC]/50 border border-slate-100/60 rounded-[2rem] p-5 flex items-start gap-4 transition-all hover:border-slate-200">
      <div className="flex w-[30%]">
        <img
          // src={}
          alt="panino"
          className="size-30 rounded-2xl"
        />
      </div>
      <div className="w-[70%] flex flex-wrap">
        <div className="w-[50%] flex flex-col pl-4">
          <h3 className="text-lg font-bold">{cartItem?.name}</h3>
          <h4 className=" text-gray-700">{cartItem?.selectedSize?.label}</h4>
          {cartItem?.removedIngredients?.map((i) => (
            <p key={i} className="flex gap-1 m-1 text-xs  text-red-500">
              <MinusCircle size={15}/>No {i}
            </p>
          ))}
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex justify-end w-auto items-center p-2 ">
            <button className="size-4" onClick={removeAll}>
              <img src={crossIcon} alt="X" />
            </button>
          </div>
        </div>
        <div className=" flex items-center justify-between w-full px-4">
          <h3 className="text-xl font-semibold">€ {showTotal()}</h3>
          <CartCountingControls
            quantity={quantity}
            onAddToCart={addOne}
            onRemoveFromCart={removeOne}
          />
        </div>
      </div>
    </div>
  );
}
