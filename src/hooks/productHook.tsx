import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  image: string[];
  description: string[];
  price: number;
  category: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:3000/api/products/products",
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return products;
};
