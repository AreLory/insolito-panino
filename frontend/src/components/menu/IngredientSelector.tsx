import type { Ingredient } from "../../types/products";

import { ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  isExpanded: boolean
  onSetIngredientsExpanded: (v: boolean)=> void
  ingredients: Ingredient[];
  removedIngredients: string[];
  onToggleIngredient: (name: string) => void;
}

export default function IngredientSelector({
  isExpanded,
  onSetIngredientsExpanded,
  ingredients,
  removedIngredients,
  onToggleIngredient,
}: Props) {
  return (
    <div className="bg-white mt-2">
          <button
            onClick={() => onSetIngredientsExpanded(!isExpanded)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
              <span className="text-sm text-gray-500">
                ({ingredients.filter((i) => i.removable).length} removable)
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
          {isExpanded && (
            <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-4">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex items-center justify-between py-2"
                >
                  <span
                    className={`${
                      removedIngredients.includes(ingredient.name)
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {ingredient.name}
                  </span>
                  {ingredient.removable ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!removedIngredients.includes(ingredient.name)}
                        onChange={() => onToggleIngredient(ingredient.name)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Basic</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
  );
}
