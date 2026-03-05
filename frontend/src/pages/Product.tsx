import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { selectTotalItems } from "../features/cart/cartSelectors";

import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

import { useProduct } from "../hooks/useProduct";
import { useProductCart } from "../hooks/useProductCart";

import AddToCartBar from "../components/menu/AddToCartBar";
import CartCountingControls from "../components/cart/CartCountingControls";
import SizeSelector from "../components/menu/SizeSelector";
import IngredientSelector from "../components/menu/IngredientSelector";
import ExtraSelector from "../components/menu/ExtraSelector";
import MiniNavBar from "../components/shared/MiniNavBar";
import Loader from "../components/shared/Loader";

import type { Size } from "../types/products";

import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function Product() {
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();

  const itemsQuantity = useSelector(selectTotalItems);

  const { id } = useParams<{ id: string }>();
  const {product} = useProduct(id);

  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [extrasExpanded, setExtrasExpanded] = useState(false);

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const { quantity, addOne, removeOne } = useProductCart(
    product,
    selectedSize,
    removedIngredients,
    Array.from(selectedExtras),
  );

  //Update price on change size, extra or ingredient
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

  //select first size in first render
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

  const handleAddToCart = () => {
    addOne();
    showAlert("success", "Item successfully added to cart");
  };

  if (!product) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        rightChild={<ShoppingCart />}
        badgeCount={itemsQuantity}
        pageName={product.name.toUpperCase()}
        goBack="/menu"
        goTo="/cart"
      />

      <div className="pt-20 pb-32 max-w-2xl mx-auto">
        <div className="bg-white">
          <div className="relative h-72 overflow-hidden flex justify-center">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full object-cover"
              />
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name.toUpperCase()} {selectedSize?.label.toUpperCase()}
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

        {product.ingredients.length > 0 && (
          <IngredientSelector
            ingredients={product.ingredients}
            isExpanded={ingredientsExpanded}
            removedIngredients={removedIngredients}
            onSetIngredientsExpanded={setIngredientsExpanded}
            onToggleIngredient={removeIngredient}
          />
        )}

        <ExtraSelector
          extras={product.availableExtras.sort((a, b) => a.price - b.price)}
          isExpanded={extrasExpanded}
          selectedExtras={selectedExtras}
          onSetExpanded={setExtrasExpanded}
          onToggleExtra={toggleExtra}
        />

        {isAuthenticated && (
          <div className="bg-white mt-2 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quantity
            </h2>
            <CartCountingControls
              onAddToCart={addOne}
              onRemoveFromCart={removeOne}
              quantity={quantity}
            />
          </div>
        )}
      </div>

      {isAuthenticated && (
        <AddToCartBar price={total} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
}
