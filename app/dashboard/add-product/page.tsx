"use client";

import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/Toast";
import Spinner from "@/components/Spinner";


export default function AddProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // Assuming products also have effort_level, steps, benefits
    effort_level: 1,
    steps: "",
    benefits: "",
  });

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      showToast("Session expired. Please log in again.", "error");
      router.push("/login");
    }
  }, [session, router, showToast]);

  if (status === "loading") return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <Spinner />
      <p className="text-2xl mt-4">Loading...</p>
    </div>
  );
  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentSession = await getSession();
      if (!currentSession?.accessToken) {
        showToast("Authentication token not found.", "error");
        setLoading(false);
        return;
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL!.replace(/\/$/, '')}/api/products`, formData, {
        headers: { Authorization: `Bearer ${currentSession.accessToken}` },
      });
      showToast("Product added successfully!", "success");
      router.push("/products"); // Redirect to products list after adding
    } catch (error) {
      showToast("Failed to add product.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-background text-foreground">
      <h1 className="text-3xl font-bold text-center text-foreground py-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="mt-4 mb-8 space-y-4 max-w-lg mx-auto border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:text-white"
          required
        />
        <textarea
          placeholder="Product Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:text-white"
          required
        />
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Effort Level (1-10)"
          value={formData.effort_level}
          onChange={e => setFormData({ ...formData, effort_level: Number(e.target.value) })}
          className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:text-white"
          required
        />
        <textarea
          placeholder="Steps"
          value={formData.steps}
          onChange={e => setFormData({ ...formData, steps: e.target.value })}
          className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:text-white"
          required
        />
        <textarea
          placeholder="Benefits"
          value={formData.benefits}
          onChange={e => setFormData({ ...formData, benefits: e.target.value })}
          className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:text-white"
          required
        />
        <button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded dark:bg-green-600 dark:hover:bg-green-700 dark:text-white">
          {loading ? <Spinner /> : "Add Product"}
        </button>
      </form>
    </div>
  );
}
