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

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { isAuthenticated } = useAuth();

  const [item, setItem] = useState<IProducts | null>(null);
  const [selectedSize, setSelectedSize] = useState<ISize | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const getProductInfo = async () => {
    const res = await axios.get(`${API_BASE_URL}/products/${id}`);
    setItem(res.data);
  };

  useEffect(() => {
    getProductInfo();
  }, [id]);

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
          {cartItem ? (
            <div className="flex items-center justify-around">
              <button
                onClick={() => {
                  const key = getCartItemKey(cartItem);
                  dispatch(removeFromCart({ key, quantity: 1 }));
                }}
                className="bg-secondary border border-r-0 rounded-l-lg w-10"
              >
                -
              </button>
              <h3 className="w-10 border text-center">x {cartItem.quantity}</h3>
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
                className="bg-secondary border border-l-0  rounded-r-lg w-10"
              >
                +
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className=" h-20 p-2">
          {item.sizes && (
            <div className="flex w-full justify-around">
              {item.sizes.map((size) => (
                <div
                  className={`border w-full h-18 flex flex-col items-center cursor-pointer ${
                    selectedSize?.label === size.label
                      ? "bg-accent text-white"
                      : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                  key={size.label}
                >
                  <h1 className="font-semibold">{size.label}</h1>
                  <h2 className="text-xs">({size.meatWeight}gr)</h2>
                  <h3>€ {size.price.toFixed(2)}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-fit px-4">
          <h3 className=" font-bold mt-1">Ingredienti:</h3>
          {item.ingredients.map((ing) =>
            ing.removable ? (
              <Checkbox
                label={ing.name}
                checked={selectedIngredients.includes(ing.name)}
                onFilterChange={() => toggleIngredient(ing.name)}
              />
            ) : (
              <p key={ing.name} className="">
                {ing.name}
              </p>
            ),
          )}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-between items-center h-20 bg-primary rounded-t-xl px-4">
          <h2 className="text-lg font-bold text-center text-white w-[40%]">
            €{selectedSize?.price.toFixed(2)}
          </h2>

          <button
            onClick={isAuthenticated ? handleAddToCart : undefined}
            className={`mt-3 p-1 text-sm w-[60%] py-2 rounded transition hover:scale-105 cursor-pointer ${isAuthenticated ? " bg-secondary text-primary" : "bg-gray-500 text-white"}`}
          >
            Add to Cart
          </button>
        </div>
        </div>
      </div>
  );
}
