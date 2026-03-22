import React, { useState } from "react";
import type { AvailableExtra } from "../../../types/products";
import Input from "../../../components/shared/Input";

type Props = {
  initialValues?: AvailableExtra | null;
  onSubmit: ( data: Partial<AvailableExtra>) => void;
  onClose: () => void;
};

export default function ExtraForm({ initialValues, onClose, onSubmit }: Props) {
  const [name, setName] = useState(initialValues?.name || "");
  const [price, setPrice] = useState(initialValues?.price || 0);
  const [available, setAvailable] = useState(initialValues?.available ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      price,
      available,
    });
  };

  return (
    <div>
      <div className="fixed inset-0 z-40">
        <div className="w-full h-full bg-black opacity-20"></div>
      </div>
      <div className="absolute inset-0 flex justify-center items-start z-50">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg space-y-4 w-[50vw] max-w-3xl shadow-lg"
        >
          <Input
            label="Nome Extra"
            value={name}
            onChange={setName}
            type="text"
          />

          <Input
            label="Prezzo"
            value={price.toString()}
            onChange={setPrice}
            type="number"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-4 h-4"
            />
            Disponibile
          </label>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Salva
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
