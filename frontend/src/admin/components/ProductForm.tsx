import React, { useState } from "react";
import Input from "../../components/shared/Input";
import type {
  Products,
  Size,
  Ingredient,
  AvailableExtra,
  Category,
} from "../../types/products";

type Props = {
  initialValues?: Products | null;
  categories: Category[] | null;
  extras?: AvailableExtra[];
  onSubmit: (data: Partial<Products>) => void;
  onClose: () => void;
};

const ProductForm: React.FC<Props> = ({
  initialValues,
  categories,
  extras,
  onSubmit,
  onClose,
}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [category, setCategory] = useState(initialValues?.category);
  const [basePrice, setBasePrice] = useState(initialValues?.basePrice || 0);
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");
  const [available, setAvailable] = useState(initialValues?.available ?? true);

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialValues?.ingredients || [],
  );

  const [sizes, setSizes] = useState<Size[]>(initialValues?.sizes || []);

  const [selectedExtras, setSelectedExtras] = useState<string[]>(
    initialValues?.availableExtras?.map((e) => e._id) || [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      basePrice,
      description,
      imageUrl,
      available,
      ingredients,
      sizes,
      availableExtras: selectedExtras as any,
    });
  };

  const addIngredient = () => setIngredients([...ingredients, { name: "" }]);
  const updateIngredient = (i: number, val: string) => {
    const updated = [...ingredients];
    updated[i].name = val;
    setIngredients(updated);
  };
  const removeIngredient = (i: number) =>
    setIngredients(ingredients.filter((_, index) => index !== i));

  const addSize = () => setSizes([...sizes, { label: "", price: 0 }]);
  const updateSize = (i: number, field: keyof Size, val: any) => {
    const updated = [...sizes];
    (updated[i] as any)[field] = val;
    setSizes(updated);
  };
  const removeSize = (i: number) =>
    setSizes(sizes.filter((_, index) => index !== i));

  const toggleExtra = (id: string) =>
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 rounded-lg space-y-4"
    >
      <Input
        label="Nome prodotto"
        value={name}
        onChange={setName}
        type="text"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoria
        </label>
        <select
          value={category?._id}
          onChange={(e) => {
            const selected = categories?.find((c) => c._id === e.target.value);
            setCategory(selected);
          }}
          className="w-full px-4 py-2 border rounded-lg bg-white"
        >
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Prezzo base"
        value={basePrice.toString()}
        onChange={(v) => setBasePrice(Number(v))}
        type="number"
        required
      />

      <Input
        label="URL immagine"
        value={imageUrl}
        onChange={setImageUrl}
        type="text"
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

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="w-4 h-4"
        />
        Disponibile
      </label>

      <div className="border p-2 rounded-lg space-y-2 bg-white">
        <h4 className="font-semibold">Ingredienti</h4>
        {ingredients.map((ing, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              label={`Ingrediente ${i + 1}`}
              value={ing.name}
              onChange={(val) => updateIngredient(i, val)}
              type="text"
            />
            <button
              type="button"
              onClick={() => removeIngredient(i)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          + Aggiungi ingrediente
        </button>
      </div>

      <div className="border p-2 rounded-lg space-y-2 bg-white">
        <h4 className="font-semibold">Taglie</h4>
        {sizes.map((size, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              label="Label"
              value={size.label}
              onChange={(val) => updateSize(i, "label", val)}
              type="text"
            />
            <Input
              label="Prezzo"
              value={size.price.toString()}
              onChange={(val) => updateSize(i, "price", Number(val))}
              type="number"
            />
            <Input
              label="gr di carne"
              value={size.meatWeight?.toString()}
              onChange={(val) => updateSize(i, "meatWeight", Number(val))}
              type="number"
            />
            <button
              type="button"
              onClick={() => removeSize(i)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSize}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          + Aggiungi taglia
        </button>
      </div>

      <div className="border p-2 rounded-lg space-y-2 bg-white">
        <h4 className="font-semibold">Extra disponibili</h4>
        {extras && extras.map((extra) => (
          <label key={extra._id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedExtras.includes(extra._id)}
              onChange={() => toggleExtra(extra._id)}
              className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 accent-orange-500 cursor-pointer"
            />
            {extra.name.toUpperCase()} {extra.price === 0 ? `` : `+€ ${extra.price}`}
          </label>
        ))}
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
  );
};

export default ProductForm;
