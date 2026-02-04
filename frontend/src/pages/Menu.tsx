import { useState } from "react";
import BottomNav from "../components/BottomNav";
import ProductList from "../components/ProductList";
import noImg from '../assets/img/noImg.png'

export default function Menu() {
  const categories = [
    {
      label: 'Burger',
      value: "burger",
      img: noImg
    },
    {
      label: 'Pulled Pork',
      value: "pulled",
      img: noImg,
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
      <div className="flex flex-col gap-2 pt-2 pb-1 w-full overflow-x-scroll md:justify-center mt-6 items-center bg-white">
        <h1 className="text-xl font-bold">Categories</h1>
        <div className="flex flex-row w-full sm:overflow-auto md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat)}
            className={`px-2 py-1  rounded cursor-pointer text-primary min-w-20 max-w-30 w-16 text-xs shadow ml-3 ${
              selectedCategory.label == cat.label ? "bg-primary text-white transition-colors" : ""
            }`}
          >
            <img src={cat.img} alt={''} />
            <p>{cat.label}</p>
          </button>
        ))}
        </div>
      </div>
      <div className="mt-2">
        <ProductList category={selectedCategory} />
      </div>
    </div>
  );
}
