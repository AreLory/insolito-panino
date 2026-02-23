import type { AvailableExtra } from "../../types/products";

import { ChevronDown, ChevronUp } from "lucide-react";
interface Props {
  isExpanded: boolean;
  onSetExpanded: (v: boolean) => void;
  extras: AvailableExtra[];
  selectedExtras: any;
  onToggleExtra: (name: string) => void;
}

export default function ExtraSelector({
  isExpanded,
  onSetExpanded,
  extras,
  selectedExtras,
  onToggleExtra,
}: Props) {
  return (
    <>
      {extras.length > 0 && (
        <div className="bg-white mt-2">
          <button
            onClick={() => onSetExpanded(!isExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">
                Add an extra ingredient
              </h2>
              {selectedExtras > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {selectedExtras.size} selected
                </span>
              )}
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {isExpanded && (
            <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-4">
              {extras.map((extra) => (
                <label
                  key={extra._id}
                  className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedExtras.has(extra._id)}
                      onChange={() => onToggleExtra(extra._id)}
                      className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                    />
                    <span className="text-gray-700">{extra.name}</span>
                  </div>
                  <span className="font-semibold text-orange-600">
                    +€{extra.price.toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
