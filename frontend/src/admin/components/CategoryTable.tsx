import Loader from "../../components/shared/Loader";
import type { Category } from "../../types/products";

type Props = {
  categories: Category[]|null;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
};
export default function CategoryTable({categories, onEdit, onDelete}:Props) {

    if (!categories) return <Loader/>
    
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <th className="border p-2">Img</th>
        <th className="border p-2">Nome</th>
        <th className="border p-2">Slug</th>
        <th className="border p-2">Description</th>
        <th className="border p-2">Active</th>
      </thead>
      <tbody>
        {categories.map((category)=>(
            <tr key={category._id}>
                <td className="border p-2 text-center">
              <img
                src={category.img}
                alt={category.name}
                className="w-12 h-12 object-cover mx-auto rounded"
              />
            </td>

            <td className="border p-2">{category.name}</td>

            <td className="border p-2">{category.slug}</td>

            <td className="border p-2">{category.description}</td>

            <td className="border p-2 text-center">{category.active ? "✅" : "❌" }</td>

            <td className="border p-2">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(category)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Modifica
                </button>

                <button
                  onClick={() => onDelete(category._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Elimina
                </button>
              </div>
            </td>
            
            </tr>
        ))}
      </tbody>
    </table>
  )
}
