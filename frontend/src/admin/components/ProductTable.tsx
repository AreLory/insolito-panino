import React from "react";
import type { Products } from "../../types/products";
import Loader from "../../components/shared/Loader";
import {PenBox, Trash } from "lucide-react";

type Props = {
  products: Products[] | undefined;
  onEdit: (product: Products) => void;
  onDelete: (id: string) => void;
};

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  if (!products) return <Loader />;

  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category?.name || "-"}
                </p>
                <p className="font-medium text-green-600">
                  €{product.basePrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="text-sm space-y-1">
              {product.sizes?.length ? (
                <p>
                  <span className="font-medium">Taglie:</span>{" "}
                  {product.sizes
                    .map((s) => `${s.label} (€${s.price})`)
                    .join(", ")}
                </p>
              ) : (
                ""
              )}

              <p>
                <span className="font-medium">Ingredienti:</span>{" "}
                {product.ingredients.length}
              </p>

              <p>
                <span className="font-medium">Extra Disponibili:</span>{" "}
                {product.availableExtras.length}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div>
                {product.available ? (
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
                  onClick={() => onEdit(product)}
                  className="p-2 bg-blue-500 text-white rounded-lg"
                >
                  <PenBox size={18} />
                </button>

                <button
                  onClick={() => onDelete(product._id)}
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
              <th className="p-3 text-left">Prodotto</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-center">Prezzo</th>
              <th className="p-3 text-center">Disponibile</th>
              <th className="p-3 text-center">Azioni</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.ingredients
                          .map((i) => i.name)
                          .slice(0, 3)
                          .join(", ")}
                        {product.ingredients.length > 3 && "..."}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3 capitalize">
                  {product.category?.name || "-"}
                </td>

                <td className="p-3 text-center font-medium">
                  €{product.basePrice.toFixed(2)}
                </td>

                <td className="p-3 text-center">
                  {product.available ? (
                    <span className="text-green-600 font-medium">✔</span>
                  ) : (
                    <span className="text-red-600 font-medium">✖</span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <PenBox size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(product._id)}
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
};

export default ProductTable;
