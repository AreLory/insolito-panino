import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProducts } from "../../features/products/productsSelectors";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
  createProduct,
} from "../../features/products/productsSlice";
import { selectCategories } from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import { fetchExtras } from "../../features/extras/extrasSlice";

import ProductTable from "../components/product/ProductTable";
import ProductForm from "../components/product/ProductForm";
import Loader from "../../components/shared/Loader";
import MiniNavBar from "../../components/shared/MiniNavBar";

import type { Products } from "../../types/products";
import type { AppDispatch, RootState } from "../../store/store";

import { ChevronLeft } from "lucide-react";

export default function AdminProducts() {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const extras = useSelector((state: RootState) => state.extras.data);

  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchExtras());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (!selectedCategory) return products;

    return products.filter(
      (product) => product.category._id === selectedCategory,
    );
  }, [products, selectedCategory]);

  const handleEdit = (product: Products) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (data: Partial<Products>) => {
    if (!editingProduct) return;
    dispatch(updateProduct({ id: editingProduct._id, data }));
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleCreate = (data: Partial<Products>) => {
    dispatch(createProduct(data));
    setIsCreating(false);
  };

  if (!products && !filteredProducts) {
    return <Loader />;
  }

  if (!categories) {
    return <Loader />;
  }
  if (!extras) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col pt-18 justify-center items-center overflow-x-hidden">
      <MiniNavBar
        leftChild={<ChevronLeft />}
        goBack="/admin"
        pageName="Products List"
        rightChild={"+ Nuovo"}
        onClickAction={() => setIsCreating(true)}
      />
      <div className="flex gap-3 overflow-x-auto p-2 md:justify-center">
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

      <div className="px-2">
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isEditing && editingProduct && (
        <ProductForm
          initialValues={editingProduct}
          categories={categories}
          extras={extras}
          onSubmit={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isCreating && (
        <ProductForm
          categories={categories}
          extras={extras}
          onSubmit={handleCreate}
          onClose={() => setIsCreating(false)}
        />
      )}
    </div>
  );
}
