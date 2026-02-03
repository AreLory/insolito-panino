import axios from "axios";
import API_BASE_URL from "../config/api";
import ProductCard from "./ProductCard";
import type { IProducts } from "../types/IProducts";
import { useEffect, useState } from "react";

export default function ProductList({
  category,
}: {
  category: { label: string; value: string };
}) {
  const [productList, setProductList] = useState<IProducts[]>([]);

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
        {productList?.map((product: IProducts) => (
          <ProductCard item={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
