import { useEffect, useState } from "react";

import { useAlert } from "../../context/AlertContext";

import ProductCard from "./ProductCard";

import axios from "axios";
import API_BASE_URL from "../../config/api";

import type { Category, Products } from "../../types/products";
import Loader from "../shared/Loader";

interface Props {
  category: Category;
}
export default function ProductList({ category }: Props) {
  const {showAlert} = useAlert()
  
  const [productList, setProductList] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false)

  const getProductList = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${API_BASE_URL}/products?category=${category._id}`,
      );
      const productsWithId = res.data.map((product: Products) => ({
        ...product,
        id: product._id,
      }));
      setProductList(productsWithId);
    } catch (error) {
      showAlert('error', "Error to fetch products. Please try again");
    }finally {
      setLoading(false)
    }
    
  };

  useEffect(() => {
    getProductList();
  }, [category]);

  if (loading) return <Loader/>
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">{category.name}</h1>

      <div className="flex gap-2 flex-wrap justify-center p-4">
        {productList?.map((product: Products) => (
          <ProductCard item={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
