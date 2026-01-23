import axios from "axios";
import API_BASE_URL from "../config/api";
import ProductCard from "./ProductCard";
import type { IProducts } from "../types/IProducts";
import { useEffect, useState } from "react";

export default function ProductList() {
    const [productList, setProductList] = useState<IProducts[]>([])

  const getProductList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      const productsWithId = res.data.map((product: any) => ({
        ...product,
        id: product._id || product.id
      }));
      setProductList(productsWithId);
    } catch (error) {
        console.error('Error to fetch product', error)
    }
  };

useEffect(()=>{
    getProductList()
},[])

  return (
    <div>
      {productList?.map((product: IProducts) => (
        <ProductCard item={product} key={product.id}/>
      ))}
    </div>
  );
}
