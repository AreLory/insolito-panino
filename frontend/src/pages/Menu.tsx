import { useEffect, useState } from "react";
import ProductList from "../components/menu/ProductList";
import axios from "axios";
import API_BASE_URL from "../config/api";
import type { Category } from "../types/products";

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/categories`);
      
      setCategories(res.data);

      if (res.data.length > 0){
        setSelectedCategory(res.data[0]);
      }

    } catch (error) {
      console.error("Error to fetch categories", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) return <p>Loading ...</p>;
  if (!selectedCategory) return <p>No categories found</p>;

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex flex-col gap-2 pt-2 pb-1 w-full overflow-x-scroll md:justify-center mt-6 items-center bg-white">
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
