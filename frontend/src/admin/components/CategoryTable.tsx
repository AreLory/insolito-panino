import Loader from "../../components/shared/Loader";
import type { Category } from "../../types/products";
import { PenBox, Trash } from "lucide-react";

type Props = {
  categories: Category[] | null;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
};
export default function CategoryTable({ categories, onEdit, onDelete }: Props) {
  if (!categories) return <Loader />;

  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={category.img}
                alt={category.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {category.slug || "-"}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                {category.active ? (
                  <span className="text-green-600 font-medium text-sm">
                    Disponibile
                  </span>
                ) : (
                  <span className="text-red-600 font-medium text-sm">
                    Non disponibile
                  </span>
                )}
              </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(category)}
                className="p-2 bg-blue-500 text-white rounded-lg"
              >
                <PenBox size={18} />
              </button>

              <button
                onClick={() => onDelete(category._id)}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="hidden md:block overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-sm">
           <tr>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-center">Slug</th>
              <th className="p-3 text-center">Disponibile</th>
              <th className="p-3 text-center">Azioni</th>
            </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-14 h-14 object-cover rounded border"
                  />
                  <div>
                    <p className="font-medium">{category.name}</p>
                  </div>
                </div>
              </td>

              <td className="p-3">{category.slug}</td>

              <td className="p-3 text-center">
                {category.active ? (
                  <span className="text-green-600 font-medium">✔</span>
                ) : (
                  <span className="text-red-600 font-medium">✖</span>
                )}
              </td>

              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <PenBox size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(category._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
