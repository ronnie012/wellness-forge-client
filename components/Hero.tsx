import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-20 bg-accent">
      <h1 className="text-4xl font-bold">Forge Your Path to Better Health</h1>
      <p className="text-xl mt-4">Discover, Share, and Thrive with Community-Driven Wellness Products</p>
      <Link href="/products" className="mt-8 inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold">Explore Products</Link>
    </section>
  );
}


