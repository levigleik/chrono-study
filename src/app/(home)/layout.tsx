export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-screen py-6 px-4 sm:px-8 mx-auto sm:py-12 max-w-[90rem]">
			{children}
		</main>
	);
}
