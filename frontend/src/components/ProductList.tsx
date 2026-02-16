//Hooks
import { useEffect, useState } from "react";

import axios from "axios";
import API_BASE_URL from "../config/api";

//interfaces
import type { Products } from "../types/products";
//components
import ProductCard from "./ProductCard";

interface Props {
  category: { label: string; value: string };
}
export default function ProductList({ category }: Props) {
  const [productList, setProductList] = useState<Products[]>([]);

  const getProductList = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/products?category=${category.value}`,
      );
      const productsWithId = res.data.map((product: any) => ({
        ...product,
        id: product._id || product.id,
      }));
      setProductList(productsWithId);
    } catch (error) {
      console.error("Error to fetch product", error);
    }
  };

  useEffect(() => {
    getProductList();
  }, [category]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">{category.label}</h1>

      <div className="flex gap-2 flex-wrap justify-center p-4">
        {productList?.map((product: Products) => (
          <ProductCard item={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
