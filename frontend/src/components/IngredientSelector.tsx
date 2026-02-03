import type { IIngredient } from "../types/IProducts"
import Checkbox from "./Checkbox"

interface Props {
    ingredients: IIngredient[],
    selectedIngredients: string[],
    onToggleIngredient: (name:string)=> void
}

export default function IngredientSelector({
    ingredients,
    selectedIngredients,
    onToggleIngredient
}:Props) {
  return (
    <div className="h-fit px-4">
          <h3 className=" font-bold mt-1">Ingredienti:</h3>
          {ingredients.map((ing) =>
            ing.removable ? (
              <Checkbox
                key={ing.name}
                label={ing.name}
                checked={selectedIngredients.includes(ing.name)}
                onFilterChange={() => onToggleIngredient(ing.name)}
              />
            ) : (
              <p key={ing.name}>
                {ing.name}
              </p>
            ),
          )}
        </div>
  )
}
