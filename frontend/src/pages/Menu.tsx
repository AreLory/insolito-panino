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
        pageName="Menu"
        badgeCount={itemsQuantity}
        goBack="/"
        goTo="/cart"
      />
      <div className="pt-20 pb-32 max-w-2xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Categories</h1>
        <div className="flex flex-row w-full sm:overflow-auto md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-1  rounded cursor-pointer text-primary min-w-20 max-w-30 w-16 text-xs shadow ml-3 ${
                selectedCategory?.slug == cat.slug
                  ? "bg-primary text-white transition-colors"
                  : ""
              }`}
            >
              <img src={cat.img} alt={cat.slug} />
              <p>{cat.name}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <ProductList category={selectedCategory} />
      </div>
    </div>
  );
}
