import { useEffect, useState } from "react";

import API_BASE_URL from "../config/api";
import axios from "axios";

import type { Products } from "../types/products";

export function useProduct(id?: string) {
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!id) return;
    getProduct()
  }, [id]);

  return {product, loading, error};
}
