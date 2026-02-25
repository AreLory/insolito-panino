import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectTotalItems } from "../features/cart/cartSelectors";

import { useAlert } from "../context/AlertContext";

import ProductList from "../components/menu/ProductList";
import MiniNavBar from "../components/shared/MiniNavBar";

import axios from "axios";
import API_BASE_URL from "../config/api";

import type { Category } from "../types/products";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import Loader from "../components/shared/Loader";

export default function Menu() {
  const { showAlert } = useAlert();

  const itemsQuantity = useSelector(selectTotalItems);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(res.data);
      if (res.data.length > 0) {
        setSelectedCategory(res.data[0]);
      }
    } catch (error) {
      showAlert("error", "Error to fetch categories:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) return <Loader />;
  if (!selectedCategory) return;

  return (
    <div className="w-screen h-screen flex flex-col">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        rightChild={<ShoppingCart />}
        pageName='Menu'
        badgeCount={itemsQuantity}
        goBack="/"
        goTo="/cart"
      />
      <div className="pt-20 pb-16 max-w-5xl md:mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-2 md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat)}
              className={`
          px-5 py-2 rounded-full whitespace-nowrap
          text-sm font-medium transition-all duration-300
          border
          ${
            selectedCategory?.slug === cat.slug
              ? "bg-gray-800 text-white border-orange-700 shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-orange-700 hover:text-black"
          }
        `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <ProductList category={selectedCategory} />
        </div>
      </div>
    </div>
  );
}
