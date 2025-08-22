"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Kit {
  _id: string;
  name: string;
  description: string;
  effort_level: number;
}

export default function Products() {
  const [products, setProducts] = useState<Kit[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="mt-4 space-y-4">
        {products.map(product => (
          <li key={product._id} className="border p-4 rounded">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Effort Level: {product.effort_level}/10</p>
            <Link href={`/products/${product._id}`} className="text-blue-500">Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
