import { useEffect, useState } from "react";
import type { IProducts } from "../types/IProducts";
import API_BASE_URL from "../config/api";
import axios from "axios";

export function useProduct(id?: string) {
  const [product, setProduct] = useState<IProducts | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_BASE_URL}/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  return product;
}