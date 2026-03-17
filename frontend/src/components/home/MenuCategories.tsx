import { useEffect } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { fetchCategories } from "../../features/categories/categoriesSlice";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../features/categories/categoriesSelectors";
import { fetchProducts } from "../../features/products/productsSlice";

import type { Category } from "../../types/products";
import type { AppDispatch } from "../../store/store";

import { ChevronRight, UtensilsIcon } from "lucide-react";


export default function MenuCategories() {
  const dispatch:AppDispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading ...</p>;
  if (!categories) return 

  return (
    <div className="mx-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <Link to={"/menu"} className="flex items-center gap-2 cursor-pointer">
          <UtensilsIcon className="text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-800">Our Menu</h2>
          <ChevronRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category: Category) => (
          <Link
            to={"/menu"}
            key={category._id}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition group relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition`}
            />

            <div className="relative">
              <img src={category.img} alt={category.emoji} className="md:max-h-30 max-h-20"/>
              <h3 className="font-bold text-gray-800 text-lg mb-1">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs mb-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400"></span>
                <div>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 group-hover:text-orange-500 transition"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
