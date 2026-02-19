import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import type { Category} from "../../types/products";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../features/categories/categoriesSelectors";
import { fetchProducts } from "../../features/products/productsSlice";
import { Link } from "react-router";




export default function MenuCategories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories)
  const loading = useSelector(selectCategoriesLoading);
  

  // Fetch solo se necessario
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading ...</p>;
  if (!categories) return <p>Categories not found</p>

  return (
    <div className="mx-4 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Il Nostro Menu</h2>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category: Category) => (
          <button
            key={category._id}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition`}
            />

            <div className="relative">
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs mb-2">{category.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400">
                  
                </span>
                <Link to={'/menu'}>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:text-orange-500 transition"
                />
                </Link>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}