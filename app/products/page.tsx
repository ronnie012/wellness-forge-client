"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "@/components/Spinner";

interface Product {
  _id: string;
  name: string;
  description: string;
  effort_level: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL!.replace(/\/$/, '')}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Spinner />
        <p className="text-2xl mt-4">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="py-4 px-12 bg-background text-foreground">
      <h1 className="text-3xl font-bold text-center text-foreground py-4">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-8">
        {products.map(product => (
          <li key={product._id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 flex-grow">{product.description}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Effort Level: {product.effort_level}/10</p>
            <Link href={`/products/${product._id}`} className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 self-start">Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
