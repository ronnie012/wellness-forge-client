"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/Toast";

export default function AddKit() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    effort_level: 1,
    steps: "",
    benefits: "",
  });

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/kits`, formData, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      showToast("Kit added successfully!", "success");
      router.push("/kits");
    } catch (error) {
      showToast("Failed to add kit.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add New Wellness Kit</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Effort Level (1-10)"
          value={formData.effort_level}
          onChange={e => setFormData({ ...formData, effort_level: Number(e.target.value) })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Steps"
          value={formData.steps}
          onChange={e => setFormData({ ...formData, steps: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Benefits"
          value={formData.benefits}
          onChange={e => setFormData({ ...formData, benefits: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">
          {loading ? <span className="animate-spin">⏳</span> : "Add Kit"}
        </button>
      </form>
    </div>
  );
}


