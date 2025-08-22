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

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products`).then(res => setProducts(res.data.slice(0, 3)));
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center">Featured Wellness Products</h2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {products.map(product => (
          <Link href={`/products/${product._id}`} key={product._id} className="p-4 border rounded block hover:shadow-lg transition-shadow duration-200">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Effort: {product.effort_level}/10 | Impact: {product.impact_score}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}


