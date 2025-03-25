export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex flex-col md:flex-row gap-4 h-screen px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 overflow-hidden">
			{children}
		</main>
	);
}
