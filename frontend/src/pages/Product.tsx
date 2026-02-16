//Hooks
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../hooks/useProduct";
import { useProductCart } from "../hooks/useProductCart";
import { Link, useParams } from "react-router";

//Interfaces
import type { Size } from "../types/products";

//Components
import AddToCartBar from "../components/AddToCartBar";
import IngredientSelector from "../components/IngredientSelector";
import SizeSelector from "../components/SizeSelector";
import CartCountingControls from "../components/CartCountingControls";

//Assets/img
import cartImg from "../assets/img/cart-gray.png";
import arrowLeft from "../assets/img/arrow-left.png";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../features/cart/cartSelectors";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  const item = useProduct(id);
  const itemsQuantity = useSelector(selectTotalItems);

  const { cartItem, quantity, addOne, removeOne } = useProductCart(
    item,
    selectedSize,
    removedIngredients,
  );

  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes?.[0] || null);
    }
  }, [item]);

  if (!item) return <div>Loading...</div>;

  const removeIngredient = (name: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  return (
    <div className="w-screen flex md:justify-center">
      <div className="w-full md:max-w-4xl md:w-4xl">
        <div className="flex w-full justify-between px-3">
          <Link to={"/menu"} className="size-10 p-1">
            <img src={arrowLeft} alt="back" />
          </Link>
          <h1 className="text-xl font-semibold">Dettagli Prodotto</h1>
          <Link to={"/cart"} className="relative size-10 p-1">
            <img src={cartImg} alt="icon" />

            {itemsQuantity > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {itemsQuantity}
              </span>
            )}
          </Link>
        </div>

        <div className="flex h-70 justify-center items-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="bg-white rounded size-66"
          />
        </div>

        <div className="flex h-15 px-4 items-center justify-between">
          <h3 className="text-xl font-bold mt-2">
            {`${item.name} ${selectedSize?.label || ""}`}
          </h3>
          {cartItem && (
            <CartCountingControls
              quantity={quantity}
              onAddToCart={addOne}
              onRemoveFromCart={removeOne}
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
          removedIngredients={removedIngredients}
          onToggleIngredient={removeIngredient}
        />

        <AddToCartBar
          price={selectedSize?.price ?? item.basePrice}
          isAuthenticated={isAuthenticated}
          onAddToCart={addOne}
        />
      </div>
    </div>
  );
}
