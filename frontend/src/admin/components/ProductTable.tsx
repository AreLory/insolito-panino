import React from "react";
import type { Products } from "../../types/products";
import Loader from "../../components/shared/Loader";


type Props = {
  products: Products[]|null;
  onEdit: (product: Products) => void;
  onDelete: (id: string) => void;
};

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {


  if (!products) return <Loader/>

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Img</th>
          <th className="border p-2">Nome</th>
          <th className="border p-2">Categoria</th>
          <th className="border p-2">Prezzo base</th>
          <th className="border p-2">Taglie</th>
          <th className="border p-2">Ingredienti</th>
          <th className="border p-2">Extra Disponibili</th>
          <th className="border p-2">Disponibile</th>
          <th className="border p-2">Azioni</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="hover:bg-gray-50">
            <td className="border p-2 text-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover mx-auto rounded"
              />
            </td>

            <td className="border p-2">{product.name}</td>

            <td className="border p-2 capitalize">{product.category?.name}</td>

            <td className="border p-2">€{product.basePrice.toFixed(2)}</td>

            <td className="border p-2">
              {product.sizes?.length
                ? product.sizes
                    .map((s) => `${s.label} (€${s.price})`)
                    .join(", ")
                : "-"}
            </td>

            <td className="border p-2">
              {product.ingredients.map((i) => i.name).join(", ")}
            </td>

            <td className="border p-2">
              {product.availableExtras.map((e) => e.name).join(", ")}
            </td>

            <td className="border p-2 text-center">
              {product.available ? "✅" : "❌"}
            </td>

            <td className="border p-2">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(product)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Modifica
                </button>

                <button
                  onClick={() => onDelete(product._id)}
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
  );
};

export default ProductTable;
