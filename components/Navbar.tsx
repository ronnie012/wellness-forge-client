"use client";

import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/components/Toast"; // Import useToast

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const { showToast } = useToast(); // Get showToast

  return (
    <nav className="sticky top-0 z-10 py-4 px-12 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md text-gray-900 dark:text-white grid grid-cols-3 items-center border-b border-gray-200 dark:border-gray-700 rounded-bl-lg rounded-br-lg">
      <div className="col-span-1">
        <Link href="/" className="text-2xl font-bold">WellnessForge</Link>
      </div>
      <div className="col-span-1 flex justify-center space-x-4">
        <Link href="/products">Products</Link>
        {status === "authenticated" && (
          <Link href="/dashboard/add-product">Add Product</Link>
        )}
      </div>
      <div className="col-span-1 flex justify-end space-x-4 items-center">
        <Button
          variant="ghost"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        {status === "authenticated" ? (
          <>
            {session.user?.image && (
              <div className="relative group">
                <img
                  src={session.user.image}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {session.user?.name && (
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {session.user.name}
                  </span>
                )}
              </div>
            )}
            <Button variant="ghost" onClick={async () => { // Make onClick async
              await signOut();
              showToast("Logged out successfully!", "success"); // Show toast
            }}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}


