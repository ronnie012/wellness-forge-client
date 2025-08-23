"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  effort_level: number;
  steps: string;
  benefits: string;
  impact_score?: number; // Optional, as it's calculated on backend
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL!.replace(/\/$/, '')}/api/products/${id}`)
        .then(res => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching product details:", err);
          setError("Failed to load product details.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center">Loading product details...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-4 text-center">Product not found.</div>;
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl rounded-lg my-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{product.name}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="text-gray-600 dark:text-gray-400"><strong>Effort Level:</strong> {product.effort_level}/10</p>
        {product.impact_score && (
          <p className="text-gray-600 dark:text-gray-400"><strong>Impact Score:</strong> {product.impact_score}</p>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Steps:</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{product.steps}</p>
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Benefits:</h2>
      <p className="text-gray-700 dark:text-gray-300">{product.benefits}</p>
    </div>
  );
}
