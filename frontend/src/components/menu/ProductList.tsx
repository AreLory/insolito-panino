import { useEffect, useState } from "react";

import { useAlert } from "../../context/AlertContext";

import ProductCard from "./ProductCard";

import axios from "axios";
import API_BASE_URL from "../../config/api";

import { handleAxiosError } from "../../utils/errorHandler";

import type { Category, Products } from "../../types/products";
import Loader from "../shared/Loader";


interface Props {
  category: Category;
}
export default function ProductList({ category }: Props) {
  const { showAlert } = useAlert();

  const [productList, setProductList] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  const getProductList = async () => {
    setLoading(true);
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
      handleAxiosError(error, showAlert)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductList();
  }, [category]);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-6xl w-full">
      {productList?.map((product: Products) => (
        <ProductCard item={product} key={product._id} />
      ))}
    </div>
  );
}
