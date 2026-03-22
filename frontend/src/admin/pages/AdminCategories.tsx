import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCategories } from "../../features/categories/categoriesSelectors";
import { fetchCategories } from "../../features/categories/categoriesSlice";

import CategoryTable from "../components/category/CategoryTable";
import CategoryForm from "../components/category/CategoryForm";
import Loader from "../../components/shared/Loader";
import MiniNavBar from "../../components/shared/MiniNavBar";

import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

import type { Category } from "../../types/products";
import type { AppDispatch } from "../../store/store";

import { ChevronLeft } from "lucide-react";

export default function AdminProducts() {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${API_BASE_URL}/categories/${id}`);
      dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data: Partial<Category>) => {
    if (!editingCategory?._id) return;

    try {
      await api.patch(
        `${API_BASE_URL}/categories/${editingCategory?._id}`,
        data,
      );

      dispatch(fetchCategories());
      setIsOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (data: Partial<Category>) => {
    try {
      await api.post(`${API_BASE_URL}/categories`, data);

      dispatch(fetchCategories());
      setIsCreating(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!categories) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col pt-18 justify-center items-center overflow-x-hidden">
      <MiniNavBar
        leftChild={<ChevronLeft />}
        goBack="/admin"
        pageName="Categories List"
        rightChild={"+ Nuovo"}
        onClickAction={() => setIsCreating(true)}
      />
      <div className="px-2">
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isOpen && editingCategory && (
        <CategoryForm
          initialValues={editingCategory}
          onSubmit={handleUpdate}
          onClose={() => setIsOpen(false)}
        />
      )}

      {isCreating && (
        <CategoryForm
          onSubmit={handleCreate}
          onClose={() => setIsCreating(false)}
        />
      )}
    </div>
  );
}
