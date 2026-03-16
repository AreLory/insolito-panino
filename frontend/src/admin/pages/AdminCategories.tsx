import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCategories } from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesSlice";

import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";
import Loader from "../../components/shared/Loader";

import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

import type { Category } from "../../types/products";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${API_BASE_URL}/categories/${id}`);
      dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Category>) => {
  if (!id) return;

  try {
    const res = await api.patch(`${API_BASE_URL}/categories/${id}`, data);

    dispatch(fetchCategories());
    setIsModalOpen(false);
    setEditingCategory(null);
  } catch (error) {
    console.log(error);
  }
};

  if (!categories) {
    return <Loader />;
  }

  return (
    <div>
      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && editingCategory && (
        <CategoryForm
          initialValues={editingCategory}
          onSubmit={handleUpdate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
