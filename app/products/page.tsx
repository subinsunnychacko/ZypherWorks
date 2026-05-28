import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductsPageHero } from "@/components/products/page/ProductsPageHero";
import { ProductsShowcase } from "@/components/products/page/ProductsShowcase";
import { ProductsFeatured } from "@/components/products/page/ProductsFeatured";
import { ProductsMatrix } from "@/components/products/page/ProductsMatrix";
import { ProductsPageCTA } from "@/components/products/page/ProductsPageCTA";

export const metadata: Metadata = {
  title: "Products · ZypherWorks",
  description:
    "Six products composed from the same ZypherWorks platform — operations, sales, automation, analytics, finance and comms.",
};

export default function ProductsPage() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <ProductsPageHero />
      <ProductsShowcase />
      <ProductsFeatured />
      <ProductsMatrix />
      <ProductsPageCTA />
      <Footer />
    </>
  );
}
