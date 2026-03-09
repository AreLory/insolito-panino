import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectProducts } from "../../features/products/productsSelectors";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../features/products/productsSlice";

import ProductTable from "../components/AdminTable";
import ProductForm from "../components/ProductForm";

import type { Products } from "../../types/products";
import { selectCategories } from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesSlice";
import Loader from "../../components/shared/Loader";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

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

  if (!categories) {
    return <Loader/>
  }
  return (
    <div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && editingProduct && (
        <ProductForm
          initialValues={editingProduct}
          categories={categories}
          onSubmit={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
