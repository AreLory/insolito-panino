import React, { useState, useEffect } from "react";
import Input from "../../components/shared/Input";
import type { Category } from "../../types/products";

type Props = {
  initialValues?: Category | null;
  onSubmit: (id: string, data: Partial<Category>) => void;
  onClose: () => void;
};

const CategoryForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  onClose,
}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [slug, setSlug] = useState(initialValues?.slug || "");
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );
  const [img, setImg] = useState(initialValues?.img || "");
  const [active, setActive] = useState(initialValues?.active ?? true);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setSlug(initialValues.slug || "");
      setDescription(initialValues.description || "");
      setImg(initialValues.img || "");
      setActive(initialValues.active ?? true);
    }
  }, [initialValues]);

  if (!initialValues?._id) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(initialValues._id, {
      name,
      description,
      slug,
      img,
      active,
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
            label="Nome categoria"
            value={name}
            onChange={setName}
            type="text"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4"
            />
            Disponibile
          </label>

          <Input
            label="Slug"
            value={slug}
            onChange={setSlug}
            type="text"
            required
          />

          <Input
            label="Immagine"
            value={img}
            onChange={setImg}
            type="text"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrizione
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
          </div>

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
};

export default CategoryForm;
