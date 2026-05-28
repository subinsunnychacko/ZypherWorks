import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/Marquee";
import { Pillars } from "@/components/pillars/Pillars";
import { Products } from "@/components/products/Products";
import { Process } from "@/components/Process";
import { Metrics } from "@/components/Metrics";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Page() {
	return (
		<>
			<Atmosphere />
			<Nav />
			<Hero />
			<Marquee />
			<Pillars />
			<Products />
			<Process />
			<Metrics />
			<CTA />
			<Footer />
		</>
	);
}
