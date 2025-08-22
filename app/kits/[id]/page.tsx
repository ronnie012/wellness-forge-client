"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Kit {
  name: string;
  description: string;
  effort_level: number;
  steps: string;
  benefits: string;
  impact_score: number;
}

export default function KitDetails() {
  const { id } = useParams();
  const [kit, setKit] = useState<Kit | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/kits/${id}`).then(res => setKit(res.data));
    }
  }, [id]);

  if (!kit) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{kit.name}</h1>
      <p>{kit.description}</p>
      <p>Effort Level: {kit.effort_level}/10</p>
      <p>Steps: {kit.steps}</p>
      <p>Benefits: {kit.benefits}</p>
      <p>Impact Score: {kit.impact_score}</p>
    </div>
  );
}


