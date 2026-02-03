import { useEffect, useState } from "react";
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
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { Link, useParams } from "react-router";
import Checkbox from "../components/Checkbox";
import { useProduct } from "../hook/useProduct";
import AddToCartBar from "../components/AddToCartBar";
import IngredientSelector from "../components/IngredientSelector";
import SizeSelector from "../components/SizeSelector";
import CartCountingControls from "../components/CartCountingControls";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { isAuthenticated } = useAuth();

  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const item = useProduct(id);

  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes?.[0] || null);
      setSelectedIngredients(item.ingredients.map((ing) => ing.name));
    }
  }, [item]);

  if (!item) {
    return <div>Loading...</div>;
  }
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

  const selectedItem = {
    id: item.id,
    name: item.name,
    basePrice: item.basePrice,
    selectedSize: selectedSize,
    selectedIngredients: selectedIngredients,
  };

  const cartItem = cartItems.find(
    (i: ICartItem) => getCartItemKey(i) === getCartItemKey(selectedItem),
  );

  const handleRemoveFromCart = () => {
    if (!cartItem) return;
    const key = getCartItemKey(cartItem);
    dispatch(removeFromCart({ key, quantity: 1 }));
  };

  return (
    <div className="w-screen flex md:justify-center">
      <div className="w-full md:max-w-4xl md:w-4xl">
        <div className="flex w-full justify-between px-3">
          <Link to={"/menu"}>{"<-"}</Link>
          <h1 className="text-xl font-semibold">Dettagli Prodotto</h1>
          <Link to={"/"}>{"Home"}</Link>
        </div>
        <div className="flex  h-70 justify-center items-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="bg-white rounded size-66"
          />
        </div>
        <div className="flex  h-15 px-4 items-center justify-between">
          <h3 className="text-xl font-bold mt-2 ">
            {`${item.name} ${selectedSize?.label}`}
          </h3>
          {cartItem && (
            <CartCountingControls
              quantity={cartItem.quantity}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          )}
        </div>

        {item.sizes && (
          <SizeSelector
            sizes={item.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
        )}

        <IngredientSelector
          ingredients={item.ingredients}
          selectedIngredients={selectedIngredients}
          onToggleIngredient={toggleIngredient}
        />

        <AddToCartBar
          price={selectedSize ? selectedSize?.price : item.basePrice}
          isAuthenticated={isAuthenticated}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
