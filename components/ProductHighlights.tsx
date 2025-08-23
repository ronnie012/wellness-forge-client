"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  effort_level: number;
  impact_score: number;
}

export default function ProductHighlights() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL!.replace(/\/$/, '')}/api/products`)
      .then(res => {
        setProducts(res.data.slice(0, 8));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-12 min-h-[300px]">
      <h2 className="text-3xl font-bold text-center text-foreground">Featured Wellness Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {loading ? (
          <div className="col-span-full text-center flex flex-col items-center justify-center h-full">
            <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : (
          products.map(product => (
            <Link href={`/products/${product._id}`} key={product._id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 block h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{product.description}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Effort: {product.effort_level}/10 | Impact: {product.impact_score}</p>
              <Link href={`/products/${product._id}`} className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 self-start">Details</Link>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}


