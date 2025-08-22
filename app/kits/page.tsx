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

export default function Kits() {
  const [kits, setKits] = useState<Kit[]>([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/kits`).then(res => setKits(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Wellness Kits</h1>
      <ul className="mt-4 space-y-4">
        {kits.map(kit => (
          <li key={kit._id} className="border p-4 rounded">
            <h2>{kit.name}</h2>
            <p>{kit.description}</p>
            <p>Effort Level: {kit.effort_level}/10</p>
            <Link href={`/kits/${kit._id}`} className="text-blue-500">Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


