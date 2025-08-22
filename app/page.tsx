import Hero from "@/components/Hero";
import ProductHighlights from "@/components/ProductHighlights";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProductHighlights />
      <Footer />
    </main>
  );
}


