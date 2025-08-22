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
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products`)
      .then(res => {
        setProducts(res.data.slice(0, 3));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10 min-h-[300px]">
      <h2 className="text-2xl font-bold text-center">Featured Wellness Products</h2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {loading ? (
          <div className="col-span-3 text-center flex flex-col items-center justify-center h-full">
            <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : (
          products.map(product => (
            <Link href={`/products/${product._id}`} key={product._id} className="p-4 border rounded block hover:shadow-lg transition-shadow duration-200">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Effort: {product.effort_level}/10 | Impact: {product.impact_score}</p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}


