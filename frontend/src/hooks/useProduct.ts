import { useEffect, useState } from "react";

import API_BASE_URL from "../config/api";
import axios from "axios";

import type { Products } from "../types/products";

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Products | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${API_BASE_URL}/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  return product;
}