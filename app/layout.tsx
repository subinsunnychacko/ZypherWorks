import type { Metadata, Viewport } from "next";
import {
	Space_Grotesk,
	Inter_Tight,
	Instrument_Serif,
	JetBrains_Mono,
} from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { ScrollReset } from "@/components/ScrollReset";
import { SmoothAnchors } from "@/components/SmoothAnchors";
import "./globals.css";

const display = Space_Grotesk({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-display",
	display: "swap",
});

const body = Inter_Tight({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--font-body",
	display: "swap",
});

const serif = Instrument_Serif({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal", "italic"],
	variable: "--font-serif",
	display: "swap",
});

const mono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-mono",
	display: "swap",
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5, // allow pinch-zoom for accessibility — never use 1 here
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "ZypherWorks | Business Automation Platform for Operators",
		template: "%s | ZypherWorks",
	},
	description:
		"ZypherWorks automates operational workflows, bookings, CRM, and billing — so operators can scale their business without scaling the overhead.",
	openGraph: {
		siteName: "ZypherWorks",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/og/default.png",
				width: 1200,
				height: 630,
				alt: "ZypherWorks — Business Automation Platform for Operators",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@zypherworks",
		creator: "@zypherworks",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${display.variable} ${body.variable} ${serif.variable} ${mono.variable}`}>
			<body>
				{/* Skip to main content — keyboard + screen reader accessibility */}
				<a
					href="#top"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-ink focus:px-5 focus:py-3 focus:text-[14px] focus:font-medium focus:text-bg focus:shadow-lg"
				>
					Skip to main content
				</a>
				<ScrollReset />
				<SmoothAnchors />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(websiteSchema),
					}}
				/>
				{children}
			</body>
		</html>
	);
}
