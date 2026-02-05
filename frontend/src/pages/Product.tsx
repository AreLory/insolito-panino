//Hooks
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../hooks/useProduct";
import { useProductCart } from "../hooks/useProductCart";
import { Link, useParams } from "react-router";

//Interfaces
import type { ISize } from "../types/products";

//Components
import AddToCartBar from "../components/AddToCartBar";
import IngredientSelector from "../components/IngredientSelector";
import SizeSelector from "../components/SizeSelector";
import CartCountingControls from "../components/CartCountingControls";

//Assets/img
import cartImg from '../assets/img/cart-gray.png'
import arrowLeft from '../assets/img/arrow-left.png'

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();

  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const item = useProduct(id);

  const { cartItem, quantity, addOne, removeOne } = useProductCart(
    item,
    selectedSize,
    selectedIngredients,
  );

  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes?.[0] || null);
      setSelectedIngredients(item.ingredients.map((ing) => ing.name));
    }
  }, [item]);

  if (!item) return <div>Loading...</div>;

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
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
          <Link to={"/cart"} className="size-10 p-1">
          <img src={cartImg} alt="cart" />
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
          selectedIngredients={selectedIngredients}
          onToggleIngredient={toggleIngredient}
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
