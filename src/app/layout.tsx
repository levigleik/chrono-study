import type { Metadata } from "next";
import { Libre_Baskerville, Oxanium } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const baskerville = Libre_Baskerville({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-baskerville",
});

export const oxanium = Oxanium({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-oxanium",
});

export const metadata: Metadata = {
	title: "ChronoStudy",
	description: "A study tool for students.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${baskerville.variable} ${oxanium.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
