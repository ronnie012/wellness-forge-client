"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/Toast"; // Import useToast

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { showToast } = useToast(); // Get showToast

  if (status === "authenticated") {
    router.replace("/products"); // Redirect to /products if already authenticated
    return null;
  }

  const handleSignIn = async () => {
    const result = await signIn("google", { redirect: false });
    if (result?.ok) {
      showToast("Login successful!", "success");
      router.replace("/products");
    } else if (result?.error) {
      showToast(`Login failed: ${result.error}`, "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to access your wellness dashboard.</p>
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}


