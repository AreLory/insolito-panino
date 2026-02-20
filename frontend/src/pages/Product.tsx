//Hooks
import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../hooks/useProduct";
import { useProductCart } from "../hooks/useProductCart";
import { useSelector } from "react-redux";

import type { Size } from "../types/products";
import { selectTotalItems } from "../features/cart/cartSelectors";

import { ArrowLeft, ShoppingCart } from "lucide-react";
// Components
import AddToCartBar from "../components/menu/AddToCartBar";
import CartCountingControls from "../components/cart/CartCountingControls";
import SizeSelector from "../components/menu/SizeSelector";
import IngredientSelector from "../components/menu/IngredientSelector";
import ExtraSelector from "../components/menu/ExtraSelector";
import MiniNavBar from "../components/shared/MiniNavBar";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const itemsQuantity = useSelector(selectTotalItems);

  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [extrasExpanded, setExtrasExpanded] = useState(false);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const product = useProduct(id);

  const { cartItem, quantity, addOne, removeOne } = useProductCart(
    product,
    selectedSize,
    removedIngredients,
    Array.from(selectedExtras),
  );

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || null);
    }
  }, [product]);

  const removeIngredient = (name: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name],
    );
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(extraId)) newSet.delete(extraId);
      else newSet.add(extraId);
      return newSet;
    });
  };

  const total = useMemo(() => {
    if (!product) return 0;
    const basePrice = product.basePrice;

    const sizePrice = selectedSize?.price;

    const extrasPrice = Array.from(selectedExtras).reduce((sum, id) => {
      const extra = product.availableExtras.find((e) => e._id === id);
      return sum + (extra?.price ?? 0);
    }, 0);

    const finalUnitPrice = sizePrice || basePrice;
    if (quantity <= 0) {
      return finalUnitPrice + extrasPrice;
    } else {
      return (finalUnitPrice + extrasPrice) * quantity;
    }
  }, [product, selectedSize, selectedExtras, quantity]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        rightChild={<ShoppingCart />}
        badgeCount={itemsQuantity}
        pageName={product.name}
        goBack="/menu"
        goTo="/cart"
      />

      <div className="pt-20 pb-32 max-w-2xl mx-auto">
        <div className="bg-white">
          <div className="relative h-72 overflow-hidden">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name} {selectedSize?.label}
            </h1>
            {product.description && (
              <p className="text-gray-600 mb-4">{product.description}</p>
            )}
            <div className="text-2xl font-bold text-orange-600">
              €{(selectedSize?.price || product.basePrice).toFixed(2)}
            </div>
          </div>
        </div>

        {product.sizes && product.sizes.length > 0 && (
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
        )}

        <IngredientSelector
          ingredients={product.ingredients}
          isExpanded={ingredientsExpanded}
          removedIngredients={removedIngredients}
          onSetIngredientsExpanded={setIngredientsExpanded}
          onToggleIngredient={removeIngredient}
        />

        <ExtraSelector
          extras={product.availableExtras}
          isExpanded={extrasExpanded}
          selectedExtras={selectedExtras}
          onSetExpanded={setExtrasExpanded}
          onToggleExtra={toggleExtra}
        />

        {isAuthenticated && (
          <div className="bg-white mt-2 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quantità
            </h2>
            <CartCountingControls
              onAddToCart={addOne}
              onRemoveFromCart={removeOne}
              quantity={quantity}
            />
          </div>
        )}
      </div>

      {isAuthenticated && <AddToCartBar price={total} onAddToCart={addOne} />}
    </div>
  );
}
