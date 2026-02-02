import { useState } from "react";
import BottomNav from "../components/Navbar";
import ProductList from "../components/ProductList";

export default function Menu() {
  const categories = [
    {
      label: 'Burger',
      value: "burger"
    },
    {
      label: 'Pulled Pork',
      value: "pulled"
    },
    {
      label: 'Cotoletta',
      value: "fried-chicken"
    },
    {
      label: 'Salsiccia',
      value: "sausages"
    },
    {
      label: 'Patatine Fritte',
      value: "fries"
    },
    {
      label: 'Altri Fritti',
      value: "fried"
    },
    {
      label: 'Arrosticini',
      value: "arrosticini"
    },
    {
      label: 'Vegetariano',
      value: "vegetarian"
    },
  ];
  const [selectedCategory, setCategory] = useState<{label:string, value:string}>(categories[0]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex gap-2 mt-2 fixed top-0  w-full overflow-x-scroll h-14">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat)}
            className={`px-2 py-1 border rounded cursor-pointer min-w-20 max-w-30 ${
              selectedCategory.label == cat.label ? "bg-accent text-white" : ""
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mt-17">
        <ProductList category={selectedCategory.value} />
      </div>
    </div>
  );
}
