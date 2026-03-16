import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProducts } from "../../features/products/productsSelectors";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../features/products/productsSlice";
import { selectCategories } from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import { fetchExtras } from "../../features/extras/extrasSlice";

import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import Loader from "../../components/shared/Loader";

import type { Products } from "../../types/products";
import type { RootState } from "../../store/store";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const extras = useSelector((state: RootState) => state.extras.data);

  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchExtras());
  }, [dispatch]);

    const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    if (products)
    return products.filter(
      (product) => product.category._id === selectedCategory,
    );
  }, [products, selectedCategory]);

  const handleEdit = (product: Products) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (data: Partial<Products>) => {
    if (!editingProduct) return;
    dispatch(updateProduct({ id: editingProduct._id, data }));
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  if (!products) {
    return <Loader />;
  }

  if (!categories) {
    return <Loader />;
  }
  if (!extras) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-2 md:justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`
          px-5 py-2 whitespace-nowrap
          text-sm font-medium transition-all duration-300
          border
          ${
            selectedCategory === null
              ? "bg-gray-800 text-white  shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-orange-700 hover:text-black"
          }
        `}
        >
          Tutto
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`
          px-5 py-2 whitespace-nowrap
          text-sm font-medium transition-all duration-300
          border
          ${
            selectedCategory === cat._id
              ? "bg-gray-800 text-white  shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-orange-700 hover:text-black"
          }
        `}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && editingProduct && (
        <ProductForm
          initialValues={editingProduct}
          categories={categories}
          extras={extras}
          onSubmit={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
