import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-16 bg-accent">
      <h1 className="text-4xl font-bold">Forge Your Path to Better Health</h1>
      <p className="text-xl mt-4">Discover, Share, and Thrive with Community-Driven Wellness Products</p>
      <Link href="/products" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold dark:bg-blue-700 dark:hover:bg-blue-800">Explore Products</Link>
    </section>
  );
}


