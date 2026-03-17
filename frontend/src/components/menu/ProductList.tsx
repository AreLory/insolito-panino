import { useEffect } from "react";

import ProductCard from "./ProductCard";

import type { Category, Products } from "../../types/products";
import type { AppDispatch } from "../../store/store";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { selectProducts } from "../../features/products/productsSelectors";

interface Props {
  category: Category;
}

export default function ProductList({ category }: Props) {
  const dispatch:AppDispatch = useDispatch()
  const productList = useSelector(selectProducts)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-6xl w-full">
      {productList?.map((product: Products) => (
        product.category._id === category._id &&
        <ProductCard item={product} key={product._id} />
      ))}
    </div>
  );
}
