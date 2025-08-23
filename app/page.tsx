import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProductHighlights />
    </main>
  );
}


