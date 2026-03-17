import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { api } from "../../config/axios";
import API_BASE_URL from "../../config/api";

import { fetchExtras } from "../../features/extras/extrasSlice";
import type { AppDispatch, RootState } from "../../store/store";

import ExtraTable from "../components/ExtraTable";
import MiniNavBar from "../../components/shared/MiniNavBar";
import ExtraForm from "../components/ExtraForm";


import type { AvailableExtra } from "../../types/products";

import { ChevronLeft } from "lucide-react";

export default function AdminExtras() {
  const dispatch: AppDispatch = useDispatch();
  const extras = useSelector((state: RootState) => state.extras.data);

  const [isOpen, setIsOpen] = useState(false);
  const [editingExtra, setEditingExtra] = useState<AvailableExtra | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchExtras());
  }, [dispatch]);

  const handleEdit = (extra: AvailableExtra) => {
    setIsOpen(true);
    setEditingExtra(extra);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`${API_BASE_URL}/extras/${id}`);
      dispatch(fetchExtras());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data: Partial<AvailableExtra>) => {
    if (!editingExtra?._id) return;

    try {
      await api.patch(`${API_BASE_URL}/extras/${editingExtra._id}`, data);
      dispatch(fetchExtras());

      setIsOpen(false);
      setEditingExtra(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (data: Partial<AvailableExtra>) => {
    try {
      await api.post(`${API_BASE_URL}/extras`, data);

      dispatch(fetchExtras());
      setIsCreating(false);
    } catch (error) {
      console.log(error);
    }
  };
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
        <ExtraTable
          extras={extras}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {isOpen && editingExtra && (
        <ExtraForm
          initialValues={editingExtra}
          onClose={() => setIsOpen(false)}
          onSubmit={handleUpdate}
        />
      )}

      {isCreating && (
        <ExtraForm
          onClose={() => setIsCreating(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}
