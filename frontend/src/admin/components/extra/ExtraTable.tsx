import Loader from "../../../components/shared/Loader";
import type { AvailableExtra } from "../../../types/products";
import { PenBox, Trash } from "lucide-react";

interface Props {
  extras: AvailableExtra[] | null;
  onEdit: (extra: AvailableExtra) => void;
  onDelete: (id: string) => void;
}

export default function ExtraTable({ extras, onDelete, onEdit }: Props) {
  if (!extras) return <Loader />;
  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm">
           <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-center">Prezzo</th>
              <th className="p-3 text-center">Disponibile</th>
              <th className="p-3 text-center">Azioni</th>
            </tr>
        </thead>

          <tbody>
            {extras.map((extra) => (
              <tr
                key={extra._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{`${extra.name.toUpperCase()}`}</p>
                  </div>
                </td>

                <td className="p-3">{`€ ${extra.price.toFixed(2)}`}</td>

                <td className="p-3 text-center">
                  {extra.available ? (
                    <span className="text-green-600 font-medium">✔</span>
                  ) : (
                    <span className="text-red-600 font-medium">✖</span>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(extra)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <PenBox size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(extra._id)}
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
