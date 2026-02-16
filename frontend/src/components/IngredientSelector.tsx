import type { Ingredient } from "../types/products";
import Checkbox from "./Checkbox";

interface Props {
  ingredients: Ingredient[];
  removedIngredients: string[];
  onToggleIngredient: (name: string) => void;
}

export default function IngredientSelector({
  ingredients,
  removedIngredients,
  onToggleIngredient,
}: Props) {
  return (
    <div className="h-fit px-4">
      <h3 className=" font-bold mt-1">Ingredienti:</h3>
      {ingredients.map((ing) =>
        ing.removable ? (
          <Checkbox
            key={ing.name}
            label={ing.name}
            checked={!removedIngredients.includes(ing.name)}
            onFilterChange={() => onToggleIngredient(ing.name)}
          />
        ) : (
          <p key={ing.name}>{ing.name}</p>
        ),
      )}
    </div>
  );
}
